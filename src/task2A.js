export default (req, res) => {
    let result;
    const {a = 0, b = 0} = req.query;

    result = Number(a) + Number(b);

    res.send(String(result));
};
