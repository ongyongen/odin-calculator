let screen = document.querySelectorAll('div#screen')
let digitButtons = document.querySelectorAll('p.digit-buttons')
let opButtons = document.querySelectorAll('p.op-buttons')
let clearButton = document.querySelector('div#clear')
let deletePrevButton = document.querySelector('div#delete')

let computation = []
let computationVar = document.querySelector('p#computation')
let result = document.querySelector('p#final-result')


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
    let opArray = ['+', '-', '/', 'x', '=']
    if(computation.length != 0 & 
        !opArray.includes(computation[computation.length-1]) &
        !opArray.includes(e.target.textContent)) {
        computation[computation.length-1] = computation[computation.length-1] + e.target.textContent
    } else {
        computation.push(e.target.textContent)
    }

    console.log(computation)
    
    computationVar.textContent = computation.join(' ') // remove ',' when concat array
    if (!opArray.includes(e.target.textContent)) {
        result.textContent = computation[computation.length-1]
    }
}

function selectOpButton(e) {
    computation.push(e.target.textContent)
    computationVar.textContent = computation.join(' ')

    let opArray = ['+', '-', '/', 'x', '=']
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

   let opArray = ['+', '-', '/', 'x', '=']
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
