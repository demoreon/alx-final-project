const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3d4070494105c676888966595aff5880&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=3d4070494105c676888966595aff5880&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const container = document.getElementById("container");
const sec = document.querySelector(".sec");
const title2 = document.getElementById("title2");
const description = document.getElementById("description");

returnMovies(APILINK)

function createColumn(element) {
    const descriptionElement = document.createElement('p');
    descriptionElement.style.display = 'none'; // Initially hide the <p> element

    const div_column = document.createElement('div');
    div_column.setAttribute('class', 'column');

    const div_card = document.createElement('div');
    div_card.setAttribute('class', 'card');

    const image = document.createElement('img');
    image.setAttribute('class', 'thumbnail');

    const title = document.createElement('h3');
    title.setAttribute('id', 'title');

    const center = document.createElement('center');

    title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
    descriptionElement.textContent = `${element.overview}`;

    image.src = IMG_PATH + element.poster_path;
    center.appendChild(image);
    div_card.appendChild(center);
    div_card.appendChild(title);
    div_card.appendChild(descriptionElement);
    div_column.appendChild(div_card);
    
    setTimeout(() => {
        if (title.scrollHeight > title.clientHeight) {
            title.classList.add('scrollable');
        }
    }, 0);
    
  
    return div_column;
}

function returnMovies(url) {
  fetch(url).then(res => res.json())
    .then(function(data) {
      console.log(data.results);
      
      let currentRow;
      data.results.forEach((element, index) => {
          if (index % 4 === 0) {
              currentRow = document.createElement('div');
              currentRow.setAttribute('class', 'row');
          }
          const column = createColumn(element);
          currentRow.appendChild(column);

          if ((index + 1) % 4 === 0 || index === data.results.length - 1) {
              main.appendChild(currentRow);
            
          }
      });

      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
          card.addEventListener('click', () => {
              // const row = card.closest('.row');
            if (!main.classList.contains("width-50")) {
              main.classList.toggle('width-50');
              container.classList.toggle('container');
              sec.style.display = main.classList.contains("width-50") ? "block" : "none";
            } else {
              const fiv = card.querySelector('h3').textContent;
              const image = card.querySelector('.thumbnail').src;
              
              const updatedText = fiv.replace("review", "");
              title2.textContent = updatedText;
              description.textContent = card.querySelector('p').textContent;
              
              const image2 = document.querySelector(".thumbnail2");
              image2.src = image;
            }
             
          });
      });
    }); 
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';
  const searchItem = search.value;
  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});