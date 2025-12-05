const API = "http://localhost:3000/api/eventos";

let idEdicao = null;

async function carregarEventos() {
  const termo = document.getElementById("busca").value;
  const url = termo ? `${API}?titulo=${termo}` : API;

  const resposta = await fetch(url);
  const eventos = await resposta.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  eventos.forEach((evento) => {
    const dataVisual = new Date(evento.data).toLocaleDateString();
    const dataInput = new Date(evento.data).toISOString().split("T")[0];

    lista.innerHTML += `
            <li>
                <div>
                    <strong>${evento.titulo}</strong> <br>
                    <small>${evento.descricao || ""}</small> <br>
                    <small>${dataVisual} - ${evento.local} - R$ ${
      evento.valor
    }</small>
                </div>
                <div class="btn-group">
                    <button onclick="prepararEdicao('${evento._id}', '${
      evento.titulo
    }', '${evento.local}', '${dataInput}', '${evento.valor}', '${
      evento.descricao || ""
    }')" style="background: orange;">Editar</button>
                    <button onclick="excluirEvento('${
                      evento._id
                    }')" style="background: red; color: white;">Excluir</button>
                </div>
            </li>
        `;
  });
}

function prepararEdicao(id, titulo, local, data, valor, descricao) {
  idEdicao = id;

  document.getElementById("titulo").value = titulo;
  document.getElementById("local").value = local;
  document.getElementById("data").value = data;
  document.getElementById("valor").value = valor;
  document.getElementById("descricao").value = descricao;

  document.getElementById("btnSalvar").innerText = "Atualizar Evento";
  document.getElementById("tituloForm").innerText = "Editar Evento";
}

async function salvarEvento() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const local = document.getElementById("local").value;
  const data = document.getElementById("data").value;
  const valor = document.getElementById("valor").value;

  if (!titulo || !data) return alert("Preencha titulo e data!");

  const corpo = { titulo, descricao, local, data, valor: Number(valor) };

  const metodo = idEdicao ? "PUT" : "POST";
  const urlFinal = idEdicao ? `${API}/${idEdicao}` : API;

  const resposta = await fetch(urlFinal, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });

  if (resposta.ok) {
    alert(idEdicao ? "Evento Atualizado!" : "Evento Criado!");
    limparFormulario();
    carregarEventos();
  } else {
    alert("Erro ao salvar");
  }
}

async function excluirEvento(id) {
  if (confirm("Tem certeza?")) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    carregarEventos();
  }
}

function limparFormulario() {
  idEdicao = null;
  document.getElementById("titulo").value = "";
  document.getElementById("local").value = "";
  document.getElementById("data").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("descricao").value = "";

  document.getElementById("btnSalvar").innerText = "Salvar Evento";
  document.getElementById("tituloForm").innerText = "Novo Evento";
}

// Inicia a lista ao carregar o script
carregarEventos();
