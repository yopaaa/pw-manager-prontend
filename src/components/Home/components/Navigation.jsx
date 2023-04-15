import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setModalContent, setrefreshTable, setgetdatapath } from "./js/HomeState"
import Backup from "./Backup.jsx"
import NewData from "./NewData.jsx"
import Restore from "./Restore"

const Navigation = () => {
  const dispatch = useDispatch()
  const { category } = useSelector((state) => state.HomeState)
  const [formSearch, setformSearch] = useState("")
  const [selectcategory, setselectcategory] = useState("")


  const hostname = process.env.REACT_APP_SERVER_END_POINT

  function SearchData(event) {
    event.preventDefault()
    const path = `${hostname}/pw_v1/search?page=0&q=${formSearch}&category=${selectcategory}`
    dispatch(setgetdatapath(path))
  }

  return (
    <nav className="home-navigation-container">
      <div className="search-container">
        <form onSubmit={SearchData} method="get">
          {/* SELECT DATA SEARCH CATEGORY */}
          <select name="" id="" defaultValue={selectcategory} onChange={(ev) => setselectcategory(ev.target.value)}>
            <option value="" onClick={() => setselectcategory("")}>
              any
            </option>
            {category.map((x) => (
              <option value={x}>{x}</option>
            ))}
          </select>
          {/* INPUT SEARCH BUTTON */}
          <input type="text" name="q" autoComplete="off" onChange={(ev) => setformSearch(ev.target.value)} />
          {/* SEARCH BUTTON */}
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
        {/* REFRASH BUTTON */}
        <button
          type="button"
          className="btn btn-info"
          onClick={(ev) => {
            dispatch(setrefreshTable(Date.now()))
          }}>
          Refresh
        </button>

        {/* ADD DATA BUTTON */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={(ev) => {
            dispatch(setModalContent(<NewData />))
          }}>
          Add data
        </button>

        {/* RESTORE BUTTON */}
        <button
          type="button"
          className="btn btn-success"
          onClick={(ev) => {
            dispatch(setModalContent(<Restore />))
          }}
          > restore
        </button>

        {/* BACKUP BUTTON */}
        <button
          type="button"
          className="btn btn-warning"
          onClick={(ev) => {
            dispatch(setModalContent(<Backup />))
          }}>
          backup
        </button>
      </div>
    </nav>
  )
}

export default Navigation
