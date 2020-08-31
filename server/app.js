const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


//connect to mLab database
mongoose.connect('mongodb+srv://new_user123:new_user123@cluster0.cr5xg.mongodb.net/graphql_demo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose.connection.once('open' , () => {
    console.log(' A connection has been established successfully!!!');
})

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}) );

app.listen(4000,() => {
    console.log("Server is listening to port 4000!!!");
})