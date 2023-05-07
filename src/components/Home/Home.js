import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Modal from "react-modal"
import { useSelector } from "react-redux"
import Loader from "./components/Loader"
import Navigation from "./components/Navigation"
import Table from "./components/Table"
import NavBar from "../NavBar"
import Ping from "../Ping"
import "../../style/Form.css"
import "../../style/home.css"
import "../../style/Table.css"
import "../../style/Details.css"

const Home = () => {
  const { ModalContent } = useSelector((state) => state.HomeState)
  Modal.setAppElement("#root")
  Ping()

  const isModal = ModalContent ? true : false

  return (
    <div>
      <NavBar />
      <div style={{ padding: "20px", position: "absolute", width: "100%", top: 0 }} className="d-block" id="table-loading">
        <Loader />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* TABLE */}
      <Table />

      {/* backup */}
      <Modal isOpen={isModal} className="Modal-Root" overlayClassName="Modal-Root">
        {ModalContent}
      </Modal>
    </div>
  )
}

export default Home
