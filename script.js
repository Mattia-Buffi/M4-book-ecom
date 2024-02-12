// https://striveschool-api.herokuapp.com/books

let globalList=[];
let nBookCart=0;

fetch('https://striveschool-api.herokuapp.com/books')
    .then((Response)=>Response.json())
    .then((json)=>{
        globalList=json;
        showAll(json)
        })
    .catch((err)=>console.log('error: ',err));

//crezione di tutte le varie card
function showAll(lista){
    let listaElem=[];
        lista.forEach(libro=>{
            let cardTemp=document.createElement('div');
            cardTemp.classList.add('card','col-2');
            let imgTemp=document.createElement('img');
            imgTemp.classList.add('card-img-top','shadow');
            imgTemp.src=libro.img;
            cardTemp.appendChild(imgTemp);
            let infoTemp=document.createElement('div');
            infoTemp.classList.add('card-body');
            infoTemp.innerHTML=`<h5 class="card-title">${libro.title}</h5><p class="card-text">${libro.price}</p>`;
            cardTemp.appendChild(infoTemp);
            let tastoTemp=document.createElement('button')
            tastoTemp.classList.add('btn','btn-secondary')
            tastoTemp.innerText='Metti nel Carrello';
            tastoTemp.type='button';
            tastoTemp.addEventListener('click',(event)=>{
                console.log(event);
            });
            cardTemp.appendChild(tastoTemp); 
            listaElem.push(cardTemp);
            document.getElementById('mainBooks').appendChild(cardTemp);
        });
        console.log(listaElem);
}
//ricerca nascondo quello che non risteppa cpndizione
document.getElementById('searchKey').addEventListener('keyup',()=>{
    let query=document.getElementById('searchKey').value;
    if(([...query].length)>3) {
        console.log(query);
        let titolo='';
        let newList=globalList.filter(book=>(
            console.log((book.title).includes(query))
        ))

    }else console.log('non fare niete');
})
//aggiunta prodotto al carrello (aggiornare badge cambiare caratteristica home )
function cardCarrello(libro){
    console.log(libro);
}
/*
<div class="card mb-3">
        <div class="row g-0">
          <div class="col-4">
            <img src="https://images-na.ssl-images-amazon.com/images/I/91xrEMcvmQL.jpg" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-6">
            <div class="card-body">
              <h5 class="card-title">Felicita</h5>
              <p class="card-text">pippo</p>
              <p class="card-text"><bold class="text-muted">12,55</bold></p>
            </div>
          </div>
          <div class="col-2 d-flex align-items-center">
            <a href="" role="button" class="btn text-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
              </svg>
            </a>
          </div>
        </div>
*/

//eliminazione prodotto carrello
function removeBook(event){
    event.target.parentNode.remove();    
}