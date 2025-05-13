const express = require('express');
const app = express();
const scenariosRouter = require('./routes/scenarios');
const conversationsRouter = require('./routes/conversations');
require('dotenv').config();

app.use(express.json());

app.use('/scenarios', scenariosRouter);
app.use('/conversations', conversationsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
