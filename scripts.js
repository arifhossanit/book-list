let form = document.querySelector('#dataform');
let Bname = document.querySelector("#bname");
let Aname = document.querySelector("#aname");
let Isbn = document.querySelector("#isbn");
let Blist = document.getElementById("blist");


class NewBook {
    constructor(bName, aName, isbnNo) {
        this.bName = bName;
        this.aName = aName;
        this.isbnNo = isbnNo;
    }
}

// Addbook
form.addEventListener('submit', addbook);
function addbook(e) {
    e.preventDefault();
    let row = document.createElement('tr');
    let data = `<td>${Bname.value}</td>
                <td>${Aname.value}</td>
                <td>${Isbn.value}</td>
                <td><a href="#">x</a></td>`;
    row.innerHTML = data;
    Blist.appendChild(row);
    let newBook = new NewBook(Bname.value, Aname.value, Isbn.value);
    addstorage(newBook);
    Bname.value = '';
    Aname.value = '';
    Isbn.value = '';
    
}
// addbook Storage
function addstorage(book){
    let books;
    if (localStorage.getItem('books') == null) {
        books = [];
    } else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}
// sow from storage
function show() {
    
    let data = '';
    if (localStorage.getItem('books') == null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.forEach(boo => {
        let row = document.createElement('tr');
        data = `<td>${boo.bName}</td>
        <td>${boo.aName}</td>
        <td>${boo.isbnNo}</td>
        <td><a href="#">x</a></td>`;
        row.innerHTML = data;
        Blist.appendChild(row);
    });
}
// removebook
Blist.addEventListener('click', removebook);
function removebook(e) {
    let removeISBN;
    if (e.target.hasAttribute('href')) {
        removeISBN = e.target.parentElement.previousElementSibling.textContent;
        e.target.parentElement.parentElement.remove();
        console.log(removeISBN)
    }
    let books;
    if (localStorage.getItem('books') == null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach((boo,index)=>{
        if (removeISBN === boo.isbnNo) {
            books.splice(index,1);
        }
    })
    localStorage.setItem('books',JSON.stringify(books));
}

