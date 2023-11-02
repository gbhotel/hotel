import React from 'react';
export default function StatusBtn (props) {
    if(props.status === 'occupied') {
        return  <button type="button" className="red-button btn btn-sm btn-outline-secondary">{props.status}</button>
    }else {
        return  <button type="button" className=" green-button btn btn-sm btn-outline-secondary">{props.status}</button>
    }



}
