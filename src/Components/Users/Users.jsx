import React from "react";
import { Paginator } from "../Paginator/Paginator";
import User from "./User";
import './Users.scss';

const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, unfollow, follow, ...props}) => {
    let portion = 10;
    return (
        <div className="users-wrapper">
            <div>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount}
                    pageSize={pageSize} portion={portion}/>
            </div>
            {props.users.map((item) => {
                return (
                    <User key={item.id} user={item} followingInProgress={followingInProgress} unfollow={unfollow}
                    follow={follow}/>
            )
        })}
        </div>
    );
};

export default Users;
