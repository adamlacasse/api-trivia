const queryURL = `https://opentdb.com/api.php?amount=10`;
// example with query params: https://opentdb.com/api.php?amount=5&category=11&difficulty=easy
const sessionToken = ''

let questions = [];
let currentQuestion = 0;

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

const loadGame = () => {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response.results)
        questions = response.results
        console.log(questions[currentQuestion])
        $("#question").html(questions[currentQuestion].question)
        questions[currentQuestion].incorrect_answers.forEach(e => {
            $("#answers").append(`<button>${e}</button>`)
        });
        $("#answers").append(`<button>${questions[currentQuestion].correct_answer}</button>`)
    });
}

loadGame()