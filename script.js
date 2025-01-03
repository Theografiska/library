let myLibrary = [];

function Book(title, author, length, read, index) {
	this.title = title;
	this.author = author;
	this.length = length;
	this.read = read;
    this.index = index;
    /*
	this.info = function() {
		return `${this.title} by ${this.author}, ${this.length} pages, ${this.read}.`;
	};*/
}

function addBookToLibrary(object) {
    myLibrary.push(object);
}

/* Adding initial books to library */ 

const getIndex = () => {
    return myLibrary.length;
}

const bodyKeepsScore = new Book("The Body Keeps the Score", "Bessel van der Kolk", 450, "Read", getIndex());
addBookToLibrary(bodyKeepsScore);

const thinkingFastSlow = new Book("Thinking, Fast and Slow", "Daniel Kahneman", 700, "Currently reading", getIndex());
addBookToLibrary(thinkingFastSlow);

const mansSearchForMeaning = new Book("Man's Search for Meaning", "Viktor Frankl", 242, "Read", getIndex());
addBookToLibrary(mansSearchForMeaning);

const lawsOfHumanNature = new Book("The Laws of Human Nature", "Robert Greene", 640, "Read", getIndex());
addBookToLibrary(lawsOfHumanNature);

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

            bookContent.textContent += value;
        })

        /* functionality to delete a book */
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove book";
        deleteButton.classList.add("delete-btn");
        bookCard.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            /* removing item from the DOM */
            bookCard.remove();
            /* removing item from the array */
            myLibrary = myLibrary.filter((object) => {
                return object.index !== i; 
            })

            /* updating indexes */
            for (let j=0; j < myLibrary.length; j++) {
                myLibrary[j].index = j;
            }
        })
        
    }
}

loopThroughArray(myLibrary);

/* clicking add new book brings out the form */
const addBookButton = document.querySelector("#add-book-btn");
const formSection = document.querySelector("#form-section");

addBookButton.addEventListener("click", () => {
    formSection.style.display = "block";

    /* resetting data */
    
    let newTitle = document.querySelector("#new-title");
    let newAuthor = document.querySelector("#new-author");
    let newPages = document.querySelector("#new-pages");
    let newRead = document.querySelector("#new-read");

    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";
    newRead.value = "Read";
})

/* clicking submit adds creates a new book card */
const formSubmitbutton = document.querySelector("#form-submit");

formSubmitbutton.addEventListener("click", () => {
    let newTitle = document.querySelector("#new-title").value;
    let newAuthor = document.querySelector("#new-author").value;
    let newPages = document.querySelector("#new-pages").value;
    let newRead = document.querySelector("#new-read").value;
    let newIndex = myLibrary.length;
    console.log(newIndex);

    const anotherBook = new Book(newTitle, newAuthor, newPages, newRead, newIndex);
    myLibrary.push(anotherBook);

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
        
    cardContainer.appendChild(bookCard);

    Object.values(anotherBook).forEach(value => {
            let bookContent = document.createElement("p");
            bookContent.textContent = "";
            bookContent.classList.add("book-content");
            bookCard.appendChild(bookContent);

            bookContent.textContent += value;
        })
    
    /* functionality to delete a book */
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove book";
    deleteButton.classList.add("delete-btn");
    bookCard.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        /* removing item from the DOM */
        bookCard.remove();
        /* removing item from the array */
        myLibrary = myLibrary.filter((object) => {
            return object.index !== newIndex; 
        })

        /* updating indexes */
        for (let j=0; j < myLibrary.length; j++) {
            myLibrary[j].index = j;
        }
    })

    console.log(myLibrary);

    formSection.style.display = "none"; /* hiding the form again */
})


