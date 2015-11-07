
Template.video.onRendered = {
        videoPlayer: function() {
            var v = document.getElementById('videoPlayer');
            return v;
        },
    seekBar: function() {
        var s = document.getElementById('seekbar');
        return s;
    }
}

Template.video.events = {
    "click #btn-play-pause" : function (event, template) {
        btn = event.target;
        if (videoPlayer.paused) {
            videoPlayer.play();

            // change the look of the button to it's pause state
            btn.className = ("btn btn-info");
            btn.textContent = ("Pause");
            // btn.children[0].className = ("glyphicon glyphicon-pause");
/*
            Videos.update(this._id, {
                $addToSet: { whoHasWatched: Session.get('currentUser')}
            });
*/

            // record the interaction in the db
            Interactions.insert({
                title: "Play Pressed",
                userId: Meteor.userId(), // the logged in user
                videoId: Session.get('currentVideo')._id, // current video object
                timeStamp: new Date(), // now
                videoTime: Session.get('currentVideoTime')
            });
        }
        else {
            videoPlayer.pause();
            btn.className = ("btn btn-success");
            btn.textContent = ("Play");
            // btn.firstChild.className = ("glyphicon glyphicon-play");

            // record the interaction in the db
            Interactions.insert({
                title: "Pause Pressed",
                userId: Meteor.userId(), // the logged in user
                videoId: Session.get('currentVideo')._id, // the current video object
                timeStamp: new Date(), // now
                videoTime: Session.get('currentVideoTime')
            });
        }
    },
    "timeupdate #videoPlayer" : function (event, template) {
        seekBar.value = Math.floor((event.target.currentTime / videoPlayer.duration * 100));
        console.log(Math.round(event.target.currentTime));
        var currentVideoTime = Math.round(event.target.currentTime);
        Session.set('currentVideoTime', currentVideoTime);
    },
    "change #seekBar" : function (event, template) {
        videoPlayer.currentTime = Math.floor(event.target.value * videoPlayer.duration / 100);

            // record the interaction in the db
            Interactions.insert({
                title: "Timebar Moved",
                userId: Meteor.userId(), // the logged in user
                videoId: Session.get('currentVideo')._id, // the current video object
                timeStamp: new Date(), // now
                videoTime: Session.get('currentVideoTime')
            });
    }
}

/**
* Return a videoId that the user has not seen before
* $nin is a Mongo comparison function for arrays-we actually didn’t use it here in the end but it is worth keeping a note of for similar situations.
* $ne
**/
Template.video.helpers = {
    videoId: function() {
        var currentUser = Meteor.userId();
        console.log("erm");
        console.log(currentUser);
        console.log(this._id);
        return Videos.findOne( {whoHasWatched: { $ne: currentUser } } );
    },
    currentVideoTime: function() {
        console.log("CurrentVideoTime: " + Session.get('currentVideoTime'));
        return Session.get('currentVideoTime');
    },
    videoDuration: function() {
        return videoPlayer.duration;
    }
}
