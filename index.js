
function getIssues() {
  const repo = 'ddbrennan/javascript-fetch-lab'
  fetch (`https://api.github.com/repos/${repo}/issues`, {
    method: "get",
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showIssues(json));
}

function showIssues(json) {
  document.getElementById("results").innerHTML = ""
  for (const issue of json) {
    issueDiv = document.createElement("div")
    h2 = document.createElement("h2")
    p = document.createElement("p")
    h2.innerText = issue.title
    p.innerText = issue.body
    issueDiv.append(h2)
    issueDiv.append(document.createElement("br"))
    issueDiv.append(p)
    issueDiv.append(document.createElement("br"))
    document.getElementById("results").append(issueDiv)
  }
}

function createIssue() {
  const repo = 'ddbrennan/javascript-fetch-lab'
  issueBody = JSON.stringify({title: (document.querySelectorAll("input")[0].value), body: (document.querySelectorAll("input")[1].value)})
  fetch (`https://api.github.com/repos/${repo}/issues`, {
    method: "post",
    headers: {
      Authorization: `token ${getToken()}`
    },
    body: issueBody
  }).then(getIssues());
}

function showResults(json) {
  link = document.createElement("a")
  link.href = json.html_url
  link.target = "_blank"
  link.innerText = json.html_url
  link.append(document.createElement("br"))
  document.getElementById("results").append(link)
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch(`https://api.github.com/repos/${repo}/forks`, {
    method: "post",
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(json => showResults(json));
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
