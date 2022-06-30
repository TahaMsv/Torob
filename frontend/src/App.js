import './App.css';
import MainPage from "./components/main-page/main-page";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import SignUp from './components/sign-up/sign-up';
import Login from './components/login/login';
import ResultItems from './components/result-items/result-items';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={MainPage}/>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path='/search' component={ResultItems} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
