import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import { accountService } from './services/account.service';

import store from "./store"




const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

// attempt silent token refresh before startup
accountService.refreshToken().finally(app);
ReactDOM.render(app, document.getElementById("root"));
