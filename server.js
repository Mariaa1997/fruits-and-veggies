require('dotenv').config();
const express = require('express');
const app = express();
// const fruits = require('./models/fruits.js');
// const vegetables = require('./models/vegetables.js')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Fruit = require('./models/fruit')
const Vegetable = require('./models/vegetable')
const jsxViewEngine = require('jsx-view-engine');

//Global Configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

//connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// moving the fruits to models/fruits.js in order to have compartmentalized code
// we are using MVC - models-views-controllers - architecture
// https://developer.mozilla.org/en-US/docs/Glossary/MVC
// const fruits = [
//     {
//         name:'apple',
//         color: 'red',
//         readyToEat: true
//     },
//     {
//         name:'pear',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name:'banana',
//         color: 'yellow',
//         readyToEat: true
//     }
// ];

// ================ Middleware ================
//
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));

// These are my routes
// We are going to create the 7 RESTful routes
// There is an order for them to listed in the code
// I - N - D - U - C - E - S
//  Action      HTTP Verb   CRUD 
// I - Index    GET         READ - display a list of elements
// N - New      GET         CREATE * - but this allows user input
// D - Delete   DELETE      DELETE
// U - Update   PUT         UPDATE * - this updates our database
// C - Create   POST        CREATE * - this adds to our database
// E - Edit     GET         UPDATE * - but this allows user input
// S - Show     GET         READ - display a specific element

app.get('/', (req, res) => {
    res.send('this is my fruits and veggies root route');
});


// I - INDEX - dsiplays a list of all fruits
app.get('/fruits/', async (req, res) => {
    try {
        const foundFruits = await Fruit.find({});
        res.status(200).render('fruits/Index', {fruits: foundFruits});
    } catch (err) {
        res.status(400).send(err);
    }
    //  res.send(fruits);
});

app.get('/vegetables/', async (req, res) => {
    //  res.send(vegetables);
    try {
        const foundVegetables = await Vegetable.find({});
        console.log(foundVegetables)
        res.status(200).render('vegetables/Index', {vegetables: foundVegetables});
    } catch (err) {
        res.status(400).send(err);
    }
    
});

// N - NEW - allows a user to input a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});

app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New');
});

//D - DELETE - PERMANENTLY removes a fruit from the db
app.delete('/fruits/:id', async (req, res)=> {
    // res.send('deleting...');
    try{
        const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
        console.log(deletedFruit)
        res.status(200).redirect('/fruits');
    } catch (err) {
        res.status(400).send(err);
    }

})

app.delete('/vegetables/:id', async (req, res)=> {
    // res.send('deleting...');
    try{
        const deletedVegetable = await Vegetable.findByIdAndDelete(req.params.id);
        console.log(deletedVegetable)
        res.status(200).redirect('/vegetables');
    } catch (err) {
        res.status(400).send(err);
    }

})

//U - UPDATE - makes the actual changes to the database
app.put('/fruits/:id', async (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    try {
        const updatedFruit = await Fruit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        console.log(updatedFruit);
        res.status(200).redirect(`/fruits/${req.params.id}`);
    } catch (err) {
    res.status(400).send(err)
}})

app.put('/vegetables/:id', async (req, res) => {
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    try {
        const updatedVegetable = await Vegetable.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        )
        console.log(updatedVegetable);
        res.status(200).redirect(`/vegetables/${req.params.id}`);
    } catch (err) {
    res.status(400).send(err)
}})


// C - CREATE - update our data store
app.post('/fruits', async (req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;

    }
    try {
        const createdFruit = await Fruit.create(req.body);
        res.status(200).redirect('/fruits');
    } catch (err) {
        res.status(400).send(err);
    }
    // fruits.push(req.body);
    // console.log(fruits);
    // console.log(req.body)
    //  res.send('data received');
    // res.redirect('/fruits'); // send user back to /fruits
})

app.post('/vegetables', async (req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    try {
        const createdVegetable = await Vegetable.create(req.body);
        res.status(200).redirect('/vegetables');
    } catch (err) {
        res.status(400).send(err);
    }
    // vegetables.push(req.body);
    // console.log(fruits);
    // console.log(req.body)
    //  res.send('data received');
    // res.redirect('/vegetables'); // send user back to /vegetables
})

 // E -EDIT - allows a user to privide the inputs to change the fruit
app.get('/fruits/:id/edit', async (req, res)=> {
    try{
        const foundFruit = await Fruit.findById(req.params.id);
        res.status(200).render("fruits/Edit", {fruit: foundFruit});
    } catch (err) {
        res.status(400).send(err)
    }
    
 })

 app.get('/vegetables/:id/edit', async (req, res)=> {
    try{
        const foundVegetable = await Vegetable.findById(req.params.id);
        res.status(200).render("vegetables/Edit", {vegetable: foundVegetable});
    } catch (err) {
        res.status(400).send(err)
    }
    
 })

// S - SHOW - show route displays details of an individual fruit
app.get('/fruits/:id', async (req, res) => {
    //  res.send(fruits[req.params.indexOfFruitsArray]);
    try {
        const foundFruit = await Fruit.findById(req.params.id)
        res.render('fruits/Show', { fruit: foundFruit});
    } catch (err) {
        res.status(400).send(err);
    }
    // res.render('fruits/Show', {// second parameter must be an object
    //     fruit: fruits[req.params.indexOfFruitsArray]
    // });
})

app.get('/vegetables/:id', async (req, res) => {
     // res.send(fruits[req.params.indexOfVegetablesArray]);
     try {
        const foundVegetable = await Vegetable.findById(req.params.id)
        console.log(foundVegetable)
        res.render('vegetables/Show', { vegetable: foundVegetable});
     } catch (err) {
        res.status(400).send(err);
     }
    // res.render('vegetables/Show', {// second parameter must be an object
    //     vegetable: vegetables[req.params.indexOfVegetablesArray]
    // });
})

app.listen(3001, () => {
    console.log('listening');
});