import {Button} from '@mui/material'
import { ShoppingCartRounded } from '@mui/icons-material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useContext, useEffect } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { setCredential } from './store/authSlice'
import { useState} from 'react'
import Activities from './pages/activities.jsx'
import ActivityDetails from './pages/ActivityDetails.jsx';
function App() {
  const {token,tokenData,logIn,logOut,isAuthenticated} = useContext(AuthContext);
  const dispatch=useDispatch();
  const [authReady,setAuthReady]=useState(false);

  useEffect(()=>{
    if(token){
      dispatch(setCredential({token,user: tokenData}));
      setAuthReady(true);
    }
  },[token,tokenData,dispatch]);

  return (
  <Router>
    {!token ? (
     <Button
  variant="contained"
  onClick={() => { logIn() }}
  startIcon={<ShoppingCartRounded />}
>
  Add item
</Button>

    ) : (
      <div>
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities/:activityId" element={<ActivityDetails/>} />
        </Routes>
      </div>
      
    )}
  </Router>
);

}

export default App
