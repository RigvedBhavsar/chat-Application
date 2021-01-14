const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,'Please Enter the name']
    },
    email:{
        type:String,
        required : [true,'Please Enter the Email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please Enter valid Email Address']
    },
    password:{
        type:String,
        required : [true,'Please Enter the Password'],
        minlength:[6,'Password Should be at least 6 length']
    }
})
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email , password){
    const user = await this.findOne({email});
    if(user){
        const isAuthenticated = await bcrypt.compare(password , user.password);
        if(isAuthenticated){
            return user;
        }
        throw Error('Incorrect Password');
    }
    else{
        throw Error('Incorrect Email');
    }
}

const User = mongoose.model('user',userSchema)
module.exports = User;