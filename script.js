const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = {
    currentOperandTextElement,
    previousOperandTextElement,
    prevOperand: "",
    afterEqual: false, 
    "+": function(a,b){
        return +a + +b;
    },
    "-": function(a,b){
        return a - b;
    },
    "÷": function(a,b){
        return a / b;
    },
    "*": function(a,b){
        return a * b;
    }, 
    "√": function(a,b){
        return Math.pow(+a, 1/+b);
    },
    "^": function(a,b){
        return Math.pow(+a, +b);
    },
    calculate(a,b,op){
        console.log(this["+"])
        // this.resualt = this[op](a,b);
        console.log(a,b,op)
        console.log(this[op](a,b))
        return Number(this[op](a,b).toFixed(10))
    },
    displayNumber(num){
        if(num === "." && currentOperandTextElement.textContent.includes(".")) return;
        if(this.afterEqual){
         this.currentOperandTextElement.textContent = "";
         this.afterEqual = false;
        }
        this.currentOperandTextElement.textContent += num;
    },
    chooseOperand(op){
        let prevValue = previousOperandTextElement.textContent.slice(0, previousOperandTextElement.textContent.length - 1);
        let currentValue = currentOperandTextElement.textContent;
        if(!!currentValue && !!prevValue){
            previousOperandTextElement.textContent = `${this.calculate(prevValue, currentValue, this.prevOperand)}` + op;
            currentOperandTextElement.textContent = "";
        }else if(!currentValue && !!prevValue){
            previousOperandTextElement.textContent = prevValue + op;
        }else if(!!currentValue && !prevValue){
            previousOperandTextElement.textContent = currentValue + op;
            currentOperandTextElement.textContent = "";
        }else{
            return;
        }
        this.prevOperand = op;
    },
    clear(){
        this.currentOperandTextElement.textContent = "";
        this.previousOperandTextElement.textContent = "";
    },
    delete(){
       this.currentOperandTextElement.textContent = this.currentOperandTextElement.textContent.slice(0, this.currentOperandTextElement.textContent.length - 1);
    },
    equalOperetion(){
        let prevValue = previousOperandTextElement.textContent.slice(0, previousOperandTextElement.textContent.length - 1);
        let currentValue = currentOperandTextElement.textContent;
        currentOperandTextElement.textContent = `${this.calculate(prevValue, currentValue, this.prevOperand)}`;
        previousOperandTextElement.textContent = "";
        this.afterEqual = true;
    }
}

numberButtons.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        calculator.displayNumber(e.target.textContent);
    })
});

operationButtons.forEach((element)=>{
    element.addEventListener("click",(e)=>{
        calculator.chooseOperand(e.target.textContent);
    })
});

allClearButton.addEventListener("click",(e)=>{
    calculator.clear();
});

deleteButton.addEventListener("click",(e)=>{
    calculator.delete();
});

equalsButton.addEventListener("click",(e)=>{
    calculator.equalOperetion();
});
// console.log(calculatorExpresions)