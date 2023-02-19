import axios from "axios"
const hostname = process.env.REACT_APP_SERVER_END_POINT


const Func = {
  hideOrShowElement: function (target) {
    var x = document.getElementById(target)
    if (x.classList.contains("d-none")) {
      x.classList.replace("d-none", "d-block")
    } else {
      x.classList.replace("d-block", "d-none")
    }
  },
  hideElement: function (target) {
    var x = document.getElementById(target)
    x.classList.replace("d-block", "d-none")
  },
  showElement: function (target) {
    var x = document.getElementById(target)
    x.classList.replace("d-none", "d-block")
  },
  getData: function(q = ""){
    this.showElement("table-loading")
    const query = q || `${hostname}/pw_v1?page=0`
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .get(query)
          .then((data) => {
            this.hideElement("table-loading")
            resolve(data.data)
          })
          .catch((error) => {
            reject(error.message)
          })
      }, 1000)
    })
  }
}

export default Func
