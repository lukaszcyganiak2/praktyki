function getBooks() {
    const booksId = document.getElementById('books')
    booksId.innerHTML = ''


    fetch('http://localhost:3000/books')
        .then(books => books.json())
        .then(books => {
            books.forEach(element => {
                const card = createdEl('div', 'class', 'card main-card', '')
                const cardBody = createdEl('div', 'class', 'card-body', '')
                const cardH5 = createdEl('h5', 'class', 'card-title', element.title)
                const cardH6 = createdEl('h6', 'class', 'card-subtitle mb-2 text-muted', element.author)
                const cardParagraf = createdEl('p', 'class', 'card-text', element.description)
                const buttonEdit = createdEl('button', 'class', 'btn btn-secondary main-btn', "Edytuj")
                buttonEdit.onclick = function () {
                    editeBook(element)
                }
                const buttonDelete = createdEl('button', 'class', 'btn btn-danger main-btn', "Usuń")
                buttonDelete.onclick = function () {
                    deleteBook(element)
                }
                const cardFooter = createdEl('div', 'class', 'card-footer', "")
                cardFooter.appendChild(buttonEdit)
                cardFooter.appendChild(buttonDelete)
                cardBody.appendChild(cardH5)
                cardBody.appendChild(cardH6)
                cardBody.appendChild(cardParagraf)
                card.appendChild(cardBody)
                card.appendChild(cardFooter)
                booksId.appendChild(card)


            });
        })

}


getBooks()

/**
 * 
 * @param {String} el // el to jest TAg HTML który chcemy stworzyć np. div lub span itp
 * @param {String} attribute  // attribute to atrybut naszego TAGa HTML np. class, id, href itp
 * @param {String} attributeValue // attributeValue to wartości naszego atrubutu np nazwa class
 * @param {String} text // text czyli tekst który wyświetli się w stworzonym atrybucie
 */
function createdEl(el, attribute, attributeValue, text) {
    const element = document.createElement(el)
    element.setAttribute(attribute, attributeValue)
    element.innerHTML = text
    return element
}


function editeBook(book) {
    console.log(book)
}

function deleteBook(book) {
    fetch(`http://localhost:3000/books/ + ${book.id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(book)
    })

    getBooks()

}