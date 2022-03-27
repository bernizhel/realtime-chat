import { useSubscription } from '@apollo/client';
import { Container, Card } from 'react-bootstrap';
import { GET_MESSAGES } from '../api/graphql';

export const Messages = ({ currentUser }) => {
    const { data } = useSubscription(GET_MESSAGES);
    if (!data) {
        return null;
    }
    return (
        <Container className='d-flex flex-column align-items-center justify-content-center'>
            {data.messages
                .map(({ user, content }) => (
                    <Card
                        bg={user === currentUser ? 'primary' : 'light'}
                        text={user === currentUser ? 'light' : 'dark'}
                        className={`mb-3 ${
                            user === currentUser
                                ? 'align-self-end'
                                : 'align-self-start'
                        }`}
                        style={{ maxWidth: '75%', borderRadius: '0.75em' }}
                    >
                        <Card.Body>
                            {user !== currentUser && (
                                <Card.Title>{user}</Card.Title>
                            )}
                            <Card.Text>{content}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
                .reverse()}
        </Container>
    );
};
