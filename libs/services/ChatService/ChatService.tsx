
import { HubConnectionBuilder } from '@microsoft/signalr';
import { JoinModel, Message, ResponseConnection, ResponseMessage, UserConnection } from '../../models/chat/ChatModel';

export const chatClient = ' https://localhost:7121/chat';

export var connectionHub: any = null;
export let joinRoomResponses: ResponseConnection = {
    messages: [],
    connectedUsers: [],
    joinedMessages: []
};

export let state: boolean = false;

export const JoinChatRoom = async(joinRoom: UserConnection) : Promise<ResponseConnection> => {
    try{
        
        const connection = new HubConnectionBuilder()
            .withUrl(chatClient)
            .withAutomaticReconnect()
            .build();
    
        connection.on("ReceiveMessage", (user, message: ResponseMessage) => {
            if(!message.message.includes("has joined") && !message.message.includes("has left")){                    
                joinRoomResponses.messages = [...joinRoomResponses.messages]
                joinRoomResponses.messages.push(message);
            }
            else{
                joinRoomResponses.joinedMessages = [...joinRoomResponses.joinedMessages]
                joinRoomResponses.joinedMessages.push(message.message);
                joinRoomResponses.connectedUsers = [
                    ...joinRoomResponses.connectedUsers, user
                ]; 
            }
            console.log(joinRoomResponses);
            state = !state;
        });

        connection.on("UsersInRoom", (users) => {
            joinRoomResponses.connectedUsers = users;
            // console.log("Connected User: ", users)
        });
    
        connection.onclose(e => {
            // setConnection();
            joinRoomResponses = {
                messages: [],
                connectedUsers: [],
                joinedMessages: []
            };
            // setUsers([]);
        });
    
        await connection.start();
        await connection.invoke("JoinRoom", joinRoom);

        // joinRoomResponses.connection = connection;
        connectionHub = connection;
    }
    catch(error){
        var errorMessage = (error as string);

        console.log("Error has occured during connection to the room: ", errorMessage);
    }

    return joinRoomResponses;
}

export const SendMessage = async(message : string) =>{

    try{
        if(connectionHub !== null){
            connectionHub.invoke("SendMessage", message);
        }
    }
    catch(error){
        var errorMessage = (error as string);
        console.log("Error has occured while sending message the room: ", errorMessage);
    }

}

export const closeConnectionToRoom = async () => {
    try {

        await connectionHub.stop();

    } 
    catch (error) {
        var errorMessage = (error as string);

        console.log("The connection has been closed from the room: ", errorMessage);
    }  
}

