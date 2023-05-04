const nameOfUser = localStorage.getItem('user-name');
const quizData = [
  {
    questions: "Who won the 2018 world cup?",
    a: "Croatia",
    b: "Argentina",
    c: "France",
    d: "Nigeria",
    correct: "c",
  },
  {
    questions:
      "Which player was the highest goal scorer in the 2022 world cup?",
    a: "Kylian Mbappe",
    b: "Harry Kane",
    c: "Lionel Messi",
    d: "Enzo Fernandez",
    correct: "a",
  },
  {
    questions: "Which player won the golden glove at the 2022 world cup?",
    a: "Alisson Becker",
    b: "Emiliano Martinez",
    c: "Hugo Lloris",
    d: "Lionel Messi",
    correct: "b",
  },
  {
    questions: "Who won the golden ball at the 2018 wolrd cup?",
    a: "Kylian Mbappe",
    b: "Christiano ronaldo",
    c: "Luka Modric",
    d: "Paul Pogba",
    correct: "c",
  },
  {
    questions: "Who beat Argentina in the group stage?",
    a: "Qatar",
    b: "Australia",
    c: "Saudi Arabia",
    d: "Ghana",
    correct: "c",
  },
  {
    questions: "What was the scoreline of England vs Senegal?",
    a: "1 - 0",
    b: "2 - 0",
    c: "3 - 0",
    d: "2 - 1",
    correct: "c",
  },
  {
    questions: "What was the scoreline of Ghana vs South Korea?",
    a: "1 - 0",
    b: "3 - 2",
    c: "0 - 2",
    d: "1 - 1",
    correct: "b",
  },
  {
    questions: "Which African country reached the world cup semi-final?",
    a: "Cameroun",
    b: "Morocco",
    c: "Senegal",
    d: "Ghana",
    correct: "b",
  },
  {
    questions: "How many goals did Mbappe sore in the 2022 world cup final?",
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    correct: "c",
  },
  {
    questions: "How many goals did Ronaldo score in the 2022 world cup?",
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    correct: "a",
  },
];


const questionTxt = document.getElementById("question");
const quiz = document.getElementById("quiz");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const answersEls = document.querySelectorAll(".answer");

let currentQuestion = 0;

let score = 0;
// Initializing stopwatch as the page loads
const startingMinutes = 1;
let time = startingMinutes * 60;
const countdwn = document.getElementById("countdown");
function updateCount() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (time >= 0) {
    time--;
    if (seconds == 0 || seconds < 10) {
      countdwn.innerHTML = `0${minutes}:0${seconds}`;
      if (minutes == 0 && seconds == 0) {
        if (score < 5) {
          countdwn.remove();
          quiz.innerHTML = `<h2>Try Again ${nameOfUser.toUpperCase()}!! You answered ${score}/${quizData.length} questions  correctly.</h2><button onclick="location.reload()">RETAKE THE QUIZ</button>`;
        } else {
          countdwn.remove();
          quiz.innerHTML = `<h2>Nicely Done ${nameOfUser.toUpperCase()}!! You answered ${score}/${quizData.length} questions  correctly. Well done</h2><button onclick="location.reload()">RETAKE THE QUIZ</button>`;
        }
      }
    } else {
      countdwn.innerHTML = `0${minutes}:${seconds}`;
    }
  }
}
window.addEventListener(
  "load",
  () => {
    setInterval(updateCount, 1000);
  },
  { once: true }
);

loadQuiz();
function loadQuiz() {
  deSelectAns();
  const currentQuizData = quizData[currentQuestion];
  questionTxt.innerHTML = currentQuizData.questions;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

// checking if a radio is checked or not
function getSelected() {
  let answer = undefined;
  answersEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

// for deselecting a radio button on when the next quiz is loaded
function deSelectAns() {
  answersEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

// SUBMIT BUTTON
submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;
    if (answer) {
      if (currentQuestion < quizData.length) {
        loadQuiz();
      } else {
        if (score < 5) {
          countdwn.remove();
          quiz.innerHTML = `<h2>Try Again ${nameOfUser.toUpperCase()}!! You answered ${score}/${quizData.length} questions  correctly.</h2>
          <button onclick="location.reload()">RETAKE THE QUIZ</button>`;
        } else {
          countdwn.remove();
          quiz.innerHTML = `<h2>Nicely Done ${nameOfUser.toUpperCase()}!! You answered ${score}/${quizData.length} questions  correctly. Well done</h2>
          <button onclick="location.reload()">RETAKE THE QUIZ</button>`;
        }
      }
    }
  }
});
