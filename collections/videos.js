// Define the DB to store video links, title, etc
// The actual video files will be stored and accessed on Dropbox
Videos = new Mongo.Collection('videos');

Videos.allow({
    insert: function () {
    return true;
  },
  update: function (userId, videos, fields, modifier) {
    return true;
  },
  remove: function (userId, videos) {
    return true;
  }
});

// Define the Video schema
VideoSchema = new SimpleSchema({
  title: {
      type: String,
      label: "This will appear at the top of the viewers page",
      max: 200
  },
   desc: {
       type: String,
       label: "Description"
    },
  url: {
      type: String,
      label: "URL",
      optional: false
  },
    videoId: {
        type: String,
        label: "A 12 character string you can use to identiofy this video",
        max: 12,
        optional: false
    },
    hasHands: {
        type: Boolean,
        label: "Does this video use hands? If so, tick here.",
        optional: true
    },
    whoHasWatched: {
        type: [String],
        label: "The _id's of the folk who have already watched this video",
        optional: true
    }
});

Videos.attachSchema( VideoSchema );
