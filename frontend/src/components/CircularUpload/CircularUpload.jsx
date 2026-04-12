import { useState } from 'react';
import axios from 'axios';
import './CircularUpload.css';

const CircularUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSelect = (event) => {
        setCategory(event.target.value);
    };

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("No file selected. Please select a file to upload.");
            return;
        }

        if (!name.trim()) {
            alert("Please enter a file name.");
            return;
        }

        if (!category) {
            alert("Please select a category.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", name);
        formData.append("date", date);
        formData.append("category", category);

        try {
            await axios.post('http://localhost:4001/pdfapi/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res=>
            {
                if (res.status === 200) {
                    alert('File uploaded successfully!');

                } else {
                    alert('Error uploading file.');


                }
            }
            )

           
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h2 className="heading">Upload Circular</h2>
            <form className="form2" onSubmit={handleUpload}>
                <input
                    className="input2"
                    type="text"
                    placeholder="File Name"
                    required
                    value={name}
                    onChange={handleName}
                />
                <select
                    className="select"
                    required
                    value={category}
                    onChange={handleSelect}
                >
                    <option value="">Select Category</option>
                    <option value="sports">Sports</option>
                    <option value="exams">Exams</option>
                    <option value="events">Events</option>
                </select>
                <input
                    className="input3"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                />
                <input
                    type="date"
                    className="filtering-input"
                    value={date}
                    onChange={handleDate}
                />
                <button type="submit" className="login-button2">Upload</button>
            </form>
        </div>
    );
};

export default CircularUpload;
