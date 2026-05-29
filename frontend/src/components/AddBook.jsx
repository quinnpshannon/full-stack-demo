export default function AddBook({addBook}){
    function handleSubmit(e){
        e.preventDefault()
        const bookInfo = {
            title: e.target[0].value,
            author: e.target[1].value
        }
        e.target[0].value=""
        e.target[1].value=""
        addBook(bookInfo)
    }
    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input name="title"></input>
        <label htmlFor="author">Author: </label>
        <input name="author"></input>
        <input type="submit" />
      </form>
    )
}