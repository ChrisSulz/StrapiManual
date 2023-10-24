const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Öffnet die manual.html im Browser
  await page.goto("http://localhost:5500/cypress/reports-custom/manual.html", {
    waitUntil: "networkidle2", // Wartet, bis die Seite fertig geladen ist
  });

  // Generiert ein PDF von der Seite
  await page.pdf({
    path: "manual.pdf",
    overwrite: true,
    format: "A4",
  });

  await browser.close();
})();
