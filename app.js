const container = document.querySelector(".container")
const image = document.querySelector("#music-image")
const audio = document.querySelector("#audio")
const title = document.querySelector("#music-details .title")
const singer = document.querySelector("#music-details .singer")
const prev = document.querySelector("#prev")
const play = document.querySelector("#play")
const next = document.querySelector("#next")



const player = new MusicPlayer(musicList);




window.addEventListener("load", () =>{
    let music = player.getMusic();
    displayMusic(music);
})

function displayMusic(music){
    title.innerText = music.title;
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;

}


play.addEventListener("click", () =>{
    audio.play();
})

