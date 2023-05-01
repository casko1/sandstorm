let player = null;
let currentVideoId = null;

$(document).ready(function () {
    $("#submit-button").on("click", () => {
        let url = $("#url-input").val();
        if (!player) {
          createPlayer(url)
        } else {
          loadVideo(url)
        }

        resetFields()
    })

    $("#preview-selection").on("click", () => {
      previewSelection()
    })

    $("#detect").on("click", async() => {
      await detectSong()
    })
})

function createPlayer(url) {
  let videoId = url_parser(url)
  currentVideoId = videoId
  player = new YT.Player("player", {
    height: "auto",
    width: "auto",
    videoId: videoId,
    origin: "https://example.com",
    playerVars: {
      "autoplay": 1,
    },
    events: {
      "onReady": onPlayerReady
    }
  });
}

function loadVideo(url) {
  let videoId = url_parser(url)
  currentVideoId = videoId
  player.loadVideoById(videoId)
}

function previewSelection() {
  let startTime = $("#start-ts").val()
  let endTime = $("#end-ts").val()
  player.loadVideoById({
    "videoId": currentVideoId,
    "startSeconds": startTime,
    "endSeconds": endTime
  })
}

function onPlayerReady(event) {
  //createSlider()
  $("#time-selection").css("display", "flex")
}

function url_parser(url){
  let regex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  let match = url.match(regex);
  return (match && match[2].length == 11) ? match[2] : false;
}

function createSlider() {
  document.getElementById("slider");

  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        "min": 0,
        "max": 100
    }
  });
}

function resetFields() {
  $("#start-ts").val("")
  $("#end-ts").val("")
  $("#result").css("display", "none")
}

async function detectSong() {
  let startTime = $("#start-ts").val()
  let endTime = $("#end-ts").val()
  let url = $("#url-input").val()

  let response = await eel.detect(startTime, endTime, url)()
  console.log(response)

  if (response.matches.length > 0) {
    let track = response.track
    $("#result").text("Match found: " + track.title + " by " + track.subtitle)
  } else {
    $("#result").text("Found no matches")
  }

  $("#result").css("display", "flex")
}