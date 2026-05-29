export default function Book({book, checkBook}){
    function handleCheck({target}){
        book.completed = target.checked
        checkBook(book)
    }
    function handleDelete({target}){
        book.delete = true
        checkBook(book)
    }
    return (
        <div>
            <h2>Title: {book.title}</h2>
            <h3>Author: {book.author}</h3>
            <input type="checkbox" checked={book.completed} onChange={handleCheck}/>
            <button onClick={handleDelete}>X</button>
        </div>
    )
}