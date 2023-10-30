import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./global.css"
import {Provider} from "react-redux"
import store from "./store"
import {ConfigProvider} from "antd"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)
root.render(
    <React.StrictMode>
        <ConfigProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
)