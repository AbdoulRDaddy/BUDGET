let i = 0;
const ajout = document.getElementById("add");
document.getElementById("formadd").addEventListener("submit", solde);
function soumettre(e) {
    event.preventDefault();
    var formData = lireForm();
        enregistre(formData);
        calcul();
    
    // Ajouter le montant d'une dépense
    if (document.getElementById('depenseLib').value != '' && document.getElementById('depenseMon').value != '') {
        const soustraire = document.getElementById("retrait");
        soustraire.textContent = Number(soustraire.textContent) + Number(document.getElementById('depenseMon').value);
        calcul();
        restore();
    }
}

function lireForm() {
    var formData = {};
    formData["depenseLib"] = document.getElementById("depenseLib").value;
    formData["depenseMon"] = document.getElementById("depenseMon").value;
    return formData;
}

// Enregistrement des depenses
function enregistre(data) {
    if (document.getElementById('depenseLib').value != ''  && Number(document.getElementById('depenseMon').value) > 0) {
        var table = document.getElementById("tablist").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        var add1 = newRow.insertCell(0);
        add1.textContent = data.depenseLib;
        var add2 = newRow.insertCell(1);
        add2.id = 'row' + i
        add2.textContent = data.depenseMon;
        var add3 = newRow.insertCell(2);
        add3.innerHTML = `<button onClick='modifier(this, ${i})' class="btn btn-outline-info"><i class="bi bi-pencil-fill"></i></button> <button onClick= 'supprime(this, ${i})'  class="btn btn-outline-danger"><i class="bi bi-x-square-fill"></i></button>`;
        i++
    } else {
        restore();
    }
}

// Modifier un enregistrement
function modifier(td, i) {
    let selectedRow = td.parentElement.parentElement;
    document.getElementById('depenseLib').value = selectedRow.cells[0].textContent;
    document.getElementById('depenseMon').value =Number( selectedRow.cells[1].textContent);
    supprime(td, i);
}

// Supprimer un enregistrement
function supprime(td, i) {
        row = td.parentElement.parentElement;
        const depense = Number(document.getElementById(`row${i}`).textContent);
        document.getElementById('tablist').deleteRow(row.rowIndex);

        // Solde
        const restant = document.getElementById("reste");
        restant.textContent = Number(document.getElementById('add').textContent) - Number(document.getElementById('retrait').textContent);

        // Dépenses
        const soustraire = document.getElementById("retrait")
        soustraire.textContent = Number(soustraire.textContent) - depense;
        calcul();
}

    // Restaurer l'enregistrement (vider les input)
    function restore() {
        document.getElementById('depenseLib').value = '';
        document.getElementById('depenseMon').value = '';
        document.getElementById('budgetAdd').value = '';
    }

    // Afficher l'ajout du montant du budget...
    function solde(e) {
        e.preventDefault();
        if ( document.getElementById('budgetAdd').value > 0) {
            ajout.textContent = Number(ajout.textContent) + Number(document.getElementById('budgetAdd').value);
            restore();
            calcul();
        } else {
            restore();
        }

    }
    // Calculer les montants...
    function calcul() {
        const restant = document.getElementById("reste");
        restant.textContent = Number(document.getElementById('add').textContent) - Number(document.getElementById('retrait').textContent);

    }
