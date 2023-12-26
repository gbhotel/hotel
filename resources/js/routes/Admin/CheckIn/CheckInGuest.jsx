import { useEffect, useState } from "react";
import AllCheckIns from "./AllCheckIns.jsx";
import CheckInWithBooking from "./CheckInWithBooking.jsx";
import CheckInWithoutBooking from "./CheckInWithoutBooking.jsx";
import EditBooking from "../Booking/EditBooking.jsx";

export default function CheckInGuest() {
    const [styles, setStyles] = useState(['btn-primary', 'btn-outline-secondary', 'btn-outline-secondary']);
    const [tab, setTab] = useState(<AllCheckIns />);

    const nTab = (n, id = 0) => {
        selectTab(n, id)
    }

    const selectTab = (tab, id) => {
        if (tab == 0) {
            setStyles(['btn-primary', 'btn-outline-secondary', 'btn-outline-secondary']);
            setTab(<AllCheckIns callBackFunc={nTab} />);
        }
        else if (tab == 1) {
            setStyles(['btn-outline-secondary', 'btn-primary', 'btn-outline-secondary']);
            setTab(<CheckInWithBooking callBackFunc={nTab} />);
        }
        else if (tab == 2) {
            setStyles(['btn-outline-secondary', 'btn-outline-secondary', 'btn-primary'])
            setTab(<CheckInWithoutBooking callBackFunc={nTab} />);
        }
        else {
            setStyles(['btn-outline-secondary', 'btn-primary', 'btn-outline-secondary'])
            setTab(<EditBooking idFromCheckIn={id} callBackFunc={nTab} />);
        }
    }

    return (<>
        <div className=" mt-5 container-fluid">
            <div className="check-in-nav">
                <div className={"mx-2 btn " + styles[0]}
                    onClick={() => selectTab(0)}
                >
                    Заселенные
                </div>
                <div className={"mx-2 btn " + styles[1]}
                    onClick={() => selectTab(1)}
                >
                    Заселить по бронированию
                </div>
                <div className={"mx-2 btn " + styles[2]}
                    onClick={() => selectTab(2)}
                >
                    Заселить без бронирования
                </div>
            </div>
            <div>{tab}</div>
        </div>



    </>);

}
