import { Container } from 'react-bootstrap';
import { useState } from 'react';

import { Messages } from './Messages';
import { MessageForm } from './MessageForm';

export const Chat = () => {
    const [user, setUser] = useState('');
    return (
        <Container
            className='d-flex flex-column mt-4 mb-4'
            style={{ gap: '2em' }}
        >
            <MessageForm onUserChange={(newUser) => setUser(newUser)} />
            <Messages currentUser={user} />
        </Container>
    );
};
