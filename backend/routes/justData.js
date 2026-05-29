const express = require("express")
const Book = require("../models/Book")
const cors = require("cors")
// first we npm i cors, and require it

route.use(cors({ // and set up the origins that are allowed to use CORS.
    origin: process.env.CORS_ENDPOINT // I stored the endpoint in .env, to make
    // it a little bit easier to change when we deploy later this week
}));
// and any routes Following route.use(cors()) will use those specific settings!

route.use(express.json())
route.get('/', (req, res) =>{
    res.send("We're in the Data Routes!")
})

route.get("/books", async (req, res) =>{
    // res.render("index.ejs") <- for testing
    try{
        const allBooks = await Book.find({});
        res.json({
            books: allBooks
        });
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }

});

// DELETE
route.delete("/books/:id", async (req, res) =>{
    // res.send("Deleting Book...")
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.redirect("/books");
    }catch(error){
        console.error(error)
        res.status(500).send("There was an issue Deleting the book...")
    }
});


// UPDATE
route.put("/books/:id", async (req, res) =>{
    if(req.body.completed === 'on'){
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    try{
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).exec();
        res.redirect(`/books/${req.params.id}`)
    }catch(error){
        console.error(error);
        res.status(500).send("Small issue with the update...")
    }
});

// CREATE
route.post('/books', (req, res) => {
    // Checking for completed "checke off" book.
    if(req.body.completed === 'on'){
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    Book.create(req.body)
        .then(createdBook => {
            console.log('Book has successfuly been created!')
            console.log(req.body)
            res.redirect("/books")
        }).catch(error => {
            console.error('Error Creating Book!')
            res.status(500).send("ISSUE CREATING BOOK!")
        })
    
});

// SHOW
route.get("/books/:id",async (req, res) =>{
    // res.render("show.ejs") <-fine for rendering simple page
    try{
        const foundBook = await Book.findById(req.params.id)
        res.json({
            book: foundBook});
    }catch(error){
        res.status(500).send("ISSUE FINDING INDIVIDUAL BOOK!")
    }
});

module.exports = route