Meteor.publish(
    'interactions', function() {

        return Interactions.find();
    });

Meteor.publish(
    'videos', function() {

        return Videos.find();
    });

Meteor.publish(
    'comments', function() {

        return Comments.find();
    });
