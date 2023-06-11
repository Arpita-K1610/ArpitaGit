//console.dir(document);
console.log(document);
console.log(document.doctype);
console.log(document.URL);

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
console.log(targetElement);


//getelementbytagname
var elementsByTagName = document.getElementsByTagName("li");
var targetElement1 = elementsByTagName[elementsByTagName.length - 1]; // Assuming the newly added element is the last one
targetElement1.textContent = "ARpi";

console.log(targetElement1)