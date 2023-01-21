class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperand(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default: 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
           return integerDisplay 
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operand]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const keyBoard = document.querySelector('[data-keyboard]') // implementing keyboard presses

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperand(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

keyBoard.addEventListener('keydown', e => {
    //console.log(e) // to see info
    if (e.keyCode >= 48 && e.keyCode <= 57 || e.key === ".") // numbers 0-9
    { 
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    } else {
        switch (e.key) {
            case "+":
                calculator.chooseOperand(e.key)
                calculator.updateDisplay()
                break;
            case "-":
                calculator.chooseOperand(e.key)
                calculator.updateDisplay()
                break;
            case "*":
                calculator.chooseOperand(e.key)
                calculator.updateDisplay()
                break
            case "/":
                calculator.chooseOperand('÷')
                calculator.updateDisplay()
                break
            case "=": // not quite sure why but "Enter is not working...it makes all the numbers disappear or appends the last number seen"
                calculator.compute()
                calculator.updateDisplay()
                break;
            case "c":
                calculator.clear()
                calculator.updateDisplay()
                break
            case "Backspace":
                calculator.delete()
                calculator.updateDisplay()
                break
            default:
                return
    }
}

    // // keyCode table: https://blogs.longwin.com.tw/lifetype/key_codes.html
    // // https://css-tricks.com/snippets/javascript/javascript-keycodes/
    // // JUST REALIZED DIDN'T NEED TO BE USING KEYCODES COULD JUST USE THE KEY TO CHECK
    // if (e.keyCode >= 48 && e.keyCode <= 57 || e.key === 190) { 
    //     calculator.appendNumber(e.key)
    //     calculator.updateDisplay()
    // }
    // else if (e.keyCode === 187 && e.shiftKey === true) // addition
    // {
    //     calculator.chooseOperand(e.key)
    //     calculator.updateDisplay()
    // }
    // else if (e.key === "Enter") // equals
    // {
    //     calculator.compute()
    //     calculator.updateDisplay()
    // }
    // else if (e.keyCode === 189) // subract
    // {
    //     calculator.chooseOperand(e.key)
    //     calculator.updateDisplay()
    // }
    // else if (e.keyCode === 191) // divide
    // {
    //     calculator.chooseOperand(e.key)
    //     calculator.updateDisplay()
    // }
    // else if (e.keyCode === 56 && e.shiftKey ===  true) // multiplication 
    // {
    //     calculator.chooseOperand(e.key)
    //     calculator.updateDisplay()
    // }
    // else if (e.keyCode === 8) // delete 
    // {
    //     calculator.delete()
    //     calculator.updateDisplay()
    // }
    // else {
    //     return
    // }

})