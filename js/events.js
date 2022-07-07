// FILTER EVENT LISTENER's

all.addEventListener("click", function () {
    all.setAttribute("class", "on");
    if (active.classList.contains("on")) {
        active.classList.remove("on");
    } else if (completed.classList.contains("on")) {
        completed.classList.remove("on");
    }
})

active.addEventListener("click", function () {
    active.setAttribute("class", "on");
    if (all.classList.contains("on")) {
        all.classList.remove("on");
    } else if (completed.classList.contains("on")) {
        completed.classList.remove("on");
    }
})

completed.addEventListener("click", function () {
    completed.setAttribute("class", "on");
    if (all.classList.contains("on")) {
        all.classList.remove("on");
    } else if (active.classList.contains("on")) {
        active.classList.remove("on");
    }
})

all.addEventListener("click", function () {
    UserTodoList.display();
})

active.addEventListener("click", function () {
    UserTodoList.display()
    let classToHide = document.getElementsByClassName("completed");
    for (let i = 0; i < classToHide.length; i++) {
        classToHide[i].style.display = "none";
    }
})

completed.addEventListener("click", function () {
    UserTodoList.display()
    let classToHide = document.getElementsByClassName("active");
    for (let i = 0; i < classToHide.length; i++) {
        classToHide[i].style.display = "none";
    }
})
