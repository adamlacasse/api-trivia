const queryURL = `https://opentdb.com/api.php?amount=10`;
let questions = [];
let currentQuestion = 0;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    // console.log(response.results)
    questions = response.results
    // console.log(questions[currentQuestion])
    $("#question").text(questions[currentQuestion].question)
});

