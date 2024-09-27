const requestLogger = (req,res,next)=>{
    console.log(`${req.url},${req.method}, ${new Date().toISOString()}`)
    next();
}

export default requestLogger;