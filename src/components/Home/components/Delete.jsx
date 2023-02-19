import React, { useState } from "react"
import axios from "axios"
import Loader from "./Loader"
import Func from "./js/Func"
import { useSelector, useDispatch } from "react-redux"
import { setModalContent, setrefreshTable } from "./js/HomeState"

const Delete = () => {
  const dispatch = useDispatch()
  const { getData } = useSelector((state) => state.HomeState)

  const [DeleteDataButton, setDeleteDataButton] = useState(true)
  const [message, setMessage] = useState("")
  const hostname = process.env.REACT_APP_SERVER_END_POINT

  function deleteData(event) {
    event.preventDefault()
    setDeleteDataButton(true)
    Func.hideOrShowElement("delete-loading")
    const _id = getData._id
    setTimeout(() => {
      axios
        .delete(`${hostname}/pw_v1/${_id}`)
        .then((value) => {
          Func.hideOrShowElement("delete-loading")
          dispatch(setModalContent(false))
          dispatch(setrefreshTable(Date.now()))
        })
        .catch((error) => {
          Func.hideOrShowElement("delete-loading")
          console.log(error.message)
          setMessage(`${error.message}`)
        })
    }, 1500)
  }

  return (
    <div className="modal-container">
      <h1>Confirm delete</h1>
      <div className="d-none" id="delete-loading">
        <Loader />
      </div>
      <hr />
      <form onSubmit={deleteData} method="post">
        <p>type "{getData.name}" to delete the data</p>
        <p style={{ color: "red" }}>{message}</p>
        <div className="groub-form">
          <input
            type="text"
            name="name"
            id="name"
            placeholder={getData.name}
            autoComplete="off"
            required
            onChange={(ev) => (ev.target.value === getData.name ? setDeleteDataButton(false) : setDeleteDataButton(true))}
          />
        </div>
        <br />

        <hr />

        <div className="button-modal">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(ev) => {
              dispatch(setModalContent(false))
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
  )
}

export default Delete
