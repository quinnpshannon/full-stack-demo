import Book from "../components/Book.jsx";
import AddBook from "../components/AddBook.jsx";
import { useEffect, useState } from "react";

function Books({ user }) {
  const [books, setBooks] = useState([]);
  async function getBooks() {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/books/user/" + user._id,
    );
    const data = await response.json();
    setBooks(data.books);
  }
  async function handleBook(newBookInfo) {
    newBookInfo.completed = false;
    newBookInfo.user = user._id;
    console.log(newBookInfo)
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/books/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBookInfo),
      },
    );
    const data = await response.json();
    setBooks(data.books);
  }
  async function handleEdit(editBookInfo){
    console.log(editBookInfo)
    console.log(import.meta.env.VITE_BACKEND_URL + "/api/books/"+editBookInfo._id)
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/books/"+editBookInfo._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editBookInfo),
      },
    );
    const data = response.json()
    console.log("TEST TEST")
    if(data._id){
        const newBooks = books.map(book => book._id !== data._id?book:data)
        setBooks(newBooks)
    }
  }
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <>
      <h1>Books</h1>
      {books.map((book) => (
        <Book key={book._id} book={book} checkBook={handleEdit} />
      ))}

      <AddBook addBook={handleBook} />
    </>
  );
}

export default Books;
