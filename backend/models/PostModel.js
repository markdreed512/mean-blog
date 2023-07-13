const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Please enter Post Content"]
        },
        public: {
            type: Boolean,
            required: true,
            default: false
        }, 
        timestamp: {
            type: String,
            required: true
        }
        
    },
    {
        timestamps: false
    }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post