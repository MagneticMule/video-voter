Router.route('/', {
  name: 'home',
  template: 'home',
  onBeforeAction: function(){
    /*  if (Meteor.userId()) {
        // if a user is logged in then continue
        this.next();
      } else {
          this.render('login');
      } */
    },
    action: function () {
      if (this.ready()) {
        this.render('home');
      }
    },
    data: function() {
        // var currentUser = Meteor.userId();
        // var currentVideo = Videos.findOne( {whoHasWatched: { $ne: currentUser } } );
        //Session.set('currentUser', currentUser);
        Session.set('currentVideo', currentVideo);
        return currentVideo;
    },
    waitOn: function() {
        return Meteor.subscribe('videos');
    }
  });

Router.route('/admin', {
    name: 'admin',
    template: 'inputVideoForm',
    onBeforeAction: function() {
    if (Meteor.userId()) {
        this.next();
    } else {
        this.render('login');
    }
    },
    action: function() {
        if (this.ready()) {
            this.render('inputVideoForm');
        }
    },
        subscriptions: function () {
        return Meteor.subscribe('videos');
    }
});

Router.route('/view/:_id', {
    name: 'view-video',
    template: 'home',
    data: function () {
        return Videos.findOne({_id: this.params._id});
    },
    action: function() {
        if (this.ready()) {
            this.render('home');
        }
    },
    subscriptions: function () {
        return Meteor.subscribe('videos');
    }
});
