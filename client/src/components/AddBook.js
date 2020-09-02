import React, { Component } from 'react';
import { graphql } from 'react-apollo';
//import {  gql as graphql } from '@apollo/client';
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queiries/queiries';



class AddBook extends Component {
    constructor( props ){
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }

    displayAuthors(){
        //var data = this.props.data;
        var data = this.props.getAuthorsQuery;
        //console.log(" props data is: ", this.props);
        if( data.loading ){
            return ( <option> Loading Books....!!!</option>)
        }else{
            return data.authors.map( author => {
                return (
                <option key={author.id} value={author.id}>{ author.name }</option>
                )
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        //console.log("this. state is: ",this.state);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries:[{ query: getBooksQuery }]
        });
    }

  render(){
    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
          <div className="field">
              <label>Book Name</label>
              <input type="text" onChange={ (e) => this.setState({ name: e.target.value}) } />

          </div>

          <div className="field">
              <label>Genre</label>
              <input type="text" onChange={ (e) => this.setState({ genre: e.target.value}) } />

          </div>

          <div className="field">
              <label>Author</label>
              <select onChange={ (e) => this.setState({ authorId: e.target.value}) }>
                  <option> Select author  </option>
                  { this.displayAuthors() }
              </select>

          </div>

          <button>+</button>

      </form>
    );

  }
}

//export default graphql(getAuthorsQuery)(AddBook);
export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql( addBookMutation, { name: "addBookMutation"} )
)(AddBook);