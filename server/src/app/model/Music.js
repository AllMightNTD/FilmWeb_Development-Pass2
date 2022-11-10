const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const Music = new Schema(
    {
        postedBy: String,
        name: String,
        director: String,
        writer: String,
        timeMovie: String,
        describe: String,
        mainActor: String,
        image: String,
        avatarWriter: String,
        avatarDirector: String,
        avatarMainActor: String,
        videoID: String,
        category: String,
        // Random Slug : Tải slug generator
        slug: { type: String, slug: 'name', unique: true },
        comments: [
            {
                text: String,
                nameUser: String,
                postedBy: { type: ObjectId, ref: 'Users' },
            },
        ],
        likes: [{ type: ObjectId, ref: 'Users' }],
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);
// Thêm plugin để xóa mềm ( soft delete)

// OverrideMethods : Ghi đè lại tất cả các phương thức : find , findOne , findOneAndUpdate ,update , updateOne , updateMany
// Thêm deletedAt = true để xem thời gian xóa
Music.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Music', Music);
