const express = require('express');
const session = require('express-session');
const controllers = require('./controllers');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 7075;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(controllers);

sequelize.sync ({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    });

