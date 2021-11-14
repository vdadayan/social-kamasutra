import React from "react";
import PostsContainer from "../Posts/Posts-container";
import ProfileInfo from "./ProfileInfo";

const Profile = (props,{isOwner}) => {
    return(
        <div>
            <main>
                <ProfileInfo isOwner={isOwner} {...props}/>
                <PostsContainer />
            </main>
        </div>
    );
}

export default Profile;
