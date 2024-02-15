// https://striveschool-api.herokuapp.com/books

let globalList=[];
let cartInList=[];
let nBookCart=0;

let mainListBooks=document.getElementById('mainBooks');

fetch('https://striveschool-api.herokuapp.com/books')
    .then((Response)=>Response.json())
    .then((json)=>{
        console.log(json);
        globalList=json;
        caricamentoHome(json);})
    .catch((err)=>console.log('error: ',err));

function caricamentoHome(lista){
    mainListBooks.innerHTML='';
    lista.forEach(element => {
        createCard(element);
    });
}

    //crezione card
function createCard({asin,title,img,price}){
    let cardTemp=document.createElement('div');
    cardTemp.classList.add('card','col-2');
    let imgTemp=document.createElement('img');
    imgTemp.classList.add('card-img-top','shadow');
    imgTemp.src=img;
    cardTemp.appendChild(imgTemp);
    let infoTemp=document.createElement('div');
    infoTemp.classList.add('card-body');
    infoTemp.innerHTML=`<h5 class="card-title">${title}</h5><p class="card-text">${price}</p>`;
     cardTemp.appendChild(infoTemp);
    let tastoTemp=document.createElement('button')
    tastoTemp.classList.add('btn','btn-secondary')
    tastoTemp.innerText='Metti nel Carrello';
    tastoTemp.type='button';
    tastoTemp.addEventListener('click',()=>{
        cardCarrello(asin,title,img,price);
    });
    cardTemp.appendChild(tastoTemp); 
    mainListBooks.appendChild(cardTemp);
    let tastoTemp2=document.createElement('a')
    tastoTemp2.classList.add('btn','btn-secondary')
    tastoTemp2.innerText='More Info';
    tastoTemp2.type='button';
    tastoTemp2.href=`index.html?id=${asin}`;
    cardTemp.appendChild(tastoTemp2); 
    mainListBooks.appendChild(cardTemp);
}
//ricerca nascondo quello che non risteppa cpndizione
document.getElementById('searchKey').addEventListener('keyup',()=>{
    let query=document.getElementById('searchKey').value.toLowerCase();
    if(([...query].length)>3) {
        let newList=globalList.filter(book=>{
            return book.title.toLowerCase().includes(query)
        })
        caricamentoHome(newList);
    } else {caricamentoHome(globalList)}
})

function cardGetIn(asin){
    //trovare l'oggetto con stesso asin e copiarlo nella lista cerrello
}
//aggiunta prodotto al carrello (aggiornare badge cambiare caratteristica home )
function cardCarrello(asin,title,img,price){
    let cardNode=document.createElement('div');
    cardNode.classList.add('card','mb-3');
    cardNode.innerHTML=`<button class="btn text-danger" onClick="removeBook(event)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/></svg></button>`;
    let cardRow=document.createElement('div');
    cardRow.classList.add('row','g-0');
    let colImg=document.createElement('div');
    colImg.classList.add('col-4')
    colImg.innerHTML=`<img src="${img}" class="img-fluid rounded-start" alt="...">`;
    let infoBox=document.createElement('div');
    infoBox.classList.add('col-6');
    infoBox.innerHTML=`<div class="card-body"><h5 class="card-title">${title}</h5><p class="card-text">ASIN: ${asin}</p><p class="card-text"><bold class="text-muted">${price}</bold></p></div>`;
    // let deletSection=document.createElement('div');
    // deletSection.classList.add('col-2','d-flex','align-items-center')
    cardRow.appendChild(colImg);
    cardRow.appendChild(infoBox);
    // cardRow.appendChild(deletSection);
    cardNode.appendChild(cardRow);

    document.getElementById('cartBody').appendChild(cardNode);
}

//eliminazione prodotto carrello
function removeBook(event){
    //event.target.parentElement.parentElement.parentNode 
    event.target.parentElement.parentElement.parentNode.remove();
}

//funzione per caricare la pagina del libro
if(window.location.search) {
    let activeParams = window.location.search; // ?id=123
    let objParametri = new URLSearchParams(activeParams);
    let asinBook = objParametri.get("id");
    fetch(`https://striveschool-api.herokuapp.com/books/${asinBook}`) // Emette una promise
    .then(res => res.json()) // Emette una promise...
    .then(json => createBookTemplate(json))
    .catch(err => {
        console.log('Error:',err);
    })
}

//Funzione creazione pagina libro
function createBookTemplate(book){
    console.log(book);
    let imgTemp=document.createElement('img');
    imgTemp.classList.add('img-fluid','col-6');
    imgTemp.src=book.img;
    let infoBox=document.createElement('div')
    infoBox.classList.add('col-6','bg-secondary');
    infoBox.innerText=book.title;
    document.getElementById('pageBook').appendChild(imgTemp);
    document.getElementById('pageBook').appendChild(infoBox);
    document.getElementById('pageBook').addEventListener('click',()=>{
        document.getElementById('pageBook').classList.add('d-none');
    })
}