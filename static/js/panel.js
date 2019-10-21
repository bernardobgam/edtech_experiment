$( document ).ready(function() {

  $( "#action_countdown" ).click(function() {
    let form = document.getElementById('content_time_form')
    form.submit()
  })

  var participantsData = []
  var tableRows = []
  var tableRows_copy = []
  function getData() {
    var request = $.ajax({
      url: url,
      type : 'GET',
      async: true,
      dataType: "json",
      success: function (data) {
        participantsData = []
        var participants = data
        // console.log('success',data);
        // participants.forEach(row => {
        //   participantsData.push([row.session,row.instructions, row.consent, row.group ? row.group : "waiting...", row.content, row.quiz, row.survey, row.payment])
        // })
        tableRows = participants
        tableCreate()
      },
      error: function () {
        console.log("error");
      }
    })
  }

  getData()

var tableHeader = ["Session","Computer #","Instructions","Consent","Group","Content","Quiz","Survey","Payment","Receipt"]
var tableHeaderId = ["session","computer","instructions","consent","group","content","quiz","survey","payment","receipt"]
var tableData = [
  // [1465,1,true,true,"waiting...","20 / 20","5/ 10","0/10",15],
  // [2927,2,true,false,"waiting...","20 / 20","2/ 10","0/10",10],
  // [3863,3,true,true,"waiting...","2 / 20","5/ 10","0/10",8],
  // [6844,4,true,false,"waiting...","20 / 20","6/ 10","0/10",6],
  // [9855,5,true,true,"waiting...","14 / 20","8/ 10","0/10",22],
  // [1976,6,false,false,"waiting...","18 / 20","2/ 10","0/10",18],
  // [1267,7,true,true,"waiting...","18 / 20","2/ 10","0/10",18],
]


var tableRowsCleaned = [];
var participantCount = { P: 0, D1: 0, D2: 0, D3: 0, }
var sortBy = null;
var sortDec = true;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function random() {
  min = Math.ceil(0);
  max = Math.floor(1);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function randomFromLength(ceil) {
  min = Math.ceil(0);
  max = Math.floor(ceil);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

$( "#refresh" ).click(function() {
  getData()
  // let d = new Date();
  // let n = d.toLocaleTimeString();
  // console.log('last refresh was ' + n);
})

function set_access(access) {
  $('#loader').show();
  let request = $.ajax({
    url: url_set_access,
    type : 'PUT',
    async: true,
    data: { csrfmiddlewaretoken: csrftoken, access: access, code: code_id },
    dataType: "json",
    complete: function(){
        $('#loader').hide();
    },
    success: function (data) {
      //
    },
    error: function (error) {
      console.log(error);
    }
  })
}

$( "#allow-content" ).click(function() {
  console.log('allow content clicked');
  set_access('content')
});

$( "#allow-quiz" ).click(function() {
  console.log('allow quiz clicked');
  set_access('quiz')
});

$( "#randomise" ).click(function() {
  var csrftoken = getCookie('csrftoken');
  //Make Copy of data
  // let dataCopy = [...tableData]
  let dataCopy = [...tableData]
  //Make groups to be allocaed
  treatmentP = []
  treatmentD1 = []
  treatmentD2 = []
  treatmentD3 = []
  let groups = [treatmentP,treatmentD1,treatmentD2,treatmentD3]
  let t = {P: 0, D1: 1, D2: 2, D3: 3}

  // Find even group allocation and cases where there are extra participants
  // No group should have a difference greater than 1.
  let evenGroupAllocation = Math.floor(dataCopy.length / groups.length)
  let remainder = dataCopy.length % groups.length
  let remainderCount = 0
  let loopCount = 0

  while (dataCopy.length > 0) {
    //Gets random index of participant
    let randomspliced = randomFromLength(dataCopy.length-1)

    // Checks if group is already allocated or if participant withdraw
    let part_group = dataCopy[randomspliced][4]
    let withdraw = dataCopy[randomspliced][9]
    let participantToAllocate = dataCopy.splice(randomspliced, 1)
    let allocated = false
    // If participant is already allocated to a group add him to it immediately
    if (!(part_group === "waiting..." || part_group === "") && withdraw === false) {
      groups[t[part_group]].push(participantToAllocate)
      allocated = true
      // If participant is withraw its removed from randomisation
    } else if (withdraw === true) {
      allocated = true
    }


    // Allocate participant to a group if it meets condition
    while (!allocated) {
      loopCount++
      // console.log('innerLoop', loopCount);
      let groupToAllocate = randomFromLength(groups.length-1)
      let groupLength = groups[groupToAllocate].length
      // Only allocate a participant to group to make it even or if there is a remainder participants
      if (
        (groupLength < evenGroupAllocation) ||
        (groupLength === evenGroupAllocation && remainderCount < remainder)
      ) {
        if (groupLength === evenGroupAllocation) { remainderCount++ }
        groups[groupToAllocate].push(participantToAllocate)
        allocated = true
      } else {
        continue
      }
    }
  }

  let part = []
// List Group
  groups.forEach((group ,i1) => {
    console.log('Group ' + (i1+1) ,group);
    group.forEach((participant) => {
      part.push({session: participant[0][0], group: i1+1})
    })
  })

  let request = $.ajax({
    url: randomiseUrl,
    type : 'POST',
    async: true,
    data: { csrfmiddlewaretoken: csrftoken, participants: JSON.stringify(part) },
    dataType: "json",
    success: function (data) {
      getData()
          },
    error: function () {
        console.log("error");
    }
  })
});

function matchgroup(num) {
  switch (parseInt(num)) {
    case 1:
      return "P"
    case 2:
      return "D1"
    case 3:
      return "D2"
    case 4:
      return "D3"
    default:

  }
}

var sum_grade = [0,0,0,0,0]
var sum_payment = [0,0,0,0,0]
var average_grade = [0,0,0,0,0]
var average_payment = [0,0,0,0,0]
var grade_count = [0,0,0,0,0]

  function cleanData() {
    tableRowsCleaned = [];
    sum_grade = [0,0,0,0,0]
    sum_payment = [0,0,0,0,0]
    average_grade = [0,0,0,0,0]
    average_payment = [0,0,0,0,0]
    grade_count = [0,0,0,0,0]
    participantCount = { P: 0, D1: 0, D2: 0, D3: 0 }

    if (sortBy) {
      if (sortDec) {
        tableRows.sort((a,b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
      } else {
        tableRows.sort((a,b) => (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0));
      }
    }

    let assigned = 0

    tableRows.forEach(row => {
      if (row.group) {
        assigned++
      }
      participantCount[matchgroup(row.group)] += 1
      tableRowsCleaned.push([row.session,row.computer, row.instructions, row.consent, row.group ? matchgroup(row.group) : "waiting...", row.content === 0 ? "" : (row.quiz).toFixed(2), row.quiz === 0 ? "" : (row.quiz).toFixed(2), row.survey, row.payment === 0 ? "" : row.payment, row.receipt ? row.receipt: ""])

      if (row.group && parseFloat(row.quiz) > 0) {
        grade_count[0] += 1
        grade_count[row.group] += 1
        sum_grade[0] += row.quiz
        sum_grade[row.group] += row.quiz
        sum_payment[0] += row.payment
        sum_payment[row.group] += row.payment
      }
    })

    for (var i = 0; i <= 4; i++) {
      average_payment[i] = sum_payment[i]/grade_count[i] ? sum_payment[i]/grade_count[i] : 0
      average_grade[i] = sum_grade[i]/grade_count[i] ? sum_grade[i]/grade_count[i] : 0
    }

    // console.log(sum_grade);
    // console.log(average_grade);
    // console.log(grade_count);

    if (assigned === tableRows.length) {
      document.getElementById('group_assigned').innerHTML = "All Assigned"
      document.getElementById('group_assigned').classList.add('status_yes')
    } else {
      document.getElementById('group_assigned').innerHTML = "Not Assigned"
      document.getElementById('group_assigned').classList.remove('status_yes')
    }

  }

  function sortTable(key) {
    if (sortBy === key) {
      sortBy = key
      sortDec = !sortDec
      if (sortDec) { sortBy = null; }
    } else {
      sortDec = true;
      sortBy = key
    }
    tableCreate()
  }



  function tableCreate(){
      if (tableRows.length > 0) {
        cleanData()
        document.getElementById('group-p').innerHTML = participantCount.P
        document.getElementById('group-d1').innerHTML = participantCount.D1
        document.getElementById('group-d2').innerHTML = participantCount.D2
        document.getElementById('group-d3').innerHTML = participantCount.D3
        document.getElementById('no-participants').style.display = "none"
        tableData = tableRowsCleaned
      } else {
        document.getElementById('no-participants').style.display = "block"
      }
      // Checks if there is new data
      function compareTables() {
        let same = true
        if (tableData.length !== tableRows_copy.length) {
          same = false
        } else {
          tableData.forEach((participant,index) => {
            participant.forEach((item,i) => {
              if (tableData[index][i] !== tableRows_copy[index][i]) {
                same = false
              }
            })
          })
          return same
        }
     }
      let sametable = compareTables()
      // If there is no new data then dont create the table again
      if (sametable) return
      console.log('last new data was at ' + (new Date()).toLocaleTimeString());
      tableRows_copy = tableData
      tbl  = document.getElementById('panel-table');
      tbl.innerHTML = ""
      // create participant table
      for(var i = -1; i < tableData.length; i++){
          var tr = tbl.insertRow();
            if (i === -1) {
              tr.className= "row-header";
            }
          for(var j = 0; j < tableHeader.length; j++){
            let td = tr.insertCell();
            let content = 'cell';
            if (i === -1) {
              content = tableHeader[j]
              td.className= "table-header";
              td.id= tableHeaderId[j]
              td.onclick = function() { sortTable(td.id) }
            } else {
              if ((i)%2===0) {
                tr.className= "row-even";
              }
              content = tableData[i][j]
              td.className = 'table-cell';
              if (content === true ) { td.className = "table-cell-check"; }
              else if (content === "waiting...") { td.className = "table-cell-waiting"; }
              else if (content === "P" || content === "D1" || content === "D2" || content === "D3") { td.className = "table-cell-group"; }
              else if (content === false) {content = ""; }
            }
            td.appendChild(document.createTextNode(content));

            if (td.innerHTML === "true") { td.innerHTML = "&#10004"; }
            if (td.id === sortBy) {
              td.className="table-header-sorted"
            if (sortDec) {td.innerHTML += " &darr;";} else {td.innerHTML += " &uarr;"}
            }

          }
      }

      // Create summary data
      tb2 = document.getElementById('panel-summary-table');
      tb2.innerHTML = ""
      let tr2 = tb2.insertRow();
      tr2.className= "row-header";
      ["","Participant Submissions","Average Grade","Average Payment","Total Payment"].forEach((item,index) => {
        let td2 = tr2.insertCell();
        td2.className= "table-header";
        content = item
        td2.appendChild(document.createTextNode(content));
      })
      let title = ["Total","P","D1","D2","D3"]
      for (var i = 0; i < 5; i++) {
        tr2 = tb2.insertRow();
        if ((i)%2===0) {
          tr2.className= "row-even";
        }
        [title[i],grade_count[i],average_grade[i].toFixed(2),average_payment[i].toFixed(2),sum_payment[i].toFixed(2)].forEach((item,index) => {
          let td2 = tr2.insertCell();
          if (index === 0) {
            td2.className= "table-header";
          } else {
            td2.className = 'table-cell';
          }
          content = (item === 0 || item === "0.00") ? "" : item
          td2.appendChild(document.createTextNode(content));
        })
      }


      // for(var j = 0; j < tableHeader.length; j++){
      //   let td = tr.insertCell();
      //   let content = 'cell';
      //   if (i === -1) {
      //     content = tableHeader[j]
      //     td.className= "table-header";
      //     td.id= tableHeaderId[j]
      //     td.onclick = function() { sortTable(td.id) }
      //   } else {
      //     content = tableData[i][j]
      //     td.className = 'table-cell';
      //     if (content === true ) { td.className = "table-cell-check"; }
      //     else if (content === "waiting...") { td.className = "table-cell-waiting"; }
      //     else if (content === "P" || content === "D1" || content === "D2" || content === "D3") { td.className = "table-cell-group"; }
      //     else if (content === false) {content = ""; }
      //   }
      //   td.appendChild(document.createTextNode(content));
      //
      //   if (td.innerHTML === "true") { td.innerHTML = "&#10004"; }
      //   if (td.id === sortBy) {
      //     td.className="table-header-sorted"
      //   if (sortDec) {td.innerHTML += " &darr;";} else {td.innerHTML += " &uarr;"}
      //   }
      //
      // }
  }
  tableCreate();
})

function surveyTable(survey_data){
    tb2 = document.getElementById('panel-survey-table');
    tb2.innerHTML = ""
    let tr2 = tb2.insertRow();
    tr2.className= "row-header";
    for (var i = 0; i <= 19; i++) {
      if (i==0) {
        content = "Comp #"
      } else {
        content = "s" + String(i)
      }
      let td2 = tr2.insertCell();
      td2.className= "table-header";
      td2.setAttribute('id','s'+String(i))
      td2.appendChild(document.createTextNode(content));
    }
    for (var i = 0; i < survey_data.length; i++) {
      tr2 = tb2.insertRow();
      if ((i)%2===0) {
        tr2.className= "row-even";
      }
      for (var j = 0; j <= 19; j++) {
        if (j == 0) {
          if (survey_data[i]["computer"]) {
            content = survey_data[i]["computer"]
          } else {
            content = ""
          }
        } else {
          content = survey_data[i]['s'+String(j)]
        }
        let td2 = tr2.insertCell();
        td2.className = 'table-cell';
        td2.appendChild(document.createTextNode(content));
      }
    }
    var survey_tooltips = [
      {id: "#s1" , title: "1. What is the most recent degree that you are studying or have completed? (Full Title)" },
      {id: "#s2" , title: "2. What year of university study are you in? (Only number)" },
      {id: "#s3" , title: "3. What is your gender?" },
      {id: "#s4" , title: "4. What is your age? (Only number)" },
      {id: "#s5" , title: "5. Please specify your ethnicity" },
      {id: "#s6" , title: "6. If you have studied economics before, at what level?" },
      {id: "#s7" , title: "7. Approximately how many courses in economics have you taken? (Only number)" },
      {id: "#s8" , title: "8. How do you rank you knowledge in economics?" },
      {id: "#s9" , title: "9. The content improved my economic understanding" },
      {id: "#s10" , title: "10. I would like to learn more courses (any topic) the way I learned this topic" },
      {id: "#s11" , title: "11. I would be willing to learn more about economics" },
      {id: "#s12" , title: "12. How well do you believe you did in the quiz? (Write a score from 0% to 100%)" },
      {id: "#s13" , title: "13. I would recommend this content to a friend not studying economics (0 to 10. 0 - Not recommend at all, 10 - Recommend very highly)" },
      {id: "#s14" , title: "14. I tried hard to understand the content that was presented to me (0 to 10)" },
      {id: "#s15" , title: "15. I enjoyed the time I spent learning this topic (0 to 10)" },
      {id: "#s16" , title: "16. The material we covered is interesting (0 to 10)" },
      {id: "#s17" , title: "17. It was hard to stay focused the whole time (0 to 10)" },
      {id: "#s18" , title: "18. Learning this topic was not fun (0 to 10)" },
      {id: "#s19" , title: "19. I couldn't wait for the content section to be finished (0 to 10)" },

    ]
    survey_tooltips.forEach((tooltip) => {
      new Tooltip(document.querySelector(tooltip.id), {
        placement: 'right',
        title: tooltip.title,
        template: '<div class="tooltip-admin" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
      });
    })
}


var tooltips = [
  {id: "#r_instructions" , title: "Open Researcher Guide" },
  {id: "#randomise" , title: "Assign Randomised Treatments to Unalocated Participants" },
  {id: "#allow-content" , title: "Unlock Access to Content" },
  {id: "#action_countdown" , title: "Start 20 minute counter" },
  {id: "#allow-quiz" , title: "Unlock Access To Quiz" },

]
tooltips.forEach((tooltip) => {
  new Tooltip(document.querySelector(tooltip.id), {
    placement: 'right',
    title: tooltip.title,
    template: '<div class="tooltip-admin" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  });
})
