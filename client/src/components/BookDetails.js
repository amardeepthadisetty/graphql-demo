import React, { Component } from 'react';
import { graphql } from 'react-apollo';
//import {  gql as graphql } from '@apollo/client';
import { getBookQuery } from '../queiries/queiries';



class BookDetails extends Component {
  

  displayBookDetails() {
    const { book } = this.props.data;

    if(book){
      return (
          <div>
            <h1>{book.name}</h1>
            <p>{book.genre}</p>
            <p>{book.author.name} </p>
            <p>All Books by this author</p>
            <ul className='other-books'>
                {
                  book.author.books.map(book => {
                    return (
                    <li key={book.id}>{book.name}</li>
                    )
                  })
                }
            </ul>
          </div>
      )
    }else{
      return ( <div>No Book selected...!</div>)
    }
  }

  render(){

    
    return (
      <div id="book-details">
        <p>Output Book details here</p>
        { this.displayBookDetails() }
      </div>
    );

  }
}

export default graphql( getBookQuery,{
    options:(props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
} )(BookDetails);