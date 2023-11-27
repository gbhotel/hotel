import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {change} from "../store/slices/slices.js";

const DataDirector = () => {
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const editData = 'editData';
    const editPhoto = 'editPhoto';

    const changeEditDataHandler = () => {
        dispatch(change(editData))
    }
    const changeEditPhotoHandler = () => {
        dispatch(change(editPhoto))
    }

    console.log(profileState.render)

    return <>
        Тело №1 (Данные директора)
        <button type="button" onClick={changeEditDataHandler} className="btn btn-sm btn-outline-secondary">
            Редактировать Данные
        </button>
        <button type="button" onClick={changeEditPhotoHandler} className="btn btn-sm btn-outline-secondary">
            Редактировать Фото
        </button>
    </>
}

export default DataDirector;
