const monsterNameList = [
  "Grumpy Gremlin",
  "Sneaky Sock Stealer",
  "Loitering Llama",
  "Dramatic Dragon",
  "Caffeinated Centaur",
  "Bureaucratic Banshee",
  "Giggling Goblin",
  "Napping Necromancer",
  "Procrastinating Pixie",
  "Forgetful Frankenstein",
  "Jittery Jinn",
  "Mischievous Mermaid",
  "Annoyed Unicorn",
  "Boisterous Basilisk",
  "Clumsy Cyclops",
  "Dancing Djinni",
  "Eavesdropping Elf",
  "Fickle Fairy",
  "Gregarious Ghoul",
  "Hilarious Harpy",
  "Invisible Imp",
  "Jovial Jackalope",
  "Klutzy Kraken",
  "Lazy Leprechaun",
  "Mumbling Mummy",
  "Nervous Nymph",
  "Overthinking Ogre",
  "Picky Phoenix",
  "Quirky Quetzalcoatl",
  "Rambunctious Roc"
];
let heroName = "";
let heroLevel = 0;
let heroAttack = 0;
let heroDefense = 0;
let monsterName = "";
let monsterLevel = 0;
let monsterAttack = 0;
let monsterDefense = 0;

//Business Logic
function generateRandomValue(max) {
  return Math.floor(Math.random() * max);
}

function countHeroAttack(heroRace, heroWeapon, heroArmor, heroLevel) {
  let heroAttack = 0;
  heroAttack = heroLevel;
  switch (heroRace) {
    case "humans":
      heroAttack += 1;
      heroDefense += 0;
      break;
    case "elves":
      heroAttack += 2;
      break;
    case "dwarves":
      heroAttack += 0;
      break;
    case "halflings":
      heroAttack -= 1;
      break;
    default:
      heroAttack += 0;
      break;
  }
  switch (heroWeapon) {
    case "broadSword":
      heroAttack += 2;
      break;
    case "dancingSword":
      heroAttack += 1;
      break;
    case "bastardSword":
      heroAttack += 3;
      break;
    case "rapier":
      heroAttack += 2;
      break;
    default:
      heroAttack += 0;
      break;
  }
  switch (heroArmor) {
    case "sandals":
      heroAttack -= 1;
      break;
    case "armor":
      heroAttack += 0;
      break;
    case "hat":
      heroAttack -= 5;
      break;
    case "boots":
      heroAttack -= 2;
      break;
    default:
      heroAttack += 0;
      break;
  }

  return heroAttack;

}

function countHeroDefense(heroRace, heroWeapon, heroArmor, heroLevel) {
  let heroDefense = 0;
  heroDefense = heroLevel;
  switch (heroRace) {
    case "humans":
      heroDefense += 0;
      break;
    case "elves":
      heroDefense -= 1;
      break;
    case "dwarves":
      heroDefense += 1;
      break;
    case "halflings":
      heroDefense += 0;
      break;
    default:
      heroDefense += 0;
      break;
  }
  switch (heroWeapon) {
    case "broadSword":
      heroDefense -= 3;
      break;
    case "dancingSword":
      heroDefense += 0;
      break;
    case "bastardSword":
      heroDefense -= 4;
      break;
    case "rapier":
      heroDefense -= 1;
      break;
    default:
      heroDefense += 0;
      break;
  }
  switch (heroArmor) {
    case "sandals":
      heroDefense += 2;
      break;
    case "armor":
      heroDefense += 1;
      break;
    case "hat":
      heroDefense += 3;
      break;
    case "boots":
      heroDefense += 4;
      break;
    default:
      heroDefense += 0;
      break;
  }

  return heroDefense;
}

function battleLogic(heroLevel, heroAttack, heroDefense, monsterLevel, monsterAttack, monsterDefense) {
  if ((heroLevel + heroAttack + heroDefense - monsterLevel - monsterAttack - monsterDefense) > 0)
    return 1;
  else if ((heroLevel + heroAttack + heroDefense - monsterLevel - monsterAttack - monsterDefense) < 0)
    return -1;
  else return 0;
}


//UI Logic
function generateHeroLevel() {
  const max = 10;
  document.getElementById("heroLevel").innerText = generateRandomValue(max);
  document.querySelector("button#submitHeroForm").classList.remove("hidden");
  document.querySelector("button#clearHeroForm").classList.remove("hidden");
}

function populateUIWIthValues(name, nameID, level, levelID, attack, attackID, defense, defenseID) {
  document.getElementById(nameID).innerText = name;
  document.getElementById(levelID).innerText = level.toString();
  document.getElementById(attackID).innerText = attack.toString();
  document.getElementById(defenseID).innerText = defense.toString();

}

function disableHeroForm() {
  document.querySelector("button#clearHeroForm").classList.add("hidden");
  document.querySelector("button#submitHeroForm").classList.add("hidden");
  document.querySelector("input#humansRace").setAttribute("disabled", "true");
  document.querySelector("input#elvesRace").setAttribute("disabled", "true");
  document.querySelector("input#dwarvesRace").setAttribute("disabled", "true");
  document.querySelector("input#halflingsRace").setAttribute("disabled", "true");
  document.getElementById("weapon").setAttribute("disabled", "true");
  document.getElementById("armor").setAttribute("disabled", "true");
  document.getElementById("nameOfHero").setAttribute("disabled", "true");
  document.querySelector("button#generateHeroLevelButton").setAttribute("disabled", "true");
}

function handleHeroForm(e) {
  e.preventDefault();
  const heroRace = document.querySelector("input[name='heroRace']:checked").value;
  const heroWeapon = document.getElementById("weapon").value;
  const heroArmor = document.getElementById("armor").value;
  heroName = document.getElementById("nameOfHero").value;
  heroLevel = parseInt(document.getElementById("heroLevel").innerText);
  heroAttack = countHeroAttack(heroRace, heroWeapon, heroArmor, heroLevel);
  heroDefense = countHeroDefense(heroRace, heroWeapon, heroArmor, heroLevel);
  disableHeroForm();
  if (heroName === '' || heroName.length === 0) {
    populateUIWIthValues("Unknown hero", "heroNameInBattle", heroLevel, "heroLevelInBattle", heroAttack, "heroAttackInBattle", heroDefense, "heroDefenseInBattle");
  }
  else {
    populateUIWIthValues(heroName, "heroNameInBattle", heroLevel, "heroLevelInBattle", heroAttack, "heroAttackInBattle", heroDefense, "heroDefenseInBattle");
  }
  document.getElementById("battle").classList.remove("hidden");

}

function generateMonster() {
  monsterName = monsterNameList[generateRandomValue(30)];
  monsterLevel = generateRandomValue(heroLevel + heroAttack + heroDefense);
  monsterAttack = generateRandomValue(heroLevel + heroAttack);
  monsterDefense = generateRandomValue(heroLevel + heroDefense);

  populateUIWIthValues(monsterName, "monsterNameInBattle", monsterLevel, "monsterLevelInBattle", monsterAttack, "monsterAttackInBattle", monsterDefense, "monsterDefenseInBattle");
  document.querySelector("button#battleButton").classList.remove("hidden");
  document.querySelector("p#resultText").classList.add("hidden");
  document.querySelector("button#resetGame").classList.add("hidden");
}

function handleBattle() {
  const battleResult = battleLogic(heroLevel, heroAttack, heroDefense, monsterLevel, monsterAttack, monsterDefense);
  if (battleResult === 1 && heroName !== '')
    document.querySelector("span#battleResult").innerText = heroName + " hero";
  else if (battleResult === 1 && heroName === '')
    document.querySelector("span#battleResult").innerText = "Unknown hero";
  else if ((battleResult === -1))
    document.querySelector("span#battleResult").innerText = monsterName + " monster";
  else
    document.querySelector("span#battleResult").innerText = "Nobody";
  document.querySelector("button#resetGame").classList.remove("hidden");
  document.querySelector("p#resultText").classList.remove("hidden");
}

function resetHeroUI() {
  document.querySelector("input[name='heroRace'][value='humans']").checked = true;
  document.getElementById("weapon").value = "noWeapon";
  document.getElementById("armor").value = "noArmor";
  document.getElementById("nameOfHero").value = "";
  document.getElementById("heroLevel").innerText = "_________";
  document.querySelector("input#humansRace").removeAttribute("disabled");
  document.querySelector("input#elvesRace").removeAttribute("disabled");
  document.querySelector("input#dwarvesRace").removeAttribute("disabled");
  document.querySelector("input#halflingsRace").removeAttribute("disabled");
  document.getElementById("weapon").removeAttribute("disabled");
  document.getElementById("armor").removeAttribute("disabled");
  document.getElementById("nameOfHero").removeAttribute("disabled");
  document.querySelector("button#generateHeroLevelButton").removeAttribute("disabled");
  document.querySelector("button#submitHeroForm").classList.add("hidden");
  document.querySelector("button#clearHeroForm").classList.add("hidden");

}

function resetGame() {
  resetHeroUI();
  document.querySelector("button#resetGame").classList.add("hidden");
  document.querySelector("button#battleButton").classList.add("hidden");
  document.getElementById("battle").classList.add("hidden");
  document.querySelector("p#resultText").classList.add("hidden");
  heroName = "";
  heroLevel = 0;
  heroAttack = 0;
  heroDefense = 0;
  monsterName = "";
  monsterLevel = 0;
  monsterAttack = 0;
  monsterDefense = 0;
  document.getElementById("heroNameInBattle").innerText = "_________";
  document.getElementById("heroLevelInBattle").innerText = "_________";
  document.getElementById("heroAttackInBattle").innerText = "_________";
  document.getElementById("heroDefenseInBattle").innerText = "_________";
  document.getElementById("monsterNameInBattle").innerText = "_________";
  document.getElementById("monsterLevelInBattle").innerText = "_________";
  document.getElementById("monsterAttackInBattle").innerText = "_________";
  document.getElementById("monsterDefenseInBattle").innerText = "_________";
  document.querySelector("span#battleResult").innerText = "_________";

}


window.addEventListener("load", function () {
  document.querySelector("form#heroForm").addEventListener("submit", handleHeroForm);
  document.querySelector("button#generateHeroLevelButton").addEventListener("click", generateHeroLevel);
  document.querySelector("button#generateMonsterButton").addEventListener("click", generateMonster);
  document.querySelector("button#battleButton").addEventListener("click", handleBattle);
  document.querySelector("button#clearHeroForm").addEventListener("click", resetHeroUI);
  document.querySelector("button#resetGame").addEventListener("click", resetGame);
});