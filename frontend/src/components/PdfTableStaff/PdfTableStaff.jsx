import { useContext } from 'react';
import './PdfTableStaff.css'
import download from '../assets/download.png'
import axios from 'axios';
import { PdfContext } from '../Context/pdfContext';
import { API_BASE_URL } from '../../api';

const PdfTable = () => {
  const { data } = useContext(PdfContext);

  let handlePdfView=async (item)=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/pdfapi/pdfFile`, {
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

  let handleDownload=(event, item)=>{
    event.stopPropagation(); // Stop event propagation
    console.log('download',item)
  }

    return (
      <div className="data-table-container" style={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 90px)' }}>
        {data.length === 0 ? (
          <p>No records found</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className='row-hover' key={index} onClick={()=>handlePdfView(item)}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td><img onClick={(event)=>handleDownload(event, item)} className='download-icon' src={download} alt="" /></td>
                </tr>
              ))}
            </tbody>
            
          </table>
        )}
      </div>
    );
};

export default PdfTable;
