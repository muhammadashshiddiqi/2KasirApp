import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { NavbarComp } from "./Components";
import { Home, Sukses } from "./Pages";
export default class App extends Component {
  render() {
    return (
       <BrowserRouter>
          <NavbarComp />
          <main>
            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/Sukses" component={Sukses} exact/>
            </Switch> 
          </main>
       </BrowserRouter>
    )
  }
}
