import ReactMarkdown from "react-markdown"
export default function Recipe(props) {
    return (
        <>
            {props.recipeShown && <div 
            className="recipe"
            ref={props.recipeRef}
            >
                {props.recipe && <ReactMarkdown>{props.recipe}</ReactMarkdown>}</div>
            }
        </>
    )
}