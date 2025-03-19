// Setting Game Name

let gameName = "Guess The Word Game";
document.title = gameName;
document.querySelector("h1").innerText = gameName;
document.querySelector(
  "footer"
).innerText = `${gameName} Game Created by: Waleed Salah`;

// Sitting Game Options
let numberOfGuesses = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
// Managed Words
let wordToGuess = "";
const words = [
  "Planet",
  "School",
  "Branch",
  "Silent",
  "Listen",
  "Strong",
  "Bottle",
  "Spring",
  "Travel",
  "Silver",
];
let messageArea = document.querySelector(".message");
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// Managed Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  // Create Main Try Div
  for (let i = 1; i <= numberOfGuesses; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    // Create Inputs
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `Guess-${i}letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
  // Display All Inputs Except First One
  const inputsInDisabledDivs = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDivs.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert Input Value to UpperCase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target);
      // console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const previousInput = currentIndex - 1;
        if (previousInput >= 0) inputs[previousInput].focus();
      }
    });
  });
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handelGuess);
console.log(wordToGuess);
function handelGuess() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputFiled = document.getElementById(
      `Guess-${currentTry}letter-${i}`
    );
    const letter = inputFiled.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actualLetter) {
      // letter is in place
      inputFiled.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // letter is not in place
      inputFiled.classList.add("not-in-place");
      successGuess = false;
    } else {
      // letter is not in the word
      inputFiled.classList.add("no");
      successGuess = false;
    }
  }
  // Check if the word is correct
  if (successGuess) {
    messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>Congratz You Did It Without Hints 🎉</p>`;
    }
    // Disable All Inputs
    let allTryis = document.querySelectorAll(".inputs > div");
    allTryis.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

    guessButton.disabled = true;
    getHintButton.disabled = true;

    guessButton.style.backgroundColor = "green";
  } else {
    document
      .querySelector(`.try${currentTry}`)
      .classList.add("disabled-inputs");

    const currentTryInputs = document.querySelectorAll(
      `.try${currentTry} input`
    );

    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try${currentTry}`);
    if (el) {
      document
        .querySelector(`.try${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
}
function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  console.log(enabledInputs);
  const enptyEnabeldInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  // console.log(enptyEnabeldInputs);
  if (enabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * enptyEnabeldInputs.length);
    // console.log(randomIndex);
    const randomInput = enptyEnabeldInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    // console.log(indexToFill);
    // console.log(randomInput);
    // console.log(randomIndex);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}
function handelBachSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    // console.log(currentIndex);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const previousInput = inputs[currentIndex - 1];
      currentInput.value = "";
      previousInput.value = "";
      previousInput.focus();
    }
  }
}
document.addEventListener("keydown", handelBachSpace);

window.onload = function () {
  generateInput();
};
