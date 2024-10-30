const barraSuperior = document.querySelector('.barra-superior');
let lastScrollTop = 0;

// Debounce function to limit how often a function can run
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Esconder ou mostrar a barra superior ao rolar
window.addEventListener('scroll', debounce(() => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    barraSuperior.style.top = (currentScroll > lastScrollTop && currentScroll > 60) ? '-200px' : '0';
    barraSuperior.style.opacity = currentScroll > 0 ? '0.7' : '1';

    lastScrollTop = currentScroll;
}, 100)); // 100ms debounce

// Função para carregar dados de arquivos JSON com tratamento de erros
async function carregarDados(arquivo) {
    try {
        const response = await fetch(arquivo);
        if (!response.ok) throw new Error(`Erro ao carregar o arquivo: ${arquivo} - Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(`Erro ao carregar dados: ${error.message}`);
    }
}

// Cria e retorna um elemento li para a lista de jogos
function criarElementoJogo(jogo) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${jogo.data}:</strong> ${jogo.partida}`;
    return li;
}

// Atualizar a lista de jogos na interface
function atualizarJogos(jogos) {
    const jogosElement = document.querySelector('.conteudo').children[1]?.querySelector('ul');
    if (!jogosElement) return; // Verificar se o elemento existe
    jogosElement.innerHTML = ''; // Limpar antes de atualizar

    const fragment = document.createDocumentFragment();
    jogos.forEach(jogo => fragment.appendChild(criarElementoJogo(jogo)));

    jogosElement.appendChild(fragment); // Adicionar novos elementos
}

// Atualizar o ranking de jogadores (implementação necessária)
function atualizarRanking(ranking) {
    // Implementação para atualizar ranking, se necessário
}

// Função para carregar todos os dados de diferentes arquivos JSON
async function carregarTodosOsDados() {
    const arquivos = [
        { caminho: 'data/jogos_programados.json', atualizar: atualizarJogos },
        { caminho: 'data/ranking_jogadores.json', atualizar: atualizarRanking },
        { caminho: 'data/informacoes_torneio.json', atualizar: atualizarInformacoes },
        { caminho: 'data/destaques_jogos.json', atualizar: atualizarDestaques }
    ];

    // Utilizando Promise.all para otimizar o carregamento
    await Promise.all(arquivos.map(async ({ caminho, atualizar }) => {
        const dados = await carregarDados(caminho);
        if (dados) atualizar(dados);
    }));
}

// Chamar a função de carregar dados ao carregar a janela
window.onload = carregarTodosOsDados;

// Função para abrir modais
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Função para fechar modais
function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Adicionar evento de clique para abrir modais
document.querySelectorAll('.btn').forEach(button => {
    button.onclick = () => abrirModal(button.dataset.modal);
});

// Adicionar evento de clique para fechar modais
document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.onclick = () => fecharModal(closeButton.closest('.modal').id);
});

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target.matches('.modal')) {
        fecharModal(event.target.id);
    }
};

// Atualizar informações do torneio
function atualizarInformacoes(informacoes) {
    const infoElement = document.querySelector('.conteudo').children[3];
    if (infoElement) {
        infoElement.innerHTML = `<h3>${informacoes.titulo}</h3><p>${informacoes.descricao}</p>`;
    }
}

// Atualizar destaques de jogos
function atualizarDestaques(destaques) {
    const destaquesElement = document.querySelector('.conteudo').children[4]?.querySelector('ul');
    if (!destaquesElement) return; // Verificar se o elemento existe
    destaquesElement.innerHTML = ''; // Limpar antes de atualizar

    destaques.forEach(destaque => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${destaque.titulo}</strong>: ${destaque.descricao}`;
        destaquesElement.appendChild(li);
    });
}
