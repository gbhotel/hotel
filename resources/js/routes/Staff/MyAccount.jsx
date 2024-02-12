import React, {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import hammer from "../../../img/hammer.svg";
import FormMyAccount from "../../components/Staff/FormMyAccount.jsx";
import { request} from "../../services/requestFunction.js";
import Avatar from "../../components/Staff/Avatar.jsx";


export default function MyAccount () {

    const [employee, setEmployee] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        request(`/api/user`)
            .then(data => {
                setEmployee(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [employee.photo]);


    return (
        <div>
            <div className=" info-block mt-5 border-with-shadow d-flex gap-5 justify-content-start">

                <Avatar employee = { employee } setEmployee = { setEmployee }/>

                <div className="  d-flex flex-column" >
                    <h3 className="">Имя: {employee.first_name}</h3>
                    <h3 className="">Фамилия: {employee.last_name}</h3>
                    <h3 className="">Пол: {employee.gender}</h3>
                    <h3 className="">Дата рождения: {employee.birthday}</h3>
                    <h3 className="">Почта: {employee.email}</h3>
                    <h3 className="">Телефон: {employee.phone}</h3>
                </div>
                <img
                    alt="photo"
                    src={hammer}
                    className="hammer"
                    onClick={() => {setShowForm((prevState) => !prevState)}
                    }
                />
            </div>
            <FormMyAccount showForm = { showForm } setShowForm = { setShowForm } setEmployee = { setEmployee } employee = { employee }/>

        </div>
    )
}

