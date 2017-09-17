import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooks from './ListBooks'
import SearchPage from './SearchPage'


class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBook = (book) => (event) => {
    const books = this.state.books
    const shelf = event.target.value
    const indexOfBook = (id) => {
      return books.findIndex(i => i.id === book.id)
    }
    if(indexOfBook(book.id) <= 0) {
      // Checks if the book is coming from search or shelf
      books.push(book)
    }
    books[indexOfBook(book.id)].shelf = shelf 
    this.setState((state) => ({
      books
    }))
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchPage
            shelvedBooks={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
