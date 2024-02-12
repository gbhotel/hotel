import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {createOptions, request2} from "@/services/requestFunction.js";

export default function FormMyAccount(props) {

    const{showForm, setShowForm, setEmployee, employee} = props;
    const [response, setResponse] = useState('');
    const [birthday, setBirthday] = useState(new Date());

    const editedEmployee = (field, event) => {
        setEmployee((prevState) => ({...prevState, [field]:event.target.value}))
    };

    const handleDateChange = (date) => {
        setBirthday(date);
        let dateString = date.toLocaleDateString().replace(/\./g, '-');
        setEmployee((prevState) => ({...prevState, 'birthday': dateString}))
    };

    const saveChangedEmployee = async () => {

        try {

            let options = createOptions('POST', employee);

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
        < div className = "mt-5">
            {
                showForm && (
                    <div
                        className="d-flex gap-1 flex-column purple-form border-with-shadow"
                        onSubmit={saveChangedEmployee}
                    >
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
                        <button
                            type='submit'
                            className="btn uppercase text-white btn-gradient-background"
                            onClick={saveChangedEmployee}
                        >Сохранить</button>
                    </div>

                )
            }

            {
                response && (
                    <h3 className={` purple-background text-white uppercase border-with-shadow ${!response? 'invisible' : ''}`}>{response}</h3>
                )
            }
        </div>

    )
}
