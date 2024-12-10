let timeRemaining = 300;
let score = 0;
let hintCount = 0;
const maxHints = 4;
let correctSuspect = Math.floor(Math.random() * 8); // Randomly choose one suspect
let currentClueIndex = 0;

const suspects = [
  {
    name: "Jared aka 'Quick-Draw'",
    backstory: `
      Jared is a notorious gunslinger who once rode with the infamous Dust Devils gang. 
      Known for his lightning-fast draw and steady hand, Jared left the gang after a bitter fallout. 
      Some say he’s been trying to go straight, but others whisper about his mounting gambling debts in Deadwood.
    `,
    clues: [
      "A boot print with a spur mark was found near the train’s rear car.",
      "Witnesses reported seeing a man wearing a hat with a bullet hole in the brim.",
      "A piece of torn leather from a holster was left near the safe.",
      "The faint smell of gunpowder lingered in the air long after the robbery."
    ]
  },
  {
    name: "Gabrielle aka 'Locks'",
    backstory: `
      Gabrielle, a former saloon girl turned safecracker, has a knack for breaking into the toughest vaults. 
      Her charm is rivaled only by her cunning, but Gabrielle's known to hold grudges. 
      After a recent altercation with the train company, rumors started swirling about her seeking revenge.
    `,
    clues: [
      "A silk handkerchief, embroidered with roses, was discarded near the passenger car.",
      "The train conductor mentioned hearing the faint jingle of bracelets as someone passed.",
      "A faint whiff of lavender perfume hung in the air near the baggage car.",
      "A broken lockpick was found jammed in the safe's keyhole."
    ]
  },
  {
    name: "Khervy aka 'The Bull'",
    backstory: `
      A burly ranch hand with a quick temper, Khervy was recently fired from the governor's estate. 
      He has a reputation for being strong but not too bright, and many suspect he harbors a grudge.
    `,
    clues: [
      "Scuff marks from boots were found leading toward the gold car.",
      "A crumpled note with barely legible handwriting was left in the dining car.",
      "Someone mentioned hearing angry muttering near the freight door.",
      "A belt buckle with a cattle brand insignia was discovered under a seat."
    ]
  },
  {
    name: "Danielle aka 'The Widow'",
    backstory: `
      A mysterious widow who travels frequently, Danielle is always dressed in mourning black. 
      Rumors suggest she has a hidden past with ties to outlaw gangs, though nothing has ever been proven.
    `,
    clues: [
      "A faint trace of cigar smoke lingered in the air after the heist.",
      "A small bottle of laudanum was found among the stolen artifacts.",
      "A lace glove was found near the scene of the crime.",
      "A passenger recalled seeing someone in black slipping away during the commotion."
    ]
  },
  {
    name: "Griffin aka 'The Drifter'",
    backstory: `
      A wandering prospector with a history of train hopping, Griffin has been in and out of trouble for years. 
      His quick tongue and nimble fingers have saved him more than once, but his loyalty is always questioned.
    `,
    clues: [
      "A dusty hat with a broken brim was left behind near the cargo hold.",
      "A trail of coal dust led away from the gold vault.",
      "Someone noticed a faint jingling sound, like loose coins, coming from the dining car.",
      "A makeshift map of the train’s layout was found under an empty seat."
    ]
  },
  {
    name: "Lisa aka 'The Ace'",
    backstory: `
      A card shark with a reputation for winning and disappearing just as quickly, Lisa has been banned from every major saloon in the West. 
      Her clever mind and sleight of hand make her both dangerous and unpredictable.
    `,
    clues: [
      "The faint smell of whiskey lingered near the dining car.",
      "A silver coin, was found on the floor.",
      "A witness spotted a figure in a red dress disappearing into the night.",
      "A playing card was left wedged in the lock of the train’s safe."
    ]
  },
  {
    name: "Gabe aka 'The Preacher'",
    backstory: `
      A former preacher turned wandering storyteller, Gabe claims to be on a mission to spread good morals. 
      However, his fiery sermons have drawn suspicion, and some believe he’s hiding a criminal past.
    `,
    clues: [
      "The faint scent of pipe tobacco lingered in the air.",
      "A discarded flask of moonshine was found near the freight door.",
      "Someone recalled hearing a loud voice just before the robbery.",
      "A page torn from a Bible was found near the crime scene."
    ]
  },
  {
    name: "Zain aka 'The Fox'",
    backstory: `
      A former actress with a knack for deception, Zain uses her beauty and wit to outsmart her foes. 
      She has been spotted in the company of outlaws on more than one occasion, but no charges have ever stuck.
    `,
    clues: [
      "A faint scent of rosewater perfume lingered in the train’s corridors.",
      "A red feather was found near the baggage car.",
      "A discarded play bill was found crumpled under a seat.",
      "A handkerchief with embroidered initials T.F. was discovered near the safe."
    ]
  }
];

const suspectsList = document.getElementById("suspects-list");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const hintText = document.getElementById("hint-text");
const endScreen = document.getElementById("end-screen");
const endMessage = document.getElementById("end-message");
const mainMenu = document.getElementById("game-container");
const suspectsPage = document.getElementById("suspects-page");
const suspectsButton = document.getElementById("suspects-button");
const backButton = document.getElementById("back-button");
const hintButton = document.getElementById("hint-button");

suspects.forEach((suspect, index) => {
  const suspectDiv = document.createElement("div");
  suspectDiv.classList.add("suspect");
  suspectDiv.innerHTML = `
    <h4>${suspect.name}</h4>
    <p>${suspect.backstory}</p>
    <button class="suspect-button" data-index="${index}">Accuse</button>
  `;
  suspectsList.appendChild(suspectDiv);
});

const timer = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
  } else {
    clearInterval(timer);
    endGame(false);
  }
}, 1000);

suspectsButton.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  suspectsPage.classList.remove("hidden");
});

backButton.addEventListener("click", () => {
  suspectsPage.classList.add("hidden");
  mainMenu.classList.remove("hidden");
});

hintButton.addEventListener("click", () => {
  if (hintCount < maxHints) {
    const hint = suspects[correctSuspect].clues[currentClueIndex];
    hintText.textContent = `Hint ${hintCount + 1}: ${hint}`;
    currentClueIndex = (currentClueIndex + 1) % suspects[correctSuspect].clues.length;
    hintCount++;
    score -= 5;
    scoreDisplay.textContent = score;
  } else {
    hintText.textContent = "No more hints available!";
  }
});

document.querySelectorAll(".suspect-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const suspectIndex = parseInt(event.target.dataset.index);
    if (suspectIndex === correctSuspect) {
      score += 15;
      endGame(true);
    } else {
      score -= 10;
      scoreDisplay.textContent = score;
      alert("Incorrect suspect! Try again.");
    }
  });
});

function endGame(won) {
  clearInterval(timer);
  mainMenu.classList.add("hidden");
  suspectsPage.classList.add("hidden");
  endScreen.classList.remove("hidden");

  const suspect = suspects[correctSuspect];
  endMessage.innerHTML = won
    ? `Congratulations! You caught the culprit: ${suspect.name}. <br> Final Score: ${score}`
    : `Time's up! The culprit was ${suspect.name}. <br> Final Score: ${score}`;
}
