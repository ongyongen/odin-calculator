let screen = document.querySelectorAll('div#screen')
let digitButtons = document.querySelectorAll('p.digit-buttons')
let opButtons = document.querySelectorAll('p.op-buttons')
let clearButton = document.querySelector('div#clear')
let deletePrevButton = document.querySelector('div#delete')

let opArray = ['+', '-', '/', 'x', '=']
let computation = []
let computationVar = document.querySelector('p#computation')
let result = document.querySelector('p#final-result')

const keybindMapping = {
    "0" : 48,
    "1" : 49,
    "2" : 50,
    "3" : 51,
    "4" : 52,
    "5" : 53,
    "6" : 54,
    "7" : 55,
    "8" : 56,
    "9" : 57,
    "/" : 111,
    "x" : 88,
    "-" : 109,
    "." : 110,
    "=" : 13,
    "clear" : 37,
    "delete" : 8
}


function add(num1, num2) {
    return num1 + num2
}

function sub(num1, num2) {
    return num1 - num2
}

function mul(num1, num2) {
    return num1 * num2
}

function div(num1, num2) {
    return num1 / num2
}

function operate(op, num1, num2) {
    return op(num1, num2)
}

function selectDigitButton(e) {
    if(computation.length != 0 & 
        !opArray.includes(computation[computation.length-1]) &
        !opArray.includes(e.target.textContent)) {
        computation[computation.length-1] = computation[computation.length-1] + e.target.textContent
    } else {
        computation.push(e.target.textContent)
    }
    
    computationVar.textContent = computation.join(' ') // remove ',' when concat array
    if (!opArray.includes(e.target.textContent)) {
        result.textContent = computation[computation.length-1]
    }

    if(computation[1] == "/" & computation[2] == 0) {
        alert("Cannot divide by zero!")
        computation.pop()
        result.textContent = ''
        computationVar.textContent = computation.join(' ')
    }
}

function selectOpButton(e) {
    computation.push(e.target.textContent)
    computationVar.textContent = computation.join(' ')

    if (computation.length == 4) {
        let opSign = computation[1]
        switch(opSign) {
            case "+":
                op = add;
                break;
            case "-":
                op = sub;
                break;
            case "x":
                op = mul;
                break;
            default:
                op = div;
                break;
        }

        let res = operate(op, Number(computation[0]), Number(computation[2]));
        res.toString().includes('.') == true ? res = res.toFixed(2) : res
        result.textContent = res;
        
        if (computation[3] != '=') {
            computation = [res, computation[3]]
        } else {
            computation = [res]
        }

        computationVar.textContent = computation.join(' ') // remove ',' when concat array
    }
}

function selectClearButton(e) {
    computation = []
    computationVar.textContent = ''
    result.textContent = ''

}

function selectDeletePrevButton(e) {
   computation.pop()
   computationVar.textContent = computation.join(' ')

   if (opArray.includes(computation[computation.length-1])) {
       result.textContent = ' '
   } else {
       result.textContent = computation[computation.length-1]
   }
}

digitButtons.forEach((button) => {
    button.addEventListener('click', selectDigitButton)
})

opButtons.forEach((button) => {
    button.addEventListener('click', selectOpButton)
})

clearButton.addEventListener('click', selectClearButton)


deletePrevButton.addEventListener('click', selectDeletePrevButton)

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 8) {
        clearButton.click()
    } else if (event.keyCode == 37) {
        deletePrevButton.click()
    }
});


/*
document.addEventListener('keydown', function(event) {
    for (const [key, value] of Object.entries(keybindMapping)) {
        let keyboardMapping = document.getElementById(key)
        if (event.keyCode == key) {
            keyboardMapping.click()
        }
    }
})


*/