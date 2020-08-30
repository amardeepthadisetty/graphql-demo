const graphql = require('graphql');
const _ =  require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const books = [
    {id: '1', name: 'Book 1', genre: 'romance'},
    {id: '2', name: 'Book 2', genre: 'crime'},
    {id: '3', name: 'Book 3', genre: 'autobiography'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                //code to get data from db / other source
                return _.find(books, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})