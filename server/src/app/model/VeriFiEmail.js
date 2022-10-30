const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const bcrypt = require('bcryptjs');

var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const otpSchema = new Schema(
    {
        email: { type: String, required: [true, 'Name must be required'], trim: true },
        code: { type: String, required: [true, 'OTP must be required'], unique: true, trim: true },
        expireIn: Number,
    },
    {
        timestamps: true,
    },
);
mongoose.plugin(slug);

otpSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('otpSchema ', otpSchema);
