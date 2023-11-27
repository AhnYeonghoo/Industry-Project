import './App.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react';
import Login_page from './pages/Login_page';
import Signup_page from './pages/Signup_page';
import Start_page from './pages/Start_page';
import Main_page from './pages/Main_page';
import Game_page_1 from './pages/Game_page_1';
import Game_page_2 from './pages/Game_page_2';
import Game_result_page from './pages/Game_result_page';
import Revision_page from './pages/Revision_page';
import Learn_category_page from './pages/Learn_category_page';
import Learn_page from './pages/Learn_page';
import Game_page from './pages/Game_page'



function App() {
  let navigate = useNavigate()
  return (
    <div className="App">
      <Routes>
        <Route exact path="/App"  element={ <Start_page/> } /> 
        <Route path="/Login_page" element={ <Login_page/>  } />
        <Route path="/Signup_page" element={ <Signup_page/> } />
        <Route path="/Main_page" element={ <Main_page/> } />
        <Route path="/Game_page_1" element={ <Game_page_1/> } />
        <Route path="/Game_page_2" element={ <Game_page_2/> } />
        <Route path="/Game_result_page" element={ <Game_result_page/> } />
        <Route path="/Revision_page" element={ <Revision_page/> } />
        <Route path="/Learn_category_page" element={ <Learn_category_page/> } />
        <Route path="/Learn_page" element={ <Learn_page/> } />
        <Route path="/Game_page" element={ <Game_page/> } />
      </Routes>

    </div>
  );
}



export default App;
