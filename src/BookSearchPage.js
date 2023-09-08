import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from "react";
import Bookshelf from "./Bookshelf";
import debounce from 'lodash.debounce';
import * as BooksAPI from "./BooksAPI";

const BookSearchPage = ({ books, moveBook }) => {
    const [searchBooks, setSearchBooks] = useState([]);

    const updateQuery = (query, existingBooks) => {
        const search = async () => {
            const res = await BooksAPI.search(query, 100);
            if (res && 'error' in res) {
                setSearchBooks([...existingBooks]);
            } else if (res) {   
                var distinctIds = new Set(existingBooks.map(x => x.id));
                setSearchBooks([...existingBooks, ...res.filter(b => !distinctIds.has(b.id))]);
            }         
        }
        search();
    }

    useEffect(() => {
        return () => {
            debouncedCallToAPI.cancel();
        }
    });

    const onInputChange = (value) => {
        var filtered = books.filter((b) => 
            b.title.toLowerCase().includes(value.toLowerCase()) || 
            b.authors.some((author) => author.toLowerCase().includes(value.toLowerCase())) ||
            b.industryIdentifiers[0].identifier.includes(value.toLowerCase()) || 
            b.industryIdentifiers[1].identifier.includes(value.toLowerCase()));
        if (value === "") {
            setSearchBooks([]);
        } else {
            debouncedCallToAPI(value, filtered);
        }
    }

    const debouncedCallToAPI = useMemo(() => debounce(updateQuery, 500), []);

    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
                to="/"
                className="close-search">
                Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={(event) => onInputChange(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {
                    searchBooks.length > 0 && (
                        <Bookshelf moveBook={moveBook} books={searchBooks}/>
                    )
                }
            </ol>
          </div>
        </div>
    );
}

export default BookSearchPage;