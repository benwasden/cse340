'use strict'

let typeList = document.querySelector("#accountList");
typeList.addEventListener("change", function () {
    let account_id = typeList.value;
    // console.log(`account_id is ${account_id}`);
    let accountIdURL = "/account/getUsers/"+account_id;
    fetch(accountIdURL).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw Error("Network response was not OK");
    }).then(function (data) {
        console.log(data);
        buildUserList(data);
    }).catch(function (error) {
        console.log('There was a problem: ', error.message);
    })
})

// Build user accounts into HTML table components and inject into DOM 
function buildUserList(data) { 
 let userDisplay = document.getElementById("userDisplay"); 
 // Set up the table labels 
 let dataTable = '<thead>'; 
 dataTable += '<tr><th>User Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>'; 
 dataTable += '</thead>'; 
 // Set up the table body 
 dataTable += '<tbody>'; 
 // Iterate over all users in the array and put each in a row 
 data.forEach(function (element) { 
  console.log(element.account_id + ", " + element.account_email); 
  dataTable += `<tr><td>${element.account_firstname} ${element.account_lastname}</td>`; 
  dataTable += `<td><a href='/account/edit/${element.account_id}' title='Click to update'>Modify</a></td>`; 
  dataTable += `<td><a href='/account/delete/${element.account_id}' title='Click to delete'>Delete</a></td></tr>`; 
 }) 
 dataTable += '</tbody>'; 
 // Display the contents in the Inventory Management view 
 userDisplay.innerHTML = dataTable; 
}