
Router.route('/', {
    name: 'videos',
    template: 'videos',
    data: function () {
       var currentUser = Date.now() + (Math.random() * ((10 - 1) + 1)).toString();
       Session.setPersistent('currentUser', currentUser);
       console.log(currentUser.toString());
       return Videos.find();
    },
    action: function () {
        if (this.ready()) {
            this.render('videos');
        }
    }
});

Router.route('/add', {
    name: 'admin',
    template: 'inputVideoForm',
    onBeforeAction: function () {
        if (Meteor.userId()) {
            this.next();
        } else {
            this.render('login');
        }
    },
    action: function () {
        if (this.ready()) {
            this.render('inputVideoForm');
        }
    },
    subscriptions: function () {
        return Meteor.subscribe('videos');
    }
});

Router.route('/interactions', {
    name: 'interactions',
    template: 'report',
    loadingTemplate: 'loading',
    data: function() {
            var i = Interactions.find();
            console.log(i);
            return Interactions.find();
    },
    action: function () {
        if (this.ready) {
            this.render('report');
        }
    }

});

Router.route('/subject/:_topic', {
    name: 'subject',
    template: 'home',
    data: function () {
        console.log('Data is being rendered');
        var hasHands = Math.random() > 0.5 ? true : false;
        console.log(hasHands);
        var video = Videos.findOne({
            topic: this.params._topic,
            hasHands: hasHands
        });
        Session.setPersistent('currentVideo', video._id);
        return video;
    },
    action: function () {
        if (this.ready()) {
            this.render('home');
        }
    }
});

Router.route('/view/:_id', {
    name: 'view-video',
    template: 'home',
    data: function () {
        return Videos.findOne({_id: this.params._id});
    },
    action: function () {
        if (this.ready()) {
            this.render('home');
        }
    },
    subscriptions: function () {
        return Meteor.subscribe('videos');
    }
});
