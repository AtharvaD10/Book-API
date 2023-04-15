const books =[
    {
  ISBN: "12345Book",
  title: "Getting Started with MERN",
  pubDate:"2021-07-07",
  language:"en",
  numPage:250,
  author: [1,2],
  publications: [1],
  category: ["tech","programming","education","triller"]
},
{
    ISBN: "123Book",
    title: "Data Structure and Algorithm",
    pubDate:"2021-07-07",
    language:["en","hindi"],
    numPage:350,
    author: [1,2],
    publications: [1],
    category: ["programming", "Algo","coding"]
  },
];

const author = [
    {
        id:1,
        name:"Atharva",
        books: ["12345Book" , "RemembertheDate21"],
},
{
    id:2,
    name:"suru",
    books:["12345Book"]
},
];

const publication = [
    {
    id:1,
    name:"abcd",
    books: ["12345Book"]
},
];

module.exports = {books, author, publication};