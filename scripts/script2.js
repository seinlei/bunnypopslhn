document.addEventListener('DOMContentLoaded', function()
{
    // select elements from DOM 
    const joinButton = document.querySelector('.join');
    const nicknameInput = document.querySelector('#playername');
    const welcomeMessage = document.querySelector('.message');
    const nicknameDisplay = document.querySelector('#nicknamedisplay');
    const nicknameForm = document.querySelector('.container');

// event listen when join button is clicked 

joinButton.addEventListener('click', function()
{
    const nickname = nicknameInput.value.trim(); // get the trim value of the nickname input to avoid blanks 

    // check if the nickname is empty
    if (nickname !== '')
    {
        nicknameDisplay.textContent= ' " ' + nickname + ' " '; // display the nickname in nickname display box 
        welcomeMessage.style.display = 'block'; // display welcome message 
        nicknameForm.style.display = 'none'; // hide the nickname form 

         // Store the nickname in local storage
        localStorage.setItem('nickname', nickname);

        setTimeout(function()
        {
            window.location.href= 'game.html'; // go to game.html after 10 secs 
        },
        10000);

        }
        else {
            // Add error handling for empty nickname input
            alert('Please enter a nickname!');
        }

    });

});

// function to play the sound and show instructions when clicked the start button 

function playSound()
{
    var audio = document.getElementById("clicksound"); // get the audio element by ID
    audio.play(); // paly the audio 

    var instructionsDiv = document.querySelector('.instructions'); // select the instructions 
    instructionsDiv.style.display = 'block'; // display instructions 
    

    // time out function to hide the instructions and go the game2.html after 10 seconds 

                setTimeout (function()
                {

                instructionsDiv.style.display = 'none';
                window.location.href= "game2.html";

                },10000);

};

document.addEventListener("DOMContentLoaded", function() 
{
    // select all elements class named slide
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  // function to show the slide 

  function showSlide(n) 
  {
      slides.forEach((slide, index) => 
      {
          // If the index matches the current slide, display it, else hide it 
          if (index === n) 
          {
              slide.style.display = "block";
          } else {
              slide.style.display = "none";
          }
      });
  }

  // function to display another slide 
  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length; // increment current slide value
      showSlide(currentSlide); // show the nextslide 
  }

  setInterval(nextSlide, 3000); // show the next slide after every 3 seconds 

  showSlide(currentSlide); // first,show the first slide 
});
