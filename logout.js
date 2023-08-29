const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from a .env file later on

const app = express();

// Use the 'express-session' middleware
app.use(session({
    name: 'placeholder',
    secret: 'secret-code', // Good enough
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true for HTTPS
        httpOnly: true,
        maxAge: 120000, // Session expire time in ms
    },
}));

// Route to unset the 'id' session variable and redirect
app.get('/logout', (req, res) => {
    try {
        if (req.session.id) {
            // Unset the specific session variable
            delete req.session.id;
            console.log(`User logged out`);
        }

    // Redirect to the root directory
    res.redirect('/');
    } catch (error) {
        console.error(`Error while logging out: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
