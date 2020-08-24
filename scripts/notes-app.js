let notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters);

$(function(){
    $('#create-note').click(function (e) {
        const id = uuidv4();
        notes.push({
            id: id,
            title: '',
            body: '',
            createdAt: moment().valueOf(),
            updatedAt: moment().valueOf()
        })
        saveNotes(notes);
        location.assign('/edit.html#'+id);
    })
    
    $('#search-text').on('input', function(e){
        filters.searchText = e.target.value;
        renderNotes(notes, filters);
    })

    $('#filter-by').change(function (e) {
        filters.sortBy = e.target.value;
        renderNotes(notes, filters);
    })

    $(window).on('storage', function (e) {
        if(e.key === 'notes'){
            notes = JSON.parse(e.originalEvent.newValue);
            renderNotes(notes, filters);
        }
    })
})
