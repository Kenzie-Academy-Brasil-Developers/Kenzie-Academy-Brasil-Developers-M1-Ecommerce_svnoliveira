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
let cartItemCounter = 0;
let cartItemPrice = 0;
let addToCartButtonList = document.querySelectorAll('.addButton');
let removeFromCartButtonList = [];
for (let i = 0; i < addToCartButtonList.length; i++) {
    let clicked = addToCartButtonList[i];
    clicked.addEventListener("click", function(){
        empty = document.querySelectorAll(".empty");
        empty[0].classList.add('hidden');
        empty[1].classList.add('hidden');
        document.querySelector('.cart-details').style.visibility = 'visible';
        document.querySelector('.cart-empty').style.justifyContent = 'flex-start';
        document.querySelector('.cart-empty').style.overflowY = 'scroll';

        //create
        let miniDiv = document.createElement('div');
        let miniImage = document.createElement('img');
        let miniTextBox = document.createElement('ul');
        let miniItemName = document.createElement('li');
        let miniItemPrice = document.createElement('li');
        let removeButton = document.createElement('li');

        //add class
        miniDiv.classList.add('miniDiv');
        miniImage.classList.add('miniImage');
        miniTextBox.classList.add('miniTextBox');
        miniItemName.classList.add('miniItemName');
        miniItemPrice.classList.add('miniItemPrice');
        removeButton.classList.add('removeButton');

        //get list
        let currentItem;
        if (filteredItems.length < 1) {
            currentItem = itemsList[i];
        } else {
            currentItem = filteredItems[i];
        }

        //add text
        miniImage.src = currentItem.img;
        miniImage.alt = `Thumbnail of ${currentItem.nameItem}`;
        miniItemName.innerText = currentItem.nameItem;
        miniItemPrice.innerText = `R$ ${currentItem.value.toFixed(2)}`;
        removeButton.innerText = `Remover Produto`;

        //append tags
        document.querySelector('.cart-empty').appendChild(miniDiv);
        miniDiv.appendChild(miniImage);
        miniDiv.appendChild(miniTextBox);
        miniTextBox.appendChild(miniItemName);
        miniTextBox.appendChild(miniItemPrice);
        miniTextBox.appendChild(removeButton);

        //save price and ammount
        cartItemCounter++;
        cartItemPrice += currentItem.value;
        
        updateDisplay();
        giveButtonsListener(`${currentItem.value}`)
    })
}

//update display
function updateDisplay(){
    document.querySelector('#ammount').innerText = cartItemCounter;
    document.querySelector('#price').innerText = `R$ ${cartItemPrice.toFixed(2)}`;
    removeFromCartButtonList = document.querySelectorAll('.removeButton');
}

//add listener to the remove product button fucntion
function giveButtonsListener(price){
    let button = removeFromCartButtonList[removeFromCartButtonList.length-1];
    button.addEventListener("click", function(){
        cartItemCounter --;
        cartItemPrice -= price;
        button.parentNode.parentNode.remove();
        updateDisplay();
        if (removeFromCartButtonList.length < 1){
            empty = document.querySelectorAll(".empty");
            empty[0].classList.remove('hidden');
            empty[1].classList.remove('hidden');
            document.querySelector('.cart-details').style.visibility = 'hidden';
            document.querySelector('.cart-empty').style.justifyContent = 'center';
            document.querySelector('.cart-empty').style.overflowY = 'hidden';
        }
    })
}