const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');

var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const userAccount = new Schema(
    {
        username: { type: String, required: [true, 'Name must be required'], unique: true, trim: true },
        password: { type: String, trim: true, required: [true, 'Password must be required'] },
    },
    { collection: 'usersAccounts' },
    {
        timestamps: true,
    },
);
mongoose.plugin(slug);

userAccount.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('userAccount ', userAccount);
