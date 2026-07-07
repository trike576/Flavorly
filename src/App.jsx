import {createRoot} from "react-dom/client"
import Header from "./components/Header"
import Form from "./Main"

const root = createRoot(document.getElementById("root"))

root.render(
    <>
        <Header/>
        <Form/>
    </>
)