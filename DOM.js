//console.dir(document);
//console.log(document);
//console.log(document.doctype);
//console.log(document.URL);

//GETELEMENTBYID

//console.log(document.getElementsById('header-title'));
var headerTitle = document.getElementById('header-title');
//console.log(headerTitle);
headerTitle.textContent = "Hello"
headerTitle.innerText = "Goodbye"

//console.log(headerTitle.innerText);


//getelementbyclassname
var elementsByClassName = document.getElementsByClassName("list-group-item");
var targetElement = elementsByClassName[0]; // Assuming you want to edit the first matched element
targetElement.textContent = "Hello world";
//console.log(targetElement);


//getelementbytagname
var elementsByTagName = document.getElementsByTagName("li");
var targetElement1 = elementsByTagName[elementsByTagName.length - 1]; // Assuming the newly added element is the last one
targetElement1.textContent = "ARpi";

//console.log(targetElement1)


//QueryselectorALL###Make the 2nd item have a green background color:
var itemList = document.querySelectorAll("list-group-item");
if (itemList.length >= 2) {
    itemList[1].style.backgroundColor = "green";
}

//Make the 3rd item invisible:
if (itemList.length >= 3) {
    itemList[2].style.display = "none";
}

//console.log(itemList);

//To manipulate the DOM and add "Hello World" before "Item Lister" and "Hello World" before "Item 1," you can use the following JavaScript code:

// Get the element with the ID "header-title"
var headerTitle = document.getElementById("header-title");

// Create a text node with the content "Hello World"
var helloTextNode = document.createTextNode("Hello World");

// Create a new paragraph element
var helloParagraph = document.createElement("p");

// Append the text node to the paragraph element
helloParagraph.appendChild(helloTextNode);

// Insert the new paragraph element before the "headerTitle" element
headerTitle.parentNode.insertBefore(helloParagraph, headerTitle);

// Get the element with the class "list-group-item" and index 0 (first item)
var firstListItem = document.getElementsByClassName("list-group-item")[0];

// Create a text node with the content "Hello World"
var helloTextNode2 = document.createTextNode("Hello World");

// Create a new list item element
var helloListItem = document.createElement("li");

// Append the text node to the list item element
helloListItem.appendChild(helloTextNode2);

// Insert the new list item element before the "firstListItem" element
firstListItem.parentNode.insertBefore(helloListItem, firstListItem);