const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 0
const LOG_EVENT_PLAYER_ATTACK ='PLAYER_ATTACK'
const LOG_EVENT_PLAYER_STRONG_ATTACK ='PLAYER_STONG_ATTACK'
const LOG_EVENT_MONSTER_ATTACK ='MONSETER_ATTACK'
const LOG_EVENT_PLAYER_HEAL ='PLAYER_HEAL'
const LOG_EVENT_GAME_OVER ='GAME_OVER'

let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues() {

    const entredValue = prompt("Maximum life for you and the monster.", '100');
    const parsedValue = parseInt(entredValue);
    if (isNaN(parsedValue) ||  parsedValue <= 0) {
        throw {message: 'Invalid user input, not a number'};
    }
    return parsedValue
}

let chosenMaxLife

try 
{
    chosenMaxLife = getMaxLifeValues();
} catch (error) 
{    
    console.log(error);
    chosenMaxLife = 100;
    alert('You entered something wrong, default value of 100 was used.');        
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);  


function writeToLog (event, value, monsterHealth, playerHealth)
{
    if (
        event !== LOG_EVENT_PLAYER_ATTACK &&
        event !== LOG_EVENT_PLAYER_STRONG_ATTACK &&
        event !== LOG_EVENT_MONSTER_ATTACK &&
        event !== LOG_EVENT_PLAYER_HEAL &&
        event !== LOG_EVENT_GAME_OVER
    )
    {
        return;
    }
    let logEntry= 
    {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    
    switch(event)
    {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        default:
            logEntry = {};
    }
    // if (event === LOG_EVENT_PLAYER_ATTACK)
    // {
    //     logEntry.target = 'MONSTER';
    // }
    // else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK)
    // {
    //     logEntry=
    //     { 
    //         event: event,
    //         value: value,
    //         target: 'MONSTER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    // else if (event === LOG_EVENT_MONSTER_ATTACK)
    // {
    //     logEntry=
    //     { 
    //         event: event,
    //         value: value,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    // else if (event === LOG_EVENT_PLAYER_HEAL)
    // {
    //     logEntry=
    //     { 
    //         event: event,
    //         value: value,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    battleLog.push(logEntry);
}
   

function reset()
{
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}
function endRound() 
{
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK, 
        playerDamage, 
        currentMonsterHealth, 
        currentPlayerHealth
    );
    

    if (currentPlayerHealth <= 0 && hasBonusLife)
    {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("You would be dead but bonus life saved you!");
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) 
    {
        alert('You win!');
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'PLAYER WON', 
            currentMonsterHealth, 
            currentPlayerHealth
        );
    } 
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0)
    {
        alert('You lose!');
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'MONSTER WON', 
            currentMonsterHealth, 
            currentPlayerHealth
        );
    }
    else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0 )
    {
        alert('You both die')
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'A DRAW', 
            currentMonsterHealth, 
            currentPlayerHealth
        );
    }
    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0)
    {
        reset();
    }
}
function attackMonster(mode) 
{
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = 
        mode === MODE_ATTACK 
            ? LOG_EVENT_PLAYER_ATTACK 
            : LOG_EVENT_PLAYER_STRONG_ATTACK;
    
    const monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamage;
    writeToLog(
        logEvent, 
        monsterDamage, 
        currentMonsterHealth, 
        currentPlayerHealth
    ); 
    endRound();
}
function attackHandler() 
{
    attackMonster(MODE_ATTACK)
}   
function strongAttackHandler()
{
    attackMonster(MODE_STRONG_ATTACK)
}
function healPlayerHandler ()
{
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) 
    { 
        alert("You can't heal above you'r max HP")
        healValue = chosenMaxLife - currentPlayerHealth;
    }
    else
    {
        healValue = HEAL_VALUE;    
    }

    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue, 
        currentMonsterHealth, 
        currentPlayerHealth
    ); 
    endRound();
}
function printLogHandler ()
{
    // for (let  i = 0; i < 3; i++)
    // {
    //     console.log('------------');
    // }
    // let j  = 0;
    // while (j<3)
    // {
    //     console.log('-------');
    //     j++
    // }
    // for (let  i = 0; i < battleLog.length; i++)
    // {
    //     console.log(battleLog[i]);
    // }
    let i = 0
    for (const logEntry of battleLog) 
    {   
        console.log(i); 
        console.log(logEntry);
        i++;
    }
    // // event by event
    // let i = 0;
    // for (const logEntry of battleLog) 
    // {   
    //     if ((!lastLoggedEntry &&  lastLoggedEntry !==0) || lastLoggedEntry < i)
    //     {
    //         console.log(`#${i}`);
    //         for (const key in logEntry)
    //         {
    //             console.log(`${key}: ${logEntry[key]}`);
    //         }
    //         lastLoggedEntry = i;
    //         break;            
    //     }
    //     i++;
        
    // }

}

attackBtn.addEventListener('click', attackHandler)
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)
logBtn.addEventListener('click', printLogHandler)