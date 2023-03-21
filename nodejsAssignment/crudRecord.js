const {dbModel,dbResult} = require('./models/channel')

const addRoute = (req,res)=>{
    res.render('addResult.ejs')
}

const postResult = (req,res)=>{
try{
    const newResult = new dbResult();
    newResult.rollno = req.body.rollno
    newResult.name = req.body.name
    newResult.dob = req.body.dob
    newResult.score = req.body.score
    newResult.save((err, data) => {
        if (err) {
            console.error(err)
        }
        else { 
                res.redirect("/teacher")
            }
    });
}
catch(err){
    res.sendStatus(500).send()
}
}

const deleteRoute = (req,res)=>{
    console.log(req.params.rollno)
    dbResult.deleteOne(req.params , (err,result)=>{
        if(err){
            console.error(err)

        }
        else{
            res.redirect('/teacher')
        }
    })
}

const searchRoute = (req,res)=>{

 dbResult.find({rollno : req.body.rollno , dob : req.body.dob},(err,result)=>{
        if(err || result.length <=0){
            return res.redirect("/student")}
        else{
            // console.log(result)
            res.render("searchResult" , {
                user : result[0]
            })
        }
    })};

module.exports = {addRoute , postRoute : postResult,searchRoute ,deleteRoute}