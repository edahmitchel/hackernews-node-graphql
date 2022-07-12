const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// 1
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },{
    id: 'link-2',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
// const typeDefs = `
//   type Query {
//     info: String!
//   }
// `
// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
    link: (parent, args) => {
      return links.find(link => link.id === args.id)
    }
  },
  Mutation: {
    // 2
    post: (parent, args) => {
  
    let idCount = links.length

       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
      
    },
updateLink: (parent, args) => {
  let index = links.findIndex(link=> link.id === args.id)
  if(args.url){
  links[index].url = args.url}
  if(args.description){
  links[index].description = args.description}
// console.log(parent)
return links[index]
},
deleteLink:(parent,args)=>{
    let index = links.findIndex(link=> link.id === args.id)
    let deletedLink = links.splice(index,1)
    return deletedLink[0]

}

}
  
  // 3
//   Link: {
//     id: (parent) => parent.id,
//     description: (parent) => parent.description,
//     url: (parent) => parent.url,
//   }
  }
//   ,
//     Mutation: {
//         createUser: (name,String) => {
//             name
//             id
//         }
//     }

// const resolvers = {
//     Query: {
//       info: () => `This is the API of a Hackernews Clone`
//     }
//   }

// 3
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
      ),
  resolvers,context:{
    prisma
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );