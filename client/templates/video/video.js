Template.video.onRendered = {
    videoPlayer: function () {
        var v = document.getElementById('videoPlayer');
        return v;
    },
    seekBar: function () {
        var s = document.getElementById('seekbar');
        return s;
    }
},

    Template.video.events = {
        "waiting #videoPlayer": function (event, template) {
            // document.getElementById('placeholder').style.display = "block";
        },
        "canplay #videoPlayer": function (event, template) {
            // document.getElementById('placeholder').style.display = "none";
            var playButton = document.getElementById('btn-play-pause');
            playButton.style.className = ("btn btn-success");
            playButton.textContent = " Pause";
            console.log('can play video');
            videoPlayer.removeAttribute('poster');
        },

        "playing #videoPlayer": function (event) {
            // document.getElementById('placeholder').style.display = "none";
            recordInteraction("Play Started");
            console.log('playing');
        },

        "ended #videoPlayer": function (event) {
            // document.getElementById('placeholder').style.display = "none";
            recordInteraction("Play Ended");
            console.log('playing');
        },

        "click #btn-play-pause": function (event, template) {
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
                recordInteraction("Play Pressed");
            }
            else {
                videoPlayer.pause();
                btn.className = ("btn btn-success");
                btn.textContent = ("Play");
                // btn.firstChild.className = ("glyphicon glyphicon-play");

                // record the interaction in the db
                recordInteraction("Pause Pressed");
            }
        },
        "timeupdate #videoPlayer": function (event, template) {
            seekBar.value = Math.floor((event.target.currentTime / videoPlayer.duration * 100));
            console.log(Math.round(event.target.currentTime));
            var currentVideoTime = Math.round(event.target.currentTime);
            Session.set('currentVideoTime', currentVideoTime);
        },
        "change #seekBar": function (event, template) {
            videoPlayer.currentTime = Math.floor(event.target.value * videoPlayer.duration / 100);

            // record the Timebar interaction in the db
            recordInteraction("Timebar Moved");
        }
    },


    Template.video.helpers = {
        videoId: function () {
            return Videos.findOne();
        },
        currentVideoTime: function () {
            console.log("CurrentVideoTime: " + Session.get('currentVideoTime'));
            return Session.get('currentVideoTime');
        },
        videoDuration: function () {
            return videoPlayer.duration;
        }
    };


function getCurrentUser() {
    var c = Session.get('currentUser');
    if (!c) {
        c = Date.now() + (Math.random() * ((10 - 1) + 1)).toString();
        Session.setPersistent('currentUser', c);
    }
    console.log(c.toString());
    return c.toString();
};


function recordInteraction(_title) {
    // record the interaction in the db
    Interactions.insert({
        title: _title,
        userId: getCurrentUser(), // the logged in user
        videoId: Session.get('currentVideo'), // the current video object
        timeStamp: new Date(), // now
        videoTime: Session.get('currentVideoTime')
    });
};
