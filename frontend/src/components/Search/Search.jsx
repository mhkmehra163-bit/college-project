import { useState, useContext } from 'react';
import './Search.css';
import PdfTableAdmin from '../PdfTableAdmin/PdfTableAdmin';
import { PdfContext } from '../Context/pdfContext';


const Search = () => {
  const { data } = useContext(PdfContext);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [fData,setFData] = useState([]);

  // useEffect(() => {
  //   axios.get(`http://localhost:4001/pdfapi/get`)
  //     .then(res => {
  //       const initialData = res.data.payload;
  //       setData(initialData);
  //       setFData(initialData)
  //     });
  // }, []); // Empty dependency array ensures this effect runs only once, on mount

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    let filteredData = [...data];
    

    if (category) {
      filteredData = filteredData.filter(item => item.category === category);
    }

    if (date) {
      filteredData = filteredData.filter(item => item.date === date);
    }

    if (searchTerm) {
      filteredData = filteredData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFData(filteredData);
  };

  const handleReset = () => {
    setCategory('');
    setDate('');
    setSearchTerm('');
    setFData(data)
  };

  return (
    <div>
      <div className="filtering-container">
        <label className="filtering-label">Category:</label>
        <select className="filtering-select" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="sports">Sports</option>
          <option value="exams">Exams</option>
          <option value="events">Events</option>
        </select>

        <label className="filtering-label">Date:</label>
        <input className="filtering-input" type="date" value={date} onChange={handleDateChange} />

        <label className="filtering-label">Search:</label>
        <input className="filtering-input" type="text" value={searchTerm} onChange={handleSearchChange} />

        <button className="filtering-button" onClick={handleFilter}>Filter</button>
        <button className="filtering-button" onClick={handleReset}>Reset</button>
      </div>

      <PdfTableAdmin data={fData} />
    </div>
  );
};

export default Search;
