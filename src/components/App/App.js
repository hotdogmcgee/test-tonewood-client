import React from "react";
import { Route, Switch } from "react-router-dom";
import WelcomePage from "../../routes/WelcomePage/WelcomePage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import Header from "../Header/Header.js";
import LoginPage from "../../routes/LoginPage/LoginPage";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import PrivateRoute from "../Utils/PrivateRoute";
import WoodPage from "../../routes/WoodPage/WoodPage";
import SubmissionPage from "../../routes/SubmissionPage/SubmissionPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import { ErrorModal } from "../ErrorModal/ErrorModal";
import "./App.css";

class App extends React.Component {
  state = {
    hasError: false,
    hasLogin: false
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  hasLogin = loggedIn => {
    this.setState({
      hasLogin: loggedIn
    });
  };

  // ModalRoot = () => (
  //   <ModalConsumer>
  //     {({ component: Component, props, hideModal }) =>
  //       Component ? <Component {...props} onRequestClose={hideModal} /> : null
  //     }
  //   </ModalConsumer>
  // );

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Header hasLogin={this.hasLogin} />
        </header>
        <main className="App__main">
          {this.state.hasError && <ErrorModal />}
          <Switch>
            <Route exact path={"/"} component={WelcomePage} />
            <Route
              path={"/login"}
              render={props => (
                <LoginPage {...props} hasLogin={this.hasLogin} />
              )}
            />
            <PrivateRoute path={"/woods/:woodId"} component={WoodPage} />
            <PublicOnlyRoute path={"/register"} component={RegistrationPage} />
            <PrivateRoute path={"/new-submission"} component={SubmissionPage} />
            <Route path={"*"} component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
