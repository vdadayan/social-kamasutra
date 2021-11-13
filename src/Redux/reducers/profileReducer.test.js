import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'How are you?', likesCount: 12},
        {id: 2, message: 'its my first post', likesCount: 11},
      ],
}   

it('length of posts should be incremented', () => {
    let action = addPostActionCreator("it-kamasutra");
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
})

it('message of posts should be incremented', () => {
    let action = addPostActionCreator("it-kamasutra");
    let newState = profileReducer(state, action);

    expect(newState.posts[2].message).toBe("it-kamasutra");
})

it('length delete', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);
})

it('length delete', () => {
    let action = deletePost(1000);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
})