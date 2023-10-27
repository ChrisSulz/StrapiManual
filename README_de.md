# StrapiManual

## Projektinformationen

Mithilfe von **[Cypress](https://www.cypress.io/)** sollte innerhalb der Ausarbeitung meiner Bachelorarbeit für das CMS **[Strapi](https://strapi.io/)** ein **Benutzerhandbuch** automatisch generiert werden.  
Basis hierfür war die Website von **[SKB-virtuell](https://skb-virtuell.de/)**.  
Durch Befehlsketten von vereinzelten Cypress-Tests und der Berichtsgenerierung durch die Erweiterung mittels **[Mocha custom reports](https://mochajs.org/api/)** war es mir möglich, HTML-Dokumente jeder Testsammlung zu generieren und zu einer **manual.html** zusammenzufassen.  
Für eine einfachere Bedienung innerhalb der manual.html sorgen unter anderem die automatische Generierung eines **klickbaren Inhaltsverzeichnisses**, der **"scroll-up"-Button** und die bereits in herkömmlichen Browsern integrierte **Suchfunktion** per Strg+F.

### Projektstruktur

Cypress-Tests, um Vorgänge innerhalb des CMS Strapi zu verfolgen:

> /cypress/e2e/...cy.js

Ausgabe der von mocha custom reporter generierten HTML-Dateien, sowie dazugehörige Dateien:

> /cypress/reports-custom/...

Sammlung aller von Cypress generierten Screenshots:

> /cypress/screenshots/...

Unterstützende Cypress-Konfigurationen - unter anderem automatische Logins über Session-Cookies:

> /cypress/support/...

Programmierter Mocha custom reporter:

> /reporter/custom-reporter.js

## Anleitung

Um ein eigenes Benutzerhandbuch zu generieren sind folgende Schritte notwendig:

1. Installiere [NodeJS](https://nodejs.org/)

2. Alle Abhängigkeiten installieren:

```bash
npm install
```

3. Cypress installieren:

```bash
npm install cypress
```

4. Tests innerhalb `/cypress/e2e/` anlegen:

- Der Dateiname muss identisch mit der im Cypress-Test genutzten Beschreibung sein  
  Bsp.: `01 Test.cy.js` als Dateiname, also Test bestehend aus: `describe("01 Test", () => { ... });`
- Der Dateiname bzw. die Beschreibung muss für eine reibungslose Sortierung mit einem Zahlenwert gefolgt von einem Leerzeichen beginnen  
  Bsp.: `01 Introduction.cy.js` als Dateiname, bzw. `describe("01 Introduction", ...)` als Beschreibung
- Die Testgruppen (`it()`) sollten zur Übersicht ebenfalls mit einem Zahlenwert oder optional einer Buchstabenfolge beginnen  
  Bsp.: `it("A First Operation")`

5. Generierung der einzelnen Berichte und des gesamten Benutzerhandbuchs `manual.html`  
   Zielverzeichnis: `/cypress/reports-custom/`

```bash
npx cypress run
```

### Einstellmöglichkeiten

1. Die Darstellung und Gestaltung aller Elemente kann durch die CSS-Datei angepasst werden:

   > /cypress/reports-custom/styles.css

2. Das Ändern bzw. Austauschen von `logo.jpg` lässt das Logo innerhalb von `manual.html` selbst bestimmen:

   > /cypress/reports-custom/logo.jpg

3. Der Text am Ende von `manual.html` lässt sich durch Anpassung von `footer.txt` selbst bestimmen:
   > /cypress/reports-custom/footer.txt

### Hinweise

#### Kommentieren von Befehlen

Durch das Auskommentieren von Befehlen werden diese zwar nicht von Cypress zur Testlaufzeit ausgeführt, aber sie erscheinen trotzdessen als Anweisung in der jeweiligen HTML-Ausgabe und dementsprechend in `manual.html`:

```javascript
// cy.visit("www.example.com");
```

Dies kann von Vorteil sein, wenn lediglich eine Anweisung gegeben werden soll für den Endbenutzer, diese jedoch größere Folgen bei der Ausführung innerhalb eines Tests hätte.

---

#### Textausgabe

Es ist möglich mithilfe von `cy.log()` Textausgaben für das Benutzerhandbuch generieren zu lassen. Mithilfe von den optionalen Präfixen `hint`, `warning` und `attention` sind verschiedene Darstellungsformen möglich. Um diese vom custom-reporter erkennen zu lassen sind nachfolgende ein Doppelpunkt `:` und ein Leerzeichen nachfolgend notwendig.  
Beispiel:

```javascript
cy.log("warning: Dies ist eine Warnung und wird entsprechend als solche hervorgehoben!");
```

In der Ausgabe im Benutzerhandbuch werden die entsprechenden Präfixe (falls vorhanden) automatisch entfernt und der nachfolgende Text passend zum Präfix formatiert.

---

#### Zugangsdaten

Durch das Erstellen einer `credentials.json` kann das automatische Loginverfahren per `cy.login()` genutzt werden:

```json
{
  "user": "user@email.com",
  "password": "password"
}
```

Die `credentials.json` muss hier manuell angelegt werden:

> /cypress/support/credentials.json

---

#### Serverumgebung

Um `manual.html` korrekt und vollständig mit Zunahme von `manual.js` anzuzeigen kann man beispielsweise eine lokale Serverumgebung mithilfe von [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) von [VSCode](https://code.visualstudio.com/) bereitstellen.

---

#### PDF-Generierung

Das Skript `generatePDF.js` ermöglicht es mithilfe von [Puppeteer](https://pptr.dev/), dass eine vollständige PDF generiert wird, in der alle Informationen von `manual.html` enthalten sind. Zur Ausführung ist vorausgesetzt, dass `manual.html` auf einer lokalen Serverumgebung (Port: 5500) ausgeführt wird _(siehe Hinweis zu Serverumgebung)_.

Navigiere in den entsprechenden Ordner, in dem sich `generatePDF.js` befindet:

```bash
cd .\cypress\reports-custom\
```

Zur Ausführung nutze folgenden Befehl:

```bash
node node generatePDF.js
```

Die generierte `manual.pdf` befindet sich nun im entsprechenden Ordner `\cypress\reports-custom\` .

Der Standardpfad, sowie -port zur Serverumgebung, kann in `\cypress\reports-custom\generatePDF.js` angepasst werden:

```javascript
http://localhost:5500/cypress/reports-custom/manual.html
```
