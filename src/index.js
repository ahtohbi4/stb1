import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3000;

/**
 * URI /task2A/
 */
app.get('/task2A/', (req, res) => {
    let result;
    const {a = 0, b = 0} = req.query;

    result = Number(a) + Number(b);

    res.send(String(result));
});

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * URI /task2B/
 */
app.get('/task2B/', (req, res) => {
    let result;
    const PATTERN_FULLNAME = /^[a-zа-яó']+([\s]*[a-zа-яó']*){0,2}$/i;
    const PATTERN_WORD_SEPARATOR = /[\s]+/;
    const {fullname} = req.query;

    result = fullname.trim();

    if (!PATTERN_FULLNAME.test(result)) {
        result = 'Invalid fullname';
    } else {
        result = result.split(PATTERN_WORD_SEPARATOR);
        const surname = capitalizeFirstLetter(result.pop());

        result = result.reduce((greeting, word, i) => {
            return `${greeting} ${word[0].toUpperCase()}.`;
        }, surname);
    }

    res.send(result);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})
