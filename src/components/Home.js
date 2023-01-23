import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import "bootstrap/dist/css/bootstrap.min.css"
import "../style/Table.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Modal from "react-modal"
import { nanoid } from "nanoid"
import ReactMarkdown from "react-markdown"
import notesTemplate from "./home-component/notes-template.js"
import "../style/home.css"
import { useCookies } from "react-cookie"
import moment from "moment"
import "../style/Form.css"
import Loader from "./home-component/Loader"
import Ping from "./Ping"
import Func from "./home-component/Func"
import "../style/Details.css"

const Home = () => {
  const [table, setTable] = useState("")
  const [pagination, setPagination] = useState()
  const [paginationMessage, setPaginationMessage] = useState("")

  const [newDataModal, setnewDataModal] = useState(false)
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formSite, setFormSite] = useState("")
  const [formPwd, setFormPwd] = useState("")
  const [formPwdLength, setFormPwdLength] = useState(8)
  const [formNotes, setFormNotes] = useState("")
  const [formTag, setFormTag] = useState("")
  const [formcategory, setFormcategory] = useState("")
  const [formNewMessage, setformNewMessage] = useState("")

  const [detailsDataModal, setdetailsDataModal] = useState(false)
  const [DetailsData, setDetailsData] = useState({ name: "", message: "" })
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

  const [formSearch, setformSearch] = useState("")
  const [category, setcategory] = useState(["any"])
  const [selectcategory, setselectcategory] = useState("")

  const [backupDataId, setbackupDataId] = useState("")
  const [backupDataCode, setbackupDataCode] = useState()
  const [setbackupDataIdmessage, setsetbackupDataIdmessage] = useState("")

  const [DeleteDataModal, setDeleteDataModal] = useState(false)
  const [wantDeleteData, setwantDeleteData] = useState({ name: "", _id: "", message: "" })
  const [DeleteDataButton, setDeleteDataButton] = useState(true)

  const [BackupDataModal, setBackupDataModal] = useState(false)

  const [cookies, setCookie] = useCookies(["user"])

  const hostname = process.env.REACT_APP_SERVER_END_POINT
  const navigate = useNavigate()
  Modal.setAppElement("#root")

  Ping()
  useEffect(() => {
    getTable(cookies.page)
  }, [])

  function setTableData(data) {
    const categoryyy = []
    const datas = data.data.payload.data
    setTable(
      datas.map((value) => {
        if (value.data.category) categoryyy.push(value.data.category)
        return (
          <tr>
            <td>{moment(value.updatedAt).startOf("minute").fromNow()}</td>
            <td>{value.data.name}</td>
            <td>
              <a href={value.data.site} target="_blank">
                {value.data.site.slice(0, 15)}...
              </a>
            </td>
            <td>
              <input type="text" value={value.data.email} readOnly />
            </td>
            <td>
              <a
                href="#"
                onClick={() => {
                  getDetails(value._id)
                  DetailsData.name = value.data.name
                }}>
                Details
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a
                href="#"
                onClick={() => {
                  setDeleteDataModal(true)
                  wantDeleteData.name = value.data.name
                  wantDeleteData._id = value._id
                }}>
                Delete
              </a>
            </td>
          </tr>
        )
      })
    )
    setcategory(Array.from(new Set(categoryyy)))
    const { page, pageSize, total } = data.data.payload
    const countpage = Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i)
    setPaginationMessage(`Page '${page}' of '${Math.floor(total / pageSize)}', Total data '${total}'`)
    setPagination(
      countpage.map((x) => {
        const className = x == page ? "existpage" : ""
        return (
          <button className={className} onClick={(ev) => getTable(x)}>
            {x}
          </button>
        )
      })
    )
    setCookie("page", page, { path: "/" })
  }

  function getTable(pages = 0) {
    Func.showElement("table-loading")
    setTimeout(() => {
      axios
        .get(`${hostname}/pw_v1?page=${pages}`)
        .then((data) => {
          Func.hideElement("table-loading")
          setTableData(data)
          // result(data)
        })
        .catch((error) => {
          console.log(error.message)
        })
    }, 1000)
  }

  function deleteData(event) {
    event.preventDefault()
    setDeleteDataButton(true)
    Func.hideOrShowElement("delete-loading")
    const _id = wantDeleteData._id
    setTimeout(() => {
      axios
        .delete(`${hostname}/pw_v1/${_id}`)
        .then((value) => {
          Func.hideOrShowElement("delete-loading")
          setDeleteDataModal(false)
          getTable(cookies.page)
        })
        .catch((error) => {
          Func.hideOrShowElement("delete-loading")
          console.log(error.message)
          wantDeleteData.message = `${error.message}`
        })
    }, 1500)
  }

  function NewData(event) {
    event.preventDefault()
    Func.hideOrShowElement("new-data-loading")
    const validateSite = formSite.includes("http") ? formSite : `https://${formSite}`
    const data = {
      name: formName,
      email: formEmail,
      site: validateSite,
      pwd: formPwd,
      notes: formNotes,
      tag: formTag,
      category: formcategory,
    }

    setTimeout(() => {
      axios
        .post(`${hostname}/pw_v1`, data)
        .then((value) => {
          resetAllState()
          getTable()
          Func.hideOrShowElement("new-data-loading")
        })
        .catch((error) => {
          Func.hideOrShowElement("new-data-loading")
          setformNewMessage(error.response.data.error)
        })
    }, 1500)

    // console.log(data);
  }

  function EditData(event) {
    event.preventDefault()
    Func.showElement("details-data-loading")
    setEditDataClassname("d-none")
    const _id = DetailsData_id
    let validateSite = undefined
    if (formSite) {
      validateSite = formSite.includes("http") ? formSite : `https://${formSite}`
    }
    const data = {
      name: formName || undefined,
      email: formEmail || undefined,
      site: validateSite,
      pwd: formPwd || undefined,
      notes: formNotes || undefined,
      tag: formTag || undefined,
      category: formcategory || undefined,
    }

    axios
      .patch(`${hostname}/pw_v1/${_id}`, data)
      .then((value) => {
        resetAllState()
        getDetails(_id)
        getTable()
      })
      .catch((error) => {
        Func.hideElement("details-data-loading")
        setformNewMessage(error.response.data.error)
      })
  }

  function resetAllState() {
    setnewDataModal(false)
    setFormName("")
    setFormEmail("")
    setFormSite("")
    setFormPwd("")
    setFormNotes("")
    setFormTag("")
    setFormPwdLength(8)
    setFormcategory("")
    setdetailsDataModal(false)
    setDetailsData_id("") // apakah perlu dihapus?
    setDetailsDataname("")
    setDetailsDataemail("")
    setDetailsDatasite("")
    setDetailsDatapwd("")
    setDetailsDatanotes("")
    setDetailsDatacategory("")
    setDetailsDatatag([])
    setDetailsDatacreatedAt("")
    setDetailsDataupdatedAt("")
    setbackupDataCode("")
    setbackupDataId("")
    setBackupDataModal(false)
    setDeleteDataButton(true)
    setbackupDataIdmessage("")

    setEditDataClassname("d-none")
    setDetailsDataClassname("d-none")
    return true
  }

  function SearchData(event) {
    event.preventDefault()
    Func.showElement("table-loading")
    setTimeout(() => {
      axios
        .get(`${hostname}/pw_v1/search?page=${cookies.page || 0}&q=${formSearch}&category=${selectcategory}`)
        .then((data) => {
          setTableData(data)
          setselectcategory("")
          Func.hideElement("table-loading")
        })
        .catch((error) => {
          console.log(error.message)
          navigate("/signin")
        })
    }, 1000)
  }

  function getDetails(_id) {
    setdetailsDataModal(true)
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
        })
    }, 1000)
  }

  function downloadBackupData(event) {
    event.preventDefault()
    Func.showElement("delete-loading")
    axios
      .post(`${hostname}/pw_v1/actions/backup?`, { _id: backupDataId, code: backupDataCode }, { responseType: "json" })
      .then((blobFileData) => {
        const datas = JSON.stringify(blobFileData.data.payload, null, 3)
        console.log(datas)
        const url = window.URL.createObjectURL(new Blob([datas]))
        // console.log(JSON.stringify(url));
        const link = document.createElement("a")
        link.href = url
        link.download = "download.json"
        Func.hideElement("delete-loading")
        link.click()
        resetAllState()
      })
      .catch((err) => {
        Func.hideElement("delete-loading")
        setsetbackupDataIdmessage(err.response.data.error)
      })
  }

  return (
    <div>
      <NavBar />
      <div style={{ padding: "20px", position: "absolute", width: "100%", top: 0 }} className="d-block" id="table-loading">
        <Loader />
      </div>

      <nav className="home-navigation-container">
        <div className="search-container">
          <form onSubmit={SearchData} method="get">
            <select name="" id="" defaultValue={selectcategory} onChange={(ev) => setselectcategory(ev.target.value)}>
              <option value="" onClick={() => setselectcategory("")}>
                any
              </option>
              {category.map((x) => (
                <option value={x}>{x}</option>
              ))}
            </select>
            <input type="text" name="q" autoComplete="off" onChange={(ev) => setformSearch(ev.target.value)} />
            <button type="submit">
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.000000 130.000000" preserveAspectRatio="xMidYMid meet">
                <metadata>search</metadata>
                <g transform="translate(0.000000,130.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                  <path
                    d="M450 1290 c-113 -20 -211 -73 -296 -162 -104 -108 -148 -219 -148
-373 0 -155 44 -266 151 -376 168 -175 420 -216 630 -105 l67 36 26 -23 c14
-13 75 -68 135 -123 180 -163 181 -164 224 -164 31 0 44 6 65 31 52 62 37 88
-135 243 -79 71 -153 137 -163 147 -19 18 -19 19 12 81 95 189 79 402 -42 572
-117 163 -328 250 -526 216z m241 -140 c118 -47 212 -148 249 -268 70 -227
-60 -470 -287 -533 -78 -22 -121 -24 -195 -8 -130 28 -236 113 -297 239 -34
71 -36 81 -36 175 0 94 2 104 36 175 58 120 152 199 280 235 69 19 179 13 250
-15z"
                  />
                </g>
              </svg>
            </button>
          </form>
        </div>

        <div className="button-container">
          <button type="button" className="btn btn-info" onClick={(ev) => getTable(cookies.page)}>
            Refresh
          </button>
          <button type="button" className="btn btn-primary" onClick={(ev) => setnewDataModal(true)}>
            Add data
          </button>
          <button type="button" className="btn btn-success" onClick={(ev) => console.warn(true)}>
            restore
          </button>
          <button type="button" className="btn btn-warning" onClick={(ev) => setBackupDataModal(true)}>
            backup
          </button>
        </div>
      </nav>

      {/* TABLE */}
      <div className="container-table">
        <table>
          <thead>
            <tr className="table-head">
              <th>Updated at</th>
              <th>User name</th>
              <th>Mail</th>
              <th>Website</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody id="data-table-body">{table}</tbody>
        </table>

        <div className="pagination-container">
          <p>{paginationMessage}</p>
          <div className="pagination">{pagination}</div>
        </div>
      </div>
      <hr />

      {/* new data */}
      <Modal isOpen={newDataModal} className="Modal-Root" overlayClassName="Modal-Root">
        <div className="modal-container">
          <h1>Add new data</h1>
          <div className="d-none" id="new-data-loading">
            <Loader />
          </div>
          <p style={{ color: "red" }}>{formNewMessage}</p>
          <hr />
          <form onSubmit={NewData} method="post">
            <div className="groub-form">
              <label htmlFor="name">User name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                required
                defaultValue={formName}
                onChange={(event) => setFormName(event.target.value)}
              />
            </div>
            <br />

            <div className="groub-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                defaultValue={formEmail}
                onChange={(event) => setFormEmail(event.target.value)}
              />
            </div>
            <br />

            <div className="groub-form">
              <label htmlFor="text">Website</label>
              <input
                type="text"
                name="website"
                id="website"
                placeholder="website"
                defaultValue={formSite}
                onChange={(event) => setFormSite(event.target.value)}
              />
            </div>
            <br />

            <div className="groub-form">
              <label htmlFor="pwd">Password</label>
              <input
                type="text"
                name="pwd"
                id="pwd"
                placeholder="password"
                autoComplete="off"
                defaultValue={formPwd}
                onChange={(event) => setFormPwd(event.target.value)}
              />
            </div>
            <div className="random-password">
              {formPwdLength}&nbsp;&nbsp;
              <input
                type="range"
                min="8"
                max="50"
                defaultValue="8"
                onChange={(ev) => {
                  setFormPwd(nanoid(ev.target.value))
                  setFormPwdLength(ev.target.value)
                }}
              />
            </div>

            <p style={{ fontSize: 11 }}>Separate tags with `#` example #im #account #root</p>
            <div className="groub-form">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                name="tag"
                id="tag"
                defaultValue="#mytag"
                onChange={(event) => {
                  setFormTag(event.target.value)
                }}
              />
            </div>
            <br />

            <div className="groub-form">
              <label>category</label>
              <input
                type="text"
                name="category"
                id="category"
                style={{ width: "55%" }}
                defaultValue={formcategory}
                onChange={(event) => setFormcategory(event.target.value)}
              />
              <select name="" id="" onChange={(event) => setFormcategory(event.target.value)}>
                <option value="">custom</option>
                <option value="finance">finance</option>
                {category.map((x) => (
                  <option value={x}>{x}</option>
                ))}
              </select>
            </div>

            <br />
            <div className="notes-container">
              <label htmlFor="notes-editor">Notes</label>
              <details>
                <summary>add notes</summary>
                <nav>
                  <select id="templateNotes" onChange={(ev) => setFormNotes(ev.target.value ? notesTemplate[ev.target.value].value : "")}>
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
                    }}>
                    view
                  </a>
                </nav>

                <div className="notes-area">
                  <textarea className="d-block" id="notesEditor" onChange={(event) => setFormNotes(event.target.value)} value={formNotes}></textarea>
                  <div id="notesRender" className="d-none">
                    <ReactMarkdown>{formNotes}</ReactMarkdown>
                  </div>
                </div>
              </details>
            </div>

            <hr />

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
      </Modal>

      {/* details and edit  */}
      <Modal isOpen={detailsDataModal} className="Modal-Root" overlayClassName="Modal-Root">
        <div className="modal-container">
          <h1>{EditDataClassname.includes("d-none") ? "Details " + DetailsData.name : "Edit " + DetailsData.name}</h1>
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
                  onChange={(event) => setFormName(event.target.value)}
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
                  onChange={(event) => setFormEmail(event.target.value)}
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
                  onChange={(event) => setFormSite(event.target.value)}
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
                    onChange={(event) => setFormPwd(event.target.value)}
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
                      setFormPwd(x)
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
                  href="#"
                  style={{ width: "30px" }}
                  onClick={(ev) => {
                    DetailsDatapwdInputType === "text" ? setDetailsDatapwdInputType("password") : setDetailsDatapwdInputType("text")
                  }}>
                  show
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
                      setFormTag(event.target.value)
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
                  defaultValue={formcategory || DetailsDatacategory}
                  onChange={(event) => setFormcategory(event.target.value)}
                />
                <select name="" id="" onChange={(event) => setFormcategory(event.target.value)}>
                  <option value="">custom</option>
                  <option value="finance">finance</option>
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

            <div className={"groub-form " + DetailsDataClassname}>
              <label htmlFor="tag">Created at</label>
              <input type="text" readOnly value={DetailsDatacreatedAt} className="details d-block" />
            </div>
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
                      href="#"
                      onClick={(ev) => {
                        Func.hideOrShowElement("notesRender")
                        Func.hideOrShowElement("notesEditor")
                      }}>
                      view
                    </a>
                  </nav>

                  <div className="notes-area">
                    <textarea
                      className="d-block"
                      id="notesEditor"
                      onChange={(event) => setFormNotes(event.target.value)}
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

            <div className="button-modal">
              {/* close */}
              <button type="button" className={"btn btn-primary " + DetailsDataClassname} onClick={(ev) => resetAllState()}>
                close
              </button>
              {/* cancel */}
              <button
                type="button"
                className={"btn btn-danger " + EditDataClassname}
                onClick={(ev) => {
                  setDetailsDataClassname("d-flex")
                  setEditDataClassname("d-none")
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
      </Modal>

      {/* confirm delete */}
      <Modal isOpen={DeleteDataModal} className="Modal-Root" overlayClassName="Modal-Root">
        <div className="modal-container">
          <h1>Confirm delete</h1>
          <div className="d-none" id="delete-loading">
            <Loader />
          </div>
          <hr />
          <form onSubmit={deleteData} method="post">
            <p>type "{wantDeleteData.name}" to delete the data</p>
            <p style={{ color: "red" }}>{wantDeleteData.message}</p>
            <div className="groub-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder={wantDeleteData.name}
                autoComplete="off"
                required
                onChange={(ev) => (ev.target.value === wantDeleteData.name ? setDeleteDataButton(false) : setDeleteDataButton(true))}
              />
            </div>
            <br />

            <hr />

            <div className="button-modal">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(ev) => {
                  setDeleteDataModal(false)
                  setDeleteDataButton(true)
                }}>
                close
              </button>
              <button type="submit" className="btn btn-danger" disabled={DeleteDataButton}>
                Delete
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* backup */}
      <Modal isOpen={BackupDataModal} className="Modal-Root" overlayClassName="Modal-Root">
        <div className="modal-container">
          <h1>Confirm backup</h1>
          <div className="d-none" id="delete-loading">
            <Loader />
          </div>
          <hr />
          <form onSubmit={downloadBackupData} method="post">
            <p>verify code before backup</p>
            <p style={{ color: "red" }}>{setbackupDataIdmessage}</p>

            <button
              id="send-verification-code"
              className="btn btn-info"
              onClick={() => {
                document.getElementById("send-verification-code").setAttribute("disabled", "true")
                axios.post(`${hostname}/pw_v1/actions/verify?`, { responseType: "json" }).then((val) => {
                  setbackupDataId(val.data.payload._id)
                })
              }}>
              {" "}
              send verification code
            </button>
            <br />
            <br />

            <div className="groub-form">
              <label>Code</label>
              <input
                type="text"
                maxLength={6}
                name="name"
                id="name"
                placeholder={wantDeleteData.name}
                autoComplete="off"
                required
                onChange={(ev) => {
                  setbackupDataCode(ev.target.value)
                  if (ev.target.value.length >= 5) {
                    setDeleteDataButton(false)
                  } else {
                    setDeleteDataButton(true)
                  }
                }}
              />
            </div>
            <br />

            <hr />

            <div className="button-modal">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(ev) => {
                  resetAllState()
                }}>
                close
              </button>
              <button className="btn btn-danger" disabled={DeleteDataButton}>
                Backup
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Home
