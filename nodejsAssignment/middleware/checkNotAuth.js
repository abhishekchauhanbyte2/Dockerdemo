
exports.checkNotAuth = (req,res,next)=>{

    if(req.cookies.token){
        res.redirect('/student')
    }
    next();
}