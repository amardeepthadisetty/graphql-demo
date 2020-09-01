import React, { Component } from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost'; 
import { ApolloProvider } from 'react-apollo';
import AddBook from './components/AddBook';

//apollo client setup
const clientEndPoint = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {

  render(){
    return (
      <ApolloProvider client={clientEndPoint}>
        <div id="main">
          <h1>Ninjas reading list</h1>
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );

  }
}

export default App;
