const container = document.querySelector(".container")
const image = document.querySelector("#music-image")
const audio = document.querySelector("#audio")
const title = document.querySelector("#music-details .title")
const singer = document.querySelector("#music-details .singer")
const prev = document.querySelector("#prev")
const play = document.querySelector("#play")
const next = document.querySelector("#next")
const duration = document.querySelector("#duration")
const currentTime = document.querySelector("#current-time")
const progressBar = document.querySelector("#progress-bar")
const volume = document.querySelector("#volume")
const volumeBar = document.querySelector("#volume-bar")



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

    const isMusicPlay = container.classList.contains("playing")
    isMusicPlay ? pauseMusic() : playMusic();
});


prev.addEventListener("click",() =>{prevMusic()})

const prevMusic = () =>{

    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

next.addEventListener("click",() =>{nextMusic()})

const nextMusic = () =>{

    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}


const playMusic = () =>{
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause"

    audio.play();
}


const pauseMusic = ()=>{
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play"
    audio.pause();
}


audio.addEventListener("loadedmetadata",() =>{
    duration.textContent = calculateTime(audio.duration)
    progressBar.max = Math.floor(audio.duration)
})

audio.addEventListener("timeupdate", ()=>{
    progressBar.value = Math.floor(audio.currentTime)
    currentTime.textContent = calculateTime(progressBar.value)
})

const calculateTime = (totalSeconds) =>{
    const minute = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const updatedSecond = seconds < 10 ? `0${seconds}` : `${seconds}`
    const sonuc = `${minute}:${updatedSecond}`
    return sonuc;
}


progressBar.addEventListener("input", () =>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})


let muteState = "unmuted"
volume.addEventListener("click",() =>{
    if(muteState =="unmuted"){
        audio.muted = true;
        muteState = "muted"
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0
    }else{
        audio.muted = false;
        muteState = "unmuted"
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value = 100
    }
})


volumeBar.addEventListener("input",(e) =>{
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0){
        audio.muted = true;
        muteState = "muted"
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value = 0
    }else{
        audio.muted = false;
        muteState = "unmuted"
        volume.classList = "fa-solid fa-volume-high"
    }
})
