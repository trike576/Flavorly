import { useState, useEffect, useRef } from "react"

import initialIngredients from "./data/initialIngredients"
import IngredientsList from "./components/IngredientsList"
import RecipeGenerator from "./components/RecipeGenerator"
import Recipe from "./components/Recipe"
import generateRecipe from "./services/groq"
import IngredientsChangedWarning from "./components/IngredientsChangedWarning"

export default function Main() {
    // state for ingredients
    const [ingredients, setIngredients] = useState(initialIngredients)
    // state to show recipe
    const [recipeShown, setRecipeShown] = useState(false)
    // state for actual recipe
    const [recipe, setRecipe] = useState("")
    // state to know if recipe is generating or not
    const [recipeGenerating, setRecipeGenerating] = useState(false)
    // state to know if the current shown recipe is according to
    // ingredients list outdated or not 
    const [recipeIsOutdated, setRecipeIsOutdated] = useState(false)
    // state to know which button is loading
    const [loadingButton, setLoadingButton] = useState(null)

    // ref to recipe
    const recipeRef = useRef(null)

    function addNewIngredient(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient").trim()
        const ingredientExists = ingredients.some(
            ingredient => ingredient.toLowerCase() === newIngredient.toLowerCase()
        )
        if (!ingredientExists && newIngredient !== "") {
            if (recipe !== "") {
                setRecipeIsOutdated(true)
            }
            setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
        }
        event.currentTarget.reset()
    }

    function removeIngredient(ingredientToRemove) {
        if (recipe !== "" && ingredients.includes(ingredientToRemove)) {
            setRecipeIsOutdated(true)
        }
        setIngredients((prevIngredients) => prevIngredients.filter(ingredient => ingredient !== ingredientToRemove))

    }

    async function showRecipe() {
        if (ingredients.length === 0) {
            return;
        }
        if (recipe === "") {
            setLoadingButton("recipe")
            setRecipeGenerating(true)
            setRecipeIsOutdated(false)
            const recipe = await generateRecipe(ingredients)
            if (recipe === "Recipe generation failed") {
                setRecipe(`⚠ Couldn't generate a recipe.
                    Try again.`)
            }
            else {
                setRecipe(recipe)
            }
        }
        setRecipeGenerating(false)
        setLoadingButton(null)
        setRecipeShown(true)
    }

    async function showNewRecipe() {
        if (ingredients.length === 0) {
            return;
        }
        setLoadingButton("warning")
        setRecipeGenerating(true)
        const recipe = await generateRecipe(ingredients)
        if (recipe === "Recipe generation failed") {
            setRecipe(`⚠ Couldn't generate a recipe.
                    Try again.`)
        }
        else {
            setRecipe(recipe)
        }
        setRecipeGenerating(false)
        setLoadingButton(null)
        setRecipeIsOutdated(false)
        setRecipeShown(true)
    }

    function hideRecipe() {
        setRecipeShown(false)
    }

    useEffect(() => {
        if (recipeRef.current) {
            recipeRef.current.scrollIntoView({
                behavior: "smooth"
            })
        }
    }, [recipeShown])

    return (
        <main>
            <form className="add-ingredient-form" onSubmit={addNewIngredient}>
                <input
                    type="text"
                    placeholder="e.g. potato"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button id="addIngredientButton">Add ingredient</button>
            </form>
            <IngredientsList
                ingredients={ingredients}
                removeIngredient={removeIngredient} />
            <RecipeGenerator
                ingredients={ingredients}
                recipeShown={recipeShown}
                recipeGenerating={recipeGenerating}
                onClick={(recipeShown) ? hideRecipe : showRecipe}
                loadingButton={loadingButton}
            />
            {recipeIsOutdated
                &&
                ingredients.length > 0
                &&
                <IngredientsChangedWarning
                    showNewRecipe={showNewRecipe}
                    recipeGenerating={recipeGenerating}
                    loadingButton={loadingButton}
                />
            }
            <Recipe
                className="recipe"
                recipeShown={recipeShown}
                recipe={recipe}
                recipeRef={recipeRef}
            />
        </main>
    )
}

