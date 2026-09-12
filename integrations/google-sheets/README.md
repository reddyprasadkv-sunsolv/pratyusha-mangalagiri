# Google Sheets enquiry endpoint

Destination: https://docs.google.com/spreadsheets/d/1chqPpNJilv8-37HbFUZKrdi36NGyVrSKJMI8YpcV_cs/edit

The endpoint creates a dedicated `Website Enquiries` tab when the first valid enquiry arrives. Other tabs are preserved. The sheet remains private. Only the public write endpoint is accessible to visitors; it does not expose a read API.

The endpoint is configured in `public/api/enquiry-config.js`. A browser submission confirmed a successful save on 2026-09-12.

## Deploy or update

1. Sign in to Google Apps Script with an account that can edit the destination spreadsheet.
2. Create a script project and paste `Code.gs` into its editor.
3. Deploy a new **Web app**, execute as **Me**, with access for **Anyone**. Authorize the requested Sheets access in the owning account.
4. Set `window.enquiryEndpoint` in `public/api/enquiry-config.js` to the resulting HTTPS `/exec` URL.
5. Test the form from the website's origin: verify the row in Sheets and one `crystal_enquiry_success` event. Verify rejected saves produce no success event. Use an explicitly labelled test enquiry.
6. Commit and deploy the site only after the endpoint is configured and the live test passes.

The browser POST uses `text/plain` JSON and follows the Apps Script Content Service redirect. It must be able to read `{ "ok": true, "id": "<matching request ID>" }`. Do not use `no-cors`: an opaque response cannot confirm a save. A network timeout retains the same request ID for retry; the script serializes writes and checks existing IDs to avoid duplicate rows.

The browser's existing admin CRM still shows its local cache, now written only after a Sheets confirmation. Google Sheets is the shared source of saved enquiries; the current admin CRM does not read the sheet.

References: [Apps Script web apps](https://developers.google.com/apps-script/guides/web), [Content Service](https://developers.google.com/apps-script/guides/content), [SpreadsheetApp.flush](<https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#flush()>).
