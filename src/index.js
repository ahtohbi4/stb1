import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3000;

import task2A from './task2A';
import task2B from './task2B';
import task2C from './task2C';
import task3A from './task3A';

app.get('/task2A/', task2A);
app.get('/task2B/', task2B);
app.get('/task2C/', task2C);
app.use('/task3A/*', task3A);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
