const express = require('express');
const session = require('express-session');
const path = require('path');

// This imports the morgan logging tool to help debug code.
const morgan = require('morgan');

// Imports the connection configuration for the database from the file specified.
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// The routes exported from the controllers directory's main index.js file are imported.
const routes = require('./controllers');

// Imports the handlebars templating engine.
const exphbs = require('express-handlebars');

// This directs the application to the helper functions defined in the given directory.
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 7075;

// This allows Express to use middleware to parse incoming requests using json and url encoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This is used to serve css stylesheets and assets to the application.
app.use(express.static(path.join(__dirname, 'public')));

// This defines middleware using the morgan logging module.
app.use(morgan('dev'));

const userSessions = {
    secret: process.env.SECRET,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Middleware using the session needs to be run on every incoming request.
app.use(session(userSessions));

// The handlebars templating engine is initiated and directs Express to use Handlebars to render views with the handlebars file extension.
// app.set set the default view engine to handlebars.  This makes the res.render() function available in the application.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Directs Express to use the routes defined in the controllers directory.  The main index.js file in root of the directory exports all routes needed for the application.
app.use(routes);

// Syncs the Sequelize models with the database.  The false option does not drop tables if they exist.
// After the database is synced, the express application is started and set to listen on the given port.
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    });

