let express = require('express');
let app = express();
let path = require('path')
require('./model/conn')
const mongoose = require('mongoose')
let bodyParser = require('body-parser')
var moment = require('moment');
require('moment-range');


let email = null;
let firstName = null;
let lastName = null;
let timeobj=null;
let userobj={};
var array=[];
let passwd=null;
let Ademail=null;


var session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

let bookedStart=moment("10:00",'HH:mm');
bookedStart=bookedStart.add(1, 'd');
let bookedEnd=bookedStart.clone();
bookedEnd.add(10,'minutes')
let bookedRange=moment.range(bookedStart,bookedEnd);


// mongoose.connect("mongodb://localhost/appoinments", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
//     if (error) {
//         console.log("Error")
//     }
//     else {
//         console.log("success");
//     }
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const patient = mongoose.model('patient');



app.get("/", function (req, res) {
    res.render("index");
});

app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/index", function (req, res) {
    email = req.body.email;
    firstName = req.body.First_Name;
    lastName = req.body.Last_Name;
	userobj["first"]=firstName;
	userobj["last"]=lastName;
	userobj["email"]=email;
	req.session.message = '';
    res.redirect("/next");
})

app.post("/login",function(req,res){
	Ademail=req.body.adminemail;
	passwd=req.body.adminpasswd;
	
	})

app.post("/next", function (req, res) {
	let pat=new patient();
	pat.first_name=firstName;
	pat.last_name=lastName;
	pat.email=email;
    let time = req.body.timeinp;
    let t = moment(time, 'HH:mm');
    t=t.add(1, 'd');
    let end=t.clone();
	end.add(10,'minutes');
    let range1=moment.range(t,end);
    if(bookedRange.overlaps(range1)){
        console.log("Sorry Not Available");
		req.session.message = 'occupied';
		res.redirect("/next");
    }
    else{
		userobj["apptime"]=t;
		array.push(userobj);
		req.session.message = 'available';
		pat.slot=t.toString();
		pat.save((err,doc)=>{
			if(err){
				console.log("Error")
			}else{
				console.log("Success")
			}
		});
		res.redirect("/next");
    }
})

app.get("/next", function (req, res) {
    let obj = {
        first: firstName,
        last: lastName,
        Email: email
    };
	let message=req.session.message;
    res.render("next", { obj: obj, success:message});
})

app.listen(3000, function () {
    console.log("Port 3000");
})