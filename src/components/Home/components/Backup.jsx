import React, { useState } from "react"
import axios from "axios"
import Loader from "./Loader"
import Func from "./js/Func"
import { useSelector, useDispatch } from "react-redux"
import { setModalContent } from "./js/HomeState"

const Backup = () => {
  const dispatch = useDispatch()
  const { isModal } = useSelector((state) => state.HomeState)

  const [dataId, setdataId] = useState("")
  const [verifyCode, setverifyCode] = useState("")
  const [message, setmessage] = useState("")
  const [IsEnableButton, setIsEnableButton] = useState(true)
  const hostname = process.env.REACT_APP_SERVER_END_POINT

  function resetAllState() {
    setdataId("")
    setverifyCode("")
    setmessage("")
    setIsEnableButton(true)
    dispatch(setModalContent(false))
  }

  function downloadBackupData(event) {
    event.preventDefault()
    Func.showElement("delete-loading")
    axios
      .post(`${hostname}/pw_v1/actions/backup?`, { _id: dataId, code: verifyCode }, { responseType: "json" })
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
        setmessage(err.response.data.error)
      })
  }
  return (
    <div className="modal-container">
      <h1>Confirm backup</h1>
      {JSON.stringify(isModal)}
      <div className="d-none" id="delete-loading">
        <Loader />
      </div>
      <hr />
      <form onSubmit={downloadBackupData} method="post">
        <p>verify verifyCode before backup</p>
        <p>we will send verify verifyCode to your email</p>
        <p style={{ color: "red" }}>{message}</p>

        <button
          id="send-verification-verifyCode"
          className="btn btn-info"
          onClick={() => {
            document.getElementById("send-verification-verifyCode").setAttribute("disabled", "true")
            axios.post(`${hostname}/pw_v1/actions/verify?`, { responseType: "json" }).then((val) => {
              setdataId(val.data.payload._id)
            })
          }}>
          {" "}
          send verification verifyCode
        </button>
        <br />
        <br />

        <div className="groub-form">
          <label>verifyCode</label>
          <input
            type="text"
            maxLength={6}
            name="name"
            id="name"
            autoComplete="off"
            required
            onChange={(ev) => {
              setverifyCode(ev.target.value)
              if (ev.target.value.length >= 5) {
                setIsEnableButton(false)
              } else {
                setIsEnableButton(true)
              }
            }}
          />
        </div>
        <br />

        <hr />

        <div className="button-modal" id="button-modal">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(ev) => {
              resetAllState()
            }}>
            close
          </button>
          <button className="btn btn-danger" disabled={IsEnableButton}>
            Backup
          </button>
        </div>
      </form>
    </div>
  )
}

export default Backup
