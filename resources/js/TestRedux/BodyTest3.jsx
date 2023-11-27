import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {change} from "../store/slices/slices.js";

const EditPhotoDirector = () => {
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const profile = 'profile';
    const editData = 'editData';
    const editPhoto = 'editPhoto';

    const changeDataHandler = () => {
        dispatch(change(profile))
    }
    const changeEditDataHandler = () => {
        dispatch(change(editData))
    }
    console.log(profileState.render)


    return <>
        Тело №3 (Редактируем фото)
        <button type="button" onClick={changeDataHandler} className="btn btn-sm btn-outline-secondary">
            Данные
        </button>
        <button type="button" onClick={changeEditDataHandler} className="btn btn-sm btn-outline-secondary">
            Редактировать Данные
        </button>
    </>
}

export default EditPhotoDirector;
