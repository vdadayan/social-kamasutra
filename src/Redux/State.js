// import { rerenderTree } from "..";
// import dialogsReducer from "./reducers/dialogReducer";
// import profileReducer from "./reducers/profileReducer";
// import sidebarReducer from "./reducers/sidebarReducer";

// let store = {
//   _state : {
//     profilePage: {
//         posts: [
//           {id: 1, message: 'How are you?', likesCount: 12},
//           {id: 2, message: 'its my first post', likesCount: 11},
//         ],
//         newPostText: 'it-kamasutra.com'

//     },messagesPage: {
//         message: [
//           {id: 1, message: 'Hi'},
//           {id: 2, message: 'How is your it-kamasutra?'},
//           {id: 3, message: 'Yo'},
//           {id: 4, message: 'Yo'},
//           {id: 5, message: 'Yo'},
//         ],
//         dialogs: [
//           {id: 1, name: 'Dymich'},
//           {id: 2, name: 'Andrey'},
//           {id: 3, name: 'Sveta'},
//           {id: 4, name: 'Sasha'},
//           {id: 5, name: 'Viktor'},
//           {id: 6, name: 'Valera'},
//         ],
//         newMessageBody: ''
//     },
//     sidebar: {}
//   },
//   _callSubscriber() {
//     console.log(this._state.profilePage.newPostText);
//   },
//   subscribe(observer) {
//     this._callSubscriber = observer;
//   },
//   getState() {
//     return this._state;
//   },
//   dispatch(action) {

//     profileReducer(this._state.profilePage, action)
//     dialogsReducer(this._state.messagesPage, action)
//     sidebarReducer(this._state.sidebar, action)
//     this._callSubscriber(this._state);
//   }
// }
// export let addPost = () => {
//   let newPost = {
//     id: 3,
//     message: store._state.profilePage.newPostText,
//     likesCount: 0
//   };

//   store._state.profilePage.posts.push(newPost);
//   store._state.profilePage.newPostText = '';
//   rerenderTree(store._state);
// }

// export let updateNewPostText = (newText) => {
//   store._state.profilePage.newPostText = newText;
//   rerenderTree(store._state);
// }




// export default store;
// window.store = store;
