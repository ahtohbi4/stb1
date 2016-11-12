function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export default (req, res) => {
    let result;
    const PATTERN_FULLNAME = /^[a-zа-яó']+([\s]*[a-zа-яó']*){0,2}$/i;
    const PATTERN_WORD_SEPARATOR = /[\s]+/;
    const {fullname = ''} = req.query;

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
};
