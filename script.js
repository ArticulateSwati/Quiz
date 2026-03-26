const questions=[
    {
        question:"Javascript is which type of language?",
        answers:[
            {text:"statically type",correct:false},
            {text:"Dynamiically type",correct:true},
            {text:"None of these",correct:false},
            {text:"Both A and B",correct:false},
        ]
    },

    {
        question:"On which day Jharkhand is Established?",
        answers:[
            {text:"15 NOV,2000",correct:true},
            {text:"15 Aug,2000",correct:false},
            {text:"14 Sept,2000",correct:false},
            {text:"18 Sept 2000",correct:false},
        ]
    },

    {
        question:"Which is the Largest Animal in the world?",
        answers:[
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"You",correct:false},
            {text:"Your Best Friend",correct:false},
        ]
    },

    {
        question:"Most lazy person in the world?",
        answers:[
            {text:"You",correct:false},
            {text:"Your Sister",correct:false},
            {text:"Your Best Friend",correct:false},
            {text:"Depends upon situation",correct:true},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("Answers-btn");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const  button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
        button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");

        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();