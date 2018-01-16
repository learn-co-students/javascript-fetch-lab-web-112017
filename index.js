const baseApi = 'https://api.github.com/'
const userName = ''
const fork = `${userName}/javascript-fetch-lab`

function getIssues() {
  fetch(`${baseApi}repos/${fork}/issues`, {
    method: 'GET',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => {
    console.log(json);
    showIssues(json);
  })
}

function showIssues(json) {
  let issueList = document.createElement('ul')
  let array = json
  array.forEach (function (issue) {
    let title = issue.title
    let body = issue.body
    let url = issue.html_url
    let issueItem = document.createElement('li')
    issueItem.innerHTML = `Title: <a href="${url}">${title}</a> | Body: ${body}`
    issueList.appendChild(issueItem)
  })
    document.getElementById('issues').appendChild(issueList)
}

function createIssue() {
  let issueTitle = document.getElementById('title').value
  let issueBody = document.getElementById('body').value
  let issue = { title: issueTitle, body: issueBody }
  fetch(`${baseApi}repos/${fork}/issues`, {
    method: 'post',
    headers: {
      Authorization: `token ${getToken()}`
    },
    body: JSON.stringify(issue)
  }).then(res => getIssues())
}

function showResults(json) {
  let newHeader = document.createElement("h3")
   newHeader.innerHTML = `Forked Successfully!<a href="${json.html_url}">${json.html_url}</a>`
  document.getElementById('results').appendChild(newHeader)
}

function forkRepo() {
  let repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch(`${baseApi}repos/${repo}/forks`, {
    method: 'post',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => { console.log(json)
  let link = json.html_url
  console.log(link)
  showResults(json);
  })
}

function getToken() {
  const token = '';
  return token
}
