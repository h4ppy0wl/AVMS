// update the below variable with the URL of your own Google Doc template.
// Make sure you update the sharing settings so that 'anyone'  or 'anyone in your organization' can view.
const EMAIL_TEMPLATE_DOC_URL = 'url';
// Update this variable to customize the email subject.
const EMAIL_SUBJECT = 'Thanks for your participation in the XXXXXXXXXX Survey';
// BCC recipients
const EMAIL_BCC = "adress_1@email.com, address_2@email.com";

const VOUCHERS_SHEET_URL = "url"

const EXPIRATION_DURATION_IN_DAYS = 14;


/**
 * Installs a trigger on the spreadsheet for when someone submits a form.
 */
function installTrigger() {
  ScriptApp.newTrigger('onFormSubmit')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onFormSubmit()
      .create();
}

/**
 * Sends a customized email for every form response.
 * 
 * @param {Object} event - Form submit event
 */
function onFormSubmit(e) {
  let responses = e.namedValues;
  //console.log("email value:", responses['Email address']);
  // If the question title is a label, it can be accessed as an object field.
  // If it has spaces or other characters, it can be accessed as a dictionary.
  let timestampString = Utilities.formatDate(new Date(), "GMT+03:00", "dd.MM.yyyy HH:mm:ss");
  let email = responses['Email address'][0].trim();
  
  // If there is an email address, send an email to the recipient.
  let status = '';
  if (email.length > 6) {
    //calculate expiration date for voucher
    let expTime = new Date();
    expTime.setDate(expTime.getDate() + (EXPIRATION_DURATION_IN_DAYS + 1));
    //fetch voucher from excel
    new_voucher = fetchVoucher(new Date(), email, expTime);

    MailApp.sendEmail({
      to: email,
      bcc:EMAIL_BCC,
      subject: EMAIL_SUBJECT,
      htmlBody: createEmailBody(timestampString, new_voucher, expTime),
    });
    status = 'Email sent';
  }
  else {
    status = 'No Email address was entered';
  }

    // Append the status on the spreadsheet to the responses' row.
  let sheet = SpreadsheetApp.getActiveSheet();
  let row = sheet.getActiveRange().getRow();
  let column = e.values.length + 1;
  sheet.getRange(row, column).setValue(status);
  sheet.getRange(row, column+1).setValue(new_voucher);
  console.log("status=" + status + "; responses=" + JSON.stringify(responses));
}

function fetchVoucher(time1, email, expirationDate){
  let voucher_ref_sheet = SpreadsheetApp.openByUrl(VOUCHERS_SHEET_URL).getSheetByName("Sheet1");
  let last_voucher_cell_number = voucher_ref_sheet.getRange("J2").getValue();
  //let timestampString = Utilities.formatDate(new Date(), "GMT+03:00", "yyyy-MM-dd HH:mm:ss");

  let new_unique_voucher = voucher_ref_sheet.getRange("B"+String(last_voucher_cell_number+1)).getValue();

  //record the last voucher row number and issue time1
  voucher_ref_sheet.getRange("J2").setValue(last_voucher_cell_number+1);
  voucher_ref_sheet.getRange("K2").setValue(time1);

  voucher_ref_sheet.getRange("C"+String(last_voucher_cell_number+1)).setValue(Utilities.formatDate(time1, "GMT+03:00", "dd.MM.yyyy")); // voucher issue date
  voucher_ref_sheet.getRange("D"+String(last_voucher_cell_number+1)).setValue(Utilities.formatDate(expirationDate, "GMT+03:00", "dd.MM.yyyy")); // voucher issue date
  voucher_ref_sheet.getRange("F"+String(last_voucher_cell_number+1)).setValue(email); // reipient email
  //let appuser = Session.getActiveUser().getEmail()
  //voucher_ref_sheet.getRange("F"+String(last_voucher_cell_number+1)).setValue(appuser); // reipient email

  return new_unique_voucher;
} 

/**
 * Creates email body and includes the links based on topic.
 *
 * @param {string} unique_voucher - voucher number created for the participant.
 * @param {string[]} voucher_expiration_date - expiration date of this unique voucher.
 * @return {string} - The email body as an HTML string.
 */
function createEmailBody(time, unique_voucher, voucher_expiration_date) {
  // Make sure to update the emailTemplateDocId at the top.
  let docId = DocumentApp.openByUrl(EMAIL_TEMPLATE_DOC_URL).getId();
  let emailBody = docToHtml(docId);
  emailBody = emailBody.replace(/{{TIME}}/g, time);
  emailBody = emailBody.replace(/{{VOUCHER}}/g, unique_voucher);
  emailBody = emailBody.replace(/{{EXPIRATION}}/g, Utilities.formatDate(voucher_expiration_date, "GMT+03:00", "dd-MM-yyyy"));
  return emailBody;
}


function docToHtml(docId) {

  // Downloads a Google Doc as an HTML string.
  let url = "https://docs.google.com/feeds/download/documents/export/Export?id=" +
            docId + "&exportFormat=html";
  let param = {
    method: "get",
    headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
    muteHttpExceptions: true,
  };
  return UrlFetchApp.fetch(url, param).getContentText();
}
