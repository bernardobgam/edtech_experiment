

function submitConsent() {

  let form = document.getElementById('consentform')
  let condition1 = false
  let condition2 = false

  form['checkbox'].value = form['checkbox'].checked
  if (form['checkbox'].value === 'false') {
    document.getElementById('checkbox-validation').style.display = 'block'
  } else {
    document.getElementById('checkbox-validation').style.display = 'none'
    condition1 = true
  }

  if (form['name'].value.length < 3) {
    document.getElementById('name-validation').style.display = 'block'
  } else {
    document.getElementById('name-validation').style.display = 'none'
    condition2 = true
  }

  if (condition1 && condition2) {
    form.submit()
  }

}
