const psychCardContainer = document.querySelector("#psych-card-container");
const addPsychBookButton = document.querySelector("#add-psych-book-btn");
const psychFormSection = document.querySelector("#psych-form-section");
const psychFormSubmitbutton = document.querySelector("#psych-form-submit");

let psychologyLibrary = [];


const businessCardContainer = document.querySelector("#business-card-container");
const addBusinessBookButton = document.querySelector("#add-business-book-btn");
const businessFormSection = document.querySelector("#business-form-section");

let businessLibrary = [];


// refactored to class
class Book {
    constructor(title, author, length, read, index) {
        this.title = title;
        this.author = author;
        this.length = length;
        this.read = read;
        this._index = index;
    }

    toggleRead() {
        this.read = this.read === "Read" ? "Not read" : "Read";
        return this.read;
    }

    get bookIndex() {
        return this._index;
    }

    set bookIndex(array) {
        this._index = getIndex(array);
    }

    addToLibrary(array) {
        return array.push(new Book(this.title, this.author, this.length, this.read, this._index));
    }
}

// Adding initial books to library

const bodyKeepsCore = new Book("The Body Keeps the Score", "Bessel van der Kolk", 464, "Read", psychologyLibrary.length);
bodyKeepsCore.addToLibrary(psychologyLibrary);

const thinkingFastAndSlow = new Book("Thinking, Fast and Slow", "Daniel Kahneman", 499, "Not read", psychologyLibrary.length);
thinkingFastAndSlow.addToLibrary(psychologyLibrary);

const mansSearchForMeaning = new Book("Man's Search for Meaning", "Viktor E. Frankl", 165, "Read", psychologyLibrary.length);
mansSearchForMeaning.addToLibrary(psychologyLibrary);

console.log(psychologyLibrary); // TEST

// changing background color of read statuses 
const changeReadStatusStyle = () => {
    let allReadStatuses = document.querySelectorAll(".book-content:nth-child(4)");
    allReadStatuses.forEach((status) => {
        status = status.textContent === "Read" ? status.style.color = "#023E8A" : status.style.color = "#800020";
    })
}


const loopThroughArray = array => { // this is a reusable function that I can use for both psychology and business section
    for (let i = 0; i < array.length; i++) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        if (array === psychologyLibrary) {
            psychCardContainer.appendChild(bookCard);
        } else {
            businessCardContainer.appendChild(bookCard);
        }

        let textElements = document.createElement("div");
        textElements.classList.add("text-elements");
        bookCard.appendChild(textElements);

        const addContent = () => {
            Object.values(array[i]).forEach(value => {
                let bookContent = document.createElement("p");
                bookContent.classList.add("book-content");
                textElements.appendChild(bookContent);
    
                bookContent.textContent += value;
            })
        }
        addContent();

        changeReadStatusStyle(); // changing color of read status   
        

        // toggle reading status button and functionality
        let readButton = document.createElement("button");
        readButton.textContent = "Update reading status";
        readButton.classList.add("read-btn");
        bookCard.appendChild(readButton);

        readButton.addEventListener("click", () => {
            array[i].toggleRead(); // changing the read status on the object

            if(array[i].read === "Read") {
                textElements.textContent = "";
                addContent();

            } else if(array[i].read === "Not read") {
                textElements.textContent = "";
                addContent();
            }
            changeReadStatusStyle(); // changing color         
        })

        // functionality to delete a book
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-btn");
        bookCard.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            // removing item from the DOM
            bookCard.remove();
            // removing item from the array
            if (array === psychologyLibrary) {
                psychologyLibrary = psychologyLibrary.filter((book) => {
                    return book.index !== i; 
                })
            } else {
                businessLibrary = businessLibrary.filter((book) => {
                    return book.index !== i; 
                })
            }
            /* updating indexes */
            if (array === psychologyLibrary) {
                for (let j=0; j < psychologyLibrary.length; j++) {
                    psychologyLibrary[j].index = j;
                }
                console.log(psychologyLibrary);
            } else {
                for (let j=0; j < businessLibrary.length; j++) {
                    businessLibrary[j].index = j;
                }
            }

        })
    }
}

loopThroughArray(psychologyLibrary);

/* clicking add new book brings out the form */
addPsychBookButton.addEventListener("click", () => {
    psychFormSection.style.display = "flex";
    addPsychBookButton.style.display = "none";

    let newTitle = document.querySelector("#new-title");
    let newAuthor = document.querySelector("#new-author");
    let newPages = document.querySelector("#new-pages");
    let newRead = document.querySelector("#new-read");

    /* resetting data in the form */
    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";
    newRead.value = "Read";
})

/* clicking submit creates a new book card */
psychFormSubmitbutton.addEventListener("click", () => {
    addPsychBookButton.style.display = "block";

    let newTitle = document.querySelector("#new-title").value;
    let newAuthor = document.querySelector("#new-author").value;
    let newPages = document.querySelector("#new-pages").value;
    let newRead = document.querySelector("#new-read").value;

    const anotherBook = new Book(newTitle, newAuthor, newPages, newRead, psychologyLibrary.length);
    anotherBook.addToLibrary(psychologyLibrary);

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    psychCardContainer.appendChild(bookCard);

    let textElements = document.createElement("div");
    textElements.classList.add("text-elements");
    bookCard.appendChild(textElements);

    const addMoreContent = () => {
        Object.values(anotherBook).forEach(value => {
            let bookContent = document.createElement("p");
            bookContent.textContent = "";
            bookContent.classList.add("book-content");
            textElements.appendChild(bookContent);

            bookContent.textContent += value;
        })
    }
    addMoreContent();

    changeReadStatusStyle();
    
    /* toggle reading status button and functionality */

    let readButton = document.createElement("button");
    readButton.textContent = "Update reading status";
    readButton.classList.add("read-btn");
    bookCard.appendChild(readButton);

    readButton.addEventListener("click", () => {
        psychologyLibrary[newIndex].toggleRead(); // changing the read status on the object
        console.log(psychologyLibrary); // test

        if(psychologyLibrary[newIndex].read === "Read") {
            textElements.textContent = "";
            addMoreContent();
        } else if(psychologyLibrary[newIndex].read === "Not read") {
            textElements.textContent = "";
            addMoreContent();
        }
        changeReadStatusStyle(); // changing color         
    })
    
    /* functionality to delete a book */
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");
    bookCard.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        /* removing item from the DOM */
        bookCard.remove();
        /* removing item from the array */
        psychologyLibrary = psychologyLibrary.filter((object) => {
            return object.index !== newIndex; 
        })

        /* updating indexes */
        for (let j=0; j < psychologyLibrary.length; j++) {
            psychologyLibrary[j].index = j;
        }
        console.log(psychologyLibrary);
    })

    console.log(psychologyLibrary);

    psychFormSection.style.display = "none"; /* hiding the form again */
})

/* business section */

/* Adding initial books to library */ 
const whatTheyDontTeach = new Book("What They Don't Teach You at Harvard Business School", "Mark H. McCormack", 288, "Read", businessLibrary.length);
whatTheyDontTeach.addToLibrary(businessLibrary);

console.log(businessLibrary); // TEST

loopThroughArray(businessLibrary);

/* clicking add new book brings out the form */
addBusinessBookButton.addEventListener("click", () => {
    businessFormSection.style.display = "flex";
    addBusinessBookButton.style.display = "none";

    let newBusinessTitle = document.querySelector("#new-business-title");
    let newBusinessAuthor = document.querySelector("#new-business-author");
    let newBusinessPages = document.querySelector("#new-business-pages");
    let newBusinessRead = document.querySelector("#new-business-read");

    /* resetting data */
    newBusinessTitle.value = "";
    newBusinessAuthor.value = "";
    newBusinessPages.value = "";
    newBusinessRead.value = "Read";
})

/* clicking submit creates a new book card */
const businessFormSubmitbutton = document.querySelector("#business-form-submit");

businessFormSubmitbutton.addEventListener("click", () => {
    addBusinessBookButton.style.display = "block";

    let newBusinessTitle = document.querySelector("#new-business-title").value;
    let newBusinessAuthor = document.querySelector("#new-business-author").value;
    let newBusinessPages = document.querySelector("#new-business-pages").value;
    let newBusinessRead = document.querySelector("#new-business-read").value;
    let newBusinessIndex = businessLibrary.length;

    const anotherBook = new Book(newBusinessTitle, newBusinessAuthor, newBusinessPages, newBusinessRead, newBusinessIndex);
    anotherBook.addToLibrary(businessLibrary);

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    businessCardContainer.appendChild(bookCard);

    let textElements = document.createElement("div");
    textElements.classList.add("text-elements");
    bookCard.appendChild(textElements);

    const addMoreContent = () => {
        Object.values(anotherBook).forEach(value => {
            let bookContent = document.createElement("p");
            bookContent.textContent = "";
            bookContent.classList.add("book-content");
            textElements.appendChild(bookContent);

            bookContent.textContent += value;
        })
    }
    addMoreContent();

    changeReadStatusStyle();
    
    /* toggle reading status button and functionality */

    let readButton = document.createElement("button");
    readButton.textContent = "Update reading status";
    readButton.classList.add("read-btn");
    bookCard.appendChild(readButton);

    readButton.addEventListener("click", () => {
        businessLibrary[newBusinessIndex].toggleRead(); // changing the read status on the object
        console.log(businessLibrary); // test

        if(businessLibrary[newBusinessIndex].read === "Read") {
            textElements.textContent = "";
            addMoreContent();
        } else if(businessLibrary[newBusinessIndex].read === "Not read") {
            textElements.textContent = "";
            addMoreContent();
        }
        changeReadStatusStyle(); // changing color         
    })
    
    /* functionality to delete a book */
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");
    bookCard.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        /* removing item from the DOM */
        bookCard.remove();
        /* removing item from the array */
        businessLibrary = businessLibrary.filter((object) => {
            return object.index !== newBusinessIndex; 
        })

        /* updating indexes */
        for (let j=0; j < businessLibrary.length; j++) {
            businessLibrary[j].index = j;
        }
        console.log(businessLibrary);
    })

    console.log(businessLibrary);

    businessFormSection.style.display = "none"; /* hiding the form again */
})

