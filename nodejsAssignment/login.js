const jwt = require('jsonwebtoken')
const {dbModel,dbResult} = require('./models/channel')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {

    dbModel.find({ email: req.body.email }, async (err, data) => {

        if (err || data.length <= 0) {
            return res.redirect('/')
        }
        else {

            try {
                
                if (await bcrypt.compare(req.body.password, data[0].password)) {
                    
                    if (req.body.type === data[0].type) {
                        const user = {email : data[0].email}
                        const token = jwt.sign(user , process.env.ACCESS_SECRET_TOKEN)
                        res.cookie("token" , token ,{
                            httpOnly : true
                        });
                        if (data[0].type === "Student") {
                            return res.redirect("/student") }
                        else { 
                            return res.redirect('/teacher') }
                    }
                    else {
                        return res.redirect('/')
                    }

                }
                else {
                   return res.redirect('/')
                }
            }
            catch {
                res.sendStatus(500).send()
                return res.redirect('/')
            }
        }
    })

};