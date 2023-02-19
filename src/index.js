import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import axios from "axios"
import { store } from "./ReduxStore"
import { Provider } from "react-redux"

axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
