const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const userAccount = new Schema(
    {
        email: { type: String, required: [true, 'Name must be required'], unique: true, trim: true },
        username: { type: String, required: [true, 'Name must be required'], unique: true, trim: true },
        password: { type: String, trim: true },
        avatar: { type: String },
    },
    { collection: 'usersAccounts' },
    {
        timestamps: true,
    },
);
mongoose.plugin(slug);

userAccount.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('userAccount ', userAccount);
