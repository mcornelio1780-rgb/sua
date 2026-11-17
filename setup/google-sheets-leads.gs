/**
 * sua · Recibir leads de la web en Google Sheets (gratis)
 * 1. Crea una hoja nueva en sheets.google.com y llámala "sua leads".
 * 2. Menú Extensiones → Apps Script. Borra todo y pega este archivo completo.
 * 3. Guarda (💾). Arriba a la derecha: Implementar → Nueva implementación.
 *    Tipo: "Aplicación web". Ejecutar como: "Yo". Quién tiene acceso: "Cualquier usuario".
 * 4. Autoriza los permisos con tu cuenta de Google.
 * 5. Copia la URL que termina en /exec y pégala en config.js:
 *      leads: { provider: "sheets", sheetsUrl: "https://script.google.com/macros/s/XXXX/exec" }
 * 6. Opcional: pon tu correo en AVISO_A para recibir un email por cada lead nuevo.
 */
var AVISO_A = "manyosa@limly.io";
var COLUMNAS = ["created_at", "name", "email", "company", "country", "spend", "message", "lang", "source"];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNAS);
    var d = JSON.parse(e.postData.contents || "{}");
    if (!d.email || String(d.email).indexOf("@") < 0) return respuesta({ ok: false });
    var fila = COLUMNAS.map(function (c) { return String(d[c] || "").slice(0, 2000); });
    sheet.appendRow(fila);
    if (AVISO_A) {
      MailApp.sendEmail(AVISO_A, "Nuevo lead sua: " + (d.name || "") + " · " + (d.company || ""),
        COLUMNAS.map(function (c) { return c + ": " + (d[c] || ""); }).join("\n"));
    }
    return respuesta({ ok: true });
  } catch (err) {
    return respuesta({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return respuesta({ ok: true, info: "sua leads activo" }); }

function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
