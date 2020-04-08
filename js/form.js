
var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener('click', function(event){
    event.preventDefault();

    var formulario = document.querySelector("#formulario-adicionar");
    var paciente = obtemPacienteDoFormulario(formulario);

    var erros = validaPaciente(paciente);
    if(erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente)

    formulario.reset();

    var mensagensDeErro = document.querySelector("#mensagens-erro");
    mensagensDeErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente){
    var trNova = montaTr(paciente);
    // adicionando o paciente na tabela
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(trNova);
}

function exibeMensagensDeErro(erros) {
    ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function (erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}


function obtemPacienteDoFormulario(form) {

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente) {
    var trNova = document.createElement('tr');
    trNova.classList.add("paciente");

    trNova.appendChild(montaTd(paciente.nome, "info-nome"));
    trNova.appendChild(montaTd(paciente.peso, "info-peso"));
    trNova.appendChild(montaTd(paciente.altura, "info-altura"));
    trNova.appendChild(montaTd(paciente.gordura, "info-gordura"));
    trNova.appendChild(montaTd(paciente.imc, "info-imc"));

    return trNova;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

function validaPaciente(paciente) {

    var erros = [];

    if (!validaPeso(paciente.peso)) {
        erros.push("Peso é inválido!");
        }

    if (!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida!");
    }

    if(paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if(paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco");
    }

    if(paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco");
    }

    if(paciente.gordura.length == 0) {
        erros.push("A gordura não pode ser em branco");
    }

    return erros;
}