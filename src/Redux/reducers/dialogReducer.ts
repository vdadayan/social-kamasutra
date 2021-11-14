const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}


let initialState = {
    message: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, name: 'Dymich'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ] as Array<DialogType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                message: [...state.message, {id: 6, message: body}],
            };
        }
        default :
            return state;
    }
}

type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorActionType => ({
    type: SEND_MESSAGE,
    newMessageBody
})

export default dialogsReducer;
