const myLibrary = [];

function Book(title, author, length, read) {
	this.title = title;
	this.author = author;
	this.length = length;
	this.read = read;
    /*
	this.info = function() {
		return `${this.title} by ${this.author}, ${this.length} pages, ${this.read}.`;
	};*/
}

function addBookToLibrary(object) {
    myLibrary.push(object);
}

const bodyKeepsScore = new Book("The Body Keeps the Score", "Bessel van der Kolk", 450, "read");
const kolmeKatkuVahel = new Book("Kolme katku vahel", "Jaan Kross", 700, "not read");

/* TESTING */ 
/*
console.log(bodyKeepsScore);
console.log(kolmeKatkuVahel);
*/

addBookToLibrary(bodyKeepsScore);
addBookToLibrary(kolmeKatkuVahel);

console.log(myLibrary);

const cardContainer = document.querySelector("#card-container");

const loopThroughArray = array => {
    for (let i = 0; i < array.length; i++) {
        let bookCard = document.createElement("div");

        bookCard.classList.add("book-card");
        
        cardContainer.appendChild(bookCard);

        Object.values(array[i]).forEach(value => {
            let bookContent = document.createElement("p");
            bookContent.textContent = "";
            bookContent.classList.add("book-content");
            bookCard.appendChild(bookContent);

            bookContent.textContent += `${value}`;
        })

    }
}

loopThroughArray(myLibrary);