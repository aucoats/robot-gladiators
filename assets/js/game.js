
// Game States
//  "WIN" - Player robot has defeated all enemies
//          *Fight all enemy robots
// "LOSE" - Player robot's health is zero or less

// logging multiple values
// console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

// var enemy.names = ["Roborto", "Amy Android", "Robo Trumble"]; commented out but kept bc it shows how to declare an array
// console.log(enemy.names);
// console.log(enemy.names[0]);
// console.log(enemy.names[1]);
// console.log(enemy.names[2]);
// console.log(enemy.names.length);
// var enemy.health = 50;
// var enemy.attack = 12;
// replaced later after randomNumber() function

// loops through each enemy in the array 
// for(var i = 0; i < enemy.names.length; i++) 
//     console.log(enemy.names[i]);
//     console.log(i);
//     console.log(enemy.names[i] + " is at " + i + " index");
// }

// function to generate random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // conditional recursive function call
        // if (promptFight === "" || promptFight === null) {
        //     window.alert("You need to provide a valid answer! Please try again.");
        //     return fightOrSkip();
        // }

        // falsy value example
        // if the 'promptFight' is NOT a valid value, then execute the following statements
        promptFight = promptFight.toLowerCase();

        if (!promptFight) {
            window.alert("You need to provide a valid answer! Please try again.");
            return fightOrSkip();
        }

        if (promptFight === "skip") {
            // confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes, leave
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight! Goodbye!");
                // playerInfo.money subtract
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                
                // return true if player wants to leave
                return true;
            }
        }
        return false;
}

var fight = function(enemy) {
    
    // repeat and execute as long as the enemy bot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
    
        // Alert
        // window.alert("Welcome to Robot Gladiators!");
        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        }; 

            // remove enemy hp by subtracting playerInfo.attack
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

            // check enemy health
            if (enemy.health <=0) {
                window.alert(enemy.name + " has died!");

                // award player for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop if enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            // remove player hp by subtracting enemy.attack
            // random damage based on emnemy attack
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // check player hp
            if (playerInfo.health <=0) {
                window.alert(playerInfo.name + " has died!");

                // leave while() loop if player is dead
                break;
            } else { 
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            } 
    }
};

// function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your name is " + name);
    return name;
}


// game info and variables
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10, 
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round, arrays start at 0 so i + 1
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));

            // pick new enemy to fight based on index of enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause and check what's going on 
            // debugger;

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to shop before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to shop() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle. Game over.");
            break;
        }
    }
    // after the loop ends, player is either out of hp or enemies to fight, so run endGame fn
    endGame();
};

// function to end game
var endGame = function() {
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    } 
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // ask what do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for refill, 2 for upgrade, or 3 for leave to make a choice."
    );
    
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");

            //do nothing, so function will end
            break;
        default: 
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}; 

// start the game when the page loads
startGame();