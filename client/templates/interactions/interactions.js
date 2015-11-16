Template.interactions.helpers({
    interactions: function () {
        Interactions.find({}, {sort: {createdAt: -1}});
    }

})
