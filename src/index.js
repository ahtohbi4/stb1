import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3000;

app.get('/', (req, res) => {
    let result;
    const {a = 0, b = 0} = req.query;

    result = Number(a) + Number(b);

    res.send(String(result));
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})
