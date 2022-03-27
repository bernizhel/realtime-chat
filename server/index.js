const { GraphQLServer, PubSub } = require('graphql-yoga');
const uuid = require('uuid');

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

    type Subscription {
        messages: [Message!]
    }
`;

const subscribers = [];
const onMessagesUpdate = (fn) => subscribers.push(fn);

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
            subscribers.forEach((fn) => fn());
            return id;
        },
    },
    Subscription: {
        messages: {
            subscribe: (_, __, { pubsub }) => {
                const channel = uuid.v4();
                onMessagesUpdate(() => pubsub.publish(channel, { messages }));
                setTimeout(() => pubsub.publish(channel, { messages }, 0));
                return pubsub.asyncIterator(channel);
            },
        },
    },
};

const pubsub = new PubSub();

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

const start = () => {
    server.start(({ port }) => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

start();
