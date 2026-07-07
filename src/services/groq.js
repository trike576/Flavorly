const API_KEY = import.meta.env.VITE_GROQ_API_KEY
export default async function generateRecipe(ingredients) {
    const ingredientsString = ingredients.join(", ")

    const response = await fetch("https://api.groq.com/openai/v1/responses", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            input: `You are a professional chef and recipe developer.

Your task is to create a delicious, practical, and easy-to-follow recipe using the ingredients provided below.

Ingredients:
${ingredientsString}

Guidelines:

- Base the recipe primarily on the provided ingredients.
- Do NOT introduce major ingredients that are not listed.
- You may assume common pantry basics such as water, salt, black pepper, cooking oil, butter, or basic spices only when genuinely necessary.
- If the provided ingredients are insufficient for a complete dish, create the best possible recipe with them instead of inventing additional ingredients.
- If any ingredient is unsafe, inedible, or clearly not meant for cooking, politely explain why it cannot be used and exclude it from the recipe.
- Make the recipe realistic, flavorful, and suitable for home cooking.
- Avoid unnecessarily complicated cooking techniques.
- Use clear and beginner-friendly instructions.
- Suggest optional variations only if they do not change the main recipe.

Return your response in **Markdown only** using the following structure:

# Recipe Name

A short 1–2 sentence introduction describing the dish.

## Ingredients

- List every ingredient used.
- Clearly separate optional pantry ingredients if any are used.

## Instructions

Provide numbered cooking steps that are easy to follow.

## Tips

Include 2–3 useful cooking tips that improve the final result.

## Serving Suggestions

Suggest one or two suitable ways to serve the dish.

Important:

- Do NOT wrap the response inside triple backticks.
- Do NOT include any explanations before or after the recipe.
- Return only the Markdown recipe.`
        })
    })


    if (!response.ok) {
        return "Recipe generation failed"
    }

    const data = await response.json()
    const recipe = data.output[1].content[0].text
    return recipe
}