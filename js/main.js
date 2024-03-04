$(document).ready(function() {
    // Constants
    const colors = ['green', 'red', 'blue', 'yellow'];
    const audioFiles = {
      green: 'sounds/green.mp3',
      red: 'sounds/red.mp3',
      blue: 'sounds/blue.mp3',
      yellow: 'sounds/yellow.mp3'
    };
  
    // Variables
    let gamePattern = [];
    let userClickedPattern = [];
    let level = 0;
    let highScore = 0;
    let gameStarted = false;
  
    // Functions
    function playSound(color) {
      let audio = new Audio(audioFiles[color]);
      audio.play();
    }
  
    function animatePress(color) {
      $(`.tile[data-tile="${color}"]`).addClass('pressed');
      setTimeout(() => {
        $(`.tile[data-tile="${color}"]`).removeClass('pressed');
      }, 100);
    }
  
    function nextSequence() {
      userClickedPattern = [];
      level++;
      $('#level').text(level);
      let randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColor = colors[randomNumber];
      gamePattern.push(randomChosenColor);

      gamePattern.forEach((color, index) => {
        setTimeout(() => {
          playSound(color);
          animatePress(color);
        }, 600 * index);
      });
    }
  
    function checkAnswer(currentLevel) {
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
          if (level === 12) {
            $('#info').text('Congratulations! You won the game!');
            $('#play').prop('disabled', false);
            startOver();
          } else {
            setTimeout(() => {
              nextSequence();
            }, 1000);
          }
        }
      } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
          $('body').removeClass('game-over');
        }, 200);
        $('#info').text('Game Over! Click PLAY to restart.');
        if (level > highScore) {
          highScore = level - 1;
          $('#high-score').text(highScore);
        }
        startOver();
      }
    }
  
    function startOver() {
      gamePattern = [];
      level = 0;
      gameStarted = false;
    }
  

    $('#play').on('click', function() {
      if (!gameStarted) {
        gameStarted = true;
        $('#play').prop('disabled', true);
        $('#info').text('');
        nextSequence();
      }
    });
  
    $('.tile').on('click', function() {
      if (gameStarted) {
        let userChosenColor = $(this).data('tile');
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
      }
    });
  });
  