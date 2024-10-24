const mongoose = require('mongoose')

mongoose
    .connect("mongodb://localhost:27017/YoutubeBackend")
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => { console.log(error) })