Template.videos.helpers({
    videos: function () {
        return Videos.find({});
    },
    subjects: function () {
        var titles = [
            { title: 'Multiplication', linkname: 'multiplication' },
            { title: 'Mutliplication 2', linkname: 'multiplication2' },
            { title: 'Division', linkname: 'division' }
            ];
        return titles;
    }
})
