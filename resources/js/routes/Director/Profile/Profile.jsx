import React from 'react';
import {useSelector} from "react-redux";

import ProfileDirector from '../../../components/Director/Profile/ProfileData.jsx';
import EditDataProfileDirector from '../../../components/Director/Profile/editDataProfile';
import EditPhotoProfileDirector from '../../../components/Director/Profile/editPhotoProfile';
import EditPassProfileDirector from '../../../components/Director/Profile/editPassProfile';

export default function Profile() {
    const profileState = useSelector(state => state.render);

    const profile = 'profile';
    const editData = 'editData';
    const editPhoto = 'editPhoto';
    const editPass = 'editPass';

    let render = <ProfileDirector/>;

    if(profileState.render === profile){
        render = <ProfileDirector/>;
    }else if (profileState.render === editData) {
        render = <EditDataProfileDirector/>;
    }else if (profileState.render === editPhoto) {
        render = <EditPhotoProfileDirector/>;
    }
    else if (profileState.render === editPass) {
        render = <EditPassProfileDirector/>;
    }

    return (
        <div className="width-1200 mx-4 mt-5 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div id="headProfile">{render}</div>
            </div>
        </div>
    );
}
