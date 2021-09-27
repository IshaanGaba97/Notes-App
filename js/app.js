console.log("Welcome to notes app");

// to show notes after refresh
showNotes();

// to add a note in notes section
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(e){
    let addTxt = document.getElementById("addTxt")
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
})


// to display notes in notes section
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1} </h5>
          <p class="card-text"> ${element} </p>
          <button id="${index}"onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
    });


    // add html in notes section
    let notesElm = document.getElementById("notes");
    if(notesObj.length!=0)
    {
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show! Use "Add a note" above to add notes.`;
    }
}


//to delete a note by clicking "delete note"
function deleteNote(index){
    // console.log("this note is deleted", index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// search section - display the note with matching searchtext
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = (search.value).toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
