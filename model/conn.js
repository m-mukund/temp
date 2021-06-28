let mongoose=require('mongoose');


mongoose.connect("mongodb://localhost/appoinments",{ useNewUrlParser: true, useUnifiedTopology: true },(error)=>{
	if(error){
		console.log("Error")
	}
	else{
		console.log("success");
	}
});

const user=require('./user.model')