function countdown_redirect(container,seconds,href) {
  document.getElementById(container).style.display = "block"
  var down = setInterval(function(){
    let secondsdiv = document.getElementById(seconds)
    let second = secondsdiv.innerHTML
    console.log(second);
    if (second <= 0) {
      clearInterval(down)
      window.location.href = href
    } else {
      secondsdiv.innerHTML = (parseInt(second) - 1)
    }
  }, 1000)
}
