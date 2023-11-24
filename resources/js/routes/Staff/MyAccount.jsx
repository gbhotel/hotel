import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import hammer from "../../../img/hammer.svg";


export default function MyAccount () {

    const [employee, setEmployee] = useState({});
    const [file, setFile] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [response, setResponse] = useState([]);

    const [birthday, setBirthday] = useState(new Date()); // Added state for birthday

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`/api/user`, {

            signal: abortController.signal,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setEmployee(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);

    const editedEmployee = (field, event) => {
            setEmployee((prevState) => ({...prevState, [field]:event.target.value}))
    };

    const handleDateChange = (date) => {
        setBirthday(date);
        let dateString = date.toLocaleDateString().replace(/\./g, '-');
        setEmployee((prevState) => ({...prevState, "birthday": dateString}))
    };

    const customOptions = [
        { value: "", label: "Выберите пол", className: "option-purple" },
        { value: "male", label: "м" },
        { value: "female", label: "ж" },
    ];

    const handleShowForm =() => {
        setShowForm((prevState) => !prevState)
    }


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            photo: 'img/' +  event.target.files[0].name,
        }));
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            return;
        }

        console.log(file);

        const formData = new FormData();
        formData.append('file', file);
       // const formData  = {photo: file};

        console.log('Form Data:', formData);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': _token,
                },
                body: file,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded:', data);
                // Handle the uploaded file data as needed
            } else {
                console.error('File upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during file upload:', error.message);
        }
    };

    const saveChangedEmployee = async () => {

        try {
            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': _token,
                },
                body: JSON.stringify(employee),
            });

            if (response.ok) {
                const data = await response.json();
                setTimeout(()=>{
                    setResponse(data);
                }, 1000)

                setTimeout(()=>{
                    setShowForm(false)
                }, 2000)

                setTimeout(()=>{
                    setResponse([])
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
                        <img alt="photo" src={"../" + employee.photo} className="photo-size" />
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
                            onClick={handleShowForm}
                        />
                </div>
            </div>
            {
                showForm && (
                    <div className="d-flex gap-1 flex-column purple-form border-with-shadow">
                        {/*<form encType="multipart/form-data">*/}
                        {/*    <input*/}
                        {/*        type="file"*/}
                        {/*        name="image"*/}
                        {/*        accept="image/*"*/}
                        {/*        onChange={handleFileChange}*/}
                        {/*    />*/}
                        {/*    <button onClick={(event) =>handleUpload(event)}>Upload</button>*/}
                        {/*</form>*/}
                        <input
                            placeholder="Имя"
                            className="col-9 purple-input"
                            onChange={(event)=> editedEmployee('first_name', event)}
                        />
                        <input
                            placeholder="Фамилия"
                            className="col-9 purple-input"
                            onChange={(event)=> editedEmployee('last_name', event)}
                        />
                        <select
                            onChange={(event)=> editedEmployee('gender', event)}
                            className=" select-purple col-9 purple-input"
                        >
                            <option className=" custom-option option-purple" name ="gender" value="м">м</option>
                            <option className=" custom-option option-purple" name ="gender" value="ж">ж</option>
                        </select>
                        <DatePicker
                            name = "birthday"
                            selected={birthday}
                            onChange={handleDateChange}
                            placeholderText="Выберите дату рождения"
                            className="col-9 purple-input"
                            calendarClassName="purple-datepicker"
                        />
                        <input
                            placeholder="email"
                            className="col-9 purple-input"
                            onChange={(event)=> editedEmployee('email', event)}
                        />
                        <input
                            placeholder="Телефон"
                            className="col-9 purple-input"
                            onChange={(event)=> editedEmployee('phone', event)}
                        />
                        <button className="btn uppercase text-white btn-gradient-background"
                                onClick={saveChangedEmployee}
                        >Сохранить</button>
                    </div>
                )
            }
            {
                response && (
                    <h3 className={` purple-background text-white uppercase border-with-shadow ${response.length === 0 ? 'invisible' : ''}`}>{response.message}</h3>
                )
            }

        </div>
    )
}

