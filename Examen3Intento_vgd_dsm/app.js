//Obtención de variables a través del DOM con querySelector
const qInput = document.querySelector("#qInput");
const fromInput = document.querySelector("#fromInput");
const toInput = document.querySelector("#toInput");
const contentData = document.querySelector("#contentData");
const btnGetResultado = document.querySelector("#btnGetResultado");

 
const getNews = async () => {

    //Try catch para mostrar texto si no hay ningún resultado
    try{
        //Validar que ningún campo esté vacío
        if(!(qInput.value.trim() === "")){

             const response = await fetch(
            `https://newsapi.org/v2/everything?q=${qInput.value}&from=${fromInput.value}&to=${toInput.value}&sortBy=popularity&apiKey=9bdb3191bc1f4b39a4099b64e9a635d7`); //Endpoint

             console.log(response); 

             const data =  await response.json();
             console.log(data);

            data.articles.forEach(element => {
                const divx = document.createElement("div");

                divx.classList.add("col-md-6");
                divx.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <img src = "${element.urlToImage}"></img>
                        <p class="card-text">Altura: ${element.description}</p>
                        <p class="card-text">Altura: ${element.source.name}</p>
                         <p class="card-text">Altura: ${element.publishAt}</p>
                        <a href="${element.url}" class="card-link">Leer más</a>
                    </div>
                </div>`

                contentData.appendChild(divx);
            });

             contentData.innerHTML = "";
        }
        
        else{
            contentData.innerHTML = `
            <div class="alert alert-danger" role="alert">
               Hay campos faltantes
            </div>
            `;
        }
       

    }catch(error){ //Si no hay noticias
        
        contentData.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Noticias no encontradas
            </div>`;
    }
}


btnGetResultado.addEventListener("click", getNews);
