document.addEventListener('DOMContentLoaded', function() {
    const gridHoles = document.querySelectorAll('.hole');
    const timerBox = document.querySelector('.timerbox');
    const scoreDisplay = document.querySelector('.score-display');
    const gameHide = document.querySelector('#gamehide');
    const backgroundAudio = document.getElementById('bgplay');
    let timer = 30;
    let timerInterval;
    let score = 0;
    let moveBunniesInterval; 

    const shuffledHoles = shuffle(Array.from(gridHoles));

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function displayBunnies() {
        const shuffledHoles = shuffle(gridHoles);
        const hole = shuffledHoles[0];
        const bunnyGrid = document.createElement('div');
        bunnyGrid.classList.add('bunnygrid');
        hole.appendChild(bunnyGrid);
        bunnyGrid.addEventListener('click', trackScores);
    }

    function moveBunnies() {
        const bunnies = document.querySelectorAll('.bunnygrid');

        bunnies.forEach(bunny => {
            bunny.classList.remove('clicked');
        });
       
        gridHoles.forEach(hole => {
            if (hole.children.length > 0) {
                hole.removeChild(hole.children[0]);
            }
        });

        bunnies.forEach(bunny => {
            const randomHole = shuffledHoles[getRandomNumber(0, shuffledHoles.length - 1)];
            randomHole.appendChild(bunny);
        });

    }

    function trackScores() {
        score++;
        updateScoreDisplay();

        this.classList.add('clicked'); 
    }

    function countTimer() {
        timerBox.textContent = `⏲️: ${timer}`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timer > 0) {
                timer--;
                countTimer();

                if (timer <= 10 && !moveBunniesInterval) {
                    clearInterval(moveBunniesInterval);
                    moveBunniesInterval = setInterval(moveBunnies, 800);
                }
            } 
            else {
                clearInterval(timerInterval);
                displayScore();
                backgroundAudio.pause();
            }
        }, 1000);
        backgroundAudio.play();
    }

    function updateScoreDisplay() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = score;
    }

    function displayScore() {
        gameHide.style.display = 'none';
        scoreDisplay.style.display = 'block';
        updateScoreDisplay();
    }

    displayBunnies();
    moveBunniesInterval = setInterval(moveBunnies, 1500);
    startTimer();
});

$(document).ready(function() {
    $('#joke-button').click(function() {
        fetchRandomJoke();
    });

    $('.joke-display').click(function() {
        $(this).hide(); 
    });
});

function fetchRandomJoke() {
    console.log("Fetching random joke...");
    var limit = 1; // Fetch only one joke
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/jokes?limit=' + limit,
        headers: { 'X-Api-Key': '2gM24640NaZeGHGIO/rdpA==LakHSltWExGVGV0C'}, 
        contentType: 'application/json',
        success: function(result) {
            console.log("Joke fetched successfully:", result);
            if (result.length > 0 && result[0].joke) {
                var joke = result[0].joke;
                displayJoke(joke);
            } else {
                console.error('Error: No joke found in the response');
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function displayJoke(joke) {
    $('.joke-display').html('<p>' + joke + '</p>').show(); 
}

