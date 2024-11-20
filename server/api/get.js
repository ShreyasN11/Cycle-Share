async function getname(req, res) {
    try {
        const name = { Name: 'Shreyas Naik' };
        res.json(name);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getemail(req, res) {
    try {
        const email = { email: 'shreyasmnaik11@gmail.com' };
        res.json(email);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getemail,
    getname
};
