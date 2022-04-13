const task = {
    getAllEventListener: function (taskElement) {
        let taskNameElement = taskElement.querySelector('.task__name-display');
        taskNameElement.addEventListener("click", task.handleClickOnTaskName);

        let taskEditButtonElement = taskElement.querySelector('.task__button--modify');
        taskEditButtonElement.addEventListener("click", task.handleClickOnEditButton);

        let validateButtonElement = taskElement.querySelector('.task__button--validate');
        validateButtonElement.addEventListener("click", task.handleCompleteTask);

        let archiveButtonElement = taskElement.querySelector('.task__button--archive');
        archiveButtonElement.addEventListener('click', task.handleArchiveTask);

        let incompleteButtonElement = taskElement.querySelector('.task__button--incomplete');
        incompleteButtonElement.addEventListener('click', task.handleIncompleteTask);

        // Je récupère l'input du nom de la tache
        let taskInputNameElement = taskElement.querySelector(".task__name-edit");
        // On ajoute un écouteur d'événement lors de l'appui sur une touche
        taskInputNameElement.addEventListener("keyup", task.handleKeyUpOnTaskName);
        taskInputNameElement.addEventListener("blur", task.handleBlurOntaskName);

    },

    handleClickOnTaskName: function (evt) {
        let taskNameElement = evt.currentTarget;

        let taskElement = taskNameElement.closest(".task");
        taskElement.classList.add("task--edit");

        let taskNameInputElement = taskElement.querySelector(".task__name-edit");
        taskNameInputElement.focus();
    },

    handleClickOnEditButton: function (evt) {
        task.handleClickOnTaskName(evt);
    },

    handleCompleteTask: function (evt) {
        let buttonElement = evt.currentTarget;
        let taskElement = buttonElement.closest(".task");

        let task = taskElement.querySelector('.task__name');
        let taskId = task.dataset.id;

        const data = {
            'completion': 100,
        };

        // On prépare les entêtes HTTP (headers) de la requête
        // afin de spécifier que les données sont en JSON
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

        fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
            .then(
                function (response) {
                    // console.log(response);
                    // Si HTTP status code à 201 => OK
                    if (response.status == 200) {
                        taskElement.classList.remove('task--todo');
                        taskElement.classList.add("task--complete");

                        let currentProgressBarElement = taskElement.querySelector('.progress-bar__level');
                        currentProgressBarElement.style.width = "100%";
                    } else {
                        alert('L\'ajout a échoué');
                    }
                }
            )

    },

    handleIncompleteTask: function (evt) {
        let buttonElement = evt.currentTarget;
        let taskElement = buttonElement.closest(".task");

        let task = taskElement.querySelector('.task__name');
        let taskId = task.dataset.id;

        const data = {
            'completion': 0,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

        fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
            .then(
                function (response) {
                    // console.log(response);
                    // Si HTTP status code à 201 => OK
                    if (response.status == 200) {
                        taskElement.classList.remove('task--complete');
                        taskElement.classList.add("task--todo");

                        let currentProgressBarElement = taskElement.querySelector('.progress-bar__level');
                        currentProgressBarElement.style.width = "0%";
                    } else {
                        alert('L\'ajout a échoué');
                    }
                }
            )
    },

    handleArchiveTask: function (evt) {
        let result = window.confirm("Veux-tu vraiment supprimer cette tâche ?");
        if (result != false) {
            let buttonElement = evt.currentTarget;
            let taskElement = buttonElement.closest(".task");
            taskElement.classList.remove('task--complete');
            taskElement.classList.add("task--archive");
        }
    },

    handleKeyUpOnTaskName: function (evt) {
        if (evt.key === "Enter") {
            task.handleBlurOntaskName(evt);
        }
    },

    handleBlurOntaskName: function (evt) {
        let taskInputNameElement = evt.currentTarget;
        let taskNewName = taskInputNameElement.value;

        let task = taskInputNameElement.closest('.task');
        let taskName = task.querySelector('.task__name');
        let taskId = taskName.dataset.id

        const data = {
            'title': taskNewName,
        };

        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // On consomme l'API pour ajouter en DB
        const fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            // On ajoute les headers dans les options
            headers: httpHeaders,
            // On ajoute les données, encodées en JSON, dans le corps de la requête
            body: JSON.stringify(data)
        };

        fetch(app.apiRootUrl + '/tasks/' + taskId, fetchOptions)
            .then(
                function (response) {
                    // console.log(response);
                    // Si HTTP status code à 201 => OK
                    if (response.status == 200) {
                        let taskElement = taskInputNameElement.closest(".task");
                        let taskNameElement = taskElement.querySelector('.task__name-display');

                        taskNameElement.textContent = taskNewName;

                        taskElement.classList.remove('task--edit');
                    } else {
                        alert('L\'ajout a échoué');
                    }
                }
            )
    },
}