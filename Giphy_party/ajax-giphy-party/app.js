console.log("Let's get this party started!");
const api_key = 'CaPv4bOi4MdEm0IaJ5y6GZ5r448c1i65';
const container = document.querySelector("#container");

async function getGif(tag){
    const gif = await axios.get("https://api.giphy.com/v1/gifs/random", {params: {api_key, tag}});

    appendGif(gif.data.data.url);
}

function appendGif(url){
    const newImg = document.createElement("img");
    newImg.src = url;
    container.appendChild(newImg);
}

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