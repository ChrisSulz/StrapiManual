const scrollToTopButton = document.getElementById("scroll-to-top-button");
const tocContainer = document.querySelector(".toc");
const placeholder = document.querySelector(".main-content");
const footerContainer = document.querySelector(".footer");

// Button um nach oben zu scrollen
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    // Ab 100px nach unten wird Button angezeigt
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

// Event-Listener um Scrollen nach oben bei Button-Klick auszulösen
scrollToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

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

// Funktion zum Laden und Einfügen des Footer-Inhalts
function loadAndInsertFooter() {
  fetch("footer.txt")
    .then((response) => response.text())
    .then((footerContent) => {
      const p = document.createElement("p");
      const lines = footerContent.split("\n"); // Teilt den Inhalt in Zeilen

      // Fügt jede Zeile als <p> mit <br> ein
      lines.forEach((line, index) => {
        p.innerHTML += line;
        if (index < lines.length - 1) {
          p.innerHTML += "<br>"; // Fügt <br> nach jeder Zeile (außer der letzten) ein
        }
      });

      footerContainer.appendChild(p); // Fügt den Footer-Inhalt in das .footer-Element ein

      // Zeitstempel am Ende hinzufügen
      const timestampElement = document.createElement("p");
      timestampElement.classList.add("timestamp");
      timestampElement.innerText = `\n\nGenerated on: ${new Date().toLocaleString()}`;
      document.querySelector(".footer").appendChild(timestampElement);
    })
    .catch((error) => {
      console.error(`Fehler beim Laden des Footers: ${error}`);
    });
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

    if (/^\d/.test(heading.textContent) || /^[A-Za-z] /.test(heading.textContent)) {
      const [chapter, ...titleArray] = heading.textContent.split(" ");
      const title = titleArray.join(" ");
      anchor.innerHTML = `<span id="chapter">${chapter}</span> <span id="title">${title}</span>\n`;
    } else {
      anchor.innerHTML = `<span id="title">${heading.textContent}</span>\n`;
    }

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
      const subList = currentTocItem.querySelector("ul") || document.createElement("ul");
      subList.classList.add("sub-toc-list");
      subList.appendChild(tocItem);
      tocList.appendChild(subList);
    }
  });

  tocContainer.innerHTML = '<h1><span id="toc-headline">Table of contents</span></h1>';
  tocContainer.appendChild(tocList);
}

// Suche und lade den HTML-Inhalt für alle .html-Dateien, sowie footer.txt im aktuellen Ordner
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

    // Lade und füge den Footer-Inhalt ein, nachdem der HTML-Inhalt geladen wurde
    loadAndInsertFooter();
  } catch (error) {
    console.error(`Fehler beim Abrufen des Ordnerinhalts: ${error}`);
  }
})();
