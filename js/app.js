const listaDeEventos = [];

const campoTitulo = document.getElementById("titulo");
const campoLocal = document.getElementById("local");
const campoVagas = document.getElementById("vagas");
const campoPreco = document.getElementById("preco");
const campoData = document.getElementById("data");
const campoAtivo = document.getElementById("ativo");
const btnCadastrar = document.getElementById("btnCadastrar");
const listaEventosDiv = document.getElementById("listaEventos");
const estatisticasDiv = document.getElementById("estatisticas");

btnCadastrar.addEventListener("click", () => {
    const titulo = campoTitulo.value;
    const local = campoLocal.value;
    const vagas = parseInt(campoVagas.value);
    const preco = parseFloat(campoPreco.value);
    const dataString = campoData.value;
    const ativo = campoAtivo.checked;

    const novoEvento = {
        titulo: titulo,
        local: local,
        vagas: vagas,
        preco: preco,
        ativo: ativo,
        data: new Date(dataString),
        cancelamento: null
    };

    listaDeEventos.push(novoEvento);

    campoTitulo.value = "";
    campoLocal.value = "";
    campoVagas.value = "";
    campoPreco.value = "";
    campoData.value = "";
    campoAtivo.checked = false;

    atualizarInterface();
});

function atualizarInterface() {
    const cardsHTML = listaDeEventos.map((evento) => {
        const dataFormatada = evento.data.toLocaleDateString("pt-BR");
        const statusTexto = evento.ativo ? "Ativo" : "Inativo";

        let cancelamentoTexto = "";
        if (evento.cancelamento !== null) {
            cancelamentoTexto = `<p style="color: red; margin: 5px 0;"><strong>Evento cancelado. Motivo:</strong> ${evento.cancelamento}</p>`;
        }

        return `
            <div class="evento">
                <h3>${evento.titulo}</h3>
                <p><strong>Local:</strong> ${evento.local}</p>
                <p><strong>Data:</strong> ${dataFormatada}</p>
                <p><strong>Vagas:</strong> ${evento.vagas} | <strong>Preço:</strong> R$ ${evento.preco.toFixed(2)}</p>
                <p><strong>Status:</strong> ${statusTexto}</p>
                ${cancelamentoTexto}
            </div>
        `;
    });

    listaEventosDiv.innerHTML = cardsHTML.join("");

    const eventosAtivos = listaDeEventos.filter(e => e.ativo === true);
    const nomesAtivos = eventosAtivos.map(e => e.titulo).join(", ") || "Nenhum evento ativo";

    const totalArrecadado = listaDeEventos.reduce((total, e) => {
        return total + (e.vagas * e.preco);
    }, 0);

    estatisticasDiv.innerHTML = `
        <h2>Estatísticas</h2>
        <p><strong>Total de Eventos:</strong> ${listaDeEventos.length}</p>
        <p><strong>Eventos Ativos:</strong> ${nomesAtivos}</p>
        <p><strong>Total Arrecadado Possível:</strong> R$ ${totalArrecadado.toFixed(2)}</p>
    `;
}

atualizarInterface();
