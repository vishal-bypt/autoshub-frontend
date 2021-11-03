import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'
import "./i18n"
import { Provider } from "react-redux"
import { store, persistor } from './store';


const app = (

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter basename="/autoshub">
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
)


ReactDOM.render(app, document.getElementById("root"))
