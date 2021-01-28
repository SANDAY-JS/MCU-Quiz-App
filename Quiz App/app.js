const quizData = [
  {
    question: "2020年時点、世界興行収入1位の映画作品はどれでしょう？",
    a: "タイタニック",
    b: "アバター",
    c: "アベンジャーズ・エンドゲーム",
    d: "スターウォーズ・フォースの覚醒",
    correct: "c",
  },
  {
    question: "2020年のMCU作品数はいくつだった？",
    a: "0",
    b: "1",
    c: "2",
    d: "3",
    correct: "a",
  },
  {
    question:
      "YouTubeにおけるMCU作品の予告編で、最も再生回数が多いのはどれでしょうか？",
    a: "インフィニティ・ウォー１つ目の予告編",
    b: "インフィニティ・ウォー２つ目の予告編",
    c: "エンドゲーム１つ目の予告編",
    d: "エンドゲーム２つ目の予告編",
    correct: "a",
  },
  {
    question: "エンドゲームでのサノスのセリフは次のうちどれ？",
    a: "I am Ironman.(私はアイアンマンだ)",
    b: "I am inevitable.(私は絶対だ)",
    c: "I am mighty.(私は最強だ)",
    d: "I am equilibrium.(私は均衡を保つ者だ)",
    correct: "b",
  },
  {
    question:
      "2021年公開作品『ブラック・ウィドウ』の舞台の一つである、ブダペストは、どこの国の首都でしょう？",
    a: "ウルグアイ",
    b: "ベラルーシ",
    c: "クロアチア",
    d: "ハンガリー",
    correct: "d",
  },
  {
    question: "サノスの故郷である惑星はどれ？",
    a: "ノーウェア",
    b: "タイタン",
    c: "アスガルド",
    d: "ヴォーミア",
    correct: "b",
  },
];

let currentQuestion = 0;
let trueAnswers = 0;
let currentReview = -1;
let startBtn;

const aboveContainer = document.getElementById("above-container");
const quizContainer = document.querySelector(".quiz-container");
const quizText = document.querySelector("h2.quiz-title");
const ul = document.querySelector("ul");
const li = ul.querySelectorAll("li");
const choiceA = document.querySelector(".a ~ label");
const choiceB = document.querySelector(".b ~ label");
const choiceC = document.querySelector(".c ~ label");
const choiceD = document.querySelector(".d ~ label");
const submit = document.querySelector("button.btn1");
const reviewBtn = document.querySelector("button.btn2");

const resultBox = document.createElement("div");
quizContainer.appendChild(resultBox);
resultBox.classList.add("result-box");

let answersArray = [];
const correctArray = [];

function loadQuiz() {
  const currentQuizData = quizData[currentQuestion];

  quizText.innerHTML = currentQuizData.question;
  choiceA.innerHTML = currentQuizData.a;
  choiceB.innerHTML = currentQuizData.b;
  choiceC.innerHTML = currentQuizData.c;
  choiceD.innerHTML = currentQuizData.d;
}

function returnAnswer() {
  const answerEls = document.querySelectorAll(".answer");
  const currentQuizData = quizData[currentQuestion];
  let answer = undefined;

  // Check the answer
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.classList[1];

      for (i in currentQuizData) {
        if (i == answer) {
          const alphabet = currentQuizData[i];
          answersArray.push(alphabet);
        }
      }
    }
  });

  return answer;
}

function startQuiz() {
  quizContainer.style.display = "none";

  startBtn = document.createElement("button");
  startBtn.setAttribute("id", "start-btn");
  startBtn.innerHTML = "Challenge";
  aboveContainer.appendChild(startBtn);
}

function showQuizes() {
  quizContainer.style.display = "flex";
  startBtn.style.display = "none";
}

function checkProcess(e) {
  if (submit.classList.contains("challenge-again")) {
    currentQuestion = 0;
    trueAnswers = 0;

    quizText.style.display = "block";
    ul.style.display = "block";
    reviewBtn.style.display = "none";
    submit.classList.remove("challenge-again");
    submit.innerText = "送信";
    loadQuiz();
  } else {
    // Check the error, goes the next question or finish
    if (e) {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuiz();
      } else {
        quizText.innerHTML = ` ${quizData.length} 問中 ${trueAnswers} 問正解！`;
        ul.style.display = "none";
        submit.innerHTML = "もう一度挑戦する";
        submit.classList.add("challenge-again");
        reviewBtn.style.display = "flex";
      }
    }
  }
}

function checkSubmit() {
  if (!submit.classList.contains("challenge-again")) {
    // execute a function
    const answer = returnAnswer();

    // Check if the answer is correct
    if (answer == quizData[currentQuestion].correct) {
      trueAnswers++;
    }

    checkProcess(answer);

    // Reset Radio Button
    let radioBtn = document.getElementsByName("answer");
    for (let i = 0; i < radioBtn.length; i++) radioBtn[i].checked = false;
  } else {
    answersArray = [];
    checkProcess();
  }
}

// Review
function goToReview() {
  currentReview++;

  const currentQuizData = quizData[currentReview];

  if (currentReview === 0) {
    // button processing
    resultBox.style.display = "flex";
    quizText.style.display = "none";
    submit.style.display = "none";
    reviewBtn.style.justifyContent = "flex-end";
    reviewBtn.innerText = "次へ";
  } else if (currentReview >= quizData.length) {
    resultBox.style.display = "none";
    reviewBtn.style.display = "none";
    reviewBtn.innerText = "答え合わせをする";
    reviewBtn.style.justifyContent = "center";
    submit.style.display = "inline-block";
    currentReview = -1;
  }

  if (
    answersArray[currentReview] === currentQuizData[correctArray[currentReview]]
  ) {
    trueOrFalse = "far fa-circle";
  } else {
    trueOrFalse = "fas fa-times";
  }

  resultBox.innerHTML = "";
  resultBox.innerHTML = `
  <div class="question-number-and-tf">
    <i class="${trueOrFalse}"></i>
    <p>${currentReview + 1}問目</p>
  </div>
  <div class="review-contents">
    <div class="question-review">
      <p class="review-kind">質問</p>
      <p class="review-centence">${currentQuizData.question}</p>
      </div>
    <div class="answer-review">
      <p class="review-kind">あなたの回答</p>
      <p class="review-centence">${answersArray[currentReview]}</p>
      </div>
    <div class="correct-review">
      <p class="review-kind">正解</p>
      <p class="review-centence">${
        currentQuizData[correctArray[currentReview]]
      }</p>
    </div>
  </div>
  `;
}

// correct thing. you know.
function pushCorrectAnswers() {
  for (i = 0; i < quizData.length; i++) {
    const correctAnswer = quizData[i].correct;
    correctArray.push(correctAnswer);
  }
}

// ----------------------------------
// ----------  Events  --------------
// ----------------------------------

// Initial Func
startQuiz();
loadQuiz();
pushCorrectAnswers();

startBtn.addEventListener("click", showQuizes);
submit.addEventListener("click", checkSubmit);
reviewBtn.addEventListener("click", goToReview);
