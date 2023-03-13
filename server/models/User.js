const bcrypt = require("bcrypt")
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserSchema = schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, { timestamps: true }

)
// static method for user login 
UserSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields are required")
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("user does not exist")
    }
    else {
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            throw Error("password is incorrect")
        }
    }
    return user
}
// static method for user signup 
UserSchema.statics.signup = async function (email, password, username) {
    if (!email || !username || !password) {
        throw Error("All fields are required")
    }
    if (password.length < 6) {
        throw Error("password min chars is 6")
    }
    const userExists = await this.findOne({ email });
    if (userExists) {
        throw Error("email already in use")
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash, username })
    return user
}


const User = mongoose.model("User", UserSchema);
module.exports = User