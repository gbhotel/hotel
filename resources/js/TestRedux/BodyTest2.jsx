import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {change} from "../store/slices/slices.js";

const EditDataDirector = () => {
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const profile = 'profile';
    const editPhoto = 'editPhoto';

    const changeDataHandler = () => {
        dispatch(change(profile))
    }
    const changeEditPhotoHandler = () => {
        dispatch(change(editPhoto))
    }
    console.log(profileState.render)

    return <>
        Тело №2 (Редактируем данные)
        <button type="button" onClick={changeDataHandler} className="btn btn-sm btn-outline-secondary">
            Данные
        </button>
        <button type="button" onClick={changeEditPhotoHandler} className="btn btn-sm btn-outline-secondary">
            редактировать Фото
        </button>
    </>
}

export default EditDataDirector;
