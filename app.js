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

const reshuffleArray = (arr) => {
    var ctr = arr.length,
        temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

const loadGame = () => {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        responseArray = response.results
        console.log(responseArray[currentQuestion])
        answers = responseArray[currentQuestion].incorrect_answers
        answers.push(responseArray[currentQuestion].correct_answer)
        if (responseArray[currentQuestion].type !== 'boolean') {
            reshuffleArray(answers)
        }
        $("#question").html(responseArray[currentQuestion].question)
        answers.forEach(e => {
            $("#answers").append(`<button>${e}</button>`)
        });
    });
}

loadGame()