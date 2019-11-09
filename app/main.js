function getBooks() {
    const booksId = document.getElementById('books')
    const rowDiv = document.createElement('div')
    rowDiv.classList.add('row')
    console.log("TCL: getBooks -> rowDiv", rowDiv)

    fetch('http://localhost:3000/books')
        .then(books => books.json())
        .then(books => {
            books.forEach((element, index) => {
                console.log(element.title, "index", index)
            });
        })

}


getBooks()