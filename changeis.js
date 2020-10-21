// MEMBERS / PRIVATE
//
let coinCount = {
    toonie: 0,
    loonie: 0,
    quarter: 0,
    dime: 0,
    nickel: 0,
    penny: 0
};

// CONSTANTS / STRUCTURES
//

const _TOONIE = {
    name: 'toonie',
    value: 200
};
const _LOONIE = {
    name: 'loonie',
    value: 100
};
const _QUARTER = {
    name: 'quarter',
    value: 25
};
const _DIME = {
    name: 'dime',
    value: 10
};
const _NICKEL = {
    name: 'nickel',
    value: 5
};
const _PENNY = {
    name: 'penny',
    value: 1
};
// const _COINS = [
//     {
//         name: 'toonie',
//         value: 200
//     },
//     {
//         name: 'loonie',
//         value: 100
//     },
//     {
//         name: 'quarter',
//         value: 25
//     },
//     {
//         name: 'dime',
//         value: 10
//     },
//     {
//         name: 'nickel',
//         value: 5
//     },
//     {
//         name: 'penny',
//         value: 1
//     }
// ]

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
    // for(let i = 0; i < _COINS.length; i++) {
    //     if(amount >= _COINS[i].value) {
    //         result = _COINS[i];
    //         break;
    //     }
    // }
    if(amount >= _TOONIE.value) {
        result = _TOONIE;
        coinCount.toonie += 1;
    } else if(amount >= _LOONIE.value) {
        result = _LOONIE;
        coinCount.loonie += 1;
    } else if(amount >= _QUARTER.value) {
        result = _QUARTER;
        coinCount.quarter += 1;
    } else if(amount >= _DIME.value) {
        result = _DIME;
        coinCount.dime += 1;
    } else if(amount >= _NICKEL.value) {
        result = _NICKEL;
        coinCount.nickel += 1;
    } else if(amount >= _PENNY.value) {
        result = _PENNY;
        coinCount.penny += 1;  
    } else {
        result = 0;
    }

    return result;
}

function resetCoinCount() {
    coinCount = {
        toonie: 0,
        loonie: 0,
        quarter: 0,
        dime: 0,
        nickel: 0,
        penny: 0
    }

    return coinCount;
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
                console.log(`No input element for #amountInput - Event: ${evt}`);
                return;
            }
            let amount = parseChange(inputElement.value);
            if(amount == 'NaN') {
                alert("Not a valid number :(");
                console.log(`Input: ${inputElement.value} produced ${amount}`);
                return;
            }
            let coins = findAllCoins(amount);
            let msg = `Coins are `;
            if(coinCount.toonie > 0) {
                msg += `${coinCount.toonie} toonie`;
                if(coinCount.toonie > 1) {
                    msg += `s`;
                }
                msg += `, `;
            }
            if(coinCount.loonie > 0) {
                msg += `${coinCount.loonie} loonie`;
                if(coinCount.loonie > 1) {
                    msg += `s`;
                }
                msg += `, `;
            }
            if(coinCount.quarter > 0) {
                msg += `${coinCount.quarter} quarter`;
                if(coinCount.quarter > 1) {
                    msg += `s`;
                }
                msg += `, `;
            }
            if(coinCount.dime > 0) {
                msg += `${coinCount.dime} dime`;
                if(coinCount.dime > 1) {
                    msg += `s`;
                }
                msg += `, `;
            }
            if(coinCount.nickel > 0) {
                msg += `${coinCount.nickel} nickel`;
                if(coinCount.nickel > 1) {
                    msg += `s`;
                }
                msg += `, `;
            }   
            if(coinCount.penny > 0) {
                msg += `and ${coinCount.penny} penn`;
                if(coinCount.penny > 1) {
                    msg += `ies.`;
                } else {
                    msg += 'y.';
                }
            }                             

            // let msg = 'Coins are ${}';
            // for(let i = 0; i < coins.length; i++) {
            //     if(i < coins.length - 1) {
            //         msg += `a ${coins[i].name}, `;
            //     } else if(i == coins.length - 1) {
            //         msg += `and a ${coins[i].name}.`
            //     }
            // }

            console.log(msg);
            if(outputElement) {
                outputElement.innerHTML += msg;
            }
            coinCount = resetCoinCount();            
        })
    }
});