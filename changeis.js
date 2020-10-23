// MAIN FUNCTION
//

function getChange(amount) {

    // Coin structure and count
    let coins = {
        _TOONIE: {
            name: {
                single: 'toonie',
                plural: 'toonies'
            },
            value: 200,
            count: 0
        },
        _LOONIE: {
            name: {
                single: 'loonie',
                plural: 'loonies'
            },
            value: 100,
            count: 0
        },
        _QUARTER: {
            name: {
                single: 'quarter',
                plural: 'quarters'
            },
            value: 25,
            count: 0
        },
        _DIME: {
            name: {
                single: 'dime',
                plural: 'dimes'
            },
            value: 10,
            count: 0
        },
        _NICKEL: {
            name: {
                single: 'nickel',
                plural: 'nickels'
            },
            value: 5,
            count: 0
        },
        _PENNY: {
            name: {
                single: 'penny',
                plural: 'pennies'
            },
            value: 1,
            count: 0
        }
    };

    while(amount > 0) {
        // Add largest coins and repeat until all change is determined
        if(amount >= coins._TOONIE.value) {
            coins._TOONIE.count += 1;
            amount -= coins._TOONIE.value;
        } else if(amount >= coins._LOONIE.value) {
            coins._LOONIE.count += 1;
            amount -= coins._LOONIE.value;
        } else if(amount >= coins._QUARTER.value) {
            coins._QUARTER.count += 1;
            amount -= coins._QUARTER.value;
        } else if(amount >= coins._DIME.value) {
            coins._DIME.count += 1;
            amount -= coins._DIME.value;
        } else if(amount >= coins._NICKEL.value) {
            coins._NICKEL.count += 1;
            amount -= coins._NICKEL.value;
        } else if(amount >= coins._PENNY.value) {
            coins._PENNY.count += 1;
            amount -= coins._PENNY.value;
        }  
    }

    // Remove entries with 0 coins
    let result = [];
    for(let coin in coins) {
        if(coins[coin].count > 0) {
            result.push(coins[coin]);
        }
    }

    return result;
}

// HELPER FUNCTIONS
//

function parseChange(amount) {

    // Get rid of potential dollar signs in input
    if(amount.includes('$')) {
        amount = amount.replace('$', '');
    }
    // If no decimal, add it in for assumed float conversion below
    if(!amount.includes('.')) {
        amount += '.00';
    }
    // convert from float to full number
    let a = parseFloat(amount) * 100;

    // return rounded to remove float's lack of precision
    return a.toFixed();
}

// ENTRY / UI HOOK
//

document.addEventListener("DOMContentLoaded", function(e) {
    e.preventDefault();
    let changeBtn = document.querySelector('#submitBtn');

    if(changeBtn) {
        changeBtn.addEventListener("click", function(evt) {
            evt.preventDefault();    
            // Get DOM elements      
            let inputElement = document.querySelector('#amountInput');
            let outputElement = document.querySelector('#output');    
            if(!inputElement) {
                console.log(`No input element for #amountInput - Event: ${evt}`);
                return;
            }
            if(!outputElement) {
                console.log(`No output element for #output - Event: ${evt}`);
            }
            // Clear current output, if any present
            outputElement.innerHTML = ''; 

            // Get amount of change from DOM
            let amount = parseChange(inputElement.value);
            if(amount == 'NaN') {
                alert("Not a valid number :(");
                console.log(`Input: ${inputElement.value} produced ${amount}`);
                return;
            }
            let change = getChange(amount);
            let msg = `Change is `;      

            for(let i = 0; i < change.length; i++) {
                // Only if it's the last entry and collection has more than 1 entry
                if(i + 1 == change.length && i != 0) {
                    msg += `, and `;
                } else if(i != 0) { // collection has more than 1 entry and is not the first
                    msg += `, `;
                }
                // number of specific coin
                msg += `${change[i].count} `;
                if(change[i].count > 1) { // plural language
                    msg += `${change[i].name.plural}`;
                } else { // else singular language
                    msg += `${change[i].name.single}`;
                }
                if(i + 1 == change.length) { // ends the sentence with a period.
                    msg += `. `;
                }
            }

            console.log(msg);
            if(outputElement) {
                outputElement.innerHTML += msg;
            }
                       
        })
    }
});