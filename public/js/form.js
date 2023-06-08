const planoPrata = document.getElementById('prata');
const planoOuro = document.getElementById('ouro');
const planoPlatina = document.getElementById('platina');

let planoSelecionado = localStorage.getItem('planoSelecionado');

if (planoSelecionado === 'prata') {
  planoPrata.checked = true;
} else if (planoSelecionado === 'ouro') {
    planoOuro.checked = true;
} else if (planoSelecionado === 'platina'){
    planoPlatina.checked = true;
} else {
    planoPrata.checked = false;
    planoOuro.checked = false;
    planoPlatina.checked = false;
}