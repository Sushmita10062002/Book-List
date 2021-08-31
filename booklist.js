class Book {
	constructor(title,author,isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}
class UI {
     static displayBooks(){
        console.log("My booklist");
    }
    static showalert(message,className){
        const alertdiv = document.createElement('div');
        if(className === "danger"){
        alertdiv.className = 'danger';
       
        alertdiv.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        container.insertBefore(alertdiv,bookForm);
        setTimeout(()=>document.querySelector('.danger').remove(),2000);
        }
        else {
        alertdiv.className = 'success';
        alertdiv.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        container.insertBefore(alertdiv,bookForm);
        setTimeout(()=>document.querySelector('.success').remove(),2000);
        }

    }
    static addBookToList(book){
    	const list = document.querySelector('#booklist');
    	const row = document.createElement('tr');
    	row.innerHTML = `
    	<td>${book.title}</td>
    	<td>${book.author}</td>
    	<td>${book.isbn}</td>
    	<td><a href="#" class="btn-danger delete">X</a></td>
    	`;
    	list.appendChild(row);
    	

    }
    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
    static deleteBook(el){
    	if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
    	}
    }
}
class store{
	static getBooks() {
		let books;
		if(localStorage.getItem('books')==null){
			books = [];

		}else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}
	static addBook(book) {
		const books = store.getBooks();
		books.push(book);
		localStorage.setItem('books',JSON.stringify(books));

	}
	static removeBook(isbn) {
		const books = store.getBooks();
		books.forEach((book, index)=>{
			if(book.isbn === isbn) {
				books.splice(index,1);
			}

		});
		localStorage.setItem('books',JSON.stringify(books));
	}

}
document.addEventListener('DOMContentLoaded',UI.displayBooks());
const bookForm = document.querySelector(".form");
bookForm.addEventListener('submit',(e)=>{
	e.preventDefault();
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const isbn = document.querySelector("#isbn").value;
	if(title === '' || author === '' || isbn === ''){
		UI.showalert('Please fill in all fields', 'danger');
	}
	else{
	const book = new Book(title,author,isbn);
	UI.addBookToList(book);
	store.addBook(book);
	UI.showalert('Book Added','success');
	UI.clearFields();
}
});
document.querySelector('#booklist').addEventListener('click',(e)=>{
	UI.deleteBook(e.target);
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    console.log(Date.now())
})