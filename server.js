import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// CocktailDB API
const baseURL = "https://www.thecocktaildb.com";

async function getCocktailByIngredient(ingredient) {
    try {
        const response = await axios.get(`${baseURL}/api/json/v1/1/filter.php?i=${ingredient}`);
        return response.data;
    } catch (err) {
        console.error("API request failed:", err.message);
        return null;
    }
}

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/cocktail", async (req, res) => {
    const ingredient = req.query.ingredient;
    const result = await getCocktailByIngredient(ingredient);
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});