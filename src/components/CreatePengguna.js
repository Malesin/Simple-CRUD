import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePengguna() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/apireact/pengguna/save', inputs).then(function(response){
        console.log(response.data);
        navigate('/');
        });
    }

    return (
        <div>
            <h1>Create Pengguna</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Nama:</label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Email:</label>
                            </th>
                            <td>
                                <input type="text" name="email" onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Nomor Telepon:</label>
                            </th>
                            <td>
                                <input type="text" name="mobile" onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
