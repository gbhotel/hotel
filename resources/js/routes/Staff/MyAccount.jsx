import React, {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import hammer from "../../../img/hammer.svg";
import FormMyAccount from "../../components/Staff/FormMyAccount.jsx";
import {createOptions2, request, request2} from "../../services/requestFunction.js";


export default function MyAccount () {

    const [employee, setEmployee] = useState({});
    const [file, setFile] = useState({});
    const [filePreview, setFilePreview] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [response, setResponse] = useState('');
    const [birthday, setBirthday] = useState(new Date());

    useEffect(() => {

        request(`/api/user`)
            .then(data => {
                setEmployee(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const editedEmployee = (field, event) => {
            setEmployee((prevState) => ({...prevState, [field]:event.target.value}))
    };

    const handleDateChange = (date) => {
        setBirthday(date);
        let dateString = date.toLocaleDateString().replace(/\./g, '-');
        setEmployee((prevState) => ({...prevState, "birthday": dateString}))
    };


    const saveChangedEmployee = async () => {

        if (!file) {
            return;
        }

        let formObj = new FormData();
        const employeeJson = JSON.stringify(employee);

        formObj.append('avatar', file);
        formObj.append('employee', employeeJson);


        try {

            let options = createOptions2('POST', formObj);

            const response =  await request2('/api/user/update', options)

            if (response.ok) {
                setTimeout(() => {
                    setShowForm(false)
                    setResponse('Профиль успешно обновлен!');
                }, 1000)

                setTimeout(() => {
                    setResponse('')
                }, 5000)
            } else {
                console.error('Employee update failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during employee update:', error.message);
        }
    }


    return (
        <div className="d-flex flex-column gap-5">
            <div className="d-flex mt-5 justify-content-start align-content-center">
                <div className=" info-block h-100 border-with-shadow d-flex gap-5 justify-content-start">
                    <div className="d-flex">
                        <img alt="photo" src={ Object.keys(filePreview).length === 0? employee.photo: filePreview} className="photo-size" />
                    </div>
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
            </div>
            <FormMyAccount showForm = {showForm} setFile ={setFile} setFilePreview={setFilePreview} editedEmployee={editedEmployee} saveChangedEmployee={saveChangedEmployee} handleDateChange={handleDateChange} birthday={birthday}/>
            {
                response && (
                    <h3 className={` purple-background text-white uppercase border-with-shadow ${!response? 'invisible' : ''}`}>{response}</h3>
                )
            }

        </div>
    )
}

