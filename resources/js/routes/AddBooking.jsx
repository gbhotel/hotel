import React, {useEffect, useState} from 'react';
import FreeRooms from "../components/FreeRooms.jsx";
import people from "../../img/people.svg";
import arrow from "../../img/arrow.svg";



export default function AddBooking() {

    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [freeRooms, setFreeRooms] = useState([]);
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 10);
    const [showGuestsAmount, setShowGuestsAmount] = useState(false);
    const [adultCount, setAdultCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);


    useEffect(() => {
        fetch('/api/admin/free-rooms-period')

            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleSearchRooms = async () => {
        try {
            const requestData = {
                'people': {
                    adultCount,
                    childrenCount,
                },
                checkinDate,
                checkoutDate,
                _token,
            };

            const response = await fetch('/api/admin/free-rooms-period', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                // Обработка успешного ответа от сервера
                const data = await response.json();
                setFreeRooms(data);
                console.log(data);
            } else {
                // Обработка ошибки
                console.error('Ошибка при выполнении fetch-запроса');
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    const handleShowGuestsAmount = () => {
        setShowGuestsAmount((prevState) => (!prevState));
    }

    return (
        <div  >
            <div className=" mt-5 container col-11">
                <div className="d-flex gap-3 justify-content-around p-3 justify-content-around purple-background">
                    <div className=" d-flex flex-grow-0_5 col-3 p-0">
                            <input
                                placeholder="Дата заезда"
                                type="text"
                                className=" flex-grow-1 form-control uppercase py-2"
                                id="checkinDate"
                                onChange={(e) => setCheckinDate(e.target.value)}
                                onBlur={(e) => e.target.type ='text'}
                                onFocus={(e) => e.target.type ='date'}
                            />
                    </div>
                    <div className=" d-flex flex-grow-0_5 col-3  p-0">
                            <input
                                placeholder="Дата выезда"
                                type="text"
                                className="flex-grow-1 form-control uppercase py-2"
                                id="checkoutDate"
                                onChange={(e) => setCheckoutDate(e.target.value)}
                                onBlur={(e) => e.target.type ='text'}
                                onFocus={(e) => e.target.type ='date'}
                            />
                    </div>
                    <div
                        className=" d-flex p-0 text-center"
                        onClick={handleShowGuestsAmount}
                    >
                        <div
                            className=" input-guest-amount d-flex align-items-center gap-2 h-100 form-control"
                        >
                            <img alt="people" src={people} />
                            <span>{adultCount} взрослых {childrenCount} детей</span>
                            <img  style={{ marginLeft: '3px' }} alt="arrow" src={arrow} className="ml-1" />
                            {
                                showGuestsAmount && (
                                    <div className="d-flex text-black gap-3 flex-column block-guest-amount border-with-shadow">
                                        <div className="d-flex gap-3 align-items-center justify-content-start">
                                            <p className="mb-0  text-bold text-black">Взрослые</p>
                                            <div
                                                className="d-flex gap-3 px-3 py-2 border-without-shadow justify-content-between"
                                                onClick={(event)=> event.stopPropagation()}
                                            >
                                                <div
                                                    className="px-2"
                                                    onClick={(event)=> {
                                                        event.stopPropagation();
                                                            if (adultCount > 0) {
                                                                setAdultCount(prevState => --prevState);
                                                            }
                                                    }}
                                                > - </div>
                                                <div>{adultCount}</div>
                                                <div
                                                    className="px-2"
                                                    onClick={(event)=> {
                                                        event.stopPropagation();
                                                        setAdultCount((prevState) => (++prevState))
                                                    }
                                                }
                                                > + </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-5 justify-content-start">
                                            <div className="flex-grow-1 mb-0 text-bold text-black">Дети</div>
                                            <div
                                                className="d-flex gap-3 px-3 py-2 border-without-shadow justify-content-between"
                                                onClick={(event)=> event.stopPropagation()}
                                            >
                                                <div
                                                    className="px-2"
                                                    onClick={(event)=> {
                                                        event.stopPropagation();
                                                        if (childrenCount > 0) {
                                                            setChildrenCount(prevState => --prevState);
                                                        }
                                                    }}
                                                > - </div>
                                                <div>{childrenCount}</div>
                                                <div
                                                    className="px-2"
                                                    onClick={
                                                    (event)=> {
                                                        event.stopPropagation();
                                                        setChildrenCount((prevState)=>(++prevState))
                                                    }
                                                        }
                                                > + </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className=" btn-border-purple btn text-20 uppercase"
                                            onClick={(event)=>{
                                                event.stopPropagation();
                                                handleShowGuestsAmount()}
                                            }
                                        >
                                            Сделано
                                        </button>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className=" d-flex justify-content-center p-0 btn-empty">
                        <button
                            type="submit"
                            className="no-outline-on-active form-control btn text-20 uppercase"
                            onClick={handleSearchRooms}
                        >
                            Найти
                        </button>
                    </div>
                </div>
            </div>
            <FreeRooms checkinDate={checkinDate} checkoutDate={checkoutDate} freeRooms={freeRooms}></FreeRooms>
        </div>

    );

}
