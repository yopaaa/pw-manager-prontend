import React, { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import moment from "moment"
import Func from "./js/Func.js"
import { useSelector, useDispatch } from "react-redux"
import { setGetData, setModalContent, setCategory } from "./js/HomeState"
import Edit from "./Edit"
import Delete from "./Delete"

const Table = () => {
  const dispatch = useDispatch()
  const hostname = process.env.REACT_APP_SERVER_END_POINT

  const [table, setTable] = useState("")
  const [pagination, setPagination] = useState()
  const [paginationMessage, setPaginationMessage] = useState("")
  const [cookies, setCookie] = useCookies(["user"])
  const { refreshTable, getdatapath } = useSelector((state) => state.HomeState)

  useEffect(() => {
    const target = { query: getdatapath || `${hostname}/pw_v1?page=${ Number(cookies.page) || 0}` }
    // console.log(target);
    getTable(target)
  }, [getdatapath, refreshTable])

  function getTable(q) {
    if (q.page) {
      return Func.getData(`${hostname}/pw_v1?page=${Number(q.page) || 0}`).then((val) => {
        RenderTableData(val.payload)
      })
    }
    if (q.query) {
      return Func.getData(q.query).then((val) => {
        RenderTableData(val.payload)
      })
    }

    return false
  }

  function RenderTableData(data) {
    const categoryyy = []
    const datas = data.data
    setTable(
      datas.map((value) => {
        if (value.data.category) categoryyy.push(value.data.category)
        return (
          <tr>
            <td>{moment(value.updatedAt).startOf("minute").fromNow()}</td>
            <td>{value.data.name}</td>
            <td>
              <a href={value.data.site} target="_blank" rel="noreferrer">
                {value.data.site.slice(0, 15)}...
              </a>
            </td>
            <td>
              <input type="text" value={value.data.email} readOnly />
            </td>
            <td>
              <a
                href="#Details"
                onClick={() => {
                  // dispatch(setModal(true))
                  dispatch(setGetData({ _id: value._id, name: value.data.name }))
                  dispatch(setModalContent(<Edit />))
                }}>
                Details
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a
                href="#Delete"
                onClick={() => {
                  // dispatch(setModal(true))
                  dispatch(
                    setGetData({
                      _id: value._id,
                      name: value.data.name,
                    })
                  )
                  dispatch(setModalContent(<Delete />))
                }}>
                Delete
              </a>
            </td>
          </tr>
        )
      })
    )
    dispatch(setCategory(Array.from(new Set(categoryyy))))
    const { page, pageSize, total } = data
    const countpage = Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i)
    setPaginationMessage(`Page '${page}' of '${Math.floor(total / pageSize)}', Total data '${total}'`)
    setPagination(
      countpage.map((x) => {
        const className = x == page ? "existpage" : ""
        return (
          <button className={className} onClick={(ev) => getTable({ page: x })}>
            {x}
          </button>
        )
      })
    )
    setCookie("page", page, { path: "/" })
  }

  return (
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
  )
}

export default Table
