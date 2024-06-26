//marquee
let a = document.querySelector(".marquee");

let fetchData1 = async () => {
    let response = await fetch("https://newsapi.org/v2/everything?q=indian-headline&apiKey=a9aae749a0694bfdbc05dbb5be1ad6d4");
    let data = await response.json();
    console.log(data);
    data.articles.forEach((element, i) => {
        displayData(element)
    });
}

fetchData1();

let displayData = (element) => {
    a.innerHTML += `<span>${element.title} &nbsp; &nbsp; &nbsp; </span>`
}

//1st section
let b = document.querySelector(".cont1");

let fetchData2 = async () => {
    let response = await fetch("https://newsapi.org/v2/everything?q=indian-business&apiKey=a9aae749a0694bfdbc05dbb5be1ad6d4");
    let data = await response.json();
    console.log(data);
    data.articles.forEach((element, i) => {
        if(element.urlToImage!= null){
            displayData2(element)
        }
    });
}

fetchData2();

let displayData2 = (element) => {
    let div = document.createElement("div");
    div.setAttribute("class","cards-container card-section");
    div.innerHTML = `<img src ="${element.urlToImage}" alt = "user_profile" class = "card_img"/>
                     <h1>${element.title}</h1>
                     <p>${element.publishedAt}</p>`

    b.append(div);
}

//2nd section

let c = document.querySelector(".cont2");

let fetchData3 = async () => {
    let response = await fetch("https://newsapi.org/v2/everything?q=bollywood&apiKey=a9aae749a0694bfdbc05dbb5be1ad6d4");
    let data = await response.json();
    console.log(data);
    data.articles.forEach((element, i) => {
        if(element.urlToImage!= null){
            displayData3(element)
        }
    });
}

fetchData3();

let displayData3 = (element) => {
    let div = document.createElement("div");
    div.setAttribute("class","cards-container card-section");
    div.innerHTML = `<img src ="${element.urlToImage}" alt = "user_profile" class = "card_img"/>
                     <h1>${element.title}</h1>
                     <p>${element.publishedAt}</p>`

    c.append(div);
}

// 3rd section

let d = document.querySelector(".cont3");

let fetchData4 = async () => {
    let response = await fetch("https://newsapi.org/v2/everything?q=india-sports&apiKey=a9aae749a0694bfdbc05dbb5be1ad6d4");
    let data = await response.json();
    console.log(data);
    data.articles.forEach((element, i) => {
        if(element.urlToImage!= null){
            displayData4(element)
        }
    });
}

fetchData4();

let displayData4 = (element) => {
    let div = document.createElement("div");
    div.setAttribute("class","cards-container card-section");
    div.innerHTML = `<img src ="${element.urlToImage}" alt = "user_profile" class = "card_img"/>
                     <h1>${element.title}</h1>
                     <p>${element.publishedAt}</p>`

    d.append(div);
}


//&nbsp; for space
//------------------------------------------------------


const API_KEY = "a9aae749a0694bfdbc05dbb5be1ad6d4";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


//search bar
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
