const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            maxlength: 50,

        },

        author:{
            type: String,
            required: true,
            maxlength: 50
        },

        post:{
            type: String,
            required : true,

        },

        createdAt:{
            type: Date,
            default: Date.now
        },

        comments:[
            {
                _id : {
                    type : mongoose.Schema.Types.ObjectId,
                    index: true,
                    required: true,
                    auto: true,
                },
                commenterName:{
                    type: String,
                    required: true,
                    maxlength: 50
                },
                comment :{
                    type: String,
                    required: true,
                    maxlength: 200
                }
            }
        ]
    }
)
module.exports = mongoose.model('Post', postSchema)