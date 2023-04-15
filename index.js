const { request, response } = require("express");
const express = require("express");

//database
const database = require("./database");


//initialization
const booky = express();

// configuration
booky.use(express.json());

// Books:
/*
Route          /
Description     Get all books
Access          Public
Parameter       None
Methods         Get
*/
booky.get("/",(request, response) => {
    return response.json({books: database.books});
});


/*
Route          /is
Description     Get specific book based on ISBN
Access          Public
Parameter       isbn
Methods         Get
*/
booky.get("/is/:isbn", (request, response) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === request.params.isbn
    );
    if (getSpecificBook.length === 0){
        return response.json({error:`No book found for the ISBN of ${request.params.isbn}`,
    });
    }

    return response.json({book: getSpecificBook});
});




/*
Route          /c
Description     Get specific book based on category
Access          Public
Parameter       category
Methods         Get
*/
booky.get("/c/:category",(request,response) =>{
        const getSpecificBook = database.books.filter(
            (book) =>book.category.includes(request.params.category)
            );
            if (getSpecificBook.length === 0){
                return response.json({error:`No book found for the category of ${request.params.category}`,
            });
            }
        
            return response.json({book: getSpecificBook});
});



/*
Route          /l
Description     get list of books based on languages 
Access          Public
Parameter      language
Methods         Get
*/

booky.get("/l/:language",(request , response) =>{
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(request.params.language));
        if (getSpecificBook.length === 0){
            return response.json({error: `No book found for this language ${request.params.language}`,
        });
        }
        return response.json({books: getSpecificBook});
});

//Authors


/*
Route          /author
Description     to get all authors
Access          Public
Parameter       None
Metshod         Get
*/

booky.get("/author",(request , response) => {
    return response.json({authors: database.author})
});

/*
Route          /author
Description     get specific authors
Access          Public
Parameter       name
Metshod         Get
*/

booky.get("/author/:name",(request , response) =>{
    const  getSpecificAuthor = database.author.filter(
        (author) => author.name.includes(request.params.name)
    );
    if(getSpecificAuthor.length === 0 ){
        return response.json({error:`No specific author is found ${request.params.name}`})
    }
    return response.json({book: getSpecificAuthor});
});

/*
Route          /author/book
Description     get list of authors based on books
Access          Public
Parameter       isbn
Metshod         Get
*/
booky.get("/author/book/:isbn",(request , response) =>{
    const getSpecificAuthor = database.author.filter(
        (author) =>author.books.includes(request.params.isbn)
        );
        if (getSpecificAuthor.length === 0){
            return response.json({error:`No Author book found for ${request.params.isbn}`,
        });
        }
    
        return response.json({book: getSpecificAuthor});
});



/*
Route          /publications
Description     get all publication
Access          Public
Parameter       None
Metshod         Get
*/
booky.get("/publications", (request , response) =>{
    return response.json({publications: database.publication});
});


/*
Route          /publications
Description     get specific publication
Access          Public
Parameter       Name
Metshod         Get
*/

booky.get("/publications/:name",(request, response) => {
    const getspecificpublication = database.publication.filter(
        (publication) =>publication.name.includes(request.params.name)
        );
        if (getspecificpublication.length === 0){
            return response.json({error:`No Specific Publication found for ${request.params.name}`
        });
        }
    
        return response.json({publication: getspecificpublication});
});

//...................................POST......................................

/*
Route          /book/new
Description     add new book 
Access          Public
Parameter       none
Metshod         post
*/
booky.post("/book/new",(req , res ) => {
    const {newBook} = req.body;

    database.books.push(newBook);
    return res.json({ books: database.books});
});


/*
Route          /author/new 
Description     add new book 
Access          Public
Parameter       None
Metshod         post
*/


booky.post("/author/new",(req , res) =>{
    const {newAuthor} = req.body;

    database.author.push(newAuthor);
    return res.json({ author: database.author});
});

booky.listen(3000, () => console.log("Hey server is running"));


//.....................................PUT..................................
/*
Route          /book/update/title
Description     update book title
Access          Public
Parameter       isbn
Metshod        PUT
*/

booky.put("/book/update/title/:isbn",( req , res) => {
database.books.forEach((book)=> {
 if (book.ISBN === req.params.isbn){
     book.title = req.body.newBookTitle;
     return;
 }
});
    return res.json({books: database.books})
});


/*
Route          /book/update/author
Description    update/add new author for a book
Access          Public
Parameter       isbn
Metshod        PUT
*/

booky.put("/book/update/author/:isbn/:authorID", ( req , res) =>{
    
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            return book.author.push(parseInt(req.params.authorID));
        }

    });

    database.author.forEach((author) =>{
        if (author.id === req.params.authorID)
        return author.books.push(parseInt(req.params.isbn));
    });
        return res.json ({books: database.books, author: database.author})
});