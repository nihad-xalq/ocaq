/**
 * Google Apps Script for the Ocaq contact form.
 *
 * After editing this file, paste it into Apps Script again, then:
 * Deploy → Manage deployments → pencil → New version.
 */

var MONTHS = {
  az: [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  ru: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (String(sheet.getRange(1, 1).getValue()).trim() === "") {
      appendTextRow(sheet, [
        "Timestamp",
        "Locale",
        "Full name",
        "Phone",
        "Email",
        "Message",
      ]);
    }

    appendTextRow(sheet, [
      formatTimestamp(data.locale),
      String(data.locale || ""),
      String(data.fullName || ""),
      String(data.phone || ""),
      String(data.email || ""),
      String(data.message || ""),
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function formatTimestamp(locale) {
  const now = new Date();
  const tz = "Asia/Baku";
  const day = Utilities.formatDate(now, tz, "dd");
  const year = Utilities.formatDate(now, tz, "yyyy");
  const time = Utilities.formatDate(now, tz, "HH:mm");
  const monthIndex = parseInt(Utilities.formatDate(now, tz, "M"), 10) - 1;
  const months = MONTHS[locale] || MONTHS.en;

  return day + " " + months[monthIndex] + " " + year + " " + time;
}

function getNextDataRow(sheet) {
  const last = sheet.getLastRow();
  if (last < 1) return 1;

  const names = sheet.getRange(1, 3, last, 1).getValues();
  for (var i = names.length - 1; i >= 0; i--) {
    if (String(names[i][0]).trim() !== "") return i + 2;
  }

  return 1;
}

function appendTextRow(sheet, values) {
  const row = getNextDataRow(sheet);

  for (var i = 0; i < values.length; i++) {
    const cell = sheet.getRange(row, i + 1);
    try {
      cell.setNumberFormat("@");
    } catch (error) {
      // Column types (Date, Number, ...) can reject a format change.
    }
    cell.setValue(values[i]);
  }
}
