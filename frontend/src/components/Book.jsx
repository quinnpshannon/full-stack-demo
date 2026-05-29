export default function Book({book, checkBook}){
    async function handleCheck({target}){
        book.completed = target.checked
        console.log(book)
        checkBook(book)
    }
    return (
        <div>
            <h2>Title: {book.title}</h2>
            <h3>Author: {book.author}</h3>
            <input type="checkbox" checked={book.completed} onChange={handleCheck}/>
        </div>
    )
}