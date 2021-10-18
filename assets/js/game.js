var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Game States
//  "WIN" - Player robot has defeated all enemies
//          *Fight all enemy robots

// logging multiple values
// console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
// console.log(enemyNames);
// console.log(enemyNames[0]);
// console.log(enemyNames[1]);
// console.log(enemyNames[2]);
// console.log(enemyNames.length);
var enemyHealth = 50;
var enemyAttack = 12;

// for(var i = 0; i < enemyNames.length; i++) {
//     console.log(enemyNames[i]);
//     console.log(i);
//     console.log(enemyNames[i] + " is at " + i + " index");
// }

var fight = function(enemyName) {
    // repeat and execute as long as the enemy bot is alive
    while(enemyHealth > 0) {
    
        // Alert
        // window.alert("Welcome to Robot Gladiators!");

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if a player chooses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
            // remove enemy hp by subtracting playerAttack
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            // check enemy health
            if (enemyHealth <=0) {
                window.alert(enemyName + " has died!");
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // remove player hp by subtracting enemyAttack
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            )

            // check player hp
            if (playerHealth <=0) {
                window.alert(playerName + " has died!");
            } else { 
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }

            // if a player choses to skip  
        } else if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes, leave
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! Goodbye!");
                // playerMoney subtract
                playerMoney = playerMoney - 2;
            }
            // if false, ask question again by running fight again
            else {
                fight();
            }
            
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    }
};

for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}