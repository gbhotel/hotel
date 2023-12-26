import { BrowserRouter } from "react-router-dom";
import Admin from "./components/Admin/Admin.jsx";
import Director from "./components/Director/Director.jsx";
import EmployeeAccount from "./components/Staff/EmployeeAccount";
import Guest from "./components/Guest/Guest.jsx";
import {useEffect, useState} from "react";




export default function App() {

    const [role, setRole] = useState('');

    useEffect(() => {

        const abortController = new AbortController();

        fetch(`/api/userRole`, {
            signal: abortController.signal,
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setRole(data);
            })
            .catch(error => {
                console.error(error);
            });

        return () => {
            abortController.abort();
        }
    }, []);
    return (
        <>
            <BrowserRouter>
                {/*<Admin />*/}
                {role.role === 'администратор'&& <Admin />}
                {role.role === 'директор' && <Director />}
                {role.role === 'горничная'&& <EmployeeAccount />}
                {role.role === 'гость'&& <Guest />}
            </BrowserRouter>
        </>
    )
}
