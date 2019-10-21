


var section = [
  {
    question: "1. What is the most recent degree that you are studying or have completed? (Full Title)",
    answers: [],
    answer_type: "input",
    notes: ["If not studying any degree type N/A"],
    section: 1
  },
  {
    question: "2. What year of university study are you in? (Only number)",
    answers: [],
    answer_type: "input",
    notes: ["Input 0 if you are not studying.","If you already graduated input the amout of years you studied previously."],
    section: 1,
    num_validation: [0,100]
  },
  {
    question: "3. What is your gender?",
    answers: ["Female","Male","Other","Prefer not to say"],
    answer_type: "single",
    notes: [],
    section: 1
  },
  {
    question: "4. What is your age? (Only number)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 1,
    num_validation: [0,120]
  },
  {
    question: "5. Please specify your ethnicity",
    answers: ["White","Hispanic or Latino","Black or African American","East Asia","South Asia","Middle East","Native American or American Indian","Other"],
    answer_type: "multiple",
    notes: [],
    section: 1
  },
  {
    question: "6. If you have studied economics before, at what level?",
    answers: ["High School","University - Introductory","University - Intermediate","University - Advanced","I haven't studied economics before"],
    answer_type: "single",
    notes: [],
    section: 1
  },
  {
    question: "7. Approximately how many courses in economics have you taken? (Only number)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 1,
    num_validation: [0,100]
  },
  {
    question: "8. How do you rank you knowledge in economics?",
    answers: ["Not at all good","Not so good","Somewhat good","Very good","Extremely good"],
    answer_type: "single",
    notes: [],
    section: 1
  },
  {
    question: "9. The content improved my economic understanding",
    answers: ["Strongly Disagree","Disagree","Neither agree nor disagree","Agree","Strongly Agree"],
    answer_type: "single",
    notes: [],
    section: 2
  },
  {
    question: "10. I would like to learn more courses (any topic) the way I learned this topic",
    answers: ["Strongly Disagree","Disagree","Neither agree nor disagree","Agree","Strongly Agree"],
    answer_type: "single",
    notes: [],
    section: 2
  },
  {
    question: "11. I would be willing to learn more about economics",
    answers: ["Not at all willing","Slightly willing","Moderately willing","Very willing","Extremely willing"],
    answer_type: "single",
    notes: [],
    section: 2
  },
  {
    question: "12. How well do you believe you did in the quiz? (Write a score from 0% to 100%)",
    answers: [],
    answer_type: "input",
    notes: ["Write only numbers (without the % sign)"],
    section: 2,
    num_validation: [0,100]
  },
  {
    question: "13. I would recommend this content to a friend not studying economics (0 to 10. 0 - Not recommend at all, 10 - Recommend very highly)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 2,
    num_validation: [0,10]
  },
  {
    question: "14. I tried hard to understand the content that was presented to me (0 to 10)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 3,
    num_validation: [0,10]
  },
  {
    question: "15. I enjoyed the time I spent learning this topic (0 to 10)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 3,
    num_validation: [0,10]
  },
  {
    question: "16. The material we covered is interesting (0 to 10)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 3,
    num_validation: [0,10]
  },
  {
    question: "17. It was hard to stay focused the whole time (0 to 10)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 3,
    num_validation: [0,10]
  },
  {
    question: "18. Learning this topic was not fun (0 to 10)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 3,
    num_validation: [0,10]
  },
  {
    question: "19. I couldn't wait for the content section to be finished (0 to 10)",
    answers: [],
    answer_type: "input",
    notes: [],
    section: 3,
    num_validation: [0,10]
  },
]


section.forEach((question, index) => {
  // Set Question Container
  let d_container = document.createElement('div')
  d_container.setAttribute('class', "question-container");
  // Set Question Text
  let p_content = document.createElement('p')
  p_content.setAttribute('class', "content-q");
  let sp = document.createElement('span')
  sp.appendChild(document.createTextNode(question.question));
  p_content.appendChild(sp)
  // Set Question Notes if they exist
  for (var i = 0; i < question.notes.length; i++) {
    let s = document.createElement('div')
    s.setAttribute('class', "survey_note");
    s.appendChild(document.createTextNode(question.notes[i]))
    p_content.appendChild(s)
  }
  d_container.appendChild(p_content)
  // Set validation num
  if (question.num_validation) {
    let d_val = document.createElement('div')
    d_val.setAttribute('class', "survey_empty");
    d_val.style.display = "none"
    text = "You must enter a number between " + String(question.num_validation[0]) + " and " + String(question.num_validation[1]) + ". No decimals or negative numbers allowed."
    d_val.appendChild(document.createTextNode(text))
    d_val.setAttribute('id', "validation"+String(index+1));
    d_container.appendChild(d_val)
  }

  // // Set Question Input
  let d_i = document.createElement('div')
  d_i.setAttribute('class', "question-input");
  if (question.answer_type === "input") {
    let inp = document.createElement('input')
    inp.setAttribute('name', "survey"+String(index+1));
    inp.setAttribute('class', "consent-input");
    if (index !== 0) {
      inp.setAttribute('type', "number");
    }
    d_i.appendChild(inp)
  } else if (question.answer_type === "single" || question.answer_type === "multiple") {
    question.answers.forEach((answer,ind) => {
      let l = document.createElement('label')
      l.setAttribute('class', "quiz-cc checkbox-container");
      let l_s = document.createElement('span')
      l_s.appendChild(document.createTextNode(answer))
      let l_i = document.createElement('input')
      if (question.answer_type === "single") {
        l_i.setAttribute('type', "radio");
      } else {
        l_i.setAttribute('type', "checkbox");
        l_i.setAttribute('id', "survey"+String(index+1)+"-"+String(ind));
      }
      l_i.setAttribute('name', "survey"+String(index+1));
      l_i.setAttribute('value', answer);
      let l_s2 = document.createElement('span')
      if (question.answer_type === "single") {
        l_s2.setAttribute('class', "quiz-radio checkmark");
      } else {
        l_s2.setAttribute('class', "quiz-checkmark checkmark");
      }
      l.appendChild(l_s)
      l.appendChild(l_i)
      l.appendChild(l_s2)
      d_i.appendChild(l)
    })
  }
  d_container.appendChild(d_i)
  document.getElementById('survey_section_'+question.section).appendChild(d_container)
})


function validateSurvey(answers, items) {
    console.log('validate survey here however you want');
    okay = true
    empty = false
    incorrect = false
    for (var i = 1; i <= section.length; i++) {
      if (answers['survey'+String(i)][0] === "" || answers['survey'+String(i)].length === 0) {
        console.log('empty');
        empty = true
      }
      if (section[i-1].num_validation) {
        ans = parseInt(answers['survey'+String(i)][0])
        console.log(String(i) + " " + String(answers['survey'+String(i)][0]) + " " + String(typeof(ans)))
        document.getElementById("validation" + String(i)).style.display = "none"
        console.log(answers['survey'+String(i)][0]);
        console.log(answers['survey'+String(i)][0] === "");
        if (ans < 0 || ans > section[i-1].num_validation[1] || isNaN(ans) ) {
          incorrect = true
          document.getElementById("validation" + String(i)).style.display = "block"
        }
      }
    }



    if (empty) {
      document.getElementById('survey_empty').style.display = "block"
      okay = false;
    } else if (incorrect) {
      document.getElementById('survey_incorrect').style.display = "block"
      okay = false;
    } else {
      document.getElementById('survey_empty').style.display = "none"
    }



    return okay
}
