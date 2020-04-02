const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  // now we want to create a Post  refering to a specific user and for that
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String
  },

  content: {
    type: String
  },
  image: {
    type: String
  },

  category: {
    type: String
  },

  name: {
    type: String
  },
  // likes: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "user"
  //     }
  //   }
  // ],
  // comments: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "user"
  //     },

  //     text: {
  //       type: String
  //     },
  //     name: {
  //       type: String
  //     },
  //     avatar: {
  //       type: String
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Post = mongoose.model("Post", PostSchema);
