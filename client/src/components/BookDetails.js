import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queiries/queiries';



class BookDetails extends Component {
    constructor(props){
        super(props);

    }
    

  render(){
      console.log(" propsssss is: ", this.props);
    return (
      <div id="book-details">
        <p>Output Book details here</p>
        { this.props.data.book }
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