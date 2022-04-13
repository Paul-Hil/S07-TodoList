const categoriesList = {

    categories: {},

    init: function () {
        categoriesList.loadCategoriesFromAPI();
    },

    loadCategoriesFromAPI: function () {

        let fetchOptions = {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
        };

        let promise = fetch(app.apiRootUrl + '/categories', fetchOptions);

        promise.then(categoriesList.ajaxCategoriesList);
    },

    ajaxCategoriesList: function (response) {
        let jsonPromise = response.json();

        jsonPromise.then(
            function (reponseJson) {
                categoriesList.selectCategoriesNav(reponseJson);
                categoriesList.selectCategoriesInput(reponseJson);
            }
        )
    },

    // Solution correction
    registerCategoriesListing: function (jsonResponse) {
        for (const categoryData of jsonResponse) {
            categoriesList.categories[categoryData.id] = categoryData;
        }
    },

    selectCategoriesNav: function (categoryList) {

        let selectElement = document.createElement("select");
        selectElement.className = "filters__choice";

        let categorySelect = document.querySelector(".filters__task--category");

        categorySelect.appendChild(selectElement);

        optionElement = document.createElement("option");
        optionElement.textContent = 'Choisir une catégorie';
        selectElement.appendChild(optionElement);

        categoriesList.createOptionsForCategorySelect(categoryList, selectElement);
    },

    selectCategoriesInput: function (categoryList) {
        let divElement = document.createElement("div")
        divElement.className = "select is-small";

        let selectElement = document.createElement("select");

        let categorySelect = document.querySelector(".task__category");

        categorySelect.appendChild(divElement);
        divElement.appendChild(selectElement);

        optionElement = document.createElement("option");
        optionElement.textContent = 'Choisir une catégorie';

        selectElement.appendChild(optionElement);

        categoriesList.createOptionsForCategorySelect(categoryList, selectElement);
    },

    createOptionsForCategorySelect: function (categoryList, selectElement) {
        for (const categorie of categoryList) {
            optionElement = document.createElement("option");
            optionElement.textContent = categorie.name;
            optionElement.setAttribute("value", categorie.id);
            selectElement.appendChild(optionElement);
        };
    },

}