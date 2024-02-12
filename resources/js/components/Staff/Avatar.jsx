import React, {useEffect, useState} from "react";
import camera from "../../../img/camera-add-photo.svg";
import NewAvatarPreview from "../../components/Staff/NewAvatarPreview.jsx";

export default function Avatar (props) {

    const {employee, setEmployee } = props;
    const [newAvatar, setNewAvatar] = useState({});
    const [showAvatarPreview, setShowAvatarPreview] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {

            const excludedDiv = document.getElementsByClassName('photo-block');

            if (excludedDiv && !event.target.classList.contains('photo-block') && !event.target.parentNode.classList.contains('photo-block')) {
                setShowAvatarPreview(false);
            }
        };


        document.addEventListener('click', handleClickOutside);



        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="d-flex avatar-block">
                <img alt="avatar"
                     key={ Date.now() }
                     src={ employee.photo }
                     className="avatar"
                />
            </div>
            <div className="camera-icon">
                <input
                    style={{ display:" none" }}
                    id="fileInput"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        setNewAvatar(e.target.files[0])
                        setShowAvatarPreview(true);
                    }}
                />
                <label htmlFor="fileInput">
                    <img
                        alt="camera"
                        src={camera}
                    />
                </label>
            </div>
            <NewAvatarPreview newAvatar = { newAvatar } setShowAvatarPreview = { setShowAvatarPreview } setEmployee = { setEmployee } showAvatarPreview = { showAvatarPreview }/>
        </>
    )
}
