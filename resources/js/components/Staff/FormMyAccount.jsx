import React from "react";
import DatePicker from "react-datepicker";

export default function FormMyAccount(props) {

    const{showForm, setFile, setFilePreview, editedEmployee, saveChangedEmployee, handleDateChange, birthday} = props;
    return (
        showForm && (
            <div
                className="d-flex gap-1 flex-column purple-form border-with-shadow"
                onSubmit={saveChangedEmployee}
            >
                <div
                >
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => {
                            setFile(e.target.files[0])
                            setFilePreview(URL.createObjectURL(e.target.files[0]))
                        }}
                    />
                </div>
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
    )
}
