let tasksList = {

    InitializeTasksFromDom: function () {
        let taskElement = document.querySelectorAll('.tasks .task');

        for (let currentTaskElement of taskElement) {
            task.getAllEventListener(currentTaskElement)
        }
    },

    InitializeTasksFromAPI: function () {

        let fetchOptions = {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
        };

        let promise = fetch(app.apiRootUrl + '/tasks', fetchOptions);

        promise.then(tasksList.ajaxTasksList);
    },

    ajaxTasksList: function (response) {
        let jsonPromise = response.json();

        jsonPromise.then(
            function (reponseJson) {
                tasksList.recoverTasks(reponseJson);
            }
        )
    },

    recoverTasks: function (tasksList) {
        for (const taskArray of tasksList) {
            let emptyTask = document.querySelector('#template-task').content.cloneNode(true);

            emptyTask.querySelector('.task__name').dataset.id = taskArray.id;

            emptyTask.querySelector('.task__name-display').textContent = taskArray.title;

            emptyTask.querySelector('.task__category').textContent = taskArray.category.name;
            emptyTask.querySelector('.task--todo').dataset.category = taskArray.category_id;

            task.getAllEventListener(emptyTask);

            let taskList = document.querySelector(".tasks");
            taskList.prepend(emptyTask);
        }
    }
}