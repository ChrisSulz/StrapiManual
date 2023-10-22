const placeholder = document.querySelector(".main-content");
const tocContainer = document.querySelector(".toc");

// Funktion zum Laden und Einfügen des HTML-Inhalts
async function loadAndInsertHtml(fileName) {
  try {
    if (!fileName.endsWith("manual.html")) {
      const response = await fetch(fileName);
      const htmlContent = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const bodyContent = doc.querySelector("body").innerHTML;
      const div = document.createElement("div");
      div.innerHTML = bodyContent;
      placeholder.appendChild(div);

      // Erstelle das Inhaltsverzeichnis
      createTableOfContents();
    }
  } catch (error) {
    console.error(`Fehler beim Laden von ${fileName}: ${error}`);
  }
}

// Erstellt das Inhaltsverzeichnis
function createTableOfContents() {
  const headings = placeholder.querySelectorAll("h1, h2");
  const tocList = document.createElement("ul");
  tocList.classList.add("toc-list");

  let currentTocItem; // Das aktuelle Inhaltsverzeichnis-Element

  headings.forEach((heading, index) => {
    const tocItem = document.createElement("li");
    const anchor = document.createElement("a");

    const [chapter, ...titleArray] = heading.textContent.split(" ");
    const title = titleArray.join(" ");
    anchor.innerHTML = `<span id="chapter">${chapter}</span> <span id="title">${title}</span>\n`;

    // Fügt eine ID zu den Überschriften hinzu, um das Scrollen zu ermöglichen
    const headingId = `heading-${index}`;
    heading.setAttribute("id", headingId);
    anchor.setAttribute("href", `#${headingId}`);

    tocItem.appendChild(anchor);

    // Einsortierung h1 / h2
    if (heading.tagName === "H1") {
      tocList.appendChild(tocItem);
      currentTocItem = tocItem;
    } else if (heading.tagName === "H2" && currentTocItem) {
      const subList =
        currentTocItem.querySelector("ul") || document.createElement("ul");
      subList.classList.add("sub-toc-list");
      subList.appendChild(tocItem);
      tocList.appendChild(subList);
    }
  });

  tocContainer.innerHTML =
    '<h1><span id="toc-headline">Table of contents</span></h1>';
  tocContainer.appendChild(tocList);
}

// Suche und lade den HTML-Inhalt für alle .html-Dateien im aktuellen Ordner
(async () => {
  try {
    const response = await fetch(".");
    const htmlContent = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const links = doc.querySelectorAll('a[href$=".html"]');

    // Extrahiere die Dateinamen und sortiere sie in der gewünschten Reihenfolge
    const fileNames = Array.from(links, (link) => link.getAttribute("href"));
    const sortedFileNames = fileNames.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    );

    for (const fileName of sortedFileNames) {
      await loadAndInsertHtml(fileName);
    }
  } catch (error) {
    console.error(`Fehler beim Abrufen des Ordnerinhalts: ${error}`);
  }
})();
