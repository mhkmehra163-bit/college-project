import {useState, useContext} from 'react';
import PdfTableStaff from '../PdfTableStaff/PdfTableStaff';
import { PdfContext } from '../Context/pdfContext';

const SearchStaff = () => {
    // const initialData =  [
    //     { name: "Soccer Match", category: "sports", date: "2024-05-18" },
    //     { name: "Calculus Exam", category: "exams", date: "2024-06-03" },
    //     { name: "Music Concert", category: "events", date: "2024-06-15" },
    //     { name: "Basketball Game", category: "sports", date: "2024-07-10" },
    //     { name: "Physics Midterm", category: "exams", date: "2024-07-25" },
    //     { name: "Art Exhibition", category: "events", date: "2024-08-14" },
    //     { name: "Book Club Meeting", category: "events", date: "2024-08-28" },
    //     { name: "Chemistry Quiz", category: "exams", date: "2024-09-10" },
    //     { name: "Football Game", category: "sports", date: "2024-09-21" },
    //     { name: "Tech Conference", category: "events", date: "2024-10-05" },
    //     { name: "Biology Final", category: "exams", date: "2024-10-24" },
    //     { name: "Halloween Party", category: "events", date: "2024-10-31" },
    //     { name: "Movie Marathon", category: "events", date: "2024-11-16" },
    //     { name: "Thanksgiving Dinner", category: "events", date: "2024-11-28" },
    //     { name: "Final Project Presentation", category: "exams", date: "2024-12-12" },
    //     { name: "Holiday Break", category: "events", date: "2024-12-20" },
    //     { name: "New Year's Eve Party", category: "events", date: "2024-12-31" },
    //     { name: "Winter Training Camp", category: "sports", date: "2025-01-10" },
    //     { name: "Semester Exams", category: "exams", date: "2025-01-20" },
    //     { name: "Valentine's Day Celebration", category: "events", date: "2025-02-14" }
    //   ];

      
      
  const { data } = useContext(PdfContext);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


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
    // Filtering logic here if needed
  };

  const handleReset = () => {
    setCategory('');
    setDate('');
    setSearchTerm('');
  };

    return (
        <>


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

 
<PdfTableStaff data={data} />
            
        </>
    );
};

export default SearchStaff;
