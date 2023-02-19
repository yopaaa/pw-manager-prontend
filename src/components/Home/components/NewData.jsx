import React, { useState } from "react"
import Loader from "./Loader"
import { nanoid } from "nanoid"
import ReactMarkdown from "react-markdown"
import notesTemplate from "./js/Notes-template.js"
import Func from "./js/Func"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setModalContent, setrefreshTable } from "./js/HomeState"

const NewData = () => {
  const dispatch = useDispatch()
  const { category } = useSelector((state) => state.HomeState)

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Site, setSite] = useState("")
  const [Pwd, setPwd] = useState("")
  const [PwdLength, setPwdLength] = useState(8)
  const [Notes, setNotes] = useState("")
  const [Tag, setTag] = useState("")
  const [Category, setCategory] = useState("")
  const [Message, setMessage] = useState("")
  const [editNotesToogle, seteditNotesToogle] = useState("result")

  const hostname = process.env.REACT_APP_SERVER_END_POINT

  function NewData(event) {
    event.preventDefault()
    Func.hideOrShowElement("new-data-loading")
    const validateSite = Site.includes("http") ? Site : `https://${Site}`
    const data = {
      name: Name,
      email: Email,
      site: validateSite,
      pwd: Pwd,
      notes: Notes,
      tag: Tag,
      category: Category,
    }

    setTimeout(() => {
      axios
        .post(`${hostname}/pw_v1`, data)
        .then((value) => {
          resetAllState()
          dispatch(setrefreshTable(Date.now()))
          Func.hideOrShowElement("new-data-loading")
        })
        .catch((error) => {
          Func.hideOrShowElement("new-data-loading")
          setMessage(error.response.data.error)
        })
    }, 1500)

    // console.log(data);
  }

  function resetAllState() {
    dispatch(setModalContent(false)) // close modal
    setName("")
    setEmail("")
    setSite("")
    setPwd("")
    setNotes("")
    setTag("")
    setPwdLength(8)
    setCategory("")
    return true
  }
  return (
    <div className="modal-container">
      <h1>Add new data</h1>
      <div className="d-none" id="new-data-loading">
        <Loader />
      </div>
      <p style={{ color: "red" }}>{Message}</p>
      <hr />
      <form onSubmit={NewData} method="post">
        {/* NAME */}
        <div className="groub-form">
          <label htmlFor="name">User name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
            defaultValue={Name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <br />

        {/* EMAIL */}
        <div className="groub-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" required defaultValue={Email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <br />

        {/* WEBSITE */}
        <div className="groub-form">
          <label htmlFor="text">Website</label>
          <input
            type="text"
            name="website"
            id="website"
            placeholder="website"
            defaultValue={Site}
            onChange={(event) => setSite(event.target.value)}
          />
        </div>
        <br />

        {/* PASSWORD */}
        <div className="groub-form">
          <label htmlFor="pwd">Password</label>
          <input
            type="text"
            name="pwd"
            id="pwd"
            placeholder="password"
            autoComplete="off"
            defaultValue={Pwd}
            onChange={(event) => setPwd(event.target.value)}
          />
        </div>
        {/* PASSWORD RANDOM LENGTH RANGE  */}
        <div className="random-password">
          {PwdLength}&nbsp;&nbsp;
          <input
            type="range"
            min="8"
            max="50"
            defaultValue="8"
            onChange={(ev) => {
              setPwd(nanoid(ev.target.value))
              setPwdLength(ev.target.value)
            }}
          />
        </div>

        {/* TAG INPUT */}
        <p style={{ fontSize: 11 }}>Separate tags with `#` example #im #account #root</p>
        <div className="groub-form">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            id="tag"
            defaultValue="#mytag"
            onChange={(event) => {
              setTag(event.target.value)
            }}
          />
        </div>
        <br />

        {/* CATEGORY SELECT */}
        <div className="groub-form">
          <label>category</label>
          <input
            type="text"
            name="category"
            id="category"
            style={{ width: "55%" }}
            defaultValue={Category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <select name="" id="" onChange={(event) => setCategory(event.target.value)}>
            <option value="">custom</option>
            {category.map((x) => (
              <option value={x}>{x}</option>
            ))}
          </select>
        </div>
        <br />

        {/* NOTES AREAS */}
        <div className="notes-container">
          <label htmlFor="notes-editor">Notes</label>
          <details>
            <summary>add notes</summary>
            <nav>
              <select id="templateNotes" onChange={(ev) => setNotes(ev.target.value ? notesTemplate[ev.target.value].value : "")}>
                <option value="">Custom</option>
                {notesTemplate.map(({ text }, index) => (
                  <option value={index}>{text}</option>
                ))}
              </select>
              <a
                href="#"
                onClick={(ev) => {
                  Func.hideOrShowElement("notesRender")
                  Func.hideOrShowElement("notesEditor")
                  seteditNotesToogle(document.getElementById("notesRender").classList.value == "d-none" ? "result" : "edit")
                }}>
                { editNotesToogle }
              </a>
            </nav>

            {/* EDIT OR PREVIEW */}
            <div className="notes-area">
              <textarea className="d-block" id="notesEditor" onChange={(event) => setNotes(event.target.value)} value={Notes}></textarea>
              <div id="notesRender" className="d-none">
                <ReactMarkdown>{Notes}</ReactMarkdown>
              </div>
            </div>
          </details>
        </div>
        <hr />

        {/* NAVIGASI */}
        <div className="button-modal">
          <button type="button" className="btn btn-danger" onClick={(ev) => resetAllState()}>
            close
          </button>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewData
