const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 7075;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    });

