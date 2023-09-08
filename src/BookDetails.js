import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

const BookDetails = () => {
    const [book, setBook] = useState({});
    const navigate = useNavigate();
    let params = useParams();
    
    useEffect(() => {
        if (params) {
            const getBookDetails = async () => {
                const res = await BooksAPI.get(params.id);
                setBook(res);
            }
    
            getBookDetails();
        }
       
        return () => {
            setBook([]);
        }
    },[params]);

    return (
        <div className="center white-background">
            <button
                onClick={() => navigate(-1)}
                className='close-details'>
                    Close
            </button>
            <div className="book center">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url("${book.imageLinks?.thumbnail ?? ''}")`,
                        }}>
                    </div>
                    <div className="book-link">
                        <a title="Read Now" className="book-read-now" href={book?.infoLink}>Read Now</a>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-published-date">Published: {book?.publishedDate}</div>
                <div className="book-pages">Pages: {book?.pageCount}</div>
                <div className="book-authors">{book?.authors?.join()}</div>
            </div>
            <div className="description">{book?.description}</div>
        </div>
    );
}

export default BookDetails;