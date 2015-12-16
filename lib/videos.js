
// Define the DB to store video links, title, etc
// The actual video files will be stored and accessed using Dropbox

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
        label: "A 12 character string you can use to identify this video",
        max: 12,
        optional: false
    },
    hasHands: {
        type: Boolean,
        label: "Does this video use hands? If so, tick here.",
        optional: true
    },
    topic: {
        type: String,
        label: "What subject matter does this video cover?",
        allowedValues: ['multiplication', 'multiplication2', 'division'],
        autoform: {
            options: [
                {label: "Mutliplication", value: "multiplication"},
                {label: "Mutliplication 2", value: "multiplication2"},
                {label: "Division", value: "division"}
            ]
        }
    },
    whoHasWatched: {
        type: [String],
        label: "The _id's of the folk who have already watched this video",
        optional: true
    },
    lastWatched: {
        type: Number,
        label: "How many times has this video been watched",
        optional: true
    }
});

Videos.attachSchema( VideoSchema );


/*
// on success display a message to the administrator then display the admin page
inputVideoForm.addHooks(['postInsert', 'postUpdate'], {
  onSuccess: function(operation, result, template) {
    toastr.success('Video added successfully', 'Hooray!');
    Router.go("/admin");
  }
});
*/
