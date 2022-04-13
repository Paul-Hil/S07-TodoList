let app = {

    apiRootUrl : 'http://localhost:8080',

    init: function () {
        tasksList.InitializeTasksFromDom();
        tasksList.InitializeTasksFromAPI();
        newTaskForm.init();
        categoriesList.init();

    }
};

document.addEventListener("DOMContentLoaded", app.init);