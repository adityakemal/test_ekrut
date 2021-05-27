import './styles/App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProfileForm from './components/ProfileForm';
console.log = ()=>{}
function App() {
  return(
    <Router>
      <Switch>
        <Route exact path='/' component={ProfileForm} />
        <Route exact path='/:id' component={ProfileForm} />
        <Route exact path='*' component={()=> <div className='fof'><h2><b>404</b>  | Page not found..</h2></div>} />
      </Switch>
    </Router>
  )
}

export default App;
