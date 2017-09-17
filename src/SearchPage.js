import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { BookItem } from './ListBooks'

class SearchPage extends Component {
  state = {
    query: '',
    books: [],
  }

  updateQuery = (query) => {
    const { shelvedBooks } = this.props
    this.setState({ query: query })

    BooksAPI.search(query, 20).then((books) => {
      for (let book of books) {
        // Checks if a book is already on a shelf
        for (let shelvedBook of shelvedBooks) {
          if (book.id === shelvedBook.id) {
            book.shelf = shelvedBook.shelf
          }
        }
      }
      this.setState({ books })
    })
  }

  render() {
  const { onMoveBook } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
        <BookItem
          books={this.state.books}
          onMoveBook={onMoveBook}
        />
        </div>
      </div>
    )
  }
}

export default SearchPage