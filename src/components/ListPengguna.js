import axios from "axios";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";

    export default function ListPengguna() {

        const [penggunas, setPenggunas] = useState([]);
        useEffect(() => {
            getPenggunas();
        }, []);
        
        function getPenggunas(){
        axios.get('http://localhost:8000/apireact/penggunas/').then(function(response){
            console.log(response.data);
            setPenggunas(response.data);
        });
    }
    const deleteUser = (id) => {
        axios.delete(`http://localhost:8000/apireact/pengguna/${id}/delete`).then(function(response) {
        console.log(response.data);
        getPenggunas();
    });
    }
    return (
        <div>
        <h1>List Pengguna</h1>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {penggunas.map((pengguna, key) =>
                <tr key = {key}>
                    <td>{pengguna.id}</td>
                    <td>{pengguna.name}</td>
                    <td>{pengguna.email}</td>
                    <td>{pengguna.mobile}</td>
                    <td>
                        <Link to={`pengguna/${pengguna.id}/edit`}style={{marginRight: "10px"}}>Edit </Link>
                        <button onClick={() => deleteUser(pengguna.id)}>Delete</button>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
        </div>
    )
}