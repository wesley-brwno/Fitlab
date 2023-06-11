const prataBtn = document.getElementById('prata-btn');
const ouroBtn = document.getElementById('ouro-btn');
const platinaBtn = document.getElementById('platina-btn');
const matriculaBtn = document.getElementById('matricula-btn')

/* Opções de planos em form.js */

prataBtn.addEventListener('click', ()=> {
    escolhaDePlano("prata");
});


ouroBtn.addEventListener('click', ()=> {
    escolhaDePlano("ouro");
});

platinaBtn.addEventListener('click', ()=> {
    escolhaDePlano("platina")
});

matriculaBtn.addEventListener('click', ()=> {
    escolhaDePlano("nao-aplica")
})

function escolhaDePlano(plano) {

    if (plano === "prata") {
        localStorage.setItem('planoSelecionado', 'prata');
    } else if (plano === "ouro") {
        localStorage.setItem('planoSelecionado', 'ouro');
    } else if(plano === "platina"){
        localStorage.setItem('planoSelecionado', 'platina');
    } else {
        localStorage.removeItem('planoSelecionado');
    }
}