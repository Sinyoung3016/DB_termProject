const express = require('express');
const app = express();
const api = require('./routes/index');

// 5000번 포트로 엶
const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
app.use('/api', api);
