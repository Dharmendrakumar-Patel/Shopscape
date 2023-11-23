const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.'],
        minlength: [6, 'Password must be at least 6 characters long.'],
        select: false
    },
    photo: {
        type: Array,
        required: [true, 'Please upload your photo.']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    cart: {
        type: Array,
        default: []
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const hash = bcrypt.hashSync(this.password, 12);
    this.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
    try {
        const token = jwt.sign(
            { id: this._id },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );
        return token;
    } catch (err) {
        throw new CustomError(err.message, 500).logError();
    }
};

userSchema.methods.getIdByToken = function (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (err) {
        throw new CustomError(err.message, 500).logError();
    }
};

module.exports = mongooose.model('User', userSchema);