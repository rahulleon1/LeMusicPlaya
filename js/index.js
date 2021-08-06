const musicContainer = $(".music-container");
const playBtn = $("#play");
const prevBtn = $("#prev");
const nextBtn = $("#next");
const audio = $("#audio");
const progress = $(".progress");
const progressBar = $(".progress-conatiner")
const cover = $("#cover");
const title = $(".title");

const songs = ["Overtaken", "Very Very Strongest", "Luffy's Fierce Attack", "Before Lights Out", "Kai's Theme", "Rengoku Theme", "Trevor Belmont vs Death", "Light's Theme"];
let songIndex=0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.text(song);
  cover.css("transform", "rotate(0deg)");
  cover.attr("src", "./img/" + song + ".jpg");

  $(".overlay").css("background", 'url("img/' + song + '.jpg") no-repeat center center/cover');
  audio.attr("src", "music/" + song + ".mp3");
    $(".action-btn").css("color", "#b8b8b87e");
}

function pauseSong() {
  musicContainer.removeClass("play");
  $("#play i.fa").removeClass("fa-pause");
  $("#play i.fa").addClass("fa-play");
  audio[0].pause();
}

function playSong() {
  musicContainer.addClass("play");
  $("#play i.fa").removeClass("fa-play");
  $("#play i.fa").addClass("fa-pause");
  audio[0].play();
  audio[0].addEventListener("timeupdate", updateProgress);
}

function prevSong() {
  if (songIndex > 0) {
    --songIndex;
    loadSong(songs[songIndex]);
  } else {
    songIndex = (songs.length - 1);
    loadSong(songs[songIndex]);
  }  
  pauseSong();
}

function nextSong() {
  if (songIndex < (songs.length - 1)) {
    ++songIndex;
    loadSong(songs[songIndex]);
  } else {
    songIndex = 0;
    loadSong(songs[songIndex]);
  }
  pauseSong();
}

function updateProgress(e) {
  const {
    duration,
    currentTime
  } = e.srcElement;
  const progressPercent = Math.floor((currentTime / duration) * 100);
  progress.css("width", progressPercent + "%")
}

function changeProgress() {
  const demo = new FastAverageColor();
  const myColor = demo.getColor($("img")[0]);
  console.log(myColor);
  progress.css("background", myColor.hex);
  $(".action-btn").css("color", myColor.hex);
  $(".music-info .title").css("color", myColor.hex);
}

function setProgress(e) {

  const width = this.clientWidth;
  const clickX = e.offsetX;
  console.log(clickX);
  const duration = audio[0].duration;
  audio[0].currentTime = (clickX / width) * duration;
}


playBtn.click(function () {

  changeProgress();
  
  const isPlaying = musicContainer.hasClass("play");
  if (isPlaying) {
    pauseSong();

  } else {
    playSong();
  }

})

prevBtn.click(function () {
  prevSong();
});

nextBtn.click(function () {
  nextSong();
});

$(".progress-container")[0].addEventListener("click", setProgress);
audio[0].addEventListener("ended", nextSong);

$(document).keydown(function (e) {
  console.log(e.key);

  if (e.key === " ") {

    changeProgress();

    const isPlaying = musicContainer.hasClass("play");
    if (isPlaying) {
      pauseSong();

    } else {
      playSong();
    }

  } else if (e.keyCode == "37") {
    prevSong();
  } else if (e.keyCode == "39") {
    nextSong();
  } else {
    console.log("diff Key");
  }

})
