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
}

export default Func
