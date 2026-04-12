import './App.css'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import Login from './components/Login/Login2'
import AdminHome from './components/AdminHome/AdminHome'
import StaffHome from './components/StaffHome/StaffHome'



function App() {
 
  return (

      <Router>
         
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/AdminHome/:username" element={<AdminHome />} />
        <Route path="/StaffHome/:username" element={<StaffHome />} />
      
        { /* 
          <Route path='/' element={a}/>
       
          <Route path='/' element={a}/>
   */}

      </Routes>

       
     
      </Router>
    

    
  )
}

export default App
