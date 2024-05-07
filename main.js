"use strict";
const input = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const calculate = document.querySelector(".calculate");
const addSignDisplay = document.querySelector(".addSignDisplay");

let startValue = 0;
let a = "";
let b = "";
let c = "";
let d = "";
let memory = "";
let sign = "";
let finish = false;
input.value = startValue;

function clearAll() {
  a = "";
  b = "";
  d = "";
  addSignDisplay.value = "";
  sign = "";
}

const arrNumbers = [
  "00",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const arrSign = ["/", "*", "+", "-", "√", "%"];
const arrAddSign = ["MR", "M-", "M+", "→", "MC", "AC"];

calculate.addEventListener("click", onCalculateClick);

function onCalculateClick(e) {
  let result;
  if (e.target.nodeName !== "BUTTON") return;
  const key = e.target.textContent;

  if (key === "%") {
    const percent = (a * b) / 100;
    console.log("a: ", a);
    input.value = percent;
    b = percent;
    console.log("b: ", b);

    return;
  }
  if (key === "√") {
    const sqrt = Math.sqrt(a);
    input.value = sqrt;
    a = sqrt;
    return;
  }

  if (arrNumbers.includes(key)) {
    if (b === "" && sign === "") {
      if (key === "." && a === "") {
        a = "0" + key;
      } else if (key === "00" && a === "") {
        a = "0";
      } else if (key === "." && a.toString().includes(key)) {
        return;
      } else {
        a += key;
      }
      input.value = a;
    } else if (a !== "") {
      if (key === "." && b === "") {
        b = "0" + key;
      } else if (key === "00" && b === "") {
        b = "0";
      } else if (key === "." && b.toString().includes(key)) {
        return;
      } else {
        b += key;
      }
      input.value = b;
    } else if (a !== "" && b !== "" && finish) {
      a = c;
      b = key;
      finish = false;
      input.value = b;
    }
    // else {
    //   b += key;
    //   input.value = b;
    // }
  }

  if (arrSign.includes(key)) {
    sign = key;
    input.value = sign;
    return;
  }

  if (key === "=" && sign === "") {
    return (input.value = a);
  }

  if (key === "=") {
    d = Math.max(a.length, b.length);
    switch (sign) {
      case "/":
        if (b === "0" || b === "00") {
          addSignDisplay.value = "Err";
          input.value = "0";
          c = "";
          return;
        }
        c = a / b;
        break;
      case "*":
        c = a * b;
        break;
      case "-":
        c = a - b;

        break;
      case "+":
        c = +a + +b;
        break;
    }
    while (c.length > 1 && с[с.length - 1] === "0" && с[с.length - 2] !== ".") {
      с = parseFloat(c).toFixed(d).pop();
      return c;
    }
    a = c;
    b = "";
    finish = true;
    input.value = c;
  }
  if (arrAddSign.includes(key)) {
    switch (key) {
      case "MR":
        if (memory !== "") {
          input.value = memory;
          a = memory;
          b = "";
        } else {
          input.value = 0;
        }
        addSignDisplay.value = key;
        break;
      case "M-":
        if (memory !== "") {
          memory -= a;
        } else {
          memory = 0 - a;
        }
        clearAll();
        addSignDisplay.value = key;
        break;
      case "M+":
        if (memory !== "") {
          memory += a;
        } else {
          memory = a;
        }
        clearAll();
        addSignDisplay.value = key;
        break;
      case "→":
        input.value = input.value.slice(0, -1);
        if (input.value.length <= 0) input.value = 0;
        break;
      case "MC":
        memory = "";
        addSignDisplay.value = "";
        break;
      case "AC":
        finish = false;
        input.value = startValue;
        c = "";
        clearAll();
        memory = "";
        break;
    }
  }
}
