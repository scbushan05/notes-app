// Read existing notes from local storage
function getSavedNotes(){
    const notesJSON = localStorage.getItem('notes');
    if(notesJSON !== null){
        return JSON.parse(notesJSON);
    }else{
        return [];
    }
}

function removeNote(id) {
    const noteIndex = notes.findIndex(note => note.id === id);
    if(noteIndex != -1){
        notes.splice(noteIndex, 1);
    } 
}

// Generate DOM structure for a note
function generateNoteDOM(element) {
    const noteEl = $('<a>');
    const textEl = $('<p>');
    const statusEl = $('<p>');

    if(element.title.length > 0){
        textEl.text(element.title); 
    }else{
        textEl.text('Unnamed note');
    }
    textEl.addClass('list-item__title');
    noteEl.append(textEl);
    noteEl.attr('href', '/edit.html#'+element.id);
    noteEl.addClass('list-item');
    statusEl.text(generateLastEdited(element.updatedAt));
    statusEl.addClass('list-item__subtitle');
    noteEl.append(statusEl);
    return noteEl;
}

function renderNotes(notes, filters){
    notes = sortNotes(notes, filters.sortBy);
    let filteredNotes = $.grep(notes, function (element) {
        return element.title.toLowerCase().includes(filters.searchText.toLowerCase());
    })
    $('.notes').empty();
    
    if(filteredNotes.length > 0){
        $.each(filteredNotes, function (index, element) {
            const noteEl = generateNoteDOM(element);
            $('.notes').append(noteEl);
        })
    }else{
        const emptyMessage = $('<p>');
        emptyMessage.addClass('empty-message');
        emptyMessage.text('No notes to show!');
        $('.notes').append(emptyMessage);
    }
    
    
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function sortNotes(notes, sortBy) {
    if(sortBy === 'byEdited'){
        return notes.sort(function (a, b) {
            if(a.updatedAt > b.updatedAt){
                return -1;
            }else if(a.updatedAt < b.updatedAt){
                return 1;
            }else{
                return 0;
            }
        })
    }else if(sortBy === 'byAlphabetical'){
        return notes.sort(function (a, b) {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1;
            }else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1;
            }else{
                return 0;
            }
        })
    }else if(sortBy === 'byCreated'){
        return notes.sort(function (a, b) {
            if(a.createdAt > b.createdAt){
                return -1;
            }else if(a.createdAt < b.createdAt){
                return 1;
            }else{
                return 0;
            }
        })
    }else{
        return notes;
    }
}

function generateLastEdited(updatedAt) {
    return 'Last edited '+moment(updatedAt).fromNow();
}