import "src/index.css"

import React from "react"
import ReactDOM from "react-dom"
import { Route, BrowserRouter as Router } from "react-router-dom"
import { Detail } from "src/components/Detail"
import { Favorites } from "src/components/Favorites"
import { Home } from "src/components/Home"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/movie/:movieID" component={Detail}></Route>
      <Route exact path="/favorites" component={Favorites}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
