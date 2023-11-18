import React, {useEffect, useState} from 'react';
import Stack from 'react-bootstrap/Stack';
import AnalysisStaff from './../../../components/Director/Analysis/Staff.jsx';
import AnalysisGuests from './../../../components/Director/Analysis/Guests.jsx';
import AnalysisRooms from './../../../components/Director/Analysis/Rooms.jsx';



export default function Analysis() {

    const [component, setComponent] = useState(1)

    function AnalysisRender(component) {

        if (component === 1) {
            return <AnalysisStaff />;
        }else if(component === 2){
            return <AnalysisGuests />;
        }else if(component === 3){
            return <AnalysisRooms />;
        }else{
            return <h3>Выберите нужный вам раздел</h3>
        }
    }


    return (
        <>
            <div className=" container my-2 col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <Stack direction="horizontal" gap={2}>
                        <div className="p-2">
                            <button type="button" onClick={() => {setComponent(1)}} className="btn btn-sm btn-outline-secondary">
                                Персонал
                            </button>
                        </div>
                        <div className="p-2">
                            <button type="button" onClick={() => {setComponent(2)}} className="btn btn-sm btn-outline-secondary">
                                Гости
                            </button>
                        </div>
                        <div className="p-2">
                            <button type="button" onClick={() => {setComponent(3)}} className="btn btn-sm btn-outline-secondary">
                                Комнаты
                            </button>
                        </div>
                    </Stack>
                </div>
            </div>

            {AnalysisRender(component)}


        </>

    )
}
