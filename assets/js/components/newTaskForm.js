let newTaskForm = {
    init: function () {

        let formElement = document.querySelector('.task--add form');
        formElement.addEventListener("submit", newTaskForm.handleNewTaskFormSubmit);
    },

    handleNewTaskFormSubmit: function (evt) {

        evt.preventDefault();

        let emptyTask = document.querySelector('#template-task').content.cloneNode(true);

        let inputName = document.querySelector('.task__name-edit').value;

        if (inputName.length != 0) {
            document.querySelector('.task__name-edit').value = "";
            document.querySelector('.task__name-edit').focus();

            emptyTask.querySelector('.task__name-display').textContent = inputName;

            let taskAddElement = document.querySelector('.task--add');
            let inputCategory = taskAddElement.querySelector('select').value;

            // On stocke les données à transférer
            const data = {
                'title': inputName,
                'category_id': inputCategory,
                'completion': 0,
                'status': 1
            };

            // On prépare les entêtes HTTP (headers) de la requête
            // afin de spécifier que les données sont en JSON
            const httpHeaders = new Headers();
            httpHeaders.append("Content-Type", "application/json");

            // On consomme l'API pour ajouter en DB
            const fetchOptions = {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                // On ajoute les headers dans les options
                headers: httpHeaders,
                // On ajoute les données, encodées en JSON, dans le corps de la requête
                body: JSON.stringify(data)
            };

            fetch(app.apiRootUrl + '/tasks', fetchOptions)
                .then(
                    function (response) {
                        // console.log(response);
                        // Si HTTP status code à 201 => OK
                        if (response.status == 201) {
                            alert('ajout effectué');

                            emptyTask.querySelector('.task__category').textContent = inputCategory;
                            task.getAllEventListener(emptyTask);
                
                            let taskList = document.querySelector(".tasks");
                            taskList.prepend(emptyTask);
                
                            //taskList.appendChild(emptyTask);
                           
                        } else {
                            alert('L\'ajout a échoué');
                        }
                    }
                )

        } else {
            window.alert("Le nom de la tâche est vide");
            document.querySelector('.task__name-edit').focus();
        }

    }
}