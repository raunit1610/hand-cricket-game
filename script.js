var start = false; //Check If Game Started

var systemBat = 0; //Keeping Track At System Score at System Turn
var userBat = 0; //Keeping Track At User Score at User Turn

var userOut = 0; //Flag To Check User Out Status at User Turn
var systemOut = 0; //Flag To Check System Out Status at System Turn

var turn = 0; //Check Whose Batting Turn

//Function To Fliker
function gameOver()
{
    if(!start)
    {
        setTimeout(function (){
            $("img").fadeIn(100).fadeOut(300).fadeIn(100);
        },100);
        start = true;
    }
}

//Start Game Function (Toss Function)
$(document).on("click",".start",function(){

    gameOver()
    $(this).after('<button class = "btn-toss" id = "odd">ODD</button>');
    $(this).after('<button class = "btn-toss" id = "even">EVEN</button>');
    $(this).remove();  
})

//Check If Who Won The Toss, and What Selects To Do First
$(document).on("click",".btn-toss",function(){
    var userSelection = $(this).attr("id");
    var randomUser = Math.floor((Math.random()*10)+1);
    var randomSystem = Math.floor((Math.random()*10)+1);

    switch(randomUser){
        case 1:
            $(".container-image-2 > img").attr("src","./images/1.jpeg");
            break;
        case 2:
            $(".container-image-2 > img").attr("src","./images/2.jpeg");
            break;
        case 3:
            $(".container-image-2 > img").attr("src","./images/3.jpeg");
            break;
        case 4:
            $(".container-image-2 > img").attr("src","./images/4.jpeg");
            break;
        case 5:
            $(".container-image-2 > img").attr("src","./images/5.jpeg");
            break;
        case 6:
            $(".container-image-2 > img").attr("src","./images/6.jpeg");
            break;
        case 7:
            $(".container-image-2 > img").attr("src","./images/7.jpeg");
            break;
        case 8:
            $(".container-image-2 > img").attr("src","./images/8.jpeg");
            break;
        case 9:
            $(".container-image-2 > img").attr("src","./images/9.jpeg");
            break;
        case 10:
            $(".container-image-2 > img").attr("src","./images/10.jpeg");
            break;
        default:
            break;
    }

    switch(randomSystem){
        case 1:
            $(".container-image-1 > img").attr("src","./images/1.jpeg");
            break;
        case 2:
            $(".container-image-1 > img").attr("src","./images/2.jpeg");
            break;
        case 3:
            $(".container-image-1 > img").attr("src","./images/3.jpeg");
            break;
        case 4:
            $(".container-image-1 > img").attr("src","./images/4.jpeg");
            break;
        case 5:
            $(".container-image-1 > img").attr("src","./images/5.jpeg");
            break;
        case 6:
            $(".container-image-1 > img").attr("src","./images/6.jpeg");
            break;
        case 7:
            $(".container-image-1 > img").attr("src","./images/7.jpeg");
            break;
        case 8:
            $(".container-image-1 > img").attr("src","./images/8.jpeg");
            break;
        case 9:
            $(".container-image-1 > img").attr("src","./images/9.jpeg");
            break;
        case 10:
            $(".container-image-1 > img").attr("src","./images/10.jpeg");
            break;
        default:
            break;
    }

    if (((randomUser + randomSystem) % 2 == 0 && userSelection == "even") || ((randomUser + randomSystem) % 2 == 1 && userSelection == "odd")) {
                $("body > h2").text("User Won The Toss");
                $(".btn-toss#odd").after('<button class="btn-result" id="bat">BAT</button>');
                $(".btn-toss#odd").after('<button class="btn-result" id="bowl">BOWL</button>');
                $(".btn-toss#odd").remove();
                $(".btn-toss#even").remove();
            } else {
                var rand = Math.floor((Math.random() * 2) + 1);
                if(rand === 1)
                {
                    $("body > h2").text("System Won The Toss and Choose To Bat");
                    turn = 3;
                    systemOut = 0;
                }else{
                    $("body > h2").text("System Won The Toss and Choose To Bowl");
                    turn = 4;
                    userOut = 0;
                }
                for(let i = 10;i > 0;i--)
                {
                    $(".btn-toss#odd").after(`<button class = "btn" id = "${i}">${i}</button>`);
                }
                $(".btn-toss#odd").remove();
                $(".btn-toss#even").remove();
            }  
})

//Check If User Selected To Bat Or Bowl First
$(document).on("click",".btn-result",function (){
    var resultSelection = $(this).attr("id");
    if(resultSelection == "bat")
    {
        turn = 1;
        userOut = 0;
    }else if(resultSelection == "bowl"){
        turn = 2;
        systemOut = 0;
    }
    buttonsCreation();
})

//Creating Scoring Buttons
function buttonsCreation()
{
    for(let i = 10;i > 0;i--)
    {
        $(".btn-result#bat").after(`<button class = "btn" id = "${i}">${i}</button>`);
    }
    $(".btn-result#bowl").remove();
    $(".btn-result#bat").remove();
}

//System Selected Image Display
function systemInput(randomNumber) {
    $(".container-image-1 > img").attr("src", `./images/${randomNumber}.jpeg`);
}

//User Turn Batting Function
function userBatting(buttonValue) {
    var randomSystem = Math.floor((Math.random() * 10) + 1);

    if (userOut == 1) { // Check if user is out
        systemBatting(buttonValue,randomSystem);
        return; // Exit if user is out
    }

    if (buttonValue != randomSystem) {
        userBat += Number(buttonValue);
        $("body > h2").text(`User Made ${userBat} Runs`);
        systemInput(randomSystem);
    } else {
        // User gets out
        $("body > h2").text(`User is Out! Final Score: ${userBat}`);
        systemInput(randomSystem);
        userOut = 1; // Set user as out
        setTimeout(function (){
            $("body > h2").text("Its System Turn Now, Choose Your First Move.");
        },1500);
        return;
    }
}

//User Turn Bowling Function
function systemBatting(buttonValue,randomSystem) {
    
    if (userOut == 1) { // Check if user is out
        if (buttonValue != randomSystem) {
            systemBat += randomSystem;
            $("body > h2").text(`System Made ${systemBat} Runs`);
            systemInput(randomSystem);

            // Check if system wins
            if (userBat < systemBat) {
                $("body > h2").text(`System Won The Match`);
                systemInput(randomSystem);
                setTimeout(function () {
                    endGame();
                },2000);
            }
        } else {
            // System gets out
            $("body > h2").text(`System is Out! Final Score: ${systemBat}`);
            systemInput(randomSystem);

            if (userBat > systemBat) {
                $("body > h2").text(`User Won The Match`);
                systemInput(randomSystem);
                setTimeout(function () {
                    endGame();
                },2000);
            }
            else{
                $("body > h2").text(`Match Draw`);
                setTimeout(function () {
                    endGame();
                },2000);
            }
        }
    }
}

//System Turn Batting Function
function systemBatting1(buttonValue)
{
    var randomSystem = Math.floor((Math.random() * 10) + 1);

    if (systemOut == 1) { // Check if System is out
        userBatting1(buttonValue,randomSystem);
        return; // Exit if System is out
    }
    
    if (buttonValue != randomSystem) {
        systemBat += randomSystem;
        $("body > h2").text(`System Made ${systemBat} Runs`);
        systemInput(randomSystem);
    } else {
        // System gets out
        $("body > h2").text(`System is Out! Final Score: ${systemBat}`);
        systemInput(randomSystem);
        systemOut = 1; // Set System as out
        setTimeout(function (){
            $("body > h2").text("Its User Turn Now, Choose Your First Move.");
        },1500);
        return;
    }
}

//System Turn Bowling Function
function userBatting1(buttonValue,randomSystem)
{
    if (systemOut == 1) { // Check if system is out
        if (buttonValue != randomSystem) {
            userBat += Number(buttonValue);
            $("body > h2").text(`User Made ${userBat} Runs`);
            systemInput(randomSystem);

            // Check if user wins
            if (systemBat < userBat) {
                $("body > h2").text(`User Won The Match`);
                systemInput(randomSystem);
                setTimeout(function () {
                    endGame();
                },2000);
            }
        } else {
            // User gets out
            $("body > h2").text(`User is Out! Final Score: ${userBat}`);
            systemInput(randomSystem);

            if (systemBat > userBat) {
                $("body > h2").text(`System Won The Match`);
                systemInput(randomSystem);
                setTimeout(function () {
                    endGame();
                },2000);
            }
            else{
                $("body > h2").text(`Match Draw`);
                setTimeout(function () {
                    endGame();
                },2000);
            }
        }
    }
}

//Game Ending Function
function endGame() {
    turn = 0; // End the game
    $(".btn#10").after('<button class="start">Start</button>'); // Add start button
    $(".btn").remove(); // Remove all buttons
    $("img").attr("src","./images/start.png");//Add start.png image
    $("body > h2").text("Press Space To Start");
    start = false; // Reset the start flag
    systemBat = 0;
    userBat = 0;
}

//Check For Buttons Input
$(document).on("click", ".btn", function () {
    var buttonValue = $(this).attr("id");
    $(".container-image-2 > img").attr("src", `./images/${buttonValue}.jpeg`);
    if ((turn == 1) || (turn == 4)) {
        userBatting(buttonValue);
    }else if((turn == 2) || (turn == 3))
    {
        systemBatting1(buttonValue);
    }
});

// Keypress Handling for numbers 1-9
$(document).on("keypress", function (e) {
    var key = e.which || e.keyCode;
    if (key >= 49 && key <= 57) { // Number keys 1-9
        var buttonValue = String.fromCharCode(key);
        $(".container-image-2 > img").attr("src", `./images/${buttonValue}.jpeg`);
        if ((turn == 1) || (turn == 4)) {
            userBatting(buttonValue);
        } else if ((turn == 2) || (turn == 3)) {
            systemBatting1(buttonValue);
        }
    } else if (key == 32 && !start) { // Spacebar to start
        $(".start").click();
    }
});

// Keydown Handling for number 10
$(document).on("keydown", function (e) {
    var key = e.which || e.keyCode;
    if (key == 48 && e.shiftKey) { // Shift + 0 for 10
        var buttonValue = "10";
        $(".container-image-2 > img").attr("src", `./images/${buttonValue}.jpeg`);
        if ((turn == 1) || (turn == 4)) {
            userBatting(buttonValue);
        } else if ((turn == 2) || (turn == 3)) {
            systemBatting1(buttonValue);
        }
    }
});
