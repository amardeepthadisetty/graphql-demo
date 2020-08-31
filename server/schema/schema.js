const graphql = require('graphql');
const _ =  require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt } = graphql;

const books = [
    {id: '1', name: 'Book 1', genre: 'romance'},
    {id: '2', name: 'Book 2', genre: 'crime'},
    {id: '3', name: 'Book 3', genre: 'autobiography'}
]

const authors = [
    {id: '1', name: 'Patrick Rothfuss', age: 45},
    {id: '2', name: 'Brandon Sanderson', age: 55},
    {id: '3', name: 'Terry Pratchett', age: 66}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db / other source
                //console.log(" args type is: ", typeof( args.id ) );
                return _.find(books, {id: args.id})
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db / other source
                //console.log(" args type is: ", typeof( args.id ) );
                return _.find(authors, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})