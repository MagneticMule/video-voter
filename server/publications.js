Meteor.publish(
    'videos', function() {
        return Videos.find();
    },
    'interactions', function() {
        return Interactions.find();
    }
);
