const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// song titles

const songs = ['Happier','SomeoneYouLoved']

// keep track of songs 

let songsIndex = 0

//initially load song info DOM

laodSong(songs[songsIndex])

//update song details 
function laodSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `image/${song}.jpeg`   
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()

}

function prevSong() {
    songsIndex--

    if(songsIndex < 0) {
        songsIndex = songs.length - 1
    }

    laodSong(songs[songsIndex])

    playSong()
}
function nextSong() {
    songsIndex++

    if(songsIndex > songs.length - 1) {
        songsIndex = 0
    }

    laodSong(songs[songsIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
// event listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    }else{
        playSong()
    }
})

// change song events 

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)
