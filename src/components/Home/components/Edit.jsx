import React, { useState, useEffect } from "react"
import Loader from "./Loader"
import { nanoid } from "nanoid"
import ReactMarkdown from "react-markdown"
import Func from "./js/Func"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setModalContent, setrefreshTable } from "./js/HomeState"
import moment from "moment"

const Edit = () => {
  const dispatch = useDispatch()
  const { getData, category } = useSelector((state) => state.HomeState)

  const [formPwdLength, setFormPwdLength] = useState(8)
  const [formNewMessage, setformNewMessage] = useState("")

  const [DetailsDataClassname, setDetailsDataClassname] = useState("d-none")
  const [EditDataClassname, setEditDataClassname] = useState("d-none")

  const [DetailsData_id, setDetailsData_id] = useState("")
  const [DetailsDataname, setDetailsDataname] = useState("")
  const [DetailsDataemail, setDetailsDataemail] = useState("")
  const [DetailsDatasite, setDetailsDatasite] = useState("")
  const [DetailsDatapwd, setDetailsDatapwd] = useState("")
  const [DetailsDatanotes, setDetailsDatanotes] = useState("")
  const [DetailsDatacategory, setDetailsDatacategory] = useState("")
  const [DetailsDatatag, setDetailsDatatag] = useState([])
  const [DetailsDatacreatedAt, setDetailsDatacreatedAt] = useState("")
  const [DetailsDataupdatedAt, setDetailsDataupdatedAt] = useState("")
  const [DetailsDatapwdInputType, setDetailsDatapwdInputType] = useState("password")
  const [editNotesToogle, seteditNotesToogle] = useState("result")

  const hostname = process.env.REACT_APP_SERVER_END_POINT

  useEffect(() => {
    getDetails(getData._id)
  }, [])

  function getDetails(_id) {
    setTimeout(() => {
      axios
        .get(`${hostname}/pw_v1/${_id}`)
        .then((data) => {
          Func.hideElement("details-data-loading")
          const payload = data.data.payload
          setDetailsData_id(payload._id)
          setDetailsDataname(payload.data.name)
          setDetailsDataemail(payload.data.email)
          setDetailsDatasite(payload.data.site)
          setDetailsDatapwd(payload.data.pwd)
          setDetailsDatanotes(payload.data.notes)
          setDetailsDatacategory(payload.data.category)
          setDetailsDatatag(payload.tag2.map((value) => `#${value}`))
          setDetailsDatacreatedAt(moment(payload.createdAt).startOf("minute").fromNow())
          setDetailsDataupdatedAt(moment(payload.updatedAt).startOf("minute").fromNow())
          setDetailsDataClassname("d-flex")
          setEditDataClassname("d-none")
        })
        .catch((error) => {
          console.log(error.message)
          setformNewMessage(error.message)
        })
    }, 1000)
  }

  function EditData(event) {
    event.preventDefault()
    Func.showElement("details-data-loading")
    setEditDataClassname("d-none")
    const _id = DetailsData_id
    let validateSite = undefined
    if (DetailsDatasite) {
      validateSite = DetailsDatasite.includes("http") ? DetailsDatasite : `https://${DetailsDatasite}`
    }
    const data = {
      name: DetailsDataname || undefined,
      email: DetailsDataemail || undefined,
      site: validateSite,
      pwd: DetailsDatapwd || undefined,
      notes: DetailsDatanotes || undefined,
      tag: DetailsDatatag || undefined,
      category: DetailsDatacategory || undefined,
    }
    axios
      .patch(`${hostname}/pw_v1/${_id}`, data)
      .then((value) => {
        getDetails(_id)
        dispatch(setrefreshTable(Date.now()))
      })
      .catch((error) => {
        Func.hideElement("details-data-loading")
        setformNewMessage(error.response.data.error)
      })
  }

  return (
    <div className="modal-container">
      <h1>{EditDataClassname.includes("d-none") ? "Details " + getData.name : "Edit " + getData.name}</h1>
      <p style={{ color: "red" }}>{formNewMessage}</p>
      <hr />
      <div id="details-data-loading" className="d-block">
        <Loader />
      </div>

      <form onSubmit={EditData} method="post">
        {/* NAME */}
        <div>
          {/* EDIT */}
          <div className={"groub-form " + EditDataClassname}>
            <label htmlFor="name">User name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              required
              defaultValue={DetailsDataname}
              onChange={(event) => setDetailsDataname(event.target.value)}
            />
          </div>

          {/* DETAILS */}
          <div className={"groub-form " + DetailsDataClassname}>
            <label htmlFor="name">User name</label>
            <input type="text" readOnly value={DetailsDataname} className="details d-block" />
          </div>
        </div>

        {/* BREAK LINE */}
        <div className={EditDataClassname}>
          <br />
        </div>

        {/* EMAIL */}
        <div>
          {/* EDIT */}
          <div className={"groub-form " + EditDataClassname}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              defaultValue={DetailsDataemail}
              onChange={(event) => setDetailsDataemail(event.target.value)}
            />
          </div>

          {/* DETAILS */}
          <div className={"groub-form " + DetailsDataClassname}>
            <label htmlFor="email">Email</label>
            <input type="text" readOnly value={DetailsDataemail} className="details d-block" />
          </div>
        </div>

        {/* BREAK LINE */}
        <div className={EditDataClassname}>
          <br />
        </div>

        {/* SITE */}
        <div>
          {/* EDIT */}
          <div className={"groub-form " + EditDataClassname}>
            <label htmlFor="text">Website</label>
            <input
              type="text"
              name="website"
              id="website"
              placeholder="website"
              defaultValue={DetailsDatasite}
              onChange={(event) => setDetailsDatasite(event.target.value)}
            />
          </div>
          {/* DETAILS */}
          <div className={"groub-form " + DetailsDataClassname}>
            <label htmlFor="text">Website</label>
            <input type="text" readOnly value={DetailsDatasite} className="details d-block" />
          </div>
        </div>

        {/* BREAK LINE */}
        <div className={EditDataClassname}>
          <br />
        </div>

        {/* PASSWORD */}
        <div>
          {/* EDIT */}
          <div className={EditDataClassname.includes("d-flex") ? "d-block" : "d-none"}>
            <div className="groub-form">
              <label htmlFor="pwd">Password</label>
              <input
                type="text"
                name="pwd"
                id="pwd"
                placeholder="password"
                autoComplete="off"
                defaultValue={DetailsDatapwd}
                onChange={(event) => setDetailsDatapwd(event.target.value)}
              />
            </div>
            <br />
            <div className="random-password">
              {formPwdLength}&nbsp;&nbsp;
              <input
                type="range"
                min="8"
                max="50"
                defaultValue="8"
                onChange={(ev) => {
                  let x = nanoid(ev.target.value)
                  setDetailsDatapwd(x)
                  setFormPwdLength(ev.target.value)
                }}
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className={"groub-form " + DetailsDataClassname}>
            <label htmlFor="pwd">Password</label>
            <input
              type={DetailsDatapwdInputType}
              readOnly
              value={DetailsDatapwd}
              id="detailsPassword"
              className="details d-block"
              style={{ width: "70%" }}
            />
            <a
              href="#pwd"
              style={{ width: "30px" }}
              onClick={(ev) => {
                DetailsDatapwdInputType === "text" ? setDetailsDatapwdInputType("password") : setDetailsDatapwdInputType("text")
              }}>
              {DetailsDatapwdInputType === "text" ? "hide" : "show"}
            </a>
          </div>
        </div>

        {/* TAG */}
        <div>
          {/* EDIT */}
          <div className={EditDataClassname.includes("d-flex") ? "d-block" : "d-none"}>
            <p style={{ fontSize: 11 }}>Separate tags with `#` example #im #account #root</p>
            <div className="groub-form">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                name="tag"
                id="tag"
                defaultValue={String(DetailsDatatag).replace(",", "  ")}
                onChange={(event) => {
                  setDetailsDatatag(event.target.value)
                }}
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className={"groub-form " + DetailsDataClassname}>
            <label htmlFor="tag">Tag</label>
            <input type="text" readOnly value={String(DetailsDatatag).replace(",", "  ")} className="details d-block" />
          </div>
        </div>

        {/* BREAK LINE */}
        <div className={EditDataClassname}>
          <br />
        </div>

        {/* CATEGORY */}
        <div>
          {/* EDIT */}
          <div className={"groub-form " + EditDataClassname}>
            <label>category</label>
            <input
              type="text"
              name="category"
              id="category"
              style={{ width: "55%" }}
              defaultValue={DetailsDatacategory}
              onChange={(event) => setDetailsDatacategory(event.target.value)}
            />
            <select onChange={(event) => setDetailsDatacategory(event.target.value)}>
              <option value="">custom</option>
              {category.map((x) => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </div>

          {/* DETAILS */}
          <div className={"groub-form " + DetailsDataClassname}>
            <label>category</label>
            <input type="text" readOnly value={DetailsDatacategory} className="details d-block" />
          </div>
        </div>

        {/* CREATED AT */}
        <div className={"groub-form " + DetailsDataClassname}>
          <label htmlFor="tag">Created at</label>
          <input type="text" readOnly value={DetailsDatacreatedAt} className="details d-block" />
        </div>
        {/* UPDATED AT */}
        <div className={"groub-form " + DetailsDataClassname}>
          <label htmlFor="tag">Last update</label>
          <input type="text" readOnly value={DetailsDataupdatedAt} className="details d-block" />
        </div>

        <br />
        <div className="notes-container">
          <div className={EditDataClassname.includes("d-flex") ? "d-block" : "d-none"}>
            <label htmlFor="notes-editor">Notes</label>
            <details>
              <summary>add notes</summary>
              <nav>
                <select id="templateNotes" disabled>
                  <option value="">Custom</option>
                </select>
                <a
                  href="#notes"
                  onClick={(ev) => {
                    Func.hideOrShowElement("notesRender")
                    Func.hideOrShowElement("notesEditor")
                    seteditNotesToogle(document.getElementById("notesRender").classList.value == "d-none" ? "result" : "edit")
                  }}>
                  { editNotesToogle }
                </a>
              </nav>

              <div className="notes-area">
                <textarea
                  className="d-block"
                  id="notesEditor"
                  onChange={(event) => setDetailsDatanotes(event.target.value)}
                  defaultValue={DetailsDatanotes}></textarea>
                <div id="notesRender" className="d-none">
                  <ReactMarkdown>{DetailsDatanotes}</ReactMarkdown>
                </div>
              </div>
            </details>
          </div>

          <div className={"groub-form " + DetailsDataClassname}>
            <div className="notes-area">
              <div id="notesRender" className="d-block">
                <ReactMarkdown>{DetailsDatanotes}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* Navigasi */}
        <div className="button-modal">
          {/* close */}
          <button type="button" className={"btn btn-primary " + DetailsDataClassname} onClick={(ev) => dispatch(setModalContent(false))}>
            close
          </button>
          {/* cancel */}
          <button
            type="button"
            className={"btn btn-danger " + EditDataClassname}
            onClick={(ev) => {
              setDetailsDataClassname("d-flex")
              setEditDataClassname("d-none")
              getDetails(getData._id)
            }}>
            cancel
          </button>
          {/* edit */}
          <button
            type="button"
            className={"btn btn-warning " + DetailsDataClassname}
            onClick={(ev) => {
              setDetailsDataClassname("d-none")
              setEditDataClassname("d-flex")
            }}>
            Edit
          </button>
          {/* send */}
          <button type="submit" className={"btn btn-primary " + EditDataClassname}>
            save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit
