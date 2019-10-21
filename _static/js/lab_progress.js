
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

function lab_progress(url, seshid, stage) {
  var request = $.ajax({
    url: url,
    type : 'PUT',
    async: true,
    data: {session: seshid, stage:stage },
    dataType: "json",
    success: function (data) {
      console.log('success');
    },
    error: function (error) {
      console.log("error",error);
    }
  })
}

// If the participant already consented then consent form
function lab_group() {
  var request = $.ajax({
    url: url_group,
    type : 'GET',
    async: true,
    data: {session: seshid, csrfmiddlewaretoken: csrftoken},
  })
  request
  .done(function(data){
    document.getElementById("group").innerHTML = data.group
  })
  .fail(function(error){
    console.log(error);
  })
}

function lab_access(access) {
  var request = $.ajax({
    url: url_access,
    type : 'GET',
    async: true,
    data: {code: code_id, access: access, csrfmiddlewaretoken: csrftoken},
  })
  request
  .done(function(data){
    console.log('access', data);
    if (access === "content") {
      document.getElementById("content_access").innerHTML = data.content_access
    } else if (access === "quiz") {
      document.getElementById("quiz_access").innerHTML = data.quiz_access
    }
  })
  .fail(function(error){
    console.log(error);
  })
}



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

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
