var employeename=document.getElementById('employeename');
var employeeurl=document.getElementById('employeeurl');
var addbutton=document.getElementById('submitbtn');
var deletebtn=document.getElementById('deletebtn');
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
addbutton.addEventListener('click',function(){
    addemployee();  
})
employeename.addEventListener('input',function(){
    validation(this);
})
employeeurl.addEventListener('input',function(){
    validation(this);
})
var allemployee;
if(localStorage.getItem('emp')==null){
    allemployee=[];
  }
  else{
    allemployee=JSON.parse(localStorage.getItem('emp'));
     display();
  }


function addemployee(){
    if (check() && validation(employeename) && validation(employeeurl)) {
    var employee={
        name: employeename.value,
        url:employeeurl.value,
    }
    console.log(employee);
    allemployee.push(employee);
    localStorage.setItem('emp',JSON.stringify(allemployee));
     display();
    clear();
 }
 else{
    myModal.show();
 }
  
    
}
function clear(){
    employeename.value='';
    employeeurl.value='';
}
 function display(){
    var cartona='';
    var index=0;
    for(var i=0;i<allemployee.length;i++){
        cartona+=`  <tr>
                        <td>${++index}</td>
                        <td>${allemployee[i].name}</td>
                        <td><a class=" btn  text-light btn-visit " onclick="style(this,event)" href="${allemployee[i].url}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>visit</a></td>
                        <td><button onclick="deleteall(${i})" id="deletebtn" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can pe-2"></i>delete</button></td>
                    </tr>`
    }
    document.getElementById('demo').innerHTML=cartona;
  
 }
 function deleteall(term){
    
allemployee.splice(term,1)
localStorage.setItem('emp',JSON.stringify(allemployee));
display();
 }
function validation(elem){
var regex={
    employeename:/[a-z]{3,}/,
    employeeurl:/^http(s)?:\/\/(www\.)?[a-zA-Z0-9@&:%._\+#=-]{2,}\.[a-z]{2,}/,
    
}
if(regex[elem.id].test(elem.value)){
elem.classList.add('is-valid');
elem.classList.remove('is-invalid');
return true;

}
else{
    elem.classList.add('is-invalid');
 elem.classList.remove('is-valid');
 return false;
}

}
function check(){
    if(employeename.value==null||employeeurl==null){
        return false;
    }
    else{
        return true;
    }
}


