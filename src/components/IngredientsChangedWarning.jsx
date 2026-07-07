export default function IngredientsChangedWarning(props) {
    return (
        <div className="warning">
            <h2>⚠️ Your ingredients have changed...</h2>
            <button
                onClick={props.showNewRecipe}
                disabled={props.recipeGenerating}
            >
                {props.recipeGenerating && props.loadingButton === "warning" ?
                    <>
                        <span
                            className="spinner"
                        >
                        </span>
                        Generating recipe...
                    </>
                    :
                    "Generate a new recipe"
                }
            </button>
        </div>
    )
}