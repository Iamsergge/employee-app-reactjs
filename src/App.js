import logo from './logo.svg';
import './App.css';
import EmpListing from './EmpListing.js';
import EmpCreate from './EmpCreate';
import EmpDetails from './EmpDetails';
import EmpEdit from './EmpEdit';
import{BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h1>Employee app</h1>
      <BrowserRouter>
  <Routes>
    <Route path='/' element={<EmpListing/>}></Route>
    <Route path='/employee/create' element={<EmpCreate/>}></Route>
    <Route path='/employee/details/:empid' element={<EmpDetails/>}></Route>
    <Route path='/employee/edit/:empid' element={<EmpEdit/>}></Route>

    
  </Routes>
  </BrowserRouter>
    </div>
    
  );
 
}

export default App;
