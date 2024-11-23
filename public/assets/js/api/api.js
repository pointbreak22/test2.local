const {app, port} = require("../app");

app.get('/api/arbitr/all',
    async (req, res) => {
        const {execute} = require("./method/allCases.js");

        const {dates, types, courts} = await req.query;
        let responseDTO=await execute(dates, courts,types);
        await res.status(200).send(JSON.stringify(responseDTO));
});

app.get('/api/arbitr/case', async (req, res) => {
    const {execute} = require( "./method/casesForNumber.js");

    const {caseNumber} = await req.query;
    let responseDTO=await execute(caseNumber);
    await res.status(200).send(responseDTO);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});