VideoList = new Mongo.Collection('videolist');
// Define the VideoList Schema

VideoListSchema = new SimpleSchema({

    videoId: {
        type: String
    },
    userIds: {
        type: [String]
    }

});

VideoList.attachSchema( VideoListSchema );
