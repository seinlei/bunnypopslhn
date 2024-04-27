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