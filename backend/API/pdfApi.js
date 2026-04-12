const express = require("express");
const multer = require('multer');
const fs = require('fs');
const { Binary } = require('mongodb');

const pdfApp = express();
const upload = multer({ dest: 'uploads/' });

pdfApp.use(express.json());

// Endpoint to handle file upload
pdfApp.post('/upload', upload.single('file'), (req, res) => {
    const pdfCollection = req.app.get('pdfCollection');
    
    try {
        const fileData = fs.readFileSync(req.file.path);
        const pdfDocument = {
            name: req.body.name,
            date: req.body.date,
            category: req.body.category,
            data: new Binary(fileData)
        };

        pdfCollection.insertOne(pdfDocument) 
        res.status(200).send({ message: "File uploaded successfully" });
            
       
    } catch (error) {
        console.error('Error reading or processing the file:', error);
        res.status(500).send({ message: 'Error processing file' });
    }
});

// Endpoint to get metadata of all PDFs
pdfApp.get('/get', async (req, res) => {
    const pdfCollection = req.app.get('pdfCollection');

    try {
        const pdfData = await pdfCollection.find({}, { projection: { data: 0 } }).toArray();
        res.status(200).send({ payload: pdfData });
    } catch (error) {
        console.error('Error fetching PDF metadata:', error);
        res.status(500).send({ message: 'Error fetching data' });
    }
});

pdfApp.get('/pdfFile', async (req, res) => {
    const { name, date, category } = req.query;
    const pdfCollection = req.app.get('pdfCollection');

    try {
        const pdfData = await pdfCollection.findOne({ name, date, category }, { projection: { date: 0, name: 0, category: 0 } });
        
        if (!pdfData) {
            return res.status(404).send({ message: 'File not found' });
        }

        const buffer = Buffer.from(pdfData.data.buffer);
        res.contentType('application/pdf');
        res.status(200).send(buffer);
    } catch (error) {
        console.error('Error fetching PDF file:', error);
        res.status(500).send({ message: 'Error fetching file' });
    }
});

pdfApp.delete('/pdfFile',(req,res)=>{
    const pdfCollection = req.app.get('pdfCollection')
    const pdfData = req.query

    pdfCollection.deleteOne({name:pdfData.name , date : pdfData.date , category : pdfData.category})
    const newPdfData =  pdfCollection.find({}, { projection: { data: 0 } }).toArray();
    res.status(200).send({payload:newPdfData})
})

module.exports = pdfApp;
