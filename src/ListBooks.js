import Bookshelf from "./Bookshelf";
import { Link } from 'react-router-dom';

const ListBooks = ({books, moveBook}) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Bookshelf moveBook={moveBook} books={books.filter(book => book.shelf === 'currentlyReading')}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Bookshelf moveBook={moveBook} books={books.filter(book => book.shelf === 'wantToRead')}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Bookshelf moveBook={moveBook} books={books.filter(book => book.shelf === 'read')}/>
                </div>
              </div>
            </div>
            <div className="open-search">
                <Link 
                    to="/search"
                    className="search-books">
                    Add a book
                </Link>
            </div>
          </div>
    );
}

export default ListBooks;