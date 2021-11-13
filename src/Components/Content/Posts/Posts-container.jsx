import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../Redux/reducers/profileReducer';
import Posts from './Posts';

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (postValue) => {
            dispatch(addPostActionCreator(postValue))
        }
    }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;