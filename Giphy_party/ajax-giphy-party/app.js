console.log("Let's get this party started!");
const api_key = 'CaPv4bOi4MdEm0IaJ5y6GZ5r448c1i65';

async function getGif(tag){
    const gif = await axios.get('https://api.giphy.com/v1/gifs/random', {params: {api_key, tag}});
    
    console.log(gif);
    appendGif(gif.data.data.url);
}

function appendGif(url){
    const newImg = document.createElement("img");
    newImg.src = url;
    console.log(newImg);
    container.appendChild(newImg);

}


const container = document.querySelector("#container");

const searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    const input = document.querySelector("#gif-name")
    console.log(input.value);
    getGif(input.value);
    input.value = "";
})

const removeBtn = document.querySelector("#remove");
removeBtn.addEventListener("click", function(e){
    e.preventDefault();
    container.innerHTML = "";
})