import { Link } from 'react-router-dom';

const Bookshelf = ({ books, moveBook }) => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    books.map((book) => (
                        <li id={book.id} key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage:
                                            `url("${book.imageLinks?.thumbnail ?? ''}")`,
                                        }}
                                    ></div>
                                    <div className="book-shelf-changer">
                                        <select onChange={(event) => {moveBook(book, event.target.value)}} value={book.shelf ?? 'none'}>
                                            <option value="disabled" disabled>
                                                Move to...
                                            </option>
                                            <option value="currentlyReading">
                                                Currently Reading
                                            </option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book?.authors?.join()}</div>
                            </div>                            
                            <div className="book-bottom">
                                <Link 
                                    to={`/details/${book.id}`}
                                    className="book-details button">
                                        Book Details
                                </Link>
                            </div>
                        </li>
                    ))
                }
            </ol>
        </div>
    );
}

export default Bookshelf;