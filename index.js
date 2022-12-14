var express = require('express');
var {
    graphqlHTTP
} = require('express-graphql');
var {
    buildSchema
} = require('graphql');

// get services
const UserServies = require("./src/services/user.services");
// GraphQL schema
var schema = buildSchema(`
type Query {
    createUser(username: String, password: String): CreateUser,
    loginUser(username: String, password: String): LoggedIn
},
type CreateUser {
    username: String,
    password: String
  },
  type userLogin {
    username: String,
    user_id: String
  },
  type LoggedIn {
    message: String,
    token: String,
    user_profile: userLogin
  }
`);
// Root resolver
var root = {
    ...UserServies,

};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));