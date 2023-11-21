const { ApolloServer } = require("apollo-server");
// Import ApolloServer from apollo-server

const { importSchema } = require("graphql-import");
// Import importSchema from graphql-import to load GraphQL schemas

const EtherDataSource = require("./datasource/ethDatasource");
// Import EtherDataSource class

const typeDefs = importSchema("./schema.graphql");
// Load GraphQL schema from schema.graphql file

require("dotenv").config();
// Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),
    // Resolver to get ether balance for an address

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),
    // Resolver to get total ether supply

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),
    // Resolver to get latest Ethereum price

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
    // Resolver to get average block confirmation time
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
    // Instantiate EtherDataSource
  }),
});

server.timeout = 0;
// Set no timeout for requests

server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// Start Apollo server on port 9000
