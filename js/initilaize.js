// A variable to hold the area where the UserTodoList will be stored.
const taskSection = document.querySelector(".todos");

// Create a new TodoTask.
UserTodoList = new TodoTask(taskSection);

// Display the todo list on the HTML.
UserTodoList.display()

// Run the addTask when the add button is clicked.
document.querySelector("#add_button").addEventListener("click", function () {
    UserTodoList.addTask()
})

// Allow the user to enter a task if they click on the enter key after typing text. 
document.querySelector("#user_task_text").addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        UserTodoList.addTask()
    }
});