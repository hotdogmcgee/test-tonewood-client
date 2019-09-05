import React from "react";
import { Route, Switch } from "react-router-dom";
import WoodListPage from "../../routes/WoodListPage/WoodListPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import Header from "../Header/Header.js";
import LoginPage from "../../routes/LoginPage/LoginPage";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PrivateRoute from "../Utils/PrivateRoute";
import WoodPage from "../../routes/WoodPage/WoodPage";
import SubmissionPage from '../../routes/SubmissionPage/SubmissionPage'
import "./App.css";

class App extends React.Component {
  state = {
    hasError: false,
    hasLogin: false
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  hasLogin = (loggedIn) => {
    this.setState({
      hasLogin: loggedIn
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Header hasLogin={this.hasLogin}/>
        </header>
        <main className="App__main">
          {this.state.hasError && (
            <p className="red">There was an error! Oh no!</p>
          )}
          <Switch>
            <Route exact path={"/"} component={WoodListPage} />
            <Route path={"/login"} render={(props) => <LoginPage {...props} hasLogin={this.hasLogin}/>} />
            {/* <PublicOnlyRoute path={"/login"} component={LoginPage} /> */}
            <PrivateRoute path={"/woods/:woodId"} component={WoodPage} />
            <Route path={'/new-submission'} component={SubmissionPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

