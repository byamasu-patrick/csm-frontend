import React, { FormEvent, useState } from 'react';

const ChatInput = (props: any) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
        } 
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onUserUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((event.target as HTMLInputElement).value);
    }

    const onMessageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage((event.target as HTMLInputElement).value);
    }

    return (
        <form 
            onSubmit={(event) => onSubmit(event)}>
            <label htmlFor="user">User:</label>
            <br />
            <input 
                id="user" 
                name="user" 
                value={user}
                onChange={onUserUpdate} />
            <br/>
            <label htmlFor="message">Message:</label>
            <br />
            <input 
                type="text"
                id="message"
                name="message" 
                value={message}
                onChange={onMessageUpdate} />
            <br/><br/>
            <button>Submit</button>
        </form>
    )
};

export default ChatInput;