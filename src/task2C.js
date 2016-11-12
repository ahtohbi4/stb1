export default (req, res) => {
    const PATTERN_USERNAME = /^(?:http)?[s]?[\:]?(?:\/\/)?(?:[a-z0-9\.\-]*(?=\/)\/)?(?:@)?([a-z0-9\-_\.]+)/i;
    const {username = ''} = req.query;

    if (username.length) {
        try {
            res.send('@' + username.match(PATTERN_USERNAME)[1]);
        } catch (err) {
            console.log(err.stack);

            res.send(`Could not extract username from string "{$username}".`);
        }
    } else {
        res.send(`
            <form>
                <input name="username" placeholder="Username">
                <button>Send</button>
            </form>
        `);
    }
};
