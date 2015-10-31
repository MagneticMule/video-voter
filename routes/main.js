Router.route('/', {
  name: 'home',
  template: 'home',
  onBeforeAction: function(){
      if (Meteor.userId()) {
        // if a user is logged in then continue
        this.next();
      } else {
          this.render('login');
      }
    },
    action: function () {
      if (this.ready()) {
        this.render('home');
      }
    },
    subscriptions: function () {
        return Meteor.subscribe('videos');
    },
    data: function () {
        var currentUser = Meteor.userId();
        return Videos.findOne({ whoHasWatched: { $ne: currentUser } } );
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
        subsrciptions: function () {
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
