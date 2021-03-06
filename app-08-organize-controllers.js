// osoite: http://localhost:8080/login
// https://expressjs.com/en/starter/static-files.html
// npm run start-dev

const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

//Controllers
const auth_controller = require('./controllers/auth_controller');
const note_controller = require('./controllers/note_controller');
const shoppinglist_controller = require('./controllers/shoppinglist_controller');

let app = express();

app.use(body_parser.urlencoded({
    extended: true
}));

app.use(session({
    secret: '1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000000
    }
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

const is_logged_handler = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

//Serve Static files
app.use('/css', express.static('css'))

//Auth
app.use(auth_controller.handle_user);
app.get('/login', auth_controller.get_login);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);
app.post('/logout', auth_controller.post_logout);


//Notes
app.get('/', is_logged_handler, note_controller.get_notes);
app.post('/delete-note', is_logged_handler, note_controller.post_delete_note);
app.get('/note/:id', is_logged_handler, note_controller.get_note);
app.post('/add-note', is_logged_handler, note_controller.post_note);

//shoppinglists
app.get('/', is_logged_handler, shoppinglist_controller.get_shoppinglists);
app.post('/delete-shoppinglist', is_logged_handler, shoppinglist_controller.post_delete_shoppinglist);
app.get('/shoppinglist/:id', is_logged_handler, shoppinglist_controller.get_shoppinglist);
app.post('/add-shoppinglist', is_logged_handler, shoppinglist_controller.post_shoppinglist);

app.use((req, res, next) => {
    res.status(404);
    res.send(`
        page not found
    `);
});

//Shutdown server CTRL + C in terminal
const mongoose_url = 
"mongodb+srv://db-user:qkv3ezg72PXk2tW@cluster0-drnpu.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Mongoose connected');
    console.log('Start Express server');
    app.listen(PORT);
});