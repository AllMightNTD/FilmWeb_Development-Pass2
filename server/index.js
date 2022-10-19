const express = require('express');
const app = express();
require('dotenv').config({ path: '.env' });
const cors = require('cors');
const methodOverride = require('method-override');
var bodyParser = require('body-parser');
const port = process.env.DATABASE_PORT;

const route = require('./src/routes/index.js');
const db = require('./src/config/db');
app.use(cors());
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

// Connect db
db.connect();

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
