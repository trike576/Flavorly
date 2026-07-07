export default function RecipeGenerator(props) {
    return (
        <>
            {
                props.ingredients.length > 0
                &&
                <div className="recipe-section">
                    <div className="recipe-text-area">
                        <h2>Ready for a recipe?</h2>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.onClick}
                        disabled={props.recipeGenerating}
                    >
                        {props.recipeShown
                            ?
                            "Hide recipe"
                            :
                            props.recipeGenerating
                                &&
                                props.loadingButton === "recipe"
                                ?
                                <>
                                    <span
                                        className="spinner"
                                    >
                                    </span>
                                    Generating recipe...
                                </>
                                :
                                "Get a recipe"}
                    </button>
                </div>
            }
        </>
    )
}