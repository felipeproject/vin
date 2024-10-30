document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Verifica se o link tem um data-page
        const page = this.getAttribute('data-page');

        if (this.id === 'linkInicio') {
            // Redireciona para index.html se for o botão "Início"
            window.location.href = 'index.html';
        } else if (page) {
            // Caso contrário, tenta buscar o conteúdo da página
            fetch(page)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao carregar a página: ' + response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const newContent = doc.querySelector('.conteudo').innerHTML;
                    document.getElementById('conteudo').innerHTML = newContent;
                })
                .catch(error => {
                    console.error(error);
                    document.getElementById('conteudo').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
                });
        }
    });
});
