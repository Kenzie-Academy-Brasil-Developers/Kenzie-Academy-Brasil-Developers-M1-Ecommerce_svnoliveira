const itemsList = [];

function fillItemListWithData(){
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        itemsList.push(item);
    }
}
fillItemListWithData();

//capture UL
let mainCardBox = document.querySelector('.mainCardsBox');

function renderItemCards(list){
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