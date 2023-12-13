const questions = [
    {
        question: "Which is largest State in India?",
        answers: [
            { text: "New Delhi", correct: false},
            { text: "Rajasthan", correct: true},
            { text: "Karnataka", correct: false},
            { text: "UttarPradesh", correct: false},
        ]
    },
    {
        question: "Which is Smallest State in India?",
        answers: [
            { text: "Goa", correct: true},
            { text: "TamilNadu", correct: false},
            { text: "Assam", correct: false},
            { text: "Kerala", correct: false},
        ]
    },
    {
        question: "India Present Prime Minister...",
        answers: [
            { text: "H D DeveGowda", correct: false},
            { text: "Manmohan Singh", correct: false},
            { text: "Narendra Modi", correct: true},
            { text: "Indira Gandhi", correct: false},
        ]
    },
    {
        question: "Longest River of India...",
        answers: [
            { text: "Ganga River", correct: true},
            { text: "Yamuna River", correct: false},
            { text: "Brahmaputra", correct: false},
            { text: "Indus River", correct: false},
        ]
    },

]   ;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You Participated Well...';
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
