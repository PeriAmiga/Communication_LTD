function updateTable(table){
    const divTable = document.querySelector(".table");
    if(divTable.firstChild != null)
    {
        divTable.removeChild(divTable.firstChild);
    }
    const divForm = document.querySelector(".form");
    if(divForm.firstChild != null)
    {
        divForm.removeChild(divForm.firstChild);
    }
    divTable.appendChild(table);
}

function updateForm(form){
    const divTable = document.querySelector(".table");
    if(divTable.firstChild != null)
    {
        divTable.removeChild(divTable.firstChild);
    }
    const divForm = document.querySelector(".form");
    if(divForm.firstChild != null)
    {
        divForm.removeChild(divForm.firstChild);
    }
    divForm.appendChild(form);
}

function clientsDetails(){
    const table = document.createElement('table');
    const header = document.createElement('tr');
    const col1 = document.createElement("th");
    col1.append("ID");
    const col2 = document.createElement("th");
    col2.append("First Name");
    const col3 = document.createElement("th");
    col3.append("Last Name");
    const col4 = document.createElement("th");
    col4.append("Phone");
    const col5 = document.createElement("th");
    col5.append("Email");
    const col6 = document.createElement("th");
    col6.append("City");
    const col7 = document.createElement("th");
    col7.append("Address");
    header.append(col1);
    header.append(col2);
    header.append(col3);
    header.append(col4);
    header.append(col5);
    header.append(col6);
    header.append(col7);
    table.append(header);
    updateTable(table);
}

function addNewClient(){
    const form = document.createElement('form');
    form.setAttribute("id", "newClientPanel")
    const body = document.createElement('div');
    const headline = document.createElement("h1");
    headline.setAttribute("id", "litheader2");
    headline.append("Create a New Client");

    const inputFirstName = document.createElement("input");
    inputFirstName.setAttribute("id", "inputFirstname");
    inputFirstName.setAttribute("type", "text");
    inputFirstName.setAttribute("required", "true");
    inputFirstName.setAttribute("placeholder", "First Name");

    const inputLastName = document.createElement("input");
    inputLastName.setAttribute("id", "inputLastname");
    inputLastName.setAttribute("type", "text");
    inputLastName.setAttribute("required", "true");
    inputLastName.setAttribute("placeholder", "Last Name");

    const inputPhone = document.createElement("input");
    inputPhone.setAttribute("id", "inputPhone");
    inputPhone.setAttribute("type", "text");
    inputPhone.setAttribute("required", "true");
    inputPhone.setAttribute("placeholder", "Phone");

    const inputEmail = document.createElement("input");
    inputEmail.setAttribute("id", "inputEmail");
    inputEmail.setAttribute("type", "text");
    inputEmail.setAttribute("required", "true");
    inputEmail.setAttribute("placeholder", "Email");

    const inputCity = document.createElement("input");
    inputCity.setAttribute("id", "inputCity");
    inputCity.setAttribute("type", "text");
    inputCity.setAttribute("required", "true");
    inputCity.setAttribute("placeholder", "City");

    const inputAddress = document.createElement("input");
    inputAddress.setAttribute("id", "inputAddress");
    inputAddress.setAttribute("type", "text");
    inputAddress.setAttribute("required", "true");
    inputAddress.setAttribute("placeholder", "Address");

    const inputSubmit = document.createElement("input");
    inputSubmit.setAttribute("id", "inputSubmit");
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("required", "true");
    inputSubmit.setAttribute("value", "Add New Client")

    body.append(headline);
    body.append(inputFirstName);
    body.append(inputLastName);
    body.append(inputPhone);
    body.append(inputEmail);
    body.append(inputCity);
    body.append(inputAddress);
    body.append(inputSubmit);
    form.append(body);
    updateForm(form);
}

// const logout = async() => {
//     await fetch('/logout', {
//         method: 'post',
//     })
//         .then((response) => response.text())
//         .then((result) => {
//             location.reload();
//         })
//         .catch((error) => console.error($`ERROR logout: ${error}`))
// }

document.querySelector("#clientsDetails").addEventListener("click", clientsDetails);
document.querySelector("#newClient").addEventListener("click", addNewClient);
//document.querySelector("#logout").addEventListener("click", logout);