const queryURL = `https://opentdb.com/api.php?amount=10`;
// example with query params: https://opentdb.com/api.php?amount=5&category=11&difficulty=easy
const sessionToken = ''

let responseArray = [];
let currentQuestion = 0;
let answers = [];

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

const loadGame = () => {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        responseArray = response.results
        console.log(responseArray[currentQuestion])
        answers = responseArray[currentQuestion].incorrect_answers
        if (responseArray[currentQuestion].type !== 'boolean') {
            answers.splice(getRandomInt(answers.length), 0, responseArray[currentQuestion].correct_answer)
        } else { answers = ['True', 'False'] }
        $("#question").html(responseArray[currentQuestion].question)
        answers.forEach(e => {
            $("#answers").append(`<button>${e}</button>`)
        });
    });
}

loadGame()