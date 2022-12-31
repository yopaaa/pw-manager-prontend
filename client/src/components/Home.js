import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  // const [value, setValue] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSite, setFormSite] = useState("");
  const [formPwd, setFormPwd] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formTag, setFormTag] = useState("");

  const [message, setMessage] = useState("");
  const [table, setTable] = useState("");
  const hostname = `http://${window.location.hostname}:40100`;
  const navigate = useNavigate();


  async function NewData(event) {
    const data = {
      name: formName,
      email: formEmail,
      site: formSite,
      pwd: formPwd,
      notes: formNotes,
      tag: formTag,
    };

    try {
      await axios.post(`${hostname}/pw_v1`, data);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  }
  async function deleteData(event) {
    try {
      const _id = event.target.dataset.id
      await axios.delete(`${hostname}/pw_v1/${_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTable() {
    try {
      const data = await axios.get(`${hostname}/pw_v1`);
      const datas = data.data.payload;
      setTable(
        datas.map((value) => {
          return (
            <tr>
              <td>{value.createAt}</td>
              <td>{value.data.name}</td>
              <td>{value.data.email}</td>
              <td >{value.data.site}</td>
              <td><button onClick={deleteData} data-id={`${value._id}`}>delete</button></td>
            </tr>
          );
        })
      );
    } catch (error) {
      navigate('/signin')
    }
  }

  useEffect(() => {
    getTable();
  },[]);

  return (
    <div>
      <button type="button" onClick={getTable}>refresh</button>
      <table className="table w-50">
        <thead>
          <tr>
            <th>Create at</th>
            <th>User name</th>
            <th>Mail</th>
            <th>Website</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
      <hr />
      <div>
        <details>
          <summary>Add new data</summary>
        
        <div className="newData">

          <h3>{message}</h3>
          <form onSubmit={NewData}>
            <div>
              <label htmlFor="text">User name</label>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  required
                  autoComplete="off"
                  defaultValue={formName}
                  onChange={(event) => setFormName(event.target.value)}
                />
              </div>
            </div>
            <br />

            <div>
              <label htmlFor="text">Email</label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  autoComplete="off"
                  defaultValue={formEmail}
                  onChange={(event) => setFormEmail(event.target.value)}
                />
              </div>
            </div>
            <br />

            <div>
              <label htmlFor="text">Website</label>
              <div>
                <input
                  type="text"
                  name="website"
                  id="website"
                  placeholder="website"
                  autoComplete="off"
                  defaultValue={formSite}
                  onChange={(event) => setFormSite(event.target.value)}
                />
              </div>
            </div>
            <br />

            <div>
              <label htmlFor="pwd">Password</label>
              <div>
                <input
                  type="password"
                  name="pwd"
                  id="pwd"
                  placeholder="password"
                  autoComplete="off"
                  defaultValue={formPwd}
                  onChange={(event) => setFormPwd(event.target.value)}
                />
              </div>
            </div>
            <br />

            <div>
              <label htmlFor="confirmpwd">Notes</label>
              <div>
                <textarea
                  name="notes"
                  id="notes"
                  cols="30"
                  rows="10"
                  onChange={(event) => setFormNotes(event.target.value)}
                >
                  {formNotes}
                </textarea>
              </div>
            </div>

            <div>
              <label htmlFor="text"></label>
              <div>
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="tag"
                  required
                  autoComplete="off"
                  defaultValue={formTag}
                  onChange={(event) => setFormTag(event.target.value)}
                />
              </div>
            </div>
            <br />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        </details>
      </div>
    </div>
  );
};

export default Home;
