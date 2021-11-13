import React from "react";
import PostsContainer from "../Posts/Posts-container";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {
    return(
        <div>
            <main>
                <ProfileInfo {...props}/>
                <PostsContainer />
            </main>
        </div>
    );
}

export default Profile;