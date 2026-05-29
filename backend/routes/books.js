const express = require("express")
const Book = require("../models/Book")
const authMiddleware = require("../utils/auth")
// first we npm i cors, and require it

const route = express.Router()

route.use(express.json())
route.use(authMiddleware)
route.get("/user/", async (req, res) =>{
    // res.render("index.ejs") <- for testing
    try{
            const allBooks = await Book.find({user:req.user._id});
            res.json({
                books: allBooks
            });
    }catch(error){
        console.error(error)
        res.status(500).send(error)
    }

});

// DELETE
route.delete("/:id", async (req, res) =>{
    // res.send("Deleting Book...")
    try{
        const deleted = await Book.findByIdAndDelete(req.params.id);
        res.json({book: deleted})
    }catch(error){
        console.error(error)
        res.status(500).send("There was an issue Deleting the book...")
    }
});


// UPDATE
route.put("/:id", async (req, res) =>{
    try{
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );
        res.json({book: updatedBook})
    }catch(error){
        console.error(error);
        res.status(500).send("Small issue with the update...")
    }
});

// CREATE
route.post('/', (req, res) => {
    // Checking for completed "checke off" book.

    Book.create(req.body)
        .then(createdBook => {
            console.log('Book has successfuly been created!')
            res.send({book: createdBook})
        }).catch(error => {
            console.error('Error Creating Book!')
            res.status(500).send("ISSUE CREATING BOOK!")
        })
    
});

// SHOW
route.get("/:id",async (req, res) =>{
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