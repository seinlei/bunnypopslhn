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

// Execute the following code when the document is ready
$(document).ready(function() 
{
    $('#joke-button').click(function()// listen for joke button click 
    {
        fetchRandomJoke(); // fetch a random joke from API 
    });

    $('.joke-display').click(function() // display joke and close it when clicked 
    {
        $(this).hide(); 
    });
});

// function to fetch a random joke from API
function fetchRandomJoke() {
    console.log("Fetching random joke..."); // log to see if the joke is really fetching
    var limit = 1; // Fetch only one joke

    // used from API site, used the API key from personal account 
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/jokes?limit=' + limit,
        headers: { 'X-Api-Key': '2gM24640NaZeGHGIO/rdpA==LakHSltWExGVGV0C'}, 
        contentType: 'application/json',
        success: function(result) 
        {
            console.log("Joke fetched successfully:", result); // to see the success result in console 
            if (result.length > 0 && result[0].joke) {

                var joke = result[0].joke;
                displayJoke(joke); // display the joke if successfull
            } else {
                console.error('Error: No joke found in the response');
            }
        },
        error: function ajaxError(jqXHR) 
        {
            console.error('Error: ', jqXHR.responseText); // get error message
        }
    });
}

// function to display the joke 
function displayJoke(joke) {
    $('.joke-display').html('<p>' + joke + '</p>').show(); 
}