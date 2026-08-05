const recipeInput = document.getElementById("recipeInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const recipeContainer = document.querySelector('.recipeContainer');
const apiURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const popOver = document.createElement('div');
popOver.id = 'pop';
popOver.setAttribute('popover', 'auto');
document.body.append(popOver);

searchBtn.addEventListener('click', searchRecipe);

async function searchRecipe() {
    const recipe = recipeInput.value.trim();
    if (recipe === "") {
        alert("please enter a recipe");
        return;
    }

    console.log(recipe);

    const request = apiURL + `${encodeURIComponent(recipe)}`;
    const response = await fetch(request);
    const data = await response.json();

    console.log(data);

    recipeContainer.innerHTML = "";

    data.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
           <img src="${meal.strMealThumb}">
           <p>Recipe name: ${meal.strMeal}</p>
           <p>Area: ${meal.strArea}</p>
           <a href="${meal.strSource}">Recipe Source</a> <br>
           <a href="${meal.strYoutube}">Youtube Video</a> <br>
        `

        const viewRecipe = document.createElement('button');
        viewRecipe.textContent = "view recipe";


        recipeDiv.appendChild(viewRecipe);
        recipeContainer.appendChild(recipeDiv);

        viewRecipe.addEventListener('click', () => details(meal.idMeal));
    });

    console.log(data.meals[0]);

}

async function details(id) {
    const recipeId = id;
    const request = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + `${encodeURIComponent(recipeId)}`;
    const response = await fetch(request);
    const data = await response.json();

    console.log(recipeId);
    console.log(request);
    console.log(data.meals);

    const meal = data.meals[0];

    popOver.innerHTML = `
        <p>${meal.strInstructions}</p>
        `

    popOver.showPopover();
}
