import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  render() {
    const { books } = this.props
    let currentlyReading = books.filter((book) => book.shelf === "currentlyReading")
    let wantToRead = books.filter((book) => book.shelf === "wantToRead")
    let read = books.filter((book) => book.shelf === "read")

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookItem books={currentlyReading}/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookItem books={wantToRead}/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookItem books={read}/>
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
class BookItem extends Component {
  render() {
    const { books } = this.props

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id} className='book-list-item'>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                  <div className="book-shelf-changer">
                    <select>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map((author) => {
                  return <div className="book-authors">{author} </div>
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}
//test
export default ListBooks