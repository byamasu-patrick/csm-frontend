export interface JoinModel {
    messages: Array<string>;
}

export interface ResponseConnection {
    messages: Array<ResponseMessage>;
    joinedMessages: Array<string>;
    connectedUsers: UserChat[];
}

export interface ResponseMessage{
    message: string;
    user: UserChat;
}

export interface UserConnection{
    user: UserChat;
    room: string;
}

export interface Message{
    message: string;
}


export interface UserChat{
    email: string;
    name: string;
    userId: string;
}