import React from 'react';
import Preloader from '../../Preloader/Preloader';
import ProfileStatusWithHooks from '../Profile/ProfileStatusWithHooks'
import userPhoto from "../../../assets/images/ava.png";

const ProfileInfo = ({isOwner, profile, savePhoto, ...props}) => {
    if (!profile) {
        return (
            <Preloader/>
        )
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <>
            <div>
                <img src={profile.photos.large || userPhoto} alt="ava"/>
                {isOwner ? <input type='file' onChange={(e) => onMainPhotoSelected(e)}/> : null}

                <div>
                    <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
                </div>
                <div>
                    <b>About me</b> {profile.aboutMe}
                </div>
                <ProfileStatusWithHooks {...props}/>
            </div>
        </>
    )
}

export default ProfileInfo;
