Tracker.autorun(function() {
    console.log("subscriptions started");

    Meteor.subscribe('comments', function() {
        console.log(Comments, Comments.find(), Comments.find().fetch());
    });
    Meteor.subscribe('interactions', function() {
        console.log(Interactions, Interactions.find(), Interactions.find().fetch());
    });
    Meteor.subscribe('videos', function() {
        console.log(Videos, Videos.find(), Videos.find().fetch());
    });


});




