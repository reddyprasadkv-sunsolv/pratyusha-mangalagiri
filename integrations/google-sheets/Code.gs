// Deploy as a web app: execute as the sheet owner, access for Anyone.
// The sheet stays private; this endpoint only accepts new enquiries.
const SPREADSHEET_ID = '1chqPpNJilv8-37HbFUZKrdi36NGyVrSKJMI8YpcV_cs';
const ENQUIRY_SHEET = 'Website Enquiries';
const HEADERS = [
  'Enquiry ID', 'Saved At (UTC)', 'Full Name', 'Mobile Number', 'Email', 'City',
  'Requirement', 'Language', 'Message', 'Consent Given'
];

function doPost(e) {
  let lock;
  try {
    const body = e && e.postData && e.postData.contents;
    if (!body || body.length > 12000) return jsonResult({ ok: false });
    const lead = JSON.parse(body);
    if (!validLead(lead)) return jsonResult({ ok: false });
    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    const book = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = book.getSheetByName(ENQUIRY_SHEET);
    if (!sheet) sheet = book.insertSheet(ENQUIRY_SHEET);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setBackground('#24483c').setFontColor('#ffffff').setFontWeight('bold');
    }
    const headers = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    if (headers.some((value, index) => value !== HEADERS[index])) {
      return jsonResult({ ok: false });
    }
    // A retry after a lost response acknowledges the original row, without appending again.
    const lastRow = sheet.getLastRow();
    const existing = lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1)
      .createTextFinder(lead.id).matchEntireCell(true).useRegularExpression(false).findNext();
    if (!existing) {
      const values = [lead.id, new Date().toISOString(), lead.fullName, lead.mobileNumber,
        lead.emailAddress, lead.city, lead.requirementKey, lead.preferredLanguage,
        lead.message, 'Yes'];
      // Plain text preserves telephone digits and prevents submitted text becoming formulas.
      sheet.getRange(lastRow + 1, 1, 1, HEADERS.length).setNumberFormat('@')
        .setValues([values.map(safeCell)]);
    }
    SpreadsheetApp.flush();
    return jsonResult({ ok: true, id: lead.id });
  } catch (_) {
    // Never echo customer data or internal error details in a public response.
    return jsonResult({ ok: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function validLead(lead) {
  if (!lead || typeof lead !== 'object' || Array.isArray(lead)) return false;
  const text = (key, max, required) => typeof lead[key] === 'string' &&
    lead[key].length <= max && (!required || lead[key].trim().length > 0);
  return typeof lead.id === 'string' && /^[a-f0-9-]{36}$/i.test(lead.id) &&
    text('fullName', 80, true) && typeof lead.mobileNumber === 'string' &&
    /^[6-9]\d{9}$/.test(lead.mobileNumber) && text('emailAddress', 120, false) &&
    (!lead.emailAddress || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.emailAddress)) &&
    text('city', 80, false) && text('message', 1000, false) &&
    ['success', 'evil-eye', 'money-magnet', 'pyrite', 'guidance', 'ritual'].includes(lead.requirementKey) &&
    ['en', 'te'].includes(lead.preferredLanguage) && lead.consentGiven === true;
}

function safeCell(value) {
  const text = String(value);
  return /^[\s]*[=+@-]/.test(text) ? "'" + text : text;
}

function jsonResult(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
