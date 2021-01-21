"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var jwt = require('jwt-simple');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"]('public'));

var mongoose = require('mongoose');

var secret = 'gvfdgb%$^$%&3$4054423654073467$6@$&*(@%$^&2310*/-/+';
var url = "mongodb+srv://yaara:987Yaara@cluster0.uya8d.mongodb.net/test";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var Users = mongoose.model('user', {
  id_user: String,
  userName: String,
  name: String,
  password: String,
  email: String,
  phone: String,
  role: String
});
var Products = mongoose.model('product', {
  UPS: String,
  Name: String,
  price: String,
  Category: String,
  Weight: String,
  ExpiryDate: String
}); // const product1 = new Products({
//     UPS: '81726',
//     Name: 'כוס',
//     price: '450',
//     Category: 'זכוכית',
//     Weight: '5',
//     ExpiryDate: '30/02/2021'
// })
// product1.save().then(doc => console.log(doc)).catch(e =>console.log(e));
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

var role = 'public';
var ok = false;
var token = jwt.encode({
  role: role
}, secret);
app.get('/Output', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.cookie('validated', token, {
            maxAge: 0,
            httpOnly: true
          });
          res.send(true);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/send-Login-details', function _callee2(req, res) {
  var _req$body, userName, password, validate, data;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, userName = _req$body.userName, password = _req$body.password;
          validate = false;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Users.find({}));

        case 5:
          data = _context2.sent;
          data.forEach(function (elm) {
            if (userName == elm.userName && password == elm.password) {
              validate = true;
              role = elm.role;
            } else {
              console.log("no match ".concat(elm.userName));
            }
          });

          if (validate) {
            res.cookie('validated', token, {
              maxAge: 100000000,
              httpOnly: true
            });
          }

          setTimeout(function () {
            res.send({
              validate: validate
            });
          }, 1000);
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // index.html

app.get('/Cookie-test', function (req, res) {
  var validated = true;
  var checkCookie = req.cookies.validated;
  console.log(checkCookie);

  if (checkCookie == undefined) {
    validated = false;
  }

  res.send({
    validated: validated
  });
});
app.post('/send-User-details-sign-up', function _callee3(req, res) {
  var message, _req$body2, id_user, name, userName, password, email, phone, role, data, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          message = '';
          _req$body2 = req.body, id_user = _req$body2.id_user, name = _req$body2.name, userName = _req$body2.userName, password = _req$body2.password, email = _req$body2.email, phone = _req$body2.phone, role = _req$body2.role;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Users.find({}));

        case 4:
          data = _context3.sent;
          i = 0;

        case 6:
          if (!(i < data.length)) {
            _context3.next = 27;
            break;
          }

          if (!(id_user == data[i].id_user)) {
            _context3.next = 12;
            break;
          }

          message = 'מספר זהות קיים';
          return _context3.abrupt("break", 27);

        case 12:
          if (!(userName == data[i].userName)) {
            _context3.next = 17;
            break;
          }

          message = 'שם משתמש כבר קיים';
          return _context3.abrupt("break", 27);

        case 17:
          if (!(email == data[i].email)) {
            _context3.next = 22;
            break;
          }

          message = 'מייל זה כבר קיים במערכת';
          return _context3.abrupt("break", 27);

        case 22:
          message = 'ok';
          return _context3.abrupt("break", 27);

        case 24:
          i++;
          _context3.next = 6;
          break;

        case 27:
          if (!(message == 'ok')) {
            _context3.next = 31;
            break;
          }

          user = new Users({
            id_user: id_user,
            name: name,
            userName: userName,
            password: password,
            email: email,
            phone: phone,
            role: role
          });
          _context3.next = 31;
          return regeneratorRuntime.awrap(user.save().then(function (doc) {
            return console.log(doc);
          })["catch"](function (e) {
            return console.log(e);
          }));

        case 31:
          setTimeout(function () {
            res.send({
              message: message
            });
          }, 1000);

        case 32:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/get-category', function _callee4(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Products.find({}, {
            Category: 1
          }));

        case 2:
          data = _context4.sent;
          res.send({
            data: data
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post('/PullThiscCategory', function _callee5(req, res) {
  var eventCategory, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          eventCategory = req.body.eventCategory;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Products.find({
            Category: eventCategory
          }));

        case 3:
          data = _context5.sent;
          res.send({
            data: data
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var port = process.env.PORT || 8080;
app.listen(port, function () {
  return console.log('server listen on port ', port);
});