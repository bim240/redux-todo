var newList = document.querySelector(".newlist");
var allList = document.querySelector(".list");
var active = document.querySelector(".active");
var all = document.querySelector(".all");
var complete = document.querySelector(".completed");

console.group(allList, newList);
var redux = Redux.createStore(handleAllMethod);

function handleAllMethod(state = [], action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          id: Date.now()
        }
      ];
    case "remove":
      return state.filter(list => list.id != action.id);
    case "checkbox":
      return state.map(list => {
        if (list.id == action.id) {
          list.completed = !list.completed;
        }
        return list;
      });
    case "active":
      return state.filter(list => list.completed == false);
    case "all":
      return state;
    default:
      return state;
  }
}

function addToList(e) {
  console.log(redux.state);
  if (e.keyCode == 13) {
    redux.dispatch({ text: e.target.value, type: "add" });
    e.target.value = "";
  }
}
function handleEventOnlist(e) {
  // remove from the list
  if (e.target.tagName == "SPAN") {
    // console.log(e.target.parentElement.id);
    redux.dispatch({ id: e.target.parentElement.id, type: "remove" });
  } else if (e.target.type == "checkbox") {
    redux.dispatch({ id: e.target.parentElement.id, type: "checkbox" });
    // console.dir(e.target);
    //
  }
  // console.dir(e.target);
}
function filterActive() {
  redux.dispatch({ type: "active" });
}
function showAll() {
  redux.dispatch({ type: "all" });
}

function view(state = []) {
  allList.innerHTML = "";
  // console.log(state);
  state.map(oneList => {
    // console.log(oneList);
    var singleList = document.createElement("div");
    singleList.setAttribute("id", `${oneList.id}`);
    singleList.classList.add("single_list");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var listName = document.createElement("div");
    listName.textContent = oneList.text;
    if (oneList.completed == true) {
      // checkbox.checked = "true";
      listName.classList.add("line_through");
    } else if (oneList.completed == false) {
      // checkbox.checked = "false";
      listName.classList.remove("line_through");
    }
    var remove = document.createElement("span");
    remove.textContent = "delete";
    singleList.append(checkbox, listName, remove);
    allList.append(singleList);
  });
  // console.log(state);
}

redux.subscribe(() => {
  console.log(redux.getState());
  view(redux.getState());
});
// console.log(redux);
newList.addEventListener("keyup", addToList);
allList.addEventListener("click", handleEventOnlist);
active.addEventListener("click", filterActive);
all.addEventListener("click", showAll);
// complete.addEventListener("click", filterComplete);
