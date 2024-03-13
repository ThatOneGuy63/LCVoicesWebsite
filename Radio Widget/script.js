document.addEventListener("DOMContentLoaded", function() {
  var btn = document.querySelector(".playPauseButton");
  var audioPlayer = document.getElementById("audioPlayer");

  btn.addEventListener("click", function() {
    btn.classList.toggle("paused");
    togglePlayPause(); // Call the function to toggle play/pause
  });

  // Function to toggle play/pause
  function togglePlayPause() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      btn.textContent = 'Pause';
    } else {
      audioPlayer.pause();
      btn.textContent = 'Play';
    }
  }

  // Update button text and style when audio state changes
  audioPlayer.addEventListener('play', function () {
    btn.textContent = 'Pause';
  });

  audioPlayer.addEventListener('pause', function () {
    btn.textContent = 'Play';
  });
});
