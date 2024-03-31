document.addEventListener('DOMContentLoaded', function()
{
    const joinButton = document.querySelector('.join');
    const nicknameInput = document.querySelector('#playername');
    const welcomeMessage = document.querySelector('.message');
    const nicknameDisplay = document.querySelector('#nicknamedisplay');
    const nicknameForm = document.querySelector('.container');


joinButton.addEventListener('click', function()
{
    const nickname = nicknameInput.value.trim();

    if (nickname !== '')
    {
        nicknameDisplay.textContent= ' " ' + nickname + ' " ';
        welcomeMessage.style.display = 'block';
        nicknameForm.style.display = 'none'; 

        setTimeout(function()
        {
            window.location.href= 'game.html';
        },
        10000);

        }

    });

});

function playSound()
{
    var audio = document.getElementById("clicksound");
    audio.play();

    var instructionsDiv = document.querySelector('.instructions');
    instructionsDiv.style.display = 'block';
    

    setTimeout (function()
    {
    instructionsDiv.style.display = 'none';
    window.location.href= "game2.html";
    },10000);

};



