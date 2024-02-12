import React from "react";
import download_icon from "../../../img/download.svg";
import {createOptions2, request2} from "@/services/requestFunction.js";

export default function NewAvatarPreview (props) {

    const{ newAvatar, setShowAvatarPreview, setEmployee, showAvatarPreview} = props;

    const fileDownload = async () => {
        try {
            if (!newAvatar) {
                return;
            }

            let formObj = new FormData();
            formObj.append('avatar', newAvatar);

            let options = createOptions2('POST', formObj);

            const response =  await request2('/api/download', options)

            if (response.ok) {
                const data = await response.json();
                setEmployee(prevState => ({...prevState, 'photo':data }))
                setShowAvatarPreview(false);
            }
        }  catch (error) {
            console.error('Error during employee update:', error.message);
        }
    }

    return (
        <>
            {
                showAvatarPreview &&
                (
                    <div className="overlay">
                        <div className="photo-block">
                            <img
                                className="photo-block-img"
                                src={ URL.createObjectURL(newAvatar) }
                                alt="photo"
                            />
                            <img
                                className="download-icon"
                                src={download_icon}
                                alt="download"
                                onClick={fileDownload}
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}
