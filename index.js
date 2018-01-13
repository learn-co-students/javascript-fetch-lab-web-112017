const repo = 'mattfaircloth/javascript-fetch-lab';

function getIssues() {
  const token = getToken();
  fetch(`https://api.github.com/repos/${repo}/issues`, {
     headers: {
       Authorization: `token ${token}`
     },
   }).then(res => res.json()).then(json => showIssues(json))
}

function showIssues(json) {
  console.log(json)
  const issuesDiv = document.getElementById('issues')
  let pId = 0
  json.forEach(function(issue){
    const issuesP = document.createElement('p')
    issuesP.innerHTML = `${issue['title']} <br> ${issue['body']}`
    issuesP.id = `pid:${++pId}`
    if (!document.getElementById(`${issuesP.id}`)) {
     issuesDiv.appendChild(issuesP)
   }
  })
}

function createIssue() {
  const token = getToken();
  const title = document.getElementById("title").value
   const body = document.getElementById("body").value
   const issueData = {
     title: title,
     body: body
   }
   fetch(`https://api.github.com/repos/${repo}/issues`, {
     method: 'post',
     body: JSON.stringify(issueData),
     headers: {
       Authorization: `token ${token}`
     }
   })
   getIssues()
}

function showForkedRepo(json) {
   document.getElementById('results').innerHTML = `<a href=${json.html_url}>${json.name}</a>`
}

function showResults(json) {
   const div = document.getElementById('results')
   const a = document.createElement('a')
   a.href = json["html_url"]
   a.innerHTML = json["full_name"]
   a.target = 'blank'
   div.appendChild(a)
}

function forkRepo() {
 const token = getToken();
 const repo = 'learn-co-curriculum/javascript-fetch-lab';
 fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: 'post',
    headers: {
      Authorization: `token ${token}`
   }}).then(resp => resp.json()).then(json => showForkedRepo(json))
}


function getToken() {
  return ''
}
