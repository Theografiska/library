const myLibrary = [];

function Book(title, author, length, read) {
	this.title = title;
	this.author = author;
	this.length = length;
	this.read = read;
	this.info = function() {
		return `${this.title} by ${this.author}, ${this.length} pages, ${this.read}.`;
	};
}

function addBookToLibrary(object) {
    myLibrary.push(object);
}



