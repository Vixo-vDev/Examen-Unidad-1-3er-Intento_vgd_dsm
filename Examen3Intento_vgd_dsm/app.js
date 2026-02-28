//Obtención de variables a través del DOM con querySelector
const qInput = document.querySelector("#qInput");
const fromInput = document.querySelector("#fromInput");
const toInput = document.querySelector("#toInput");
const contentData = document.querySelector("#contentData");
const btnGetResultado = document.querySelector("#btnGetResultado");

 
const getNews = async () => {

    //Try catch para mostrar texto si no hay ningún resultado
    try{
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${qInput.value}&from=${fromInput.value}&to=${toInput.value}&sortBy=popularity&apiKey=9bdb3191bc1f4b39a4099b64e9a635d7`); //Endpoint

             contentData.innerHTML = "";

    }catch(error){ //Si no hay noticias
        
        contentData.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Noticias no encontradas
            </div>`;
    }
}


btnGetResultado.addEventListener("click", getNews);
