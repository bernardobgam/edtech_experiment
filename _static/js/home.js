
function validateEntryForm() {
    console.log('validate form');
    let form = document.getElementById('codeform')
    let code = form['code'].value
    let computer = form['computer'].value
    let submit = true
    if (code === "" || computer === "") {
      document.getElementById('home_error1').style.display = "block"
      submit = false
    } else {
      document.getElementById('home_error1').style.display = "none"
    }
    // Validate computer numeber
    let computer_clean = parseInt(computer)
    if (isNaN(computer_clean)) {
        document.getElementById('home_error2').style.display = "block"
        submit = false
      } else {
        document.getElementById('home_error2').style.display = "none"
      }

    if (submit) {
      form.submit()
    }
}
