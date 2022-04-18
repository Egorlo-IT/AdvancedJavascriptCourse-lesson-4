/*
1. Дан большой текст, в котором для оформления прямой речи используются одинарные
кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на
двойную.
3. * Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
и сообщить пользователю об ошибке.
*/

"use strict";

const elText = document.querySelector(".text");
const elTextSwitch = document.querySelector("#text");
const elForm = document.querySelector(".form");
const elFormSwitch = document.querySelector("#form");
const elMessage = document.querySelector(".message");
const elErrorName = document.querySelector(".errorName");
const elErrorPhone = document.querySelector(".errorPhone");
const elErrorEmail = document.querySelector(".errorEmail");
const elErrorText = document.querySelector(".errorText");

elTextSwitch.defaultChecked = true;

document.querySelectorAll(".switch").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.target.control.checked = true;
    if (elTextSwitch.checked) {
      elText.hidden = false;
      elForm.hidden = true;
    } else {
      elText.hidden = true;
      elForm.hidden = false;
    }
  });
});

elText.innerText = elText.outerText.replace(/\B'/g, '"');

document.querySelector(".btn-submit").addEventListener("click", () => {
  if (!elForm.checkValidity()) {
    showValidationErrors();
    showMessage("Form not validated!", "error");
  }
});

const handleFormSubmit = (event) => {
  event.preventDefault();
  showValidationErrors();
  showMessage("Form submitted successfully!", "success");
  elForm.querySelectorAll("input, textarea").forEach((item) => {
    item.classList.remove("errorItem");
    item.classList.remove("successItem");
  });
  elForm.reset();
};

const showMessage = (message, type) => {
  if (type === "error") {
    elMessage.classList.add("errorMessage");
  } else {
    elMessage.classList.remove("errorMessage");
  }
  elMessage.textContent = message;
  elMessage.hidden = false;
  setTimeout(() => {
    elMessage.hidden = true;
  }, 5000);
};

const showValidationErrors = () => {
  elForm.querySelectorAll("input, textarea").forEach((item) => {
    if (!item.checkValidity()) {
      item.classList.add("errorItem");
      item.classList.remove("successItem");
      switch (item.name) {
        case "name": {
          item.value = item.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
          elErrorName.textContent = "Required field";
          elErrorName.hidden = false;
          break;
        }
        case "phone": {
          elErrorPhone.textContent =
            "Required field. Please enter an your phone in a valid format. Example: +7(000)000-0000";
          elErrorPhone.hidden = false;
          break;
        }
        case "email": {
          elErrorEmail.textContent =
            "Required field. Please enter an email value in a valid format";
          elErrorEmail.hidden = false;
          break;
        }
        case "content": {
          elErrorText.textContent = "Required field";
          elErrorText.hidden = false;
          break;
        }
        default:
          break;
      }
    } else {
      switch (item.name) {
        case "name": {
          item.value = item.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
          elErrorName.textContent = "";
          elErrorName.hidden = true;
          break;
        }
        case "phone": {
          item.value = formatPhoneNumber(item.value);
          elErrorPhone.textContent = "";
          elErrorPhone.hidden = true;
          break;
        }
        case "email": {
          elErrorEmail.textContent = "";
          elErrorEmail.hidden = true;
          break;
        }
        case "content": {
          elErrorText.textContent = "";
          elErrorText.hidden = true;
          break;
        }
        default:
          break;
      }
      item.classList.add("successItem");
      item.classList.remove("errorItem");
    }
  });
};

elForm.addEventListener("click", () => {
  showValidationErrors();
});

const formatPhoneNumber = (phoneNumberString) => {
  let cleaned = phoneNumberString.replace(/\D/g, "");
  let match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "+" + match[1] + " (" + match[2] + ") " + match[3] + "-" + match[4];
  }
  return null;
};
