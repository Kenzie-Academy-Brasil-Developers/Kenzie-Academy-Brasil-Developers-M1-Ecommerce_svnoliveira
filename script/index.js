//list and search section
const itemsList = [];

function fillItemListWithData(){
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        itemsList.push(item);
    }
}
fillItemListWithData();

let filteredItems = [];

function filterItems(category){
    filteredItems = [];
    if (category == "Todos"){
        filteredItems = itemsList;
        return filteredItems;
    }
    for (let i = 0; i < itemsList.length; i++) {
        const item = itemsList[i];
        if(item.tag[0] == category){
            filteredItems.push(item);
        }
    }
    return filteredItems;
}

// card renderer

function renderItemCards(list){
    let mainCardBox = document.querySelector('.mainCardsBox');
    for (let i = 0; i < list.length; i++) {
        const product = list[i];
        
        let liBox = document.createElement('li');           //create li
        let itemPicture = document.createElement('img');    //create image box
        let textBox = document.createElement('div');        //create text-box div
        let tagBox = document.createElement('button');      //create tag
        let itemName = document.createElement('h3');        //create name
        let itemDescription = document.createElement('p');  //create description-box
        let itemPrice = document.createElement('span');     //create price
        let addButton = document.createElement('button');   //create add button

        //add class
        liBox.classList.add('liBox');
        itemPicture.classList.add('itemPicture');
        textBox.classList.add('textBox');
        tagBox.classList.add('tagBox');
        itemName.classList.add('itemName');
        itemDescription.classList.add('itemDescription');
        itemPrice.classList.add('itemPrice');
        addButton.classList.add('addButton');

        //add text
        itemPicture.src = product.img;
        itemPicture.alt = `Image of ${product.nameItem}`;
        tagBox.innerText = `${product.tag[0]}`;
        itemName.innerText = `${product.nameItem}`;
        itemDescription.innerText = `${product.description}`;
        itemPrice.innerText = `R$ ${product.value.toFixed(2)}`;
        addButton.innerText = `${product.addCart}`;

        //attatch
        mainCardBox.appendChild(liBox);
        liBox.appendChild(itemPicture);
        liBox.appendChild(textBox);
        textBox.appendChild(tagBox);
        textBox.appendChild(itemName);
        textBox.appendChild(itemDescription);
        textBox.appendChild(itemPrice);
        textBox.appendChild(addButton);
    }
}
renderItemCards(itemsList);

function cleanCards(){
    let liBox = document.querySelectorAll('.liBox');
    for (let i = 0; i < liBox.length; i++) {
        liBox[i].remove();
    }
}

//display clicking the navigation bar
let buttonList = document.querySelectorAll(".menu-button");
for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].addEventListener("click", function(){
        const buttonListClicked = buttonList[i];
        const buttonContent = buttonListClicked.innerText;
        cleanCards();
        filterItems(buttonContent);
        renderItemCards(filteredItems);
    });
}

//display based on search
let inputTag = document.querySelector('.search-input');
let userInput = "";
inputTag.addEventListener("input", (event) => {
userInput = event.target.value;
});

function standardizeWord(string) {
    let word = string.toUpperCase();
    let newWord = "";
    for (let i = 0; i < word.length; i++) {
        let character = word[i];
        if(character == ' ') {
            character = '';
        }
        newWord += character;
    }
    return newWord;
}

let clickingSearch = document.querySelector(".search-button");
clickingSearch.addEventListener("click", function() {
    filteredItems = [];
    termForSearch = standardizeWord(userInput);
    for (let i = 0; i < itemsList.length; i++) {
        const itemName = standardizeWord(itemsList[i].nameItem);
        if (itemName.includes(termForSearch)){
            filteredItems.push(itemsList[i]);
        }
    }
    cleanCards();
    renderItemCards(filteredItems);
});
inputTag.addEventListener("keypress", function(event) {    // Search pressing "Enter" in the input prompt. from this example => https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    if (event.key === "Enter") {
        event.preventDefault();
        clickingSearch.click();
    }
});

//render items on the shopping cart
