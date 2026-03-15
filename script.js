// 
const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
    "Elon Musk",
    "Larry Page",
    "Sergey Brin",
    "Jeff Bezos",
    "Mark Zuckerberg",
    "Larry Ellison",
    "Jensen Huang",
    "Bernard Arnault",
    "Rob Walton",
    "Warren Buffett"
];

const listItems = [];
let dragStartIndex;

createList();

function createList(){

    const randomPeople = [...richestPeople]
        .sort(() => Math.random() - 0.5);

    randomPeople.forEach((person, index) => {

        const listItem = document.createElement("li");

        listItem.setAttribute("data-index", index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fa-solid fa-grip-lines"></i>
        </div>
        `;

        listItems.push(listItem);
        draggable_list.appendChild(listItem);

    });

    addEventListener();
}

function dragStart(){
    dragStartIndex = Number(this.closest("li").dataset.index);
}

function dragEnter(){
    this.classList.add("over");
}

function dragLeave(){
    this.classList.remove("over");
}

function dragOver(e){
    e.preventDefault();
}

function dragDrop(){

    const dragEndIndex = Number(this.dataset.index);

    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove("over");
}

function swapItems(fromIndex, toIndex){

    const draggedItem = listItems[fromIndex].querySelector(".draggable");

    if(fromIndex < toIndex){

        for(let i = fromIndex; i < toIndex; i++){
            const next = listItems[i + 1].querySelector(".draggable");
            listItems[i].appendChild(next);
        }

    } else {

        for(let i = fromIndex; i > toIndex; i--){
            const previous = listItems[i - 1].querySelector(".draggable");
            listItems[i].appendChild(previous);
        }

    }

    listItems[toIndex].appendChild(draggedItem);
}

function checkOrder(){

    listItems.forEach((listItem, index) => {

        const personName = listItem.querySelector(".person-name").innerText;

        if(personName !== richestPeople[index]){
            listItem.classList.add("wrong");
        } else {
            listItem.classList.remove("wrong");
            listItem.classList.add("right");
        }

    });
}

function addEventListener(){

    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll(".draggable-list li");

    draggables.forEach(item => {
        item.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach(item => {

        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave);

    });

}

check.addEventListener("click", checkOrder);