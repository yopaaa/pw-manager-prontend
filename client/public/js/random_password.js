const password = document.querySelector("#password")
let string = "AabaBCDEFGHIJKLMNOPQRSTUVWXYZacdefghijklnopqrstuvwxyz0123456789@#$%^&*!()-_=+[{}]|\:<,>.?/"
const generate = document.querySelector(".generate_button")
      
generate.addEventListener('click', () => {
          let pass = ""
      
          for (var i = 0 i <= 30  i++) {
              let pwd = string[Math.floor(Math.random() * string.length)]
              pass += pwd
          }
          password.value = pass
          
})

// HIDE OR SHOW PASSWORD
function tooglePass(params) {
    let element = document.getElementById(params)
    if (element.type == 'password') {
      element.type = 'text'
    } else {
      element.type = 'password'
    }
  }
