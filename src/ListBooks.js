import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  render() {
    const { books, onMoveBook } = this.props
    let currentlyReading, wantToRead, read
    if (books !== 'undefined') {
      currentlyReading = books.filter((book) => book.shelf === "currentlyReading")
      wantToRead = books.filter((book) => book.shelf === "wantToRead")
      read = books.filter((book) => book.shelf === "read")
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookItem 
                books={currentlyReading}
                onMoveBook={onMoveBook}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookItem
                books={wantToRead}
                onMoveBook={onMoveBook}
                />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookItem
                books={read}
                onMoveBook={onMoveBook}
              />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}
export class BookItem extends Component {
  render() {
    const { books, onMoveBook } = this.props
    if (books !== undefined && books.length > 0) {
      return (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id} className='book-list-item'>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail:""})` }} />
                    <ShelfChanger
                      book={book}
                      onMoveBook={onMoveBook}
                    />
                  </div>
                  <div className="book-title">{book.title}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}
class ShelfChanger extends Component {

  render() {
    const { onMoveBook, book } = this.props
    return (
      <div className="book-shelf-changer">
          <select 
            value={book.shelf || "none"}
            onChange={onMoveBook(book)}
          >
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
      </div>
    )
  }
}
export default ListBooks