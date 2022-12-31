const tableTemplate = (data) => {
  let { create_time, email, id, password, site, user_name, last_edited } = data

  let userName = user_name.substr(0, 10).replace(/(<([^>]+)>)/gi, "")
  let Site = site.substr(0, 10)
  let createTime = new Date(create_time)

  let lastEdited
  if (last_edited) {
    lastEdited = '$'
  } else {
    lastEdited = ""
  }

  return `<tr style="border-bottom: 1px solid #ddd">
  
                <td onclick="hello('test')"> 
                  <span style="color:red">${lastEdited}</span>
                  <span>${createTime.toLocaleDateString()}</span>
                </td>
  
                <td>${userName}</td>

                <td><a href="https://${site}" target="_blank">${Site}...</a></td>
  
                <td>
                  <input type="text" value="${email}" class="out_data" readonly />
                </td>
  
                <td style="display:flex gap:5px">
                  <input type="password" id="password${id}" value="${password}" class="out_data" readonly
                  />
                  <input type="checkbox" name="" id="" onclick="tooglePass('password${id}')">
                </td>
  
                <td>
                     <a href="javascript:void(0)" class="tbActionsedit" data-id="${id}" 
                        data-bs-toggle="modal" data-bs-target="#formNewData" 
                        data-path="/actions/change_data" data-action="change_data">edit</a> |

                        <a href="javascript:void(0)" class="modal2" data-id="${id}" 
                        data-bs-toggle="modal" data-bs-target="#formModal2"
                        data-path="/actions/delete" data-action="delete">Del</a>                   
                </td>
  
              </tr>`
}

// MAPPING DATA ARRAY
function displayCharacters(datas = {}, destination) {
  let data = datas

  let dataTable = data.map(objectData => {
    return tableTemplate(objectData)
  })

  destination.innerHTML = dataTable.join(" ")
}

const htmlTable = document.querySelector(".data-table")
const searchBar = document.getElementById('searchBar')

let resultDataApi

// DISPLAY ALL DATA
fetchApi(`${location.origin}/api`, datas => {
  resultDataApi = datas.reverse()
  displayCharacters(resultDataApi, htmlTable)
})

// SHOW RESULT SEARCH DATA
searchBar.addEventListener('keyup', (e) => {
  const query = e.target.value.toLowerCase()
  const resultSearch = resultDataApi.filter(datas => {
    return datas.key.includes(query)
  })

  displayCharacters(resultSearch, htmlTable)
})

