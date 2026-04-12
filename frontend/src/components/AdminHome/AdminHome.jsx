import './AdminHome.css'
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { PdfProvider } from '../Context/pdfContext';


const AdminHome = () => {
    let {state}=useLocation()
    

    return (
        <div>
            <PdfProvider>
            <Header/>
            <Sidebar state={state} />
            </PdfProvider>
           

           


           

{/*
        <div className="card" onClick={handleUser} >
           <p>Register a New User</p> 
        </div>

        <div className="card"   onClick={handleUpload} >
            <p>Upload New Circular</p>
        </div>
        
        <div className="card" onClick={handleDelete} >
            <p>Delete Circular</p>
        </div>
    */}
            
        </div>
    );
};

export default AdminHome;
