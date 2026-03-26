const API = "http://localhost:5000/projects";

function loadProjects(){

fetch(API)
.then(res => res.json())
.then(data => {

const list = document.getElementById("projectList");
list.innerHTML = "";

data.forEach(project => {

const div = document.createElement("div");

div.innerHTML = `
<h3>${project.title}</h3>
<p>${project.description}</p>
<a href="${project.github}" target="_blank">GitHub</a>
`;

list.appendChild(div);

});

});

}

function addProject(){

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const github = document.getElementById("github").value;

fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title,
description,
github
})
})
.then(res=>res.json())
.then(()=>loadProjects());

}

loadProjects();