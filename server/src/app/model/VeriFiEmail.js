const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const bcrypt = require('bcryptjs');

var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const veriFiEmail = new Schema(
    {
        tokenOtp: { type: String, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId },
    },
    { collection: 'veriFiEmail' },
    {
        timestamps: true,
    },
);
mongoose.plugin(slug);

veriFiEmail.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('veriFiEmail ', veriFiEmail);
