const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const userAccount = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: 'usersAccounts' },
    {
        timestamps: true,
    },
);
mongoose.plugin(slug);

userAccount.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('userAccount ', userAccount);
