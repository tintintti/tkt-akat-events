let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');
const saltRounds = 10;

let userSchema = new Schema ({
    name: String,
    email: {type: String, required: true, unique: true},
    password: String,
    admin: Boolean
});

userSchema.pre('save', function saveHook(next) {
    let user = this;
    if (!user.isModified('password'))
        return next;

    return bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err)
            return next(err);
        user.password = hash;
        return next();
    });
});

userSchema.methods.checkPassword = function (pswd) {
    return bcrypt.compare(pswd, this.password).then((isValid) => {
        if (isValid)
            return Promise.resolve();
        return Promise.reject();
    })
}

module.exports = mongoose.model('User', userSchema);
