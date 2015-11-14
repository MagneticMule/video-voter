Template.comments.helpers({
    comments: function () {
        return Comments.find({});
    }
}),

Template.comments.events({
    'submit form': function(event) {
        event.preventDefault();

        var commentBody = event.target.commentInput.value;
        if (commentBody) { //we have some text
            console.log(commentBody);

            Comments.insert({
                userId: Session.get('currentUser'),
                videoId: Session.get('currentVideo'),
                timeStamp: new Date(),
                commentBody: commentBody
            });

            // display a toast message
            toastr.success("Thank you for your comment");
            // blank the input
            event.target.commentInput.value = "";
        }
    }

})
