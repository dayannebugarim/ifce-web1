const valor = document.getElementById("valor");
const select = document.getElementById("parcelas");
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");

for(let i = 1; i < 13; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerText = `${i}x`;
    option.classList.add(`option-${i}`);
    select.appendChild(option);
}

function executar() {
    const parcelas = parseInt(select.value);
    const valorTotal = parseFloat(valor.value);
    criarTabela(parcelas);
    adicionarDadosTabela(valorTotal, parcelas);
    adicionarDadosFooter(valorTotal, parcelas);
}

function criarTabela(parcelas) {
    const rows = document.querySelectorAll(".data-row");
    if(rows) {
        for(const row of rows) {
            row.remove();
        }
    }
    for(let i = 1; i < parcelas + 1; i++) {
        const tableRow = document.createElement("tr");
        const tableColumn1 = document.createElement("td"); 
        const tableColumn2 = document.createElement("td");
        tableRow.classList.add(`row-${i}`, "data-row"); 
        tableColumn1.classList.add(`numero-parcela-${i}`);
        tableColumn2.classList.add(`valor-parcela-${i}`);
        tbody.appendChild(tableRow);
        tableRow.appendChild(tableColumn1);
        tableRow.appendChild(tableColumn2);
    }
}

function adicionarDadosTabela(valor, parcelas) {
    const juros = parcelas > 5 ? 'c/ 10% de juros' : 's/ juros';
    for(let i = 1; i < parcelas + 1; i++) {
        const tableColumn1 = document.getElementsByClassName(`numero-parcela-${i}`)[0]; 
        const tableColumn2 = document.getElementsByClassName(`valor-parcela-${i}`)[0];
        tableColumn1.innerText = `${i}x (${juros})`;
        tableColumn2.innerText = `${calcularValorParcela(valor, parcelas)}`;
    }
}

function adicionarDadosFooter(valor, parcelas) {
    const footerParcelas = document.getElementById("total-parcelas"); 
    const footerValorTotal = document.getElementById("total-valor");
    footerParcelas.innerText = 'TOTAL:';
    footerValorTotal.innerText = `${calcularValorTotal(valor, parcelas)}`;
}

function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function calcularValorParcela(valor, parcelas = 1) {
    if(parcelas > 5) return formatarValor((valor/parcelas) * 1.1);
    return formatarValor(valor/parcelas);
}

function calcularValorTotal(valor, parcelas) {
    if(parcelas > 5) return formatarValor(valor * 1.1);
    return formatarValor(valor);
}