"use strict";

function createModal() {

  function closeModal() {
    document.querySelector('#modal-content div').removeChild(document.querySelector('iframe'));
    document.getElementById('modal').style.visibility = "hidden";
    document.getElementById('bgvid').play();
  }

  const modal = document.querySelector('#modal');
  modal.addEventListener('click', closeModal);
}

function pressPlay() {
  let iframe = document.createElement('iframe');
  document.getElementById('bgvid').pause();
  document.getElementById('modal').style.visibility = "visible";
  iframe.setAttribute("frameborder","0");
  iframe.setAttribute("autoplay", "1");
  iframe.allow="autoplay; fullscreen; picture-in-picture"; 
  iframe.setAttribute("allowfullscreen","");
  let link = movies[this.dataset.video].link + "&amp;portrait=0&amp;title=0&amp;byline=0&amp;badge=0&amp; \
  autopause=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479";
  iframe.src = link;
  document.querySelector('#modal-content div').appendChild(iframe);
}



function createThumbnail(id, names, link, image) {

  let movieStill = document.createElement('img');
  movieStill.src = image;
  movieStill.alt = names;

  let playButton = document.createElement('img');
  playButton.classList.add("play");
  playButton.src = "/resources/play.png";
  playButton.alt="";

  let anchor = document.createElement('a');
  anchor.href = "#open";
  anchor.appendChild(movieStill);
  anchor.appendChild(playButton);

  let figCaption = document.createElement('figcaption');
  figCaption.textContent = names;

  let figure = document.createElement('figure');
  figure.id = id;
  figure.setAttribute("data-video", id);
  figure.classList.add("animation-element", "slide-up");
  figure.appendChild(anchor);
  figure.appendChild(figCaption);

  return figure;
}

function createMoviesDiv() {
  const moviesDiv = document.querySelector('div.movies');
  let i = 0;
  for (let item in movies) {
    if (movies[item].names == "showreel") {
      continue;
    }
    let currentMovie = createThumbnail(item, movies[item].names, movies[item].link, movies[item].image);
    let delay = i % 3;
    currentMovie.classList.add(`delay${delay}`);
    moviesDiv.appendChild(currentMovie);
    currentMovie.addEventListener('click', pressPlay);
    i++;
  }
}

function loadContent() {
  createModal();
  createMoviesDiv();
  const playShowreel = document.getElementById('showreel');
  playShowreel.addEventListener('click', pressPlay);

  const menuShowreel = document.getElementById('menu-showreel');
  menuShowreel.addEventListener('click', pressPlay);

}
  

/*   const livBrendan = document.getElementById('livBrendan');
livBrendan.addEventListener('click', pressPlay);

const kimSteven = document.getElementById('kimSteven');
kimSteven.addEventListener('click', pressPlay);

const mikeFiona = document.getElementById('mikeFiona');
mikeFiona.addEventListener('click', pressPlay);

const nicolaThomas = document.getElementById('nicolaThomas');
nicolaThomas.addEventListener('click', pressPlay);

const lottieDan = document.getElementById('lottieDan');
lottieDan.addEventListener('click', pressPlay);

const lottieDanSpeeches = document.getElementById('lottieDanSpeeches');
lottieDanSpeeches.addEventListener('click', pressPlay);

const laurenMatt = document.getElementById('laurenMatt');
laurenMatt.addEventListener('click', pressPlay);
*/

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu.style.display == 'flex') {
    mobileMenu.style.display = 'none';
  }
  else {
    mobileMenu.style.display = 'flex';
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.style.display = 'none';
}

function loadMobileContent() {
  const hamburger = document.getElementById('hamburger-a');
  hamburger.addEventListener('click', openMobileMenu);
  const mobileMenuShowreel = document.getElementById('mobile-menu-showreel');
  mobileMenuShowreel.addEventListener('click', pressPlay);
  document.querySelectorAll('.mobile-menu-item').forEach(item => item.addEventListener('click', closeMobileMenu));
}

loadContent();
loadMobileContent();
