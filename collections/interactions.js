Interactions = new Mongo.Collection('interactions');

Interactions.allow({
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

// Define the Video schema
InteractionSchema = new SimpleSchema({
  title: {
      type: String,
      label: "Title"
  },
  userId: {
      type: String,
      label: "User Id"
  },
  videoId: {
        type: String,
        label: "The Video Object"
  },
  timeStamp: {
      type: Date,
      label: "TimeStamp"
  },
    videoTime: {
        type: Number,
        label: "The time within the video when the interaction happened (in secs)"
    }

});

Interactions.attachSchema( InteractionSchema );
