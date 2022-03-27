import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { POST_MESSAGE } from '../api/graphql';
import { Stack, Form, Button } from 'react-bootstrap';

export const MessageForm = ({ onUserChange }) => {
    const [postMessage] = useMutation(POST_MESSAGE);
    const [message, setMessage] = useState({
        user: '',
        content: '',
    });
    const onSubmit = () => {
        if (message.content.length > 0 && message.user.length > 0) {
            postMessage({ variables: message });
            setMessage({ ...message, content: '' });
        }
    };
    return (
        <Stack direction='horizontal' gap={3}>
            <Form.Control
                style={{ maxWidth: '20%' }}
                type='text'
                placeholder='Enter your name'
                value={message.user}
                onChange={(e) => {
                    setMessage({ ...message, user: e.target.value });
                    onUserChange(e.target.value);
                }}
            />
            <Form.Control
                as='textarea'
                placeholder='Enter your message'
                value={message.content}
                onChange={(e) =>
                    setMessage({ ...message, content: e.target.value })
                }
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit();
                    }
                }}
            />
            <Button variant='primary' onClick={onSubmit}>
                Submit
            </Button>
        </Stack>
    );
};
