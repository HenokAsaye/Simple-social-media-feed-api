import request from "supertest";
import app from "../app";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

describe("Post API", () => {
  let token;
  let postId;

  beforeEach(async () => {
    await Post.deleteMany();
    await User.deleteMany();
    const res = await request(app)
      .post("/auth/signUp")
      .send({
        username: "testUser",
        email: "test@gmail.com",
        password: "testspassword"
      });

    token = res.body.token;
    expect(token).toBeDefined();
  });

  it("should create a post", async () => {
    const res = await request(app)
      .post("/post")  
      .set("Authorization", `Bearer ${token}`) 
      .send({
        content: "testcontent",
        tag: "#test"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("post");
    postId = res.body.postId;
  });

  it("should edit a post", async () => {
    const postRes = await request(app)
        .post("/post")
        .set("Authorization", `Bearer ${token}`)
        .send({
            content: "testcontent",
            tag: "#test"
        });

    postId = postRes.body.post._id; 

    const res = await request(app)
        .patch(`/post/${postId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            content: "edittest"
        });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("post");
});

});
