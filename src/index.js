import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'
import "./i18n"
import { Provider } from "react-redux"
import { store, persistor, sagaMiddleware } from './store';


const app = (

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)


ReactDOM.render(app, document.getElementById("root"))
