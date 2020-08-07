import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import { Provider } from "react-redux";
import Lobby from "./components/Lobby";
import ChatViewer from "./components/ChatViewer";
import {
  HashRouter as Router,
  Route
} from "react-router-dom";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <h1>VioChat</h1>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/chat" component={ChatViewer} />
          </div>
        </Provider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
