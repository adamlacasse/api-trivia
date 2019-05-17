const queryURL = `https://opentdb.com/api.php?amount=10`;
// example with query params: https://opentdb.com/api.php?amount=5&category=11&difficulty=easy
const sessionToken = ''

let responseArray = [];
let currentQuestion = 0;
let answers = [];
let numberCorrect = 0;
let numberIncorrect = 0;
let numberTimedOut = 0;

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
    if ($(this).text() === responseArray[currentQuestion].correct_answer) {
        console.log('correct!')
        $("#answers").append(`<button id="next">Next Question</button>`);
    } else {
        console.log('incorrect :-(')
        $("#answers").append(`<button id="next">Next Question</button>`);
    }
})

$(document).on("click", "#next", function(){
    currentQuestion++
    loadQuestion()
})

getGameData()