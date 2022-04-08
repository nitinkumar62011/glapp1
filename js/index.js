async function getData(){
    let studentDetais = document.getElementById("studentDetails");
    let myData = "";
    console.log("JSON Data");
    await fetch("http://localhost:3000/Students")
    .then(res => res.json())
    .then(data => {
        // Object.keys returns an array of keys

        let dataLength = Object.keys(data).length;
       
        for(i=0;i<dataLength;i++){
            myData += `<tr><td>${data[i].name}</td>
            <td>${data[i].class}</td>
            <td>${data[i].score}</td>
            <td><button type="button" class="btn btn-outline-success" onClick = deleteStudent(${data[i].id})>Delete</button></td>
            <td><button type="button" class="btn btn-outline-success" onClick = editStudent(${data[i].id})>Edit</button></td></tr>`
            
        }
     });
    let tHeader = `<tr><th>User Name</th>
                    <th>Class</th>
                    <th>Score</th><tr>`;
    studentDetais.innerHTML = `<table>${tHeader} ${myData}</table>`
}
function deleteStudent(id){
    console.log(` id = ${id}`);
    fetch(`http://localhost:3000/Students/${id}`,{
        method:'DELETE'
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((error) => console.log(error))

}
async function editStudent(id){
    let editArea = document.getElementById("DataInput");
    await fetch(`http://localhost:3000/Students/${id}`)
    .then(res => res.json())
    .then(data => {
        editArea.innerHTML = `<h1>Edit</h1>
        <input id="name" value=${data.name}>
                              <input id="class" value=${data.class}>
                              <input id="score" value=${data.score}>
                              <button type="button" class="btn btn-outline-success" onClick = updateStudent(${data.id})>Update</button>
                            `
    })
    .catch((error) => console.log(error))

}
function updateStudent(id){
    let name = document.getElementById("name").value;
    let myClass = document.getElementById("class").value;
    let score = document.getElementById("score").value;
    let student = {
        "name":name,
        "class":myClass,
        "score":score
    }
    fetch(`http://localhost:3000/Students/${id}`,{
        method:"PATCH",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify(student)

    })
    .then(res =>res.json())
    .then(data => console.log(data))
    console.log("id from update = ",id);
}
function addStudent(){
    let name = document.getElementById("name").value;
    let myClass = document.getElementById("myClass").value;
    let score = document.getElementById("score").value;

    let student = {
        "name":name,
        "class":myClass,
        "score":score
    }
    
    fetch("http://localhost:3000/Students",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((error) => console.log(error))
}
getData();