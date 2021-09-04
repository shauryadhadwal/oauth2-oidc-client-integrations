import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Callback from './pages/Callback'
import Home from './pages/Home'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/callback">
          <Callback />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)