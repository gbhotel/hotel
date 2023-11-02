
export default function Staff() {
    return (
        <>
            <div  className="my-5 container justify-content-center">
                <div className="  table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Фамилия</th>
                            <th scope="col">Телефон</th>
                           <th scope="col">Почта</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="">
                            <td>data</td>
                            <td>rich</td>
                            <td>dashboard</td>
                            <td>tabular</td>
                            <td className=" col-8 d-flex btn-group me-2">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Create</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>data</td>
                            <td>rich</td>
                            <td>dashboard</td>
                            <td>tabular</td>
                            <td>
                                <div className=" col-8 d-flex justify-content-end btn-group me-2">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Create</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>dataк</td>
                            <td>rich</td>
                            <td>dashboard</td>
                            <td>tabular</td>
                            <td className=" col-8 d-flex btn-group me-2">
                                <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Create</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}
