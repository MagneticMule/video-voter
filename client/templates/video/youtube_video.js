
/**
Template._video.created({
    videoPlayer: function() {
       var currentUser = this.userId();
       // unwatchedVideo = Videos.find( {whoHasWatched: { $ne: currentUser } } );
       return new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'pp_KWy1v9Ic',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
});
**/
Template._video.events = {

}

/**
* Return a videoId that the user has not seen before
* $nin is a Mongo comparison function for arrays-we didn’t use it here in the end.
* $ne
**/
Template._video.helpers = {
    videoId: function() {
        var currentUser = Meteor.userId();
        return Videos.findOne( {whoHasWatched: { $ne: currentUser } } );
    }
}
