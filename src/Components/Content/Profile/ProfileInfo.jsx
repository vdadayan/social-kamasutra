import React from 'react';
import Preloader from '../../Preloader/Preloader';
import ProfileStatusWithHooks from '../Profile/ProfileStatusWithHooks'

const ProfileInfo = ({profile, ...props}) => {
    if (!profile) {
        return (
            <Preloader />
        )
    }
    return (
        <>
            <div>
                <img src={profile.photos.large} alt="ava" />
                <ProfileStatusWithHooks {...props}/>
            </div>
        </>
    )
}

export default ProfileInfo;
