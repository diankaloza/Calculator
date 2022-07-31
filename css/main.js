let a = "";
let b = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["x", "-", "/", "%", "+", "+/-"];

const out = document.querySelector(".outer");

function allClear() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  out.textContent = 0;
}

document.querySelector(".ac").onclick = allClear;

document.querySelector(".buttons").onclick = (event) => {
  const btn = event.target;
  if (!btn.classList.contains("btn")) return;
  if (btn.classList.contains("ac")) return;

  // значение которое мы берем из нажатой кнопки
  //trim - позволяет убрать пробелы
  const key = btn.textContent.trim();

  if (key == "+/-" && a !== "") {
    console.log("hello");
    if (a > 0) {
      a = -a;
    } else if (a < 0) {
      a = Math.abs(a);
    }
    out.textContent = a;
    return;
  }
  //out.textContent = "";

  if (digit.includes(key)) {
    if (b === "" && sign === "") {
      a += key;
      console.log(a, b, sign);
      out.textContent = a;
      //если мы хотим сделать еще одно действие после того, как нажали '='
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = b;
      console.log(a, b, sign);
    } else {
      b += key;
      out.textContent = b;
      console.log(a, b, sign);
    }
  }
  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    console.log(a, b, sign);
    return;
  }

  if (key === "=") {
    if (b === "") b = a;
    switch (sign) {
      case "+":
        a = +a + +b;
        break;

      case "-":
        a = a - b;
        break;

      case "x":
        a = a * b;
        break;

      case "%":
        a = a / 100;
        break;

      case "/":
        // если деление на 0 (выбивает infinity)
        if (b === "0") {
          out.textContent = "Ошибка";
          a = "";
          b = "";
          sign = "";
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    out.textContent = a;
    console.log(a, b, sign);
  }
};
