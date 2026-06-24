const submitButton = document.getElementById("submit");
const ingredientInput = document.getElementById("ingredient");
const result = document.getElementById("result");
const thumbnail = document.getElementById("thumb");

submitButton.addEventListener("click", async () => {
    const ingredient = ingredientInput.value.trim();
    const response = await fetch(`/cocktail?ingredient=${encodeURIComponent(ingredient)}`);
    const data = await response.json();

    if (data.drinks === "no data found") {
        thumbnail.hidden = true;
        result.textContent = "No drinks found with this ingredient. Did you spell it correctly?"
    } else {
        const drink = data.drinks[0];
        result.textContent = drink.strDrink;
        thumbnail.src = drink.strDrinkThumb;
        thumbnail.hidden = false;
    }
});