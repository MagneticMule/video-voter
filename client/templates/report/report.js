Template.report.helpers({
    reports: function() {
        var i = Interactions.find();
        console.log(i);
        return i;
    },
    log: function() {
        return console.log(this);
    }

});
