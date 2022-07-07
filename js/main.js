// Create a list of todos. This will either be a list already in local storage, or a brand new array.
let list_of_todos = JSON.parse(localStorage.getItem("list_of_todos") || "[]");

// Create a todo task that has a single item in the constructor.
class TodoTask {
    constructor(item) {
        this.primaryElement = item;
    }

    // Method to actually add the task to the list of todos. 
    addTask() {
        // Create a variable that holds the value of whatever the user types into the task input field.
        let task_text = document.querySelector("#user_task_text").value;

        // Check that the user actually typed in some text. If not, alert to them that they need to enter text. If they did enter text, then create an object with three properties.
        if (task_text == "") {
            alert("Please enter a task!")
        } else {
            const todoObject = {
                id: list_of_todos.length,
                todoText: task_text,
                isDone: false,
            }

            // Use unshift when adding to the list_of_todos so that the most recent item is on the top.
            list_of_todos.unshift(todoObject);

            // Call the display method to display the list_of_todos.
            this.display();

            // Set the input text back to an empty string.
            document.querySelector("#user_task_text").value = '';
        }
    }

    // A method to see if the task in the list of todos has been checked or unchecked.
    checkedOrUnchecked(x) {
        // Create a const that will hold the value of each todo item. Then, the arrow function will determine is the isDone property is true or false. The list of todos will then be displayed.
        const selectedTodoIndex = list_of_todos.findIndex((item) => item.id == x);
        list_of_todos[selectedTodoIndex].isDone == false ? list_of_todos[selectedTodoIndex].isDone = true : list_of_todos[selectedTodoIndex].isDone = false;

        // Call the display method.
        this.display();
    }

    // A method to delete a task from the list of todos array.
    deleteTask(z) {
        // Const that holds the index of each item in the list of todos.
        const selectedDelIndex = list_of_todos.findIndex((item) => item.id == z);

        // Remove the item where the selectedDelIndex is equal to the one in the list.
        list_of_todos.splice(selectedDelIndex, 1);

        // Call the display method.
        this.display();
    }

    // A method to create the elements and then display them to the HTML document.
    display() {
        // Set the innerHTML of the item to an empty string.
        this.primaryElement.innerHTML = "";

        // Go through each item in the list of todos and create elements, append and then display.
        list_of_todos.forEach((object_item) => {

            const divElement = document.createElement("div");
            const delete_button = document.createElement("button");
            const checkbox = document.createElement("input");
            const span = document.createElement("span");

            checkbox.type = "checkbox";
            checkbox.setAttribute("class", "checkboxes");
            checkbox.setAttribute("data-id", object_item.id);

            span.setAttribute("class", "todos_words");
            span.innerHTML = object_item.todoText;
            span.setAttribute("data-id", object_item.id);

            delete_button.setAttribute("data-id", object_item.id);
            delete_button.setAttribute("class", "close");
            delete_button.innerHTML = "X";

            divElement.setAttribute("class", "todos_div");
            divElement.appendChild(checkbox);
            divElement.appendChild(span);
            divElement.appendChild(delete_button);

            // An event listener that will run the deleteTask function and pass in the ID of the element that was targeted.
            delete_button.addEventListener("click", function (e) {
                const deleteId = e.target.getAttribute("data-id");
                UserTodoList.deleteTask(deleteId);
            })

            // An event listener that will run the checkedORUnchecked function and pass in the id of the element that was targeted. 
            span.addEventListener("click", function (e) {
                const selectedId = e.target.getAttribute("data-id");
                UserTodoList.checkedOrUnchecked(selectedId);
            })

            // An event listener that will run the checkedORUnchecked function and pass in the id of the element that was targeted.
            checkbox.addEventListener("click", function (e) {
                const selectedId = e.target.getAttribute("data-id");
                UserTodoList.checkedOrUnchecked(selectedId);
            })

            // An if statement that will add a class of checked, and completed if the object_item property isDone is true. If its nto true, then the item gets a class of active.
            if (object_item.isDone) {
                span.classList.add("checked");
                checkbox.checked = true;
                divElement.classList.add("completed");
            } else if (!object_item.isDone) {
                divElement.classList.add("active");
            }

            // Create a variable that will be able to store the area where the todo list will be appended.
            let ulAppend = document.querySelector(".todos");

            // Append each created divElement to the todo list area in the HTML document.
            ulAppend.appendChild(divElement);
        })

        // Set the new list of todos in localstorage.
        localStorage.setItem("list_of_todos", JSON.stringify(list_of_todos));

        // Create the tasksLeft and set its initial value to 0.
        let tasksLeft = document.getElementById("items_left");
        if (list_of_todos.length == 0) {
            tasksLeft.innerHTML = "0";
        }

        // Update the tasksLeft area.
        tasksLeft.innerHTML = list_of_todos.length - document.getElementsByClassName("completed").length;
    }
}