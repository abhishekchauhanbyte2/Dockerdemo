const jwt = require("jsonwebtoken")

exports.logoutSession = (req,res)=>{
    try{
        const token = req.cookies.token
        console.log(token)
        jwt.destroy(token)
        return res.redirect('/')
    }
    catch(err){
        console.error(err)
    }
}