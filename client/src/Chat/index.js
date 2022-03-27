import { ApolloProvider } from '@apollo/client';

import { Chat } from './components/Chat';
import { client } from './api';

export const ChatService = () => {
    return (
        <ApolloProvider client={client}>
            <Chat />
        </ApolloProvider>
    );
};
