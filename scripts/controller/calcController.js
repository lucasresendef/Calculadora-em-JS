class calcController {
  constructor() {
    this.array = [];

    this.ac = document.querySelector("#btn-ac");
    this.c = document.querySelector("#btn-c");
    this.porcent = document.querySelector("#btn-porcent");
    this.division = document.querySelector("#btn-division");
    this.seven = document.querySelector("#btn-seven");
    this.eight = document.querySelector("#btn-eight");
    this.nine = document.querySelector("#btn-nine");
    this.multiplication = document.querySelector("#btn-multiplication");
    this.four = document.querySelector("#btn-four");
    this.five = document.querySelector("#btn-five");
    this.six = document.querySelector("#btn-six");
    this.minus = document.querySelector("#btn-minus");
    this.one = document.querySelector("#btn-one");
    this.two = document.querySelector("#btn-two");

    this.three = document.querySelector("#btn-three");
    this.plus = document.querySelector("#btn-plus");
    this.zero = document.querySelector("#btn-zero");
    this.dot = document.querySelector("#btn-dot");
    this.equal = document.querySelector("#btn-equal");

    this.display = document.querySelector("#number");
    this.clickButtons();
    this.operationToDisplay();
  }
  clickButtons() {
    this.ac.addEventListener("click", (e) => {
      while (this.array.length != 0) {
        this.array.pop();
      }
      this.operationChangeColorGray(this.ac)
      this.operationToDisplay();
    });
    this.c.addEventListener("click", (e) => {
      this.array.pop();
      this.operationChangeColorGray(this.c)
      this.operationToDisplay();
    });
    this.zero.addEventListener("click", (e) => {
      this.operationChangeColor(this.zero)
      this.operationButtons(0);
    });
    this.one.addEventListener("click", (e) => {
      this.operationChangeColor(this.one)
      this.operationButtons(1);
    });
    this.two.addEventListener("click", (e) => {
      this.operationChangeColor(this.two)
      this.operationButtons(2);
    });
    this.three.addEventListener("click", (e) => {
      this.operationChangeColor(this.three)
      this.operationButtons(3);
    });
    this.four.addEventListener("click", (e) => {
      this.operationChangeColor(this.four)
      this.operationButtons(4);
    });
    this.five.addEventListener("click", (e) => {
      this.operationChangeColor(this.five)
      this.operationButtons(5);
    });
    this.six.addEventListener("click", (e) => {
      this.operationChangeColor(this.six)
      this.operationButtons(6);
    });
    this.seven.addEventListener("click", (e) => {
      this.operationChangeColor(this.seven)
      this.operationButtons(7);
    });
    this.eight.addEventListener("click", (e) => {
      this.operationChangeColor(this.eight)
      this.operationButtons(8);
    });
    this.nine.addEventListener("click", (e) => {
      this.operationChangeColor(this.nine)
      this.operationButtons(9);
    });
    this.plus.addEventListener("click", (e) => {
      this.operationChangeColorOrange(this.plus)
      this.operationButtons("+");
    });
    this.minus.addEventListener("click", (e) => {
      this.operationChangeColorOrange(this.minus)
      this.operationButtons("-");
    });
    this.division.addEventListener("click", (e) => {
      this.operationChangeColorOrange(this.division)
      this.operationButtons("/");
    });
    this.multiplication.addEventListener("click", (e) => {
      this.operationChangeColorOrange(this.multiplication)
      this.operationButtons("*");
    });
    this.porcent.addEventListener("click", (e) => {
      this.array.push("%");
      let array2 = this.array[this.array.length - 2];
      let result = array2 / 100;
      this.array.pop();
      this.array[this.array.length - 1] = result;
      this.operationToDisplay()
      this.operationChangeColorGray(this.porcent)
    });
    this.dot.addEventListener("click", (e) => {
      this.operationChangeColor(this.dot)
      this.operationButtons(".");
    });
    this.equal.addEventListener("click", (e) => {
      this.operationChangeColorOrange(this.equal)
      this.operationButtons("=");
    });
  }
  operationToDisplay() {
    let lastnumber;

    for (let i = this.array.length - 1; i >= 0; i--) {
      if (!this.operationIsOperator(this.array[i])) {
        lastnumber = this.array[i];
        break;
      }
    }
    if (!lastnumber) lastnumber = 0;

    this.display.innerHTML = lastnumber;
  }
  operationPush(value) {
    this.array.push(value);
    this.operationCalc();
  }
  operationCalc() {
    if (this.array.length > 3) {
      let lastValue = this.array.pop();
      let result = eval(this.array.join(""));
      this.array = [result, lastValue];
      this.operationToDisplay();
    }
  }
  operationIsOperator(value) {
    return ["+", "*", "-", "/", "%"].indexOf(value) > -1;
  }
  operationLastNumber() {
    return this.array[this.array.length - 1];
  }
  operation(value) {
    if (isNaN(this.operationLastNumber())) {
      if (this.operationIsOperator(value)) {
        this.array[this.array.length - 1] = value;
      } else {
        this.operationPush(value);
        this.operationToDisplay();
      }
    } else {
      if (this.operationIsOperator(value)) {
        this.operationPush(value);
      } else {
        let newValue = this.operationLastNumber().toString() + value.toString();
        this.array[this.array.length - 1] = parseFloat(newValue);

        this.operationToDisplay();
      }
    }
  }
  operationDot() {
    let result = this.operationLastNumber();
    if (this.operationIsOperator(result) || !result) {
      this.operationPush("0.");
    } else {
      this.array[this.array.length - 1] = result.toString() + ".";
    }
    this.operationToDisplay();
  }
  operationEqual() {
    if (this.array.length >= 3) {
      let result = eval(this.array.join(""));
      this.array = [result];
      this.operationToDisplay();
    }
  }

  operationChangeColor(value){
    value.style = "background-color: #82807dc9;"
      setInterval(() => {
        value.style = "background-color: #82807d;"
      }, 350);
  }
  operationChangeColorGray(value){
    value.style = "background-color: #a0a0a046;"
      setInterval(() => {
        value.style = "background-color: #a0a0a081;"
      }, 350);
  }
  operationChangeColorOrange(value){
    value.style = "background-color: #ffa6008a;"
      setInterval(() => {
        value.style = "background-color: #ffa600c4;"
      }, 350);
  }

  operationButtons(value) {
    switch (value) {
      case "+":
        this.operation("+");
        break;
      case "-":
        this.operation("-");
        break;
      case "*":
        this.operation("*");
        break;
      case "/":
        this.operation("/");
        break;
      case ".":
        this.operationDot();
        break;
      case "=":
        this.operationEqual();
        break;
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        this.operation(parseInt(value));
        break;
    }
  }
}
