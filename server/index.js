const { GraphQLServer } = require('graphql-yoga');

const messages = [];

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }

    type Query {
        messages: [Message!]
    }

    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }
`;

const resolvers = {
    Query: {
        messages: () => messages,
    },
    Mutation: {
        postMessage: (_, { user, content }) => {
            const id =
                messages
                    .map((m) => m.id)
                    .reduce((acc, i) => (i > acc ? i : 0), 0) + 1;
            messages.push({ id, user, content });
            return id;
        },
    },
};

const server = new GraphQLServer({ typeDefs, resolvers });

const start = () => {
    server.start(({ port }) => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

start();
