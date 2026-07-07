export default function IngredientsList(props) {
   return (
      <>
         <section>
            {
               (props.ingredients.length > 0) ?
                  <div className="ingredientsOnHand">
                     <h2>Ingredients on hand({props.ingredients.length})</h2>
                     <ul>
                        {
                           props.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}{<button onClick={() => props.removeIngredient(ingredient)}>Remove</button>}</li>)
                        }
                     </ul>
                  </div> :
                  <div>
                     <h1>Your kitchen is empty!</h1>
                     <p>Add a few ingredients to generate an AI recipe</p>
                  </div>
            }
         </section>
      </>
   )
}