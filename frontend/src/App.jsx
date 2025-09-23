import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [newName, setNewName] = useState({ name: "" });
  const [nameList, setNameList] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetch = async () => {
    const response = await axios.get(`${BASE_URL}/name/getAll`);
    setNameList(response.data);
    console.log("TEST: ", response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${BASE_URL}/name`, newName);

    Swal.fire({
      title: "Added Success!",
      icon: "success",
      draggable: true,
    });

    setNewName({ name: "" });
    return response;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewName({ ...newName, [name]: value });
  };

  useEffect(() => {
    fetch();
  }, [newName]);

  return (
    <div className="container-name">
      <div className="box-name">
        <h3 className="title-name">Name List</h3>
        <ul className="list-name">
          {nameList.map((item, index) => (
            <li className="object-name" key={index}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <form method="POST">
        <input
          type="text"
          onChange={handleOnChange}
          name="name"
          value={newName.name}
          required
        />
        <p></p>
        <button type="submit" onClick={handleSubmit}>
          ADD
        </button>
      </form>
    </div>
  );
}

export default App;
