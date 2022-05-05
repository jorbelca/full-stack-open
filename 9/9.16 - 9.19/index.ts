import express  from "express";
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoses';
import patientsRouter from "./src/routes/patients";

const app = express();
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
res.send("PONG");
    });

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});