import "./App.css";
import { useEffect, useState } from "react";
import BookSearchPage from "./BookSearchPage";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import ListBooks from "./ListBooks";
import BookDetails from "./BookDetails";

function App() {
  const [books, setBooks] = useState([]);

  const moveBook = (bookToUpdate, shelf) => {
    const update = async () => {
      const res = await BooksAPI.update(bookToUpdate, shelf);
      if (books.findIndex(x => x.id === bookToUpdate.id) === -1) {
        getBooksFromAPI();
      } else {
        if (shelf === 'none') {
          var index = books.findIndex(x => x.id === bookToUpdate.id);
          books.splice(index,1);
        }
        updateBooks(res);
      }
    }
    update();
  }

  const updateBooks = (updatedList) => {
    var booksToUpdate = books;

    Object.keys(updatedList).forEach((key) => {
      updatedList[key].forEach(id => {
        var index = booksToUpdate.findIndex(x => x.id === id);
        booksToUpdate[index].shelf = key;
      });
    });

    setBooks([...booksToUpdate]);
  }

  useEffect(() => {
    getBooksFromAPI();
  }, []);

  const getBooksFromAPI = () => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };

    getBooks();
  }

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={
          <ListBooks moveBook={moveBook} books={books} />
        }/>
        <Route exact path="/search" element={
          <BookSearchPage moveBook={moveBook} books={books} />
        }/>
        <Route exact path="/details/:id" element={
          <BookDetails />
        }/>
      </Routes>
    </div>
  );
}

export default App;
