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


function editeBook(element) {


    const booksId = document.getElementById('books')

    // główny div modala 
    const modalDiv = createdEl('div', 'class', 'modal', '')
    modalDiv.setAttribute('tabindex', '-3')
    modalDiv.setAttribute('role', 'dialog')
    const modalDialog = createdEl('div', 'class', 'modal-dialog', '')
    modalDialog.setAttribute('role', "document")
    const modalContent = createdEl('div', 'class', 'modal-content', '')

    // header modal start 

    const modalHeader = createdEl('div', 'class', 'modal-header', '')
    const modalTitleH5 = createdEl('h5', 'class', 'modal-header', "Edytujesz książkę o id " + element.id)
    const btnClose = createdEl('button', 'class', 'close', '')
    btnClose.setAttribute('data-dismiss', 'modal')
    btnClose.setAttribute('aria-label', 'Close')
    btnClose.onclick = function () {
        closeModal()
    }
    const spanBtnClose = createdEl('span', 'aria-hidden', 'true', '&times;')
    console.log("TCL: editeBook -> spanBtnClose", spanBtnClose)
    // header modal dodawnie elementów  
    modalHeader.appendChild(modalTitleH5)
    btnClose.appendChild(spanBtnClose)
    modalHeader.appendChild(btnClose)
    // end header ----------------------- // 

    // modal body tworzenie elementów 
    const modalBody = createdEl('div', 'class', 'modal-body', '')
    const inputTitle = createdEl('input', 'class', 'main-input', '')
    inputTitle.value = element.title
    const inputAuthor = createdEl('input', 'class', 'main-input', element.author)
    const inputDescription = createdEl('input', 'class', 'main-input', element.description)
    // modal body dodawnie elementów 
    modalBody.appendChild(inputTitle)
    modalBody.appendChild(inputAuthor)
    modalBody.appendChild(inputDescription)
    // end body -----------------------//

    // modal-footer tworzenie elementów 
    const modalFooter = createdEl('div', 'class', 'modal-footer', '')
    const footerBtnClose = createdEl('button', 'class', 'btn btn-secondary', 'Close')
    footerBtnClose.setAttribute('data-dismiss', 'modal')
    footerBtnClose.onclick = function () {
        closeModal()
    }
    const footerBtnSave = createdEl('button', 'class', 'btn btn-primary', 'Save')
    footerBtnSave.onclick = function () {
        saveBook(element)
    }
    // modal-footer body dodawnie elementów    
    modalFooter.appendChild(footerBtnClose)
    modalFooter.appendChild(footerBtnSave)
    // end footer -----------------------//





    // dodanie całości kontentu modala do jego głównego diva 

    // pierwsza częci uzupełnienie <div class="modal-content">
    modalContent.appendChild(modalHeader)
    modalContent.appendChild(modalBody)
    modalContent.appendChild(modalFooter)

    // druga dodanie do <div class="modal-dialog" role="document"> <div class="modal-content"> 
    modalDialog.appendChild(modalContent)

    // trzeci dodanie do głównego diva tj.    
    //< div class="modal" tabindex = "-1" role = "dialog" > uzupełnionego 
    // <div class="modal-dialog" role="document"> w kroku drugim 

    modalDiv.appendChild(modalDialog)
    modalDiv.style.display = 'block'
    console.log("TCL: editeBook -> modalDiv", modalDiv)
    booksId.appendChild(modalDiv)



}

function deleteBook(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            console.log(res)
            getBooks()
        })
        .catch(err => {
            console.error(err)
        })
}

function saveBook(element) {
    const modalDiv = document.getElementsByClassName('modal')[0]
    console.log("TCL: saveBook -> modalDiv", modalDiv)
    modalDiv.remove();
    console.log("TCL: saveBook -> element", element)

}

function closeModal() {
    const modalDiv = document.getElementsByClassName('modal')[0]
    modalDiv.remove();
}