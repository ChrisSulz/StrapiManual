const placeholder = document.querySelector('.main-content');

    // Funktion zum Laden und Einfügen des HTML-Inhalts
    function loadAndInsertHtml(fileName) {
        if (!fileName.endsWith('manual.html')) {
            fetch(fileName)
                .then(response => response.text())
                .then(htmlContent => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlContent, 'text/html');
                    const bodyContent = doc.querySelector('body').innerHTML;
                    const div = document.createElement('div');
                    div.innerHTML = bodyContent;
                    placeholder.appendChild(div);
                })
                .catch(error => {
                    console.error(`Fehler beim Laden von ${fileName}: ${error}`);
                });
        }
    }

    // Suche und lade den HTML-Inhalt für alle .html-Dateien im aktuellen Ordner
    fetch('.')
        .then(response => response.text())
        .then(htmlContent => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const links = doc.querySelectorAll('a[href$=".html"]');

            links.forEach(link => {
                const fileName = link.getAttribute('href');
                loadAndInsertHtml(fileName);
            });
        })
        .catch(error => {
            console.error(`Fehler beim Abrufen des Ordnerinhalts: ${error}`);
        });