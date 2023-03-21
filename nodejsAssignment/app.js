if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const {checkNotAuth} = require('./middleware/checkNotAuth')
const loginRoute = require('./login')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const jwt = require('jsonwebtoken')
const {dbModel,dbResult} = require('./models/channel')
const { cookieJwtAuth } = require('./middleware/cookieJwtAuth')
const {addRoute,postRoute,searchRoute,deleteRoute} = require('./crudRecord')
const { logoutSession } = require('./logout')

// const users = []

//connecting mongodb
mongoose.set('strictQuery', true);
const db = process.env.DB;
mongoose.connect(db).then(() => {
    console.log(`Connection Successful`);
}).catch((err) => { console.log(`No Connection`) });

app.set("view engine", 'ejs');
app.set('layout', 'layouts/layout')
app.use(express.json())
app.use(expressLayouts)
app.use(cookieParser())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
app.get('/', checkNotAuth , (req, res) => {
    res.render("index");
});

app.get('/student', cookieJwtAuth , (req, res) => {
    res.render("studentPage")
})

app.get('/teacher', cookieJwtAuth, (req, res) => {
    dbResult.find({},(err,result)=>{
        if(err){console.error(err)}
        else{
            
            res.render("teacherPage" , {
                allUsers : result
            })
        }
    })
    
    
})
// Return all users
app.get('/users', (req, res) => {
    res.json(users)
});

// registring new user
app.post('/users', async (req, res) => {
    try {
        const currModel = new dbModel();
        let hashedPass = await bcrypt.hash(req.body.password, 10)
        // console.log(req.body)
        currModel.email = req.body.email
        currModel.password = hashedPass
        currModel.type = req.body.type
        
        currModel.save((err, data) => {
            if (err) {
                console.error(err)
            }
            else { res.sendStatus(201).send() }
        });

    }
    catch {
        res.sendStatus(500).send()
    }

});

//validating while signing in
app.post('/users/login', loginRoute);

//adding new result 
app.post('/users/add' , cookieJwtAuth ,addRoute);

//posting new result to db
app.post('/users/addSuccess',cookieJwtAuth ,postRoute);

//search user 
app.post('/users/search' ,cookieJwtAuth,searchRoute)

//delete results
app.post('/users/delete/:rollno',cookieJwtAuth,deleteRoute);

//logout session
app.get('/logout', logoutSession);
app.listen(3000, (err) => {
    console.log("Server running at port 3000");
});
