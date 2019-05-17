const queryURL = `https://opentdb.com/api.php?amount=10`;
// example with query params: https://opentdb.com/api.php?amount=5&category=11&difficulty=easy
const sessionToken = ''

let responseArray = [];
let currentQuestion = 0;
let answers = [];
let numberCorrect = 0;
let numberIncorrect = 0;
let numberTimedOut = 0;
let timer;
let countdown = 20;
let questionAnswered = false;

const getCategories = () => {
    $.ajax({
        url: 'https://opentdb.com/api_category.php',
        method: 'GET'
    }).then(function (res) {
        console.log(res)
    })
}

const getSessionToken = () => {
    $.ajax({
        url: 'https://opentdb.com/api_token.php?command=request',
        method: 'GET'
    }).then(function (res) {
        sessionToken = res
    })
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const getGameData = () => {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        responseArray = response.results
        loadQuestion()
    });
}

const loadQuestion = () => {
    timer = setInterval(function () {
        --countdown
        $("#timer").text(`Timer: ${countdown}`);
    }, 1000)
    $("#question").empty();
    $("#answers").empty();

    console.log(responseArray[currentQuestion])
    answers = responseArray[currentQuestion].incorrect_answers
    if (responseArray[currentQuestion].type !== 'boolean') {
        answers.splice(getRandomInt(answers.length), 0, responseArray[currentQuestion].correct_answer)
    } else {
        answers = ['True', 'False']
    }
    $("#question").html(responseArray[currentQuestion].question)
    answers.forEach(e => {
        $("#answers").append(`<button class="answer">${e}</button>`)
    });
}

$(document).on("click", ".answer", function () {
    if (!questionAnswered) {
        clearInterval(timer)
        countdown = 20;
        if ($(this).text() === responseArray[currentQuestion].correct_answer) {
            console.log('correct!')
            numberCorrect++;
            $("#answers").append(`<button id="next">Next Question</button>`);
        } else {
            console.log('incorrect :-(')
            numberIncorrect++;
            $("#answers").append(`<button id="next">Next Question</button>`);
        }
        $("#wins").text(`Correct Answers: ${numberCorrect}`);
        $("#losses").text(`Incorrect Answers: ${numberIncorrect}`);
        questionAnswered = true;
    }
})

$(document).on("click", "#next", function () {
    questionAnswered = false;
    currentQuestion++
    loadQuestion()
    $("#timer").text(`Timer: ${countdown}`);
})

getGameData()