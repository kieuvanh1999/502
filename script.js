function validateForm(){
    var name = document.getElementById("Name").value
    var age = document.getElementById("Age").value
    var address = document.getElementById("Address").value
    var email = document.getElementById("Email").value

    if (name == ""){
        alert("Name is not required !");
        return false;
    }
    if (age == ""){
        alert("Age is not required !");
        return false;
    }else if(name <= 0) {
        alert("Age must not be zero or less zero !")
    }
    if (address == ""){
        alert("Address is not required !");
        return false;
    }
    if (email == ""){
        alert("email is not required !");
        return false;
    }else if(!email.includes("@")){
        alert("invalid email address !");
        return false;
    }
    return true;
}

function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    var html = "";
    peopleList.forEach(function(element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData('+index+')" class="btn btn-danger">Delete</button> <button onclick="UpdateData('+index+')" class="btn btn-primary">Change</button>';
        html += "</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData()

function AddData(){
    if(validateForm() == true){
        var name = document.getElementById("Name").value;
        var age = document.getElementById("Age").value;
        var address = document.getElementById("Address").value;
        var email = document.getElementById("Email").value;

        var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email,
        })

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        document.getElementById("Name").value = "";
        document.getElementById("Age").value = "";
        document.getElementById("Address").value = "";
        document.getElementById("Email").value = "";
    }
}

function deleteData(index){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function UpdateData(index){
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("Name").value = peopleList[index].name;
    document.getElementById("Age").value = peopleList[index].age;
    document.getElementById("Address").value = peopleList[index].address;
    document.getElementById("Email").value = peopleList[index].email;

    document.querySelector('#Update').onclick = function(){
        if(validateForm() == true){
            peopleList[index].name = document.getElementById("Name").value;
            peopleList[index].age = document.getElementById("Age").value;
            peopleList[index].address = document.getElementById("Address").value;
            peopleList[index].email = document.getElementById("Email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("Name").value = "";
            document.getElementById("Age").value = "";
            document.getElementById("Address").value = "";
            document.getElementById("Email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
        
    }
}