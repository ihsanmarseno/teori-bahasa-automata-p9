const readline = require("readline");

// Definisi transisi
const transitions = {
  0: { K: 1 },
  1: { a: 2, u: 3 },
  2: { k: 4 },
  3: { k: 6 },
  4: { a: 5, e: 7, i: 8, u: 9 },
  5: {}, // Kaka
  6: { u: 9 },
  7: { k: 10 },
  8: {}, // Kaki
  9: {}, // Kuku, Kaku
  10: {}, // Kakek
};

// State yang diterima
const acceptStates = [5, 8, 9, 10];

function isValid(input) {
  let currentState = 0;
  for (let char of input) {
    if (
      !transitions[currentState] ||
      transitions[currentState][char] === undefined
    ) {
      //   console.log("if", transitions[currentState][char]);
      return false;
    }
    // console.log("for", transitions[currentState][char]);
    currentState = transitions[currentState][char];
    // console.log("currentState", currentState);
  }
  //   console.log(acceptStates.includes(currentState));
  return acceptStates.includes(currentState);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser() {
  rl.question('Masukkan kata (atau ketik "exit" untuk keluar): ', (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const result = isValid(input) ? "valid" : "tidak valid";
    console.log(`Kata "${input}" adalah ${result}.`);
    promptUser();
  });
}

console.log("Program DFA Validator Kata");
console.log("Kata yang valid: Kuku, Kaki, Kakek, Kaka, Kaku");
promptUser();
