import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../../Validator/validator';
import { TextArea } from '../../FormsControls/FormControls';
import Post from './Post-item/Post-item';


const maxLengthCreator10 = maxLengthCreator(10);

const Posts = ({posts, addPost}) => {
    const onSubmit = (value) => {
        addPost(value.postValue)
    }
    return(
        <>  <div>
                My Posts
            </div> 
            <div>
              <PostReduxForm onSubmit={onSubmit}/>
                <div className="posts">
                    {posts.map((item) => {
                        return(
                            <Post message={item.message} likesCount={item.likesCount} key={item.id} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}


const PostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field name="postValue" placeholder="Введите название поста" component={TextArea} validate={[requiredField, maxLengthCreator10]}/>
            <br/>
            <button>Add post</button>
        </form>
    )
}

const PostReduxForm = reduxForm({form: 'posts'})(PostForm)

export default Posts;