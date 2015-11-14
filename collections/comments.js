Comments = new Mongo.Collection('comments');

Comments.allow({
    insert: function () {
        return true;
    },
    update: function (userId, interactions, fields, modifier) {
        return true;
    },
    remove: function (userId, interactions) {
        return true;
    }
});

// Define the Comments schema
CommentSchema = new SimpleSchema({
  userId: {
      type: String,
      label: "The User Id of who made this comment"
  },
  videoId: {
        type: String,
        label: "The Video Id that this comment is attached to"
  },
  timeStamp: {
      type: Date,
      label: "TimeStamp"
  },
    commentBody: {
        type: String,
        label: "The comment text"
    }

});

Comments.attachSchema( CommentSchema );
