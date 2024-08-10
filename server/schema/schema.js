import { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt, 
    GraphQLList
} from 'graphql';
import _ from 'lodash';

let books = [
    { id: '1', name: 'Harry Potter', genre: 'Fantasy', authorId: '1' },
    { id: '2', name: 'The Lord of the Rings', genre: 'Fantasy', authorId: '2' },
    { id: '3', name: 'The Da Vinci Code', genre: 'Mystery', authorId: '3' },
    { id: '4', name: 'Angels & Demons', genre: 'Mystery', authorId: '3' },
    { id: '5', name: 'The Silmarillion', genre: 'Fantasy', authorId: '2' },
    { id: '6', name: 'The Hobbit', genre: 'Fantasy', authorId: '2' }
]

let authors = [
    { id: '1', name: 'J.K. Rowling', age: 54 },
    { id: '2', name: 'J.R.R. Tolkien', age: 81 },
    { id: '3', name: 'Dan Brown', age: 56 }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        genre: {
            type: GraphQLString,
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLInt,
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
})

const QueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID,
                }
            },
            resolve(parent, args) {
                // Code to get data from database
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID,
                }
            },
            resolve(parent, args) {
                // Code to get data from database
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: QueryType
})

export default schema;