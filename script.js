let psychologyLibrary = [];

function Book(title, author, length, read, index) {
	this.title = title;
	this.author = author;
	this.length = length;
	this.read = read;
    this.index = index;
    
	this.toggleRead = function() {
		if(this.read === "Not read") {
           return this.read = "Read";
        } else if(this.read === "Read") {
           return this.read = "Not read";
        }
	};
}

function addBookToLibrary(array, bookObject) {
    array.push(bookObject);
}

/* index will be necessary for correct object/array manipulation */
const getIndex = (array) => { 
    return array.length;
}

/* Adding initial books to library */ 

addBookToLibrary(psychologyLibrary, new Book("The Body Keeps the Score", "Bessel van der Kolk", 464, "Read", getIndex(psychologyLibrary)));
addBookToLibrary(psychologyLibrary, new Book("Thinking, Fast and Slow", "Daniel Kahneman", 499, "Not read", getIndex(psychologyLibrary)));
addBookToLibrary(psychologyLibrary, new Book("Man's Search for Meaning", "Viktor E. Frankl", 165, "Read", getIndex(psychologyLibrary)));
addBookToLibrary(psychologyLibrary, new Book("The Laws of Human Nature", "Robert Greene", 624, "Not read", getIndex(psychologyLibrary)));

console.log(psychologyLibrary); // TEST

const psychCardContainer = document.querySelector("#psych-card-container");

/* changing background color of read statuses */
const changeReadStatusStyle = () => {
    let allReadStatuses = document.querySelectorAll(".book-content:nth-child(4)");
    allReadStatuses.forEach((status) => {
        if (status.textContent === "Read") {
            status.style.color = "#023E8A";
        } else {
            status.style.color = "#800020";
        }
        status.style.fontWeight = "bold";
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

        changeReadStatusStyle(); // changing color         

        /* toggle reading status button and functionality */
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

        /* functionality to delete a book */
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-btn");
        bookCard.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            /* removing item from the DOM */
            bookCard.remove();
            /* removing item from the array */
            if (array === psychologyLibrary) {
                psychologyLibrary = psychologyLibrary.filter((object) => {
                    return object.index !== i; 
                })
            } else {
                businessLibrary = businessLibrary.filter((object) => {
                    return object.index !== i; 
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
const addPsychBookButton = document.querySelector("#add-psych-book-btn");
const psychFormSection = document.querySelector("#psych-form-section");

addPsychBookButton.addEventListener("click", () => {
    psychFormSection.style.display = "flex";
    addPsychBookButton.style.display = "none";

    /* resetting data in the form */
    
    let newTitle = document.querySelector("#new-title");
    let newAuthor = document.querySelector("#new-author");
    let newPages = document.querySelector("#new-pages");
    let newRead = document.querySelector("#new-read");

    newTitle.value = "";
    newAuthor.value = "";
    newPages.value = "";
    newRead.value = "Read";
})

/* clicking submit creates a new book card */
const psychFormSubmitbutton = document.querySelector("#psych-form-submit");

psychFormSubmitbutton.addEventListener("click", () => {
    addPsychBookButton.style.display = "block";

    let newTitle = document.querySelector("#new-title").value;
    let newAuthor = document.querySelector("#new-author").value;
    let newPages = document.querySelector("#new-pages").value;
    let newRead = document.querySelector("#new-read").value;
    let newIndex = psychologyLibrary.length;

    const anotherBook = new Book(newTitle, newAuthor, newPages, newRead, newIndex);
    addBookToLibrary(psychologyLibrary, anotherBook);

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

let businessLibrary = [];

/* Adding initial books to library */ 

addBookToLibrary(businessLibrary, new Book("What They Don't Teach You at Harvard Business School", "Mark H. McCormack", 288, "Read", getIndex(businessLibrary)));

console.log(businessLibrary); // TEST

const businessCardContainer = document.querySelector("#business-card-container");

loopThroughArray(businessLibrary);

/* clicking add new book brings out the form */
const addBusinessBookButton = document.querySelector("#add-business-book-btn");
const businessFormSection = document.querySelector("#business-form-section");

addBusinessBookButton.addEventListener("click", () => {
    businessFormSection.style.display = "flex";
    addBusinessBookButton.style.display = "none";

    /* resetting data */
    
    let newBusinessTitle = document.querySelector("#new-business-title");
    let newBusinessAuthor = document.querySelector("#new-business-author");
    let newBusinessPages = document.querySelector("#new-business-pages");
    let newBusinessRead = document.querySelector("#new-business-read");

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
    addBookToLibrary(businessLibrary, anotherBook);

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

