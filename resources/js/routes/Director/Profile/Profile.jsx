import React, {useEffect, useState} from 'react';
import ProfileData from '../../../components/Director/Profile/ProfileData.jsx';
// import {Link, useParams} from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";

export default function Profile() {



    // function editUser() {
    //     window.location.href = `/director/editEmployee/${id}`;
    // }

    // async function dismissEmployee(){
    //     const url = '/api/director/dismiss-employee';
    //
    //     const dismissData = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify( {id: id, _token})
    //     }
    //
    //     let response = await fetch(url, dismissData);
    //     let answer = await response.json();
    //
    //     console.log(answer);
    //
    //     answer.ok = response.ok;
    //     answer.status = response.status;
    //
    //     if(answer.ok && answer.dismissed === 'good'){
    //         console.log(answer);
    //         window.location.href = '/director/staff';
    //     }else{
    //         //действия, если пользователь не сохранен
    //         console.log(answer.status);
    //     }
    // }

    // function goBack(event) {
    //     event.preventDefault();
    //     window.location.href = '/director/staff';
    // }

    return (
        <div className="width-1200 mx-4 mt-5 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <ProfileData />
            </div>
        </div>
    );
}
