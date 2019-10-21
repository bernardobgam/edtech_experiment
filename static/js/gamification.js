function levelprogress(x){
  // document.getElementById('progress').style.transitionDuration = 0
  // document.getElementById('progress').style.width = 0
  let progress = document.getElementById('progress')
    switch (progress.style.width) {
      case "":
      case "0px":
      progress.style.transition = "width 2s"
      progress.style.borderRight = "2px solid #0e0e4e82"
      progress.style.boxShadow = "0 0 2px 2px #0000009c"
      progress.style.width = "200px"
      document.getElementById('levelup-button').style.display = "inline-block"
      break;
      case "200px":
      progress.style.transition = "width 0s"
      progress.style.width = "0px"
      progress.style.borderRight = "none"
      progress.style.boxShadow = "none"
      break;
      default:
      progress.style.transition = "width 0s"
      progress.style.width = "0px"
      progress.style.borderRight = "none"
      progress.style.boxShadow = "none"
    }
}

function levelup() {
  let element = document.getElementById('level')
  value = parseInt(element.innerHTML)
  element.innerHTML = value + 1
  document.getElementById('levelup-button').style.display = "none";
  document.getElementById('progress').style.transition = "width 0s"
  document.getElementById('progress').style.width = "0px"
  document.getElementById('progress').style.borderRight = "none"
  document.getElementById('progress').style.boxShadow = "none"
  switch (element.innerHTML) {
    case "1":
    document.getElementById('gq-grass').style.display = "block";
    document.getElementById('gq-tree').style.display = "block";
    document.getElementById('gq-house').style.display = "block";
      break;
    case "2":
    document.getElementById('gq-tree').style.display = "block";
    document.getElementById('gq-vehicle').style.display = "block";
      break;
    case "3":
    document.getElementById('gq-tree').style.display = "block";
    document.getElementById('gq-structure').style.display = "block";
      break;
    case "4":
    document.getElementById('gq-tree').style.display = "block";
    document.getElementById('gq-bank-prison').style.display = "block";
      break;
    case "5":
    document.getElementById('gq-tree').style.display = "block";
    document.getElementById('gq-structure').style.display = "block";
      break;
    default:

  }
}



function randombadge() { // min and max included
  let arr = []
  for (var i = 1; i <= 3; i++) {
    let b = document.getElementById('badge'+i)
    if (b.style.display === "none") {
      arr.push(i)
    }
  }
  return arr[Math.floor(Math.random()*arr.length)];
}

function earnbadge(){
  let n = randombadge();
  for (var i = 1; i <= 3; i++) {
    let element = document.getElementById('badge'+i+'-i')
    let element2 = document.getElementById('badge'+i)
    if (i === n) {
      element2.style.display = "inline-block"
    }
    element.style.animation = 'none'
    void element.offsetWidth;
    element.style.animationDuration = '2s'
    element.style.animationTimingFunction = 'ease'
    element.style.animationName = 'spin'
    // void element2.offsetWidth;
    // element2.style.animationDuration = '2s'
    // element2.style.animationTimingFunction = 'ease'
    // element2.style.animationName = 'grow'
    // element2.style.animation = null;
  }
}

function addPoints(x, id) {
  let progress = document.getElementById('progress')
    let str_width = progress.style.width
    console.log(str_width === "200px");
    if (str_width === "200px") {
      levelup()
      console.log('already full');
    }
    if (str_width === "") {width = 0} else {
      width = parseInt(str_width.slice(0,str_width.length-2))
    }
    width += x
    console.log(str_width,str_width);
    console.log(width);
    if (width >= 200) {
      width = 200;
      document.getElementById('levelup-button').style.display = "inline-block"
    }
    if (width > 0) {
      progress.style.transition = "width 1s"
      progress.style.borderRight = "2px solid #0e0e4e82"
      progress.style.boxShadow = "0 0 2px 2px #0000009c"
    } else if (width === 0){
      progress.style.transition = "width 0s"
      progress.style.borderRight = "none"
      progress.style.boxShadow = "none"
    }
      progress.style.width = String(width) +'px'
      document.getElementById(id).style.display = "none"
      document.getElementById("badge-click").style.display = "none"
}

// function create(htmlStr) {
//     var frag = document.createDocumentFragment(),
//         temp = document.createElement('div');
//     temp.innerHTML = htmlStr;
//     while (temp.firstChild) {
//         frag.appendChild(temp.firstChild);
//     }
//     return frag;
// }
//
// var fragment = create('<div>Hello!</div><p>...</p>');
// // You can use native DOM methods to insert the fragment:
function addBuilding(location, style, id) {
  let img = document.createElement('img');
  img.setAttribute('src', location);
  img.setAttribute('class', style);
  let city = document.getElementById('city');
  // city.insertBefore(img, city.childNodes[0]);
  city.appendChild(img);
  document.getElementById(id).style.display = "none";
}

function addGrass(location, style, id) {
  let img = document.createElement('img');
  img.setAttribute('src', location);
  img.setAttribute('class', style);
  let city = document.getElementById('city');
  city.parentNode.insertBefore(img, city.nextSibling);
  document.getElementById(id).style.display = "none";
}

function addTree(location,style, id) {
  let img = document.createElement('img');
  location = location.replace(1,Math.floor(Math.random() * 5) + 1)
  img.setAttribute('src', location);
  // console.log(location);
  console.log(tree);
  img.setAttribute('class', style);
  let city = document.getElementById('city');
  city.appendChild(img);
  document.getElementById(id).style.display = "none";
}

function showQuestions(section,item,length) {
    for (var i = 1; i <= length; i++) {
      if (document.getElementById("gami-"+String(section)+'-'+String(i)).classList.contains("city-show")) {
        document.getElementById("gami-"+String(section)+'-'+String(i)).classList.remove("city-show")
      }
    }
    document.getElementById("gami-"+String(section)+'-'+String(item)).classList.add("city-show")
}
