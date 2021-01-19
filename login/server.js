const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
const mongoose = require('mongoose');

const secret = 'gvfdgb%$^$%&$4054423654073467$6@$&*(@%$^&2310*/-/+'

const url = "mongodb+srv://yaara:987Yaara@cluster0.uya8d.mongodb.net/test";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Users = mongoose.model('user', {
    id_user: String,
    userName: String,
    name: String,
    password: String,
    email: String,
    phone: String,
    role: String
});

// const user = new Users({
//     id_user: '123456',
//     userName:'הלל',
//     name: 'הלל',
//     password: '2580',
//     email: 'A4105962@GMAIL.COM',
//     phone: '054-6080982',
//     role: 'admin'
// });

//  user.save().then(doc => console.log('doc')).catch(e =>console.log(e));

// login.html

let ok = false
app.post('/send-Login-details', async (req, res) => {
    try {
        const { userName, password } = req.body
        let validate = false
        let role = 'public'

        const data = await Users.find({})
        data.forEach(elm => {
            if (userName == elm.userName && password == elm.password) {
                validate = true;
                role = elm.role
            } else {
                console.log(`no match ${elm.userName}`)
            }
        })

        let token = jwt.encode({ role }, secret);

        if (validate) {
            res.cookie('validated', token, { maxAge: 9999999999, httpOnly: true })
        }
        res.send({ validate })
    }
    catch (e) {
        console.log(e.message)
    }
})

// index.html
app.get('/Cookie-test', (req, res) => {
    let validated = true

    const checkCookie = req.cookies.validated
    console.log(checkCookie)

    if (checkCookie == undefined) {
        validated = false
    }
    res.send({ validated })
})




const port = process.env.PORT || 8080;
app.listen(port, () => console.log('server listen on port ', port))
