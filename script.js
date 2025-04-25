const quizDiv = document.getElementById('quiz');
const loadBtn = document.getElementById('loadBtn');

async function loadQuiz() {
  quizDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch("https://api.fs-quiz.eu/api/questions/random");
    const data = await res.json();

    quizDiv.innerHTML = `
      <div class="question"><strong>${data.question}</strong></div>
    `;

    data.choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;

      btn.onclick = () => {
        if (index === data.answer) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("incorrect");
        }

        document.querySelectorAll(".choice-btn").forEach(b => b.disabled = true);
      };

      quizDiv.appendChild(btn);
    });
  } catch (error) {
    quizDiv.innerHTML = "<p>Failed to load quiz. Please try again.</p>";
    console.error(error);
  }
}

loadBtn.addEventListener("click", loadQuiz);
window.onload = loadQuiz;
