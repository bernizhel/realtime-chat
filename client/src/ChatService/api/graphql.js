import { gql } from '@apollo/client';

export const SUBSCRIBE_MESSAGES = gql`
    subscription {
        messages {
            user
            content
        }
    }
`;

export const POST_MESSAGE = gql`
    mutation ($user: String!, $content: String!) {
        postMessage(user: $user, content: $content)
    }
`;
