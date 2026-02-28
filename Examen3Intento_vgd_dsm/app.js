//Obtención de variables a través del DOM con querySelector
const qInput = document.querySelector("#qInput");
const fromInput = document.querySelector("#fromInput");
const toInput = document.querySelector("#toInput");
const contentData = document.querySelector("#contentData");
const btnGetResultado = document.querySelector("#btnGetResultado");

 
const getNews = async () => {

    //Try catch para saber si hay fallas en la API
    try{
        //Validar que el campo palabra clave no esté vacía
        if(!(qInput.value.trim() === "")){

             const response = await fetch(
            `https://newsapi.org/v2/everything?q=${qInput.value}&from=${fromInput.value}&to=${toInput.value}&sortBy=popularity&apiKey=9bdb3191bc1f4b39a4099b64e9a635d7`); //Endpoint

             console.log(response); 

             const data =  await response.json();
             console.log(data);

            //Limpieza de variables
            fromInput.value = "";
            toInput.value = "";
            qInput.value = "";

            //Comprobar mediante el atributo totalResults si hay resultados o no
            if (data.totalResults != 0) {
              
            
            //Limpiar el contentData
            contentData.innerHTML = '';

            //Obtener los objetos dentro del array articles y acceder a sus atributos
            data.articles.forEach(element => {
                const divx = document.createElement("div");

                divx.classList.add("col-md-6","mb-4");
                divx.innerHTML = `
                <div class="card h-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-3 fw-semibold">${element.title}</h5>
                        <img src="${element.urlToImage || 'alt=No existe imagen'}" 
                        class="card-img-top img-fluid" style="max-height: 180px; object-fit: cover;"
                         onerror="this.outerHTML='<div class=&quot;d-flex align-items-center justify-content-center bg-light&quot; style=&quot;height:180px;&quot;><span class=&quot;text-muted&quot;>No existe imagen</span></div>'">
                        <p class="card-text text-muted mb-3">${element.description}</p>
                        <p class="card-text">${element.source.name}</p>
                        <p class="card-text">${new Date(element.publishedAt).toLocaleDateString()}</p>
                        <a href="${element.url}" target="_blank" class="card-link">Leer más</a>
                    </div>
                </div>`

                contentData.appendChild(divx);
            });
            }

            else{ //Si no hay resultados
                 contentData.innerHTML = `
            <div class="alert alert-danger" role="alert">
               No hay resultados de noticias
            </div>
            `;
            }
        }
        
        else{ //Si el campo de qInput esta vacío
            contentData.innerHTML = `
            <div class="alert alert-danger" role="alert">
               Mínimanente debe de haber algo en palabra clave
            </div>
            `;
        }
       

    }catch(error){ //Error 
        
        contentData.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Error al consultar la API
            </div>`;
    }
}


btnGetResultado.addEventListener("click", getNews);
