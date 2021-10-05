import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AdminList from './component/AdmitList/AdminList';
import Changer  from './component/Changer/Changer';
import MyUI from './component/MyUI/MyUI';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/list">
            <AdminList />
          </Route>
          <Route path="/post">
            <Changer />
          </Route>
          <Route path="/">
            <MyUI />
          </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
