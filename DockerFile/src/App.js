import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Sensors from './components/sensors';
import SensorsV1 from './components/sensorv1';
import Login from './components/login';
import SignUp from './components/signup';
import Slots from './components/slots';

function App()
{ 
  const isLogin=false//localStorage.getItem(isLogined)

  return(
    <Router>
          <Routes>
                 <Route exact path='/signup' element={< SignUp />}></Route>
                 <Route exact path='/login' element={< Login />}></Route>
                 <Route exact path='/dashboard' element={<Sensors/>}></Route>
                 <Route exact path="/spots" element={<Slots></Slots>}></Route>
          </Routes>
      </Router>
  )
}
// <Sensors></Sensors>
export default App;
