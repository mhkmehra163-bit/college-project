import { useContext } from 'react';
import './PdfTableAdmin.css'
import delete_icon from '../assets/delete_icon.png'
import axios from 'axios';
import { PdfContext } from '../Context/pdfContext';

const PdfTableAdmin = () => {
  const { data } = useContext(PdfContext);

  let handlePdfView=async (item)=>{
    try {
      const response = await axios.get('http://localhost:4001/pdfapi/pdfFile', {
        params: {
          name: item.name,
          date: item.date,
          category: item.category
        },
        responseType: 'arraybuffer', // Ensure response is treated as binary data
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');  
   
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }

  }

  const handleDelete=async (event,item)=>{
    event.stopPropagation(); 
    await axios.delete(`http://localhost:4001/pdfapi/pdfFile`,
      {
        params: {
          name: item.name,
          date: item.date,
          category: item.category
        },
        headers:{
          'Content-Type':'application/json'
        }
        }
        
    )

  }
    
    return (

      <div className="data-table-container"  style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 90px)' }}> 
      {data.length === 0 ? (
        <p>No records found</p>
      ) : (
      <table className="data-table"> 
        <thead>
          <tr className='head-row'>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Date</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className='row-hover' key={index}  onClick={()=>{handlePdfView(item)}}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.date}</td>
              <td>  <img className='delete-icon' src={delete_icon} onClick={(event)=>handleDelete(event,item)}  alt="" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      
      
      
    </div>
    
    );
};

export default PdfTableAdmin;
