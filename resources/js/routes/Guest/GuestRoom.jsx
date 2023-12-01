import { useSelector} from "react-redux";

export default function GuestRoom() {

    const roomInfo = useSelector((state) => state.setRoomInfoForGuest.RoomInfoForGuest);

    return (
            <div className=" my-0 container row row-cols-1 row-cols-sm-2 row-cols-md-2 ">
                <div>
                    <h1 className="my-4">{roomInfo.guestName}</h1>
                    <h2 className="my-4">Комната №{roomInfo.roomNumber}</h2>
                    <p>Категория комнаты: {roomInfo.roomCategory}</p>
                    <p>Кровать: Три односпальные кровати</p>
                    <p>Кондиционер: Нет</p>
                    <p>Количество комнат: 2</p>
                    <p>Даты проживания: {roomInfo.dates}</p>
                    <p>Душ: В номере</p>
                    <p>Туалет: В номере</p>
                    <p>WiFi: Да</p>
                    <p>Количество взрослых: {roomInfo.adults}</p>
                    <p>Количество детей: {roomInfo.children}</p>
                    <p>Стоимость проживания за день: {roomInfo.price}</p>
                    {/*<p>Общая стоимость проживания: {guestRoom.totalCost} рублей</p>*/}
                </div>
            </div>
        )
}

