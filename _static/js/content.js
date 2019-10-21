

// var pagelength = 16
var correct_answers = {
  q1: ['d'],
  q2: ['c'],
  q3: ['a'],
  q4: ['c']
}

var already_answered = {
  q1: false,
  q2: false,
  q3: false,
  q4: false
}
var question_num = 4

function questionCheck(q){
  let answered = []
  for (let i = 1; i <= 4; i++) {
    let q_id = q+"-"+String(i)
    let el = document.getElementById(q_id)
    if (el.checked) {
      answered.push(el.value)
    }
  }
  // console.log(answered)
  let correct = 0
  let incorrect = 0
  correct_answers[q].forEach((ans) => {
    let index = answered.findIndex(e => e === ans)
    if (index !== -1) {
      correct++
    }
  })
  incorrect = answered.length - correct
  if (incorrect < 0) {
    incorrect = 0
  }

  // console.log('wait 5 seconds');
  document.getElementById(q+'-timer').style.display = "block"
  if (q === 'q1' || q === 'q2' || q === 'q4' ) {
    if (correct === 1) {
      document.getElementById(q+'-feedback-correct').style.display = "block"
      document.getElementById(q+'-feedback-incorrect').style.display = "none"
    } else {
      document.getElementById(q+'-feedback-correct').style.display = "none"
      document.getElementById(q+'-feedback-incorrect').style.display = "block"
    }
  } else {
    document.getElementById(q+'-correct').innerHTML = correct
    document.getElementById(q+'-incorrect').innerHTML = incorrect
    document.getElementById(q+'-feedback').style.display = "block"
  }
  document.getElementById(q+'-btn').style.background = "grey"
  document.getElementById(q+'-btn').disabled = true

  var seconds = 4
  var counter = setInterval(function() {
    if (seconds === 0) {
      clearInterval(counter)
    }
    document.getElementById(q+'-seconds').innerHTML = seconds
    seconds = seconds - 1
  } ,1000)

  function time_done() {
    // console.log('time is done');
    document.getElementById(q+'-btn').style.background = "darkcyan"
    document.getElementById(q+'-btn').disabled = false
    document.getElementById(q+'-timer').style.display = "none"
  }

  setTimeout(time_done, 5000)
  if (incorrect === 0 && correct === correct_answers[q].length) {
    if (!already_answered[q]) {
      let rand = Math.random()
      let id = "badge" + String(rand)
      // console.log('gamification');
      let awards = document.getElementById('awards')
      let d = document.createElement('div')
      d.classList.add("badge")
      d.classList.add("badge-award")
      d.classList.add("pulse2")
      d.setAttribute('id',id)
      d.setAttribute('onclick',"addPoints(200,id)")
      let i = document.createElement('i')
      i.classList.add("fas")
      i.classList.add("fa-award")
      i.classList.add("award")
      i.setAttribute('id',id+'-i')
      document.getElementById('badge-click').style.display = "inline-block"
      // <div class="badge badge-award pulse2" id="badge1" onclick="addPoints(50,'badge1')">
      // <i class="fas fa-award award" id="badge1-i"></i>
      // </div>
      d.appendChild(i)
      awards.appendChild(d)
      already_answered[q] = true
    }
  }


  console.log(correct, incorrect);
}

var pagelength = document.getElementsByClassName("page-hide").length

var pages = {s1:[0,6],s2:[7,14],s3:[15,22]}

function changePage(x) {
    for (var i = 1; i <= pagelength; i++) {
      if (document.getElementById("page-"+String(i)).classList.contains("show")) {
        var pagenumber = i
      }
    }
    var newpage = pagenumber+x;
    let backbutton = document.getElementById('content-back')
    let nextbutton = document.getElementById('content-next')
    if (newpage === 1) {
      backbutton.style.visibility = "hidden"
    } else {
      if (backbutton.style.visibility === "hidden") {
        backbutton.style.visibility = "visible"
      }
    }
    if (newpage === pages.s3[1]) {
      nextbutton.style.visibility = "hidden"
    } else {
      if (nextbutton.style.visibility === "hidden") {
        nextbutton.style.visibility = "visible"
      }
    }

    if ((x > 0 && newpage <= pagelength) || ( x < 0 && newpage > 0)) {
      document.getElementById("page-"+String(pagenumber)).classList.remove("show");
      document.getElementById("page-"+String(newpage)).classList.add("show");
      document.getElementById("tab-s1").classList.remove("active-tab");
      document.getElementById("tab-s2").classList.remove("active-tab");
      document.getElementById("tab-s3").classList.remove("active-tab");
      document.getElementById("page_number").innerHTML = newpage;
      if (newpage <= pages.s1[1]) {
        document.getElementById("tab-s1").classList.add("active-tab");
      } else if (newpage >= pages.s2[0] && newpage <= pages.s2[1]) {
        document.getElementById("tab-s2").classList.add("active-tab");
      } else if (newpage >= pages.s3[0]) {
        document.getElementById("tab-s3").classList.add("active-tab");
      }
  } else {
    console.log('page limit reached');
  }
}

function goToPage(x) {
  for (var i = 1; i <= pagelength; i++) {
    if (document.getElementById("page-"+String(i)).classList.contains("show")) {
      var pagenumber = i
    }
  }

  let backbutton = document.getElementById('content-back')
  let nextbutton = document.getElementById('content-next')
  if (x === 1) {
    backbutton.style.visibility = "hidden"
    if (nextbutton.style.visibility === "hidden") {
      nextbutton.style.visibility = "visible"
    }
  } else {
    if (backbutton.style.visibility === "hidden") {
      backbutton.style.visibility = "visible"
    }
    if (nextbutton.style.visibility === "hidden") {
      nextbutton.style.visibility = "visible"
    }
  }

  document.getElementById("tab-s1").classList.remove("active-tab");
  document.getElementById("tab-s2").classList.remove("active-tab");
  document.getElementById("tab-s3").classList.remove("active-tab");
  if (x > pages.s1[0] && x <=pages.s1[1]) {
    document.getElementById("tab-s1").classList.add("active-tab");
  } else if (x >= pages.s2[0] && x <= pages.s2[1]) {
    document.getElementById("tab-s2").classList.add("active-tab");
  } else if (x >= pages.s3[0]) {
    document.getElementById("tab-s3").classList.add("active-tab");
  }
  document.getElementById("page-"+String(pagenumber)).classList.remove("show");
  document.getElementById("page-"+String(x)).classList.add("show");
  document.getElementById("page_number").innerHTML = x;
}

function treatment(x) {
  document.getElementById("treatment-1").style.display = "none"
  document.getElementById("treatment-2").style.display = "none"
  document.getElementById("treatment-3").style.display = "none"
  document.getElementById("treatment-4").style.display = "none"
  document.getElementById("btn-treatment-1").style.border = "none"
  document.getElementById("btn-treatment-2").style.border = "none"
  document.getElementById("btn-treatment-3").style.border = "none"
  document.getElementById("btn-treatment-4").style.border = "none"
  if (x==='treatment-4') {
    document.getElementById("treatment-3").style.display = "block"

  }
  document.getElementById(x).style.display = "block"
  document.getElementById('btn-'+x).style.border = "1px solid blue"
}


// Poppers
var tooltips = [
  {id: "#popup1" , title: "A production function is a graphical or mathematical expression describing the amount of output that can be produced by any given amount or combination of input(s). The function describes differing technologies capable of producing the same thing." },
  {id: "#popup2" , title: "Average product is the total output divided by a particular input, for example per worker (divided by the number of workers) or per worker per hour (total output divided by the total number of hours of labour put in)."},
  {id: "#popup3" , title: "Marginal product is the additional amount of output that is produced if a particular input was increased by one unit, while holding all other inputs constant."},
  {id: "#popup4" , title: "Diminishing returns is a situation in which the use of an additional unit of a factor of production results in a smaller increase in output than the previous increase."},
  {id: "#popup5" , title: "A concave function is a function of two variables for which the line segment between any two points on the function lies entirely below the curve representing the function (the function is convex when the line segment lies above the function)."},
  {id: "#popup6" , title: "Tangency is when two curves share one point in common but do not cross. The tangent to a curve at a given point is a straight line that touches the curve at that point but does not cross it."},
  {id: "#popup7" , title: "Preferences are a description of the benefit or cost we associate with each possible outcome."},
  {id: "#popup8" , title: "Utility is a numerical indicator of the value that one places on an outcome, such that higher valued outcomes will be chosen over lower valued ones when both are feasible."},
  {id: "#popup9" , title: "A curve of the points which indicate the combinations of goods that provide a given level of utility to the individual."},
  {id: "#popup10" , title: "Consumption goods are goods or services that satisfies the needs of consumers over a short period."},
  {id: "#popup11" , title: "The MRS is a trade-off that a person is willing to make between two goods. At any point, this is the slope of the indifference curve."},
  {id: "#popup12" , title: "Opportunity cost is when taking an action implies forgoing the next best alternative action, this is the net benefit of the foregone alternative."},
  {id: "#popup13" , title: "Economic cost is the out-of-pocket cost of an action, plus the opportunity cost."},
  {id: "#popup14" , title: "Economic rent is a payment or other benefit received above and beyond what the individual would have received in his or her next best alternative (or reservation option)."},
]
tooltips.forEach((tooltip) => {
  new Tooltip(document.querySelector(tooltip.id), {
    placement: 'right',
    title: tooltip.title,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  });
})

function aeexample(section,type) {
  switch (type) {
    case "accountant":
      document.getElementById('ae-'+String(section)+'-accountant').style.display = 'block';
      document.getElementById('ae-'+String(section)+'-economist').style.display = 'none';
      document.getElementById('ae-'+String(section)+'-accountant-btn').style.background = '#fff3e4';
      document.getElementById('ae-'+String(section)+'-economist-btn').style.background = 'transparent';
      break;
    case "economist":
      document.getElementById('ae-'+String(section)+'-economist').style.display = 'block';
      document.getElementById('ae-'+String(section)+'-accountant').style.display = 'none';
      document.getElementById('ae-'+String(section)+'-economist-btn').style.background = 'lightcyan';
      document.getElementById('ae-'+String(section)+'-accountant-btn').style.background = 'transparent';
      break;
    default:
  }
}
