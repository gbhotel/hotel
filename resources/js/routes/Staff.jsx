import {useEffect, useState} from "react";

export default function Staff() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/admin/staff')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])
    return (
        <>
            <div
                className="d-flex container justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Staff page</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    {/*<div className="btn-group me-2">*/}
                    {/*    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>*/}
                    {/*    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>*/}
                    {/*</div>*/}
                    <button type="button" className="btn btn-sm btn-outline-secondary">
                        Add Staff
                    </button>
                </div>
            </div>
            <div  className="my-5 container justify-content-center">
                <div className="  table-responsive">
                    <table className=" no-border table table-striped table-sm">
                        <thead className="no-border">
                        <tr className="no-border">
                            <th scope="col">Имя</th>
                            <th scope="col">Фамилия</th>
                            <th scope="col">Телефон</th>
                            <th scope="col">Почта</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
            {
                data.map((item,index) =>(
                    <tr className="">
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td className=" col-8 d-flex justify-content-end btn-group me-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                        </td>
                    </tr>
                ))
            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
