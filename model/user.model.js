const mongoose=require('mongoose');

var UserSchema=new mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String
    },
	slot:{
		type:String
	}
})

mongoose.model("patient",UserSchema);