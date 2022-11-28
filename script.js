var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);

}

// Clear All Fields
function clearFields(){
    document.querySelector("#nom").value = "";
    document.querySelector("#marque").value = "";
    document.querySelector("#prix").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#sel").value = "";
    document.querySelectorAll('input[name=promo]:checked').value = "";

}
    const Prix = document.querySelector("#prix");

// Add data

document.querySelector("#produit-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    const Nom = document.querySelector("#nom").value;
    const Marque = document.querySelector("#marque").value;
    const PrixValue = document.querySelector("#prix").value;
    const Date = document.querySelector("#date").value;
    const Sel = document.querySelector("#sel").value;
    const Promo = document.querySelectorAll('input[name="promo"]:checked');
   
    let promoValue = [];

    Promo.forEach((x)=> {
        promoValue.push(x.value);
    });

    // validate
   
    if(Nom == "" || Marque == "" || PrixValue == "" || Date == "" || Sel == "" || promoValue.length == ""){
        showAlert("Please fill in all fields", "danger");
    }else if (Nom.length > 30){
        showAlert("Nom maximum 30", "danger");
    }else if (Marque.length > 30){
        showAlert("Marque maximum 30", "danger");
    } else if (!isnumber(PrixValue)) {
        showAlert("Prix no valid", "danger");
	}
    else{
        if(selectedRow == null){
            const list = document.querySelector("#produit-list");
            const row = document.createElement("tr");
           
            row.innerHTML = `
                <td>${Nom}</td>
                <td>${Marque}</td>
                <td>${PrixValue}</td>
                <td>${Date}</td>
                <td>${Sel}</td>
                <td>${promoValue}</td>
                <td>
                <button class="btn btn-warning btn-sm edit">Edit</button>
                <button class="btn btn-danger btn-sm delete">Delete</button>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Produit Added", "success");
        }else{
            selectedRow.children[0].textContent = Nom;
            selectedRow.children[1].textContent = Marque;
            selectedRow.children[2].textContent = PrixValue;
            selectedRow.children[3].textContent = Date;
            selectedRow.children[4].textContent = Sel;
            selectedRow.children[5].textContent = promoValue;
            selectedRow = null;
            showAlert("Produit Info Edited", "info");
        }
        clearFields();
    }
});
const isnumber = (Prix) => {
    const re = /^[+]?\d+([.]\d+)?$/;
    return re.test(Prix);
}
// Edit Data

document.querySelector("#produit-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#nom").value = selectedRow.children[0].textContent;
        document.querySelector("#marque").value = selectedRow.children[1].textContent;
        document.querySelector("#prix").value = selectedRow.children[2].textContent;
        document.querySelector("#date").value = selectedRow.children[3].textContent;
        document.querySelector("#sel").value = selectedRow.children[4].textContent;
        document.querySelectorAll('input[name="promo"]').value = selectedRow.children[5].textContent;
      
    }
});

// Delete Data

let modal = document.querySelector(".modal");

document.querySelector("#produit-list").addEventListener("click", (e) => {
    target = e.target;
   
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.setAttribute("id","delete");
        modal.style.display = "block";
        
    }
});
function deleteRealData(){
    document.getElementById("delete").remove();
    modal.style.display = "none"
}

function cancel(){
    document.getElementById('mod').style.display='none';
    document.getElementById('removethis').setAttribute('id','');
}




