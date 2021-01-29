const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const fs = require('fs');
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const contact = mongoose.model('contact', contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});
// app.get('/contact',(req,res)=>{
//     res.status(200).render('contact.pug');
// });

app.post('/contact',(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.render('home.pug')
    }).catch(()=>{
        res.status(400).send("your request has been rejeceted")
    })
})

app.listen(port,()=>{
    console.log(`The application successfully running on port ${port}`);
});
