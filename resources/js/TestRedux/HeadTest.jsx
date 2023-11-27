import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {change} from "../store/slices/slices.js";
import DataDirector from "./BodyTest1.jsx";
import EditDataDirector from "./BodyTest2.jsx";
import EditPhotoDirector from "./BodyTest3.jsx"

const HeadTest = () => {
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const profile = 'profile';
    const editData = 'editData';
    const editPhoto = 'editPhoto';

    const changeEditDataHandler = () => {
        dispatch(change(editData))
    }
    const changeEditPhotoHandler = () => {
        dispatch(change(editPhoto))
    }

    console.log(profileState.render)

    let render = profile;

    if(profileState.render === 'profile'){
        render = <DataDirector/>;
    }else if (profileState.render === 'editData') {
        render = <EditDataDirector/>;
    }else if (profileState.render === 'editPhoto') {
        render = <EditPhotoDirector/>;
    }


    return <>
        <p>Привет!</p>
        {/*<button type="button" onClick={changeEditDataHandler} className="btn btn-sm btn-outline-secondary">*/}
        {/*    Данные*/}
        {/*</button>*/}
        {/*<button type="button" onClick={changeEditPhotoHandler} className="btn btn-sm btn-outline-secondary">*/}
        {/*    Фото*/}
        {/*</button>*/}

        <div className="border m-3 p-3">
            {render}
        </div>
    </>
}

export default HeadTest
