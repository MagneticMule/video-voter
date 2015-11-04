
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
            btn.className = ("btn btn-info");
            btn.textContent = ("Pause");
            btn.children[0].className = ("glyphicon glyphicon-pause");
        }
        else {
            videoPlayer.pause();
            btn.className = ("btn btn-success");
            btn.textContent = ("Play");
            btn.span.className = ("glyphicon glyphicon-play");
        }
    },
    "timeupdate #videoPlayer" : function (event, template) {
        seekBar.value = Math.floor(event.target.currentTime / videoPlayer.duration * 100);
        console.log(Math.floor(event.target.currentTime));
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
        return Videos.findOne( {whoHasWatched: { $ne: currentUser } } );
    }
}
