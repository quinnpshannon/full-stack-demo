import Book from "../components/Book.jsx";
import AddBook from "../components/AddBook.jsx";
import { useEffect, useState } from "react";

function Books({ token, user }) {
  const [books, setBooks] = useState([]);
  async function getBooks() {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/books/user/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    const data = await response.json();
    setBooks(data.books);
  }
  async function handleBook(newBookInfo) {
    newBookInfo.completed = false;
    newBookInfo.user = user._id;
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/books/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newBookInfo),
      },
    );
    const data = await response.json();
    const newBooks = books.map((book) => {
      return { ...book };
    });
    newBooks.push(data.book);
    setBooks(newBooks);
  }
  async function handleEdit(editBookInfo) {
    // console.log(editBookInfo)
    // console.log(import.meta.env.VITE_BACKEND_URL + "/api/books/"+editBookInfo._id)
    if (!editBookInfo.delete) {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/books/" + editBookInfo._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(editBookInfo),
        },
      );
      const data = await response.json();
      if (data.book._id) {
        const newBooks = books.map((book) =>
          book._id !== data._id ? book : data,
        );
        setBooks(newBooks);
      } 
    } else{
        const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/books/" + editBookInfo._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );
      const data = await response.json()
      setBooks(books.filter(book => book._id !== data.book._id))
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
