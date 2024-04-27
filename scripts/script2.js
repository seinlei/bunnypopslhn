//  stat javascript for timer, bunny display and score tracking

document.addEventListener('DOMContentLoaded', function() 
{
    // call each parts by queryselector 
    const gridHoles = document.querySelectorAll('.hole');
    const timerBox = document.querySelector('.timerbox');
    const scoreDisplay = document.querySelector('.score-display');
    const gameHide = document.querySelector('#gamehide');
    const backgroundAudio = document.getElementById('bgplay');
    
    // Define variables for the game timer, score, and intervals for moving bunnies
    if (gridHoles && gridHoles.length > 0) {
    let timer = 30; // start value for timer 
    let timerInterval; // variable to store the timerInterval
    let score = 0; // start value for score 
    let moveBunniesInterval = null; // variable to store in interval for function move bunnies 
     let intervalUpdated = false; // to track if the interval is being updated for the last 10 seconds

    const shuffledHoles = shuffle(Array.from(gridHoles));

    // Function to generate a random number for bunnies holes

    function getRandomNumber(min, max) 
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to shuffle the elements of an array
    function shuffle(array) 
    {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array; // return shuffle array
    }

    // Function to display bunnies in random holes and add event listeners for score tracking
    function displayBunnies() 
    {
        const shuffledHoles = shuffle(gridHoles);
        const hole = shuffledHoles[0];
        const bunnyGrid = document.createElement('div'); // create div element
        bunnyGrid.classList.add('bunnygrid');// named class of div element to bunnygrid
        hole.appendChild(bunnyGrid); // append the bunny grid to the seletced hole 
        bunnyGrid.addEventListener('click', trackScores); // event listener for scores to track when the bunny is clickked
    }

    // Function to move bunnies
    function moveBunnies() 
    {
        const bunnies = document.querySelectorAll('.bunnygrid'); // select an div class element called bunnygrid

         // Remove the 'clicked' bunnies from all holes 

        bunnies.forEach(bunny => 
            {
            bunny.classList.remove('clicked');
        });

        // Remove any bunnies from grid holes
        gridHoles.forEach(hole => 
            {
            if (hole.children.length > 0) {
                hole.removeChild(hole.children[0]);
            }
        });

        // moving bunnies to random holes 
        bunnies.forEach(bunny => 
            {
             // Select a random hole from the shuffled holes array
            const randomHole = shuffledHoles[getRandomNumber(0, shuffledHoles.length - 1)];
            randomHole.appendChild(bunny); // append the bunny to the randeom hole 
        });

    }

    // function to track scores when a bunny is clicked
    function trackScores() 
    {
        score++;
        updateScoreDisplay(); // update score display
        this.classList.add('clicked'); // add the clicked class to the clciked bunny grid 
    }

    // function to count timer 
    function countTimer() 
    {
        timerBox.textContent = `⏲️: ${timer}`;
    }

    // function to start timer 
    function startTimer() 
    {
        // Set an interval to decrement the timer every second to 0
        timerInterval = setInterval(() => 
        {
            if (timer > 0) 
            {
                timer--;
                countTimer(); // count timer 

                // Log timer and moveBunniesInterval for debugging in console
                 console.log("Timer:", timer, "Interval:", moveBunniesInterval);

                  // Update the interval to 1000 for moving bunnies when timer is 10 or less
                 if (timer <= 10 && !intervalUpdated) 
                 {
                    clearInterval(moveBunniesInterval); // clear the current interval
                    moveBunniesInterval = setInterval(moveBunnies, 1000); // update interval 
                    intervalUpdated = true; 
                    console.log("Interval updated"); // log interval update to check if the interval is really update or not
                }
            }
            else {
                // Clear the timer interval when timer reaches 0
                clearInterval(timerInterval);

                // display the score
                displayScore();

                // background audio stop when the timer ends 
                backgroundAudio.pause();
            }
        }, 1000); // run the intervaal for every 1 secs
        backgroundAudio.play(); // play the backgroundaudio when playing the game
    }

    // function to update the scores
    function updateScoreDisplay() {
        const scoreElement = document.getElementById('score'); // select the score element by ID 
        scoreElement.textContent = score; // update text content
    }

    // function to display the final score
    function displayScore() 
    {
        // hide the game elements to display the scores only
        gameHide.style.display = 'none';
        scoreDisplay.style.display = 'block';
        updateScoreDisplay(); // update score display
    }

    // calling the functions to start the game 
    displayBunnies(); // display bunnies in random grid holes 
    moveBunniesInterval = setInterval(moveBunnies, 1500); // start the bunny speed at 1500 set interval
    startTimer(); // start the timer from 30 
}
else {
    console.error("No elements with class 'hole' found.");
}
});

