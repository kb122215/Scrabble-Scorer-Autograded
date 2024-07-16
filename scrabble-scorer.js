// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// Simple scoring function
function simpleScorer(word) {
  return word.length;
}

// Vowel scoring function
function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let score = 0;
  const vowels = ["A", "E", "I", "O", "U"];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some Scrabble!");
  console.log("Enter a word to score: ");
  return input.question();
}

//let simpleScorer;

//let vowelBonusScorer;

//let scrabbleScorer;

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point,",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "Uses the scrabble point system.",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?\n");
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log("2 - Scrabble: Uses scrabble point system");
  const choice = input.question("Enter 0, 1, or 2: ");
  return scoringAlgorithms[choice];
}

function transform(oldStructure) {
  let newStructure = {};
  for (let pointValue in oldStructure) {
    oldStructure[pointValue].forEach((letter) => {
      newStructure[letter.toLowerCase()] = Number(pointValue);
    });
  }
  return newStructure;
}
let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  return score;
}

function runProgram() {
  const word = initialPrompt();
  const selectedAlgorithm = scorerPrompt();
  const score = selectedAlgorithm.scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
