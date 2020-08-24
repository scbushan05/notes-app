const noteId = location.hash.substr(1);
let notes = getSavedNotes();
let note = notes.find(function (note) {
    return note.id === noteId;
})

if(note === undefined){
    location.assign('/index.html');
}

$(function () {
    $('#note-title').val(note.title);
    $('#note-body').val(note.body);

    $('#note-title').on('input', function (e) {
        note.title = e.target.value;
        note.updatedAt = moment().valueOf();
        $('#last-edited').text(generateLastEdited(note.updatedAt));
        saveNotes(notes);
    })

    $('#note-body').on('input', function (e) {
        note.body = e.target.value;
        note.updatedAt = moment().valueOf();
        $('#last-edited').text(generateLastEdited(note.updatedAt));
        saveNotes(notes);
    })

    $('#remove-note').click(function () {
        removeNote(note.id);
        saveNotes(notes);
        location.assign('/index.html');
    })

    $(window).on('storage', function (e) {
        if (e.key === 'notes') {
            
            notes = JSON.parse(e.originalEvent.newValue);

            note = notes.find(function (note) {
                return note.id === noteId;
            })
            
            if(note === undefined){
                location.assign('/index.html');
            }

            $('#note-title').val(note.title);
            $('#note-body').val(note.body);
            $('#last-edited').text(generateLastEdited(note.updatedAt));
        }
    })

    $('#last-edited').text(generateLastEdited(note.updatedAt));

})

