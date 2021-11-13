import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/ava.png";
import './Users.scss';

const User = ({user, followingInProgress, unfollow, follow}) => {

    return (
        <div key={user.id} className="user">
            <div className="user-nav">
                <NavLink to={'/profile/' + user.id}>
                    <img
                        src={user.photos.small != null ? user.photos.small : userPhoto}
                        alt="avatar"
                    />
                </NavLink>
                {user.followed ? (
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {unfollow(user.id)}}>
                        Follow
                    </button>
                ) : (
                    <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {follow(user.id)}}>
                        Unfollow
                    </button>
                )}
            </div>
            <div className="user-info">
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </div>
            </div>
        </div>
    )
};

export default User;
