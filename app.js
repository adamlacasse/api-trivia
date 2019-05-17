const queryURL = `https://opentdb.com/api.php?amount=10`;
let questions = [];
let currentQuestion = 0;

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

