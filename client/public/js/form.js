// FORM PROPERTY
const name_form = document.querySelector('#name')
const email_form = document.querySelector('#email')
const site_form = document.querySelector('#site')
const password_form = document.querySelector('#password')
const notes_form = document.querySelector('#note')
const id_form = document.querySelector('#id')

// RESET FORM VALUE TO DEFAULT
function reset_form() {
    name_form.value = ''
    email_form.value = ''
    site_form.value = ''
    password_form.value = ''
    notes_form.innerHTML = ''
    id_form.value = ''
}

// IF DATA EDIT INNER HTML
$(document).ready(function () {
    //showing modal for delete record
    $('#main-details-tb').on('click', '.tbActionsedit', function () {
        let id = $(this).data('id')
        let tbActionsResult = resultDataApi.find(element => element.id == id)

        let form = document.querySelector("#form")
        let sendform = document.querySelector("#sendform")
        let titleform = document.querySelector("#exampleModalLabel")
        let action = $(this).data('action')

        form.action = $(this).data('path')

        if (action == 'new') {
            reset_form()
            titleform.innerHTML = 'Add new data'
            sendform.innerHTML = 'Add data'
        }
        if (action == 'change_data') {
            name_form.value = tbActionsResult.user_name
            email_form.value = tbActionsResult.email
            site_form.value = tbActionsResult.site
            password_form.value = tbActionsResult.password
            notes_form.innerHTML = tbActionsResult.notes
            id_form.value = tbActionsResult.id
            titleform.innerHTML = 'Change data'
            sendform.innerHTML = 'Change data'
        }
    })


    $('#main-details-tb').on('click', '.modal2', function () {
        let id = $(this).data('id')
        let tbActionsResult = resultDataApi.find(element => element.id == id)

        let form2 = document.querySelector("#form_modal2")
        let formbody = document.querySelector("#modal2-body")
        let formTitle = document.querySelector("#modal2Title")
        let modal2SubmitBtn = document.querySelector("#modal2Submit")
        let action = $(this).data('action')

        form2.action = $(this).data('path')
        if (action == 'delete') {
            formTitle.innerHTML = "Delete"
            formbody.innerHTML = `do you want to delete <i style="color:blue">${tbActionsResult.user_name}</i> ?`
            formbody.innerHTML += `<input type="hidden" name="id" value="${id}">`
            modal2SubmitBtn.innerHTML = "Delete"
        }
        if (action == 'backup') {
            formTitle.innerHTML = "Back UP"
            formbody.innerHTML = `
          <div class="form-group">
            <label for="text" class="">File name</label>
            <div style="width: 80%">
             <input type="text" name="fileName" id="fileName" class="form-control" placeholder="Name" required autocomplete="off"/>
            </div>
          </div>`
         modal2SubmitBtn.innerHTML = "BackUP"
        }
        if (action == 'restore') {
            formTitle.innerHTML = "Restore"
            formbody.innerHTML = `<input type="file" name="restore" id="restore"/>`
            modal2SubmitBtn.innerHTML = "Restore"
        }
    })


})

