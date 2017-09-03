
let button = document.querySelector(".button");
let song = document.querySelector(".container");
let rec = document.querySelector("#input");
let body = document.querySelector("body");
let audioSource = document.querySelector("audio");

body.addEventListener("click", function playMusic(e) {
    if(e.target && e.target.matches("img")){
        audioSource.src = e.target.getAttribute('data-music');
        audioSource.load();
        audioSource.play();
    }
});

button.addEventListener("click", function searchSongs() {

  fetch("https://itunes.apple.com/search?term=" + rec.value)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(res) {
          console.log("results is:", response);
          let template = "";
          res.results.forEach(function(data) {
            console.log(data);
            template += `
              <div song class="song">
                <img src="${data.artworkUrl100}" data-music="${data.previewUrl}">
                <dl>
                <dd>ARTIST: </dd> <dt>${data.artistName}</dt>
                <dd>TRACK:</dd> <dt>${data.trackName}</dt>
              </dl>
              </div>`;
          song.innerHTML = template;
        });
          }).catch(function(err) {
            console.log("Fetch Error :-S", err);
            })
      });
})
