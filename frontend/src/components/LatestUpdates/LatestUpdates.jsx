import PdfTable from '../PdfTableStaff/PdfTableStaff';
import latest_icon from "../assets/latest_icon.png"
import './LatestUpdates.css'

const LatestUpdates = () => {

    const data =  [
        { name: "Soccer Match", category: "sports", date: "2024-05-18" },
        { name: "Calculus Exam", category: "exams", date: "2024-06-03" },
        { name: "Music Concert", category: "events", date: "2024-06-15" },
        { name: "Basketball Game", category: "sports", date: "2024-07-10" },
        { name: "Physics Midterm", category: "exams", date: "2024-07-25" },
        { name: "Art Exhibition", category: "events", date: "2024-08-14" },
        { name: "Book Club Meeting", category: "events", date: "2024-08-28" },
        { name: "Chemistry Quiz", category: "exams", date: "2024-09-10" },
        { name: "Football Game", category: "sports", date: "2024-09-21" },
        { name: "Tech Conference", category: "events", date: "2024-10-05" },
        { name: "Biology Final", category: "exams", date: "2024-10-24" },
        { name: "Halloween Party", category: "events", date: "2024-10-31" },
        { name: "Movie Marathon", category: "events", date: "2024-11-16" },
        { name: "Thanksgiving Dinner", category: "events", date: "2024-11-28" },
        { name: "Final Project Presentation", category: "exams", date: "2024-12-12" },
        { name: "Holiday Break", category: "events", date: "2024-12-20" },
        { name: "New Year's Eve Party", category: "events", date: "2024-12-31" },
        { name: "Winter Training Camp", category: "sports", date: "2025-01-10" },
        { name: "Semester Exams", category: "exams", date: "2025-01-20" },
        { name: "Valentine's Day Celebration", category: "events", date: "2025-02-14" }
      ];

      const sortedData = data.sort((a, b) =>   new Date(b.date) - new Date(a.date));
      const latestData = sortedData.slice(0, 5);
      


      
    return (
        <div>
<div className=' latest-container'>
    <h3>Latest Circulars </h3>
<img className='latest-icon' src={latest_icon} alt="" />
</div>


                
        <PdfTable data={latestData} />

        </div>
    );
};

export default LatestUpdates;
