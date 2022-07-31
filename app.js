const button = document.querySelector("button[type='submit']");
const inputEl = document.querySelector("textarea");
const listEl = document.querySelector(".list");
let todosList = JSON.parse(localStorage.getItem("todos")) || [];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const toggleDone = (el, message) => {
  el.classList.toggle("done");
  const target = todosList.find((item) => item.message === message);
  target.isDone = el.classList.contains("done");
  updateLS(todosList);
};

const removeTodo = (el, message) => {
  el.remove();
  const newList = todosList.filter((task) => task.message !== message);
  todosList = newList;
  updateLS(todosList);
};

const createOneAndAppend = (
  message,
  month = new Date().getMonth(),
  date = new Date().getDate(),
  isDone = false
) => {
  const li = document.createElement("li");
  isDone && li.classList.add("done");
  month = months[month];
  li.innerHTML = `
       <div class="todo">
        <p class="message">${message}</p>
        <div class="tools">
          <div class="marks">
            <button class="done"><i class="fa-solid fa-check"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
          </div>
          <small class="date">- ${month} ${date}</small>
        </div>
      </div>
  `;
  li.querySelector(".done").onclick = toggleDone.bind(null, li, message);
  li.querySelector(".delete").onclick = removeTodo.bind(null, li, message);
  listEl.appendChild(li);
};

const updateLS = (list) => {
  localStorage.setItem("todos", JSON.stringify(list));
};

const addTodo = (message, month, date, isDone = false) => {
  const newTodo = {
    message,
    month,
    date,
    isDone,
  };
  todosList.push(newTodo);
};

const getMonthAndDate = () => {
  const today = new Date();
  const month = today.getMonth();
  const date = today.getDate();
  return [month, date];
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  const message = inputEl.value.trim();
  if (message === "") return;
  const [month, date] = getMonthAndDate();
  createOneAndAppend(message, month, date, false);
  addTodo(message, month, date, false);
  updateLS(todosList);
  inputEl.value = "";
});

const createList = () => {
  todosList.forEach((task) => {
    const { message, month, date, isDone } = task;
    createOneAndAppend(message, month, date, isDone);
  });
  if (!todosList.length) {
    const message = "Start adding your tasks now...";
    createOneAndAppend(message);
  }
};

createList();
