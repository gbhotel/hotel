import React from 'react';
export default function StatusBtn (props) {
    if(props.status === 'checkIn') {
        return  <button type="button" className="red-button btn btn-sm btn-outline-secondary">{props.status}</button>
    }else if (props.status === 'free') {
        return  <button type="button" className=" green-button btn btn-sm btn-outline-secondary">{props.status}</button>
    }else if (props.status === 'booking'){
        return  <button type="button" className=" blue-button btn btn-sm btn-outline-secondary">{props.status}</button>
    }
    else if (props.status === 'clean'){
        return  <button type="button" className=" yellow-button btn btn-sm btn-outline-secondary">{props.status}</button>
    }
}
