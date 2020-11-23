let readlineSync = require("readline-sync");

const categories = {
  easy: [
    "ace",
    "age",
    "ape",
    "won",
    "yes",
    "ton",
    "son",
    "lot",
    "ton",
    "men",
    "boy",
    "red",
    "new",
    "out",
    "ash",
    "leaf",
    "wave",
    "four",
    "buzz",
    "cozy",
    "vine",
    "mice",
    "loop",
    "fall",
    "zoom",
    "chow",
    "fuzzy",
    "juice",
    "jerk",
    "joke",
    "jumps",
    "maze",
    "joker",
    "night",
    "shade",
  ],
  medium: [
    "about",
    "above",
    "books",
    "board",
    "frame",
    "fruit",
    "games",
    "model",
    "mouse",
    "power",
    "price",
    "touch",
    "adorns",
    "blonde",
    "couple",
    "effort",
    "either",
    "selfish",
    "garage",
    "belongs",
    "clinics",
    "freezer",
    "jealous",
    "notepad",
    "pathway",
    "sensory",
  ],
  hard: [
    "tarzans",
    "therapy",
    "warmish",
    "zodiacs",
    "yanking",
    "woesome",
    "voltage",
    "bermudas",
    "calamari",
    "dentists",
    "deployed",
    "disguise",
    "headlock",
    "headache",
    "prevailing",
    "objective",
    "Honorificabilitudinitatibus",
    "Antidisestablishmentarianism",
    "Hippopotomonstrosesquippedaliophobia",
    "spectrophotofluorometrically",
    "pseudopseudohypoparathyroidism",
    "pneumonoultramicroscopicsilicovolcanoconiosis",
    "floccinaucinihilipilification",
    "supercalafragilisticexpialidocious",
  ],
};

const hangmanImage = [
  `
  |---------|
  |         |
            |
            |
            |
            |
            |
            |
  ===============`,

  `
  |---------|
  |         |
  O         |
            |
            |
            |
            |
            |
  ===============`,

  `
  |---------|
  |         |
  O         |
  |         |
  |         |
            |
            |
            |
  ===============`,

  `
  |---------|
  |         |
  O         |
 /|         |
  |         |
            |
            |
            |
  ===============`,

  `
  |---------|
  |         |
  O         |
 /|\\        |
  |         |
            |
            |
            |
  ===============`,

  `
  |---------|
  |         |
  O         |
 /|\\        |
  |         |
 /          |
            |
            |
  ===============`,

  `
  |---------|
  |         |
  O         |
 /|\\        |
  |         |
 / \\        |
            |
            |
  ===============`,
];

let correctWord = "";
let placeholderArray = [];
let failNumber = 0;
let letterPlacement = [];

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function gameInit() {
  console.log(
    "Welcome to the game of Hangman! A game where you have a limited amount of guesses before you reach doomsday. You will be provided a set of empty dashes depending on your difficulty level. With this, you will guess the word by typing one letter at a time until you guess the word correctly or until you run out of guesses. Good luck!"
  );

  const difficultyLevel = ["Easy", "Medium", "Hard"];
  let index = readlineSync.keyInSelect(
    difficultyLevel,
    "Choose your level of difficulty."
  );

  switch (difficultyLevel[index]) {
    case "Easy":
      console.log(
        `Okay, ${difficultyLevel[0]} is the difficulty level you chose.`
      );
      console.log(
        "You are given a random word below. Please choose wisely as you have 6 tries!"
      );
      correctWord = categories.easy[getRandom(categories.easy.length)]; //returns random easy word
      break;
    case "Medium":
      console.log(
        `Okay, ${difficultyLevel[1]} is the difficulty level you chose.`
      );
      console.log(
        "You are given a random word below. Please choose wisely as you have 6 tries!"
      );
      correctWord = categories.medium[getRandom(categories.medium.length)]; //returns random medium word
      break;
    case "Hard":
      console.log(
        `Okay, ${difficultyLevel[2]} is the difficulty level you chose.`
      );
      console.log(
        "You are given a random word below. Please choose wisely as you have 6 tries!"
      );
      correctWord = categories.hard[getRandom(categories.hard.length)]; //returns random hard word
      break;
    default:
      console.log("Please make a selection.");
  }

  placeholderArray.length = 0;
  for (let i = 0; i < correctWord.length; i++) {
    placeholderArray.push("_");
  }
  console.log();

  console.log(`\nThe word has ${correctWord.length} letters. `);
  console.log(placeholderArray.join("_ ") + "_"); //displays _ per character
  let letter = readlineSync.question(`\nGuess your letter:  `).toLowerCase();
  checkWord(letter);
}

function win() {
  console.log("YOU WIN! 🎉 You guessed the word correctly!");
}

function lose() {
  console.clear();
  console.log(`YOU LOSE! 💀 The correct word was ${correctWord}. Try again.`);
}

function checkWord(letter) {
  let word;
  let letterGuessed = 0;
  let letterArray = [];
  let playAgain;
  let placeholder = [];

  for (let i = 0; i < 6; i++) {
    if (letter.length > 1 && letter === correctWord) {
    } else {
      if (letterArray.includes(letter)) {
        console.log(
          `You already typed that letter. Letters typed: ( ${letterArray})\n`
        );
        i--;
      } else {
        let word = findLetter(letter, correctWord);
        if (word.length > 0) {
          for (let i = 0; i < word.length; i++) {
            placeholderArray[word[i]] = letter;
            letterGuessed++;
          }
          letterArray.push(letter);
          console.clear();
          console.log(hangmanImage[failNumber]); //display hangman array if they got correct
          let placeholderString = "";
          for (let i = 0; i < placeholderArray.length; i++) {
            placeholderString += placeholderArray[i];
            placeholderString += " ";
          }
          console.log(placeholderString);
          i--;
        } else {
          console.clear();
          letterArray.push(letter);
          failNumber++;
          console.log(hangmanImage[failNumber]); //display the next element in hangman array because they got it wrong
          let placeholderString = "";
          for (let i = 0; i < placeholderArray.length; i++) {
            placeholderString += placeholderArray[i];
            placeholderString += " ";
          }
          console.log(placeholderString);
        }
      }

      if (failNumber >= 6) {
        lose(); //create you lose function to clear console and display that you lost
        playAgain = readlineSync.question("Do you want to play again? y/n:   ");
        playAgainFunc(playAgain);
        break;
      } else if (letterGuessed === correctWord.length) {
        win(); //create function
        playAgain = readlineSync.question("Do you want to play again? y/n:   ");
        playAgainFunc(playAgain);
        break;
      } else {
        letter = readlineSync
          .question(`\n Please type your next letter:  `)
          .toLowerCase();
      }
    }
  }
}

function findLetter(letter, correctWord) {
  letterPlacement.length = 0;
  for (let i = 0; i < correctWord.length; i++) {
    if (letter === correctWord[i]) {
      letterPlacement.push(i);
    }
  }
  return letterPlacement;
}

function playAgainFunc(option) {
  while (option.toLowerCase() !== "y" && option.toLowerCase() !== "n") {
    option = readline.question("Do you want to play again? y/n:   ");
  }

  if (option.toLowerCase() === "y") {
    console.clear();
    console.log(option);
    gameInit();
  } else {
    console.log(option);
    console.log("\nGreat game! Hope to see you back soon! 🙂\n");
  }
}

gameInit();
