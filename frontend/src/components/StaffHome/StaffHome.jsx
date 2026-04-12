import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import './StaffHome.css'
import SidebarStaff from '../SidebarStaff/SidebarStaff';
import { PdfProvider } from '../Context/pdfContext'

const StaffHome = () => {

    let {state}=useLocation()
    


   
      return(
        <div>
          <PdfProvider>
          <Header/>
         <SidebarStaff state={state}/>
         </PdfProvider>
        </div>
      )
    };

export default StaffHome;
