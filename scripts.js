let computation = []

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

let buttons = document.querySelectorAll('p.row-buttons')

function selectButton(e) {
    console.log(e.target.textContent)
    computation.push(e.target.textContent)
    console.log(computation)
}

buttons.forEach((button) => {
    button.addEventListener('click', selectButton)
})
