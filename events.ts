//we can delete a list element by clicking on it
function elClickedOn(e){
    e.preventDefault();
    const key : string = e.target.innerText.toLowerCase();
    localStorage.removeItem(key);
    e.target.remove();
}

//reads elements in local storage upon startup
function readLocal(){
    for (var i=0; i < localStorage.length; i++){
        addListItem(localStorage.key(i));
    }
}

//sends error if element is already in list
function repititionError(el : string){
    window.alert(`${el} is already in the list`);
}

//after hitting submit or pressing enter in the textbox, creates a new list item
function addListItem(text:string){
    const newEl         = document.createElement("p"); //creates p element

    //inserts text into a text node which is later appended into newEl
    const textNode      = document.createTextNode(text); 
    newEl.appendChild(textNode);

    //appends new list item to the list
    newEl.addEventListener("click", elClickedOn, false);
    const list = document.querySelector(".list");
    list.appendChild(newEl);

    //scrolls to bottom of list on overflow
    list.scrollTop = list.scrollHeight;
}

//delete the last element of the list
function deleteLast(){
    const list = document.querySelector(".list");
    const item : string = (<HTMLElement>list.lastChild).innerText.toLowerCase(); //the first letter is usually capitalized so we need lowercase
    window.localStorage.removeItem(item); 
    list.removeChild(list.lastChild);
}

//takes input from textbox
function takeInput(){
    const textbox       = (<HTMLInputElement>document.getElementById("newItem"));
    const text : string = textbox.value.toLowerCase();
    if(text.length > 0){
        //checks if item already exists
        if(localStorage.getItem(text) !== null){
            repititionError(text);
        }
        else{
            addListItem(text);
            localStorage.setItem(text, text);
        }
        //resets textbox
        textbox.value = ''; 
    }
}

//add event listener to any pre-added list items
window.addEventListener("load", readLocal, false); 

//creates new list item by clicking submit button
//does not create list item unless there's something in the textbox
document.getElementById("submit").addEventListener("click", function(e){
    e.preventDefault
    takeInput();
});

//creates new list item by hitting enter
document.getElementById("newItem").addEventListener("keydown", function(e){ 
    if (e.key === "Enter"){
        e.preventDefault(); //prevents page from automatically reloading
        takeInput();
    }
});

//deletes last item in list when you press enter
document.addEventListener("keydown", function(e){
    if (e.key === "Escape"){
        e.preventDefault();
        deleteLast();
    }
});