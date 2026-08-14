const songImage = document.getElementById('songImage');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.getElementById('audio');
const previous = document.getElementById('previous')
const play = document.getElementById('play-pause');
const next = document.getElementById('next');
const playList = document.querySelector('.play-list');

const songs = [
    {
        id: 0,
        image: "images/biggie.jpg",
        title: "Juicy",
        audio: "music/biggie.mp3",
        artist: "Biggie smalls"
    },
    {
        id: 1,
        image: "images/tupac.jpg",
        title: "Hail Mary",
        audio: "music/pac.mp3",
        artist: "Tupac"
    },
    {
        id: 2,
        image: "images/em.jpg",
        title: "Till I Collapse",
        audio: "music/em.mp3",
        artist: "Eminem"
    },

];

let playing = 0;

function currentSong() {

    const current = songs[playing];

    songImage.src = current.image;
    audio.src = current.audio;
    title.textContent = current.title;
    artist.textContent = current.artist;

    audio.play();
    play.textContent = "Play";
}
currentSong();

previous.addEventListener('click', () => {

    if (playing > 0) {
        playing--;
        currentSong();
    }
    console.log("previous");
    play.textContent = "Pause";

});

play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        play.textContent = "Pause";

    } else {
        audio.pause();
        play.textContent = "Play";
    }

});

next.addEventListener('click', () => {
    if (playing < songs.length - 1) {
        playing++;
        currentSong();
        play.textContent = "Pause";
    }
    console.log("next");
    console.log(songs.length);
    console.log(playing);

});

function pList() {
    playList.innerHTML = "";

    songs.forEach(song => {
        const playlistDiv = document.createElement('div');
        playlistDiv.id = 'playlistDiv';
        playlistDiv.innerHTML = `
         <img src="${song.image}" width="30px" height="30px"></img>
         <br>
         <audio src="${song.audio}"></audio>
        
         <p>${song.title} -</p>
         <p>${song.artist}</p>
        
`



        const playBtn = document.createElement('button');
        playBtn.id = 'playBtn';
        playBtn.addEventListener('click', () => {

            playing = song.id;

            console.log(song.id);
            currentSong();
            play.textContent = "Pause";
        })

        playBtn.appendChild(playlistDiv);
        playList.appendChild(playBtn);
    });
}
pList();