var express = require('express');
var app = express();
var PORT = 4000;
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Middlewares
app.use(express.json());
app.use(cookieParser());
// Cors is used to intigrate API to frontend
app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true
}))

// DB Connection
require('./Connection/connection')

// User Routes
app.use('/auth', require('./Routes/user'))

// Video Routes
app.use('/api', require('./Routes/video'))

// Comment Routes
app.use('/commentApi', require('./Routes/comment'))


app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})