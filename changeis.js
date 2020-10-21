// CONSTANTS / STRUCTURES
//

const _COINS = [
    {
        name: 'toonie',
        value: 200
    },
    {
        name: 'loonie',
        value: 100
    },
    {
        name: 'quarter',
        value: 25
    },
    {
        name: 'dime',
        value: 10
    },
    {
        name: 'nickel',
        value: 5
    },
    {
        name: 'penny',
        value: 1
    }
]

// MAIN FUNCTION
//

function findAllCoins(amount) {
    let result = [];

    while(amount > 0) {
        let largestCoin = findLargestCoin(amount);
        if(largestCoin !== 0) {
            result.push(largestCoin);
            amount -= largestCoin.value;            
        } else {
            break;
        }     
    }

    return result;
}

// HELPER FUNCTIONS
//

function parseChange(amount) {

    if(amount.includes('$')) {
        amount = amount.replace('$', '');
    }
    let a = parseFloat(amount);
    if(a % 1 > 0) {
        a *= 100;
    }

    return a;
}

function findLargestCoin(amount) {
    if(amount === 0) return 0;

    let result;
    for(let i = 0; i < _COINS.length; i++) {
        if(amount >= _COINS[i].value) {
            result = _COINS[i];
            break;
        }
    }

    return result;
}

// ENTRY / UI HOOK
//

document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault();
    let changeBtn = document.querySelector('#submitBtn');

    if(changeBtn) {
        changeBtn.addEventListener("click", function(evt) {
            evt.preventDefault();
            let inputElement = document.querySelector('#amountInput');
            let outputElement = document.querySelector('#output');
            if(outputElement) {
                outputElement.innerHTML = '';
            }            
            if(!inputElement) {
                console.log(`No input element for #amoutnInput - Event: ${evt}`);
                return;
            }
            let amount = parseChange(inputElement.value);
            if(amount == 'NaN') {
                alert("Not a valid number :(");
                console.log(`Input: ${inputElement.value} produced ${amount}`);
                return;
            }
            let coins = findAllCoins(amount);
            let msg = 'Coins are ';
            for(let i = 0; i < coins.length; i++) {
                if(i < coins.length - 1) {
                    msg += `a ${coins[i].name}, `;
                } else if(i == coins.length - 1) {
                    msg += `and a ${coins[i].name}.`
                }
            }
            console.log(msg);
            if(outputElement) {
                outputElement.innerHTML += msg;
            }
        })
    }
});