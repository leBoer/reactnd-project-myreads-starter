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
    setTimeout(() => {
      console.log(this.state.books)
    }, 2000)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchPage

          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
