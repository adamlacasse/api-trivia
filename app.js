const queryURL = `https://opentdb.com/api.php?amount=5`;
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

    $("#wins").text(`Correct Answers: ${numberCorrect}`);
    $("#losses").text(`Incorrect Answers: ${numberIncorrect}`);

    console.log(responseArray[currentQuestion])
    answers = responseArray[currentQuestion].incorrect_answers
    if (responseArray[currentQuestion].type !== 'boolean') {
        answers.splice(getRandomInt(answers.length), 0, responseArray[currentQuestion].correct_answer)
    } else {
        answers = ['True', 'False']
    }
    $("#question").html(responseArray[currentQuestion].question)
    answers.forEach(e => {
        $("#answers").append(`<button class="btn btn-dark answer" data-toggle="modal" data-target="#resultModal">${e}</button>`)
    });
}

const afterAnswer = () => {
    if (currentQuestion < responseArray.length - 1) {
        return true;
    } else {
        console.log('THE END')
        $("#message").html(`<h2>The End. Thanks for Playing</h2>`)
    }
}

$(document).on("click", ".answer", function () {
    if (!questionAnswered) {
        clearInterval(timer)
        countdown = 20;
        if ($(this).text() === responseArray[currentQuestion].correct_answer) {
            console.log('correct!')
            numberCorrect++;
            afterAnswer()
            // $("#response")
            $("#resultModalLabel").html(`<h3>That's correct!</h3>`)
        } else {
            console.log('incorrect :-(')
            numberIncorrect++;
            afterAnswer()
            $("#resultModalLabel").html(`<h3>Nope</h3>`)
        }
        $("#wins").text(`Correct Answers: ${numberCorrect}`);
        $("#losses").text(`Incorrect Answers: ${numberIncorrect}`);
        questionAnswered = true;
    }
})

$(document).on("click", ".close-modal", function () {
    console.log('clicked')
    questionAnswered = false;
    currentQuestion++
    loadQuestion()
    $("#timer").text(`Timer: ${countdown}`);
    $("#response").empty();
})

getGameData()