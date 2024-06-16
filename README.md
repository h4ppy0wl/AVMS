[![AppSheet](https://github.com/h4ppy0wl/myMaterials/blob/main/app-sheet.svg)](https://script.google.com/home/start) <img src="https://github.com/h4ppy0wl/myMaterials/blob/main/480px-Google_Apps_Script.svg.png" alt="appsheet" url="https://about.appsheet.com/home/" width="50" height="50"> [![Forms](https://github.com/h4ppy0wl/myMaterials/blob/main/forms_2020q4_48dp.png)](https://docs.google.com/forms/)  [![Sheets](https://github.com/h4ppy0wl/myMaterials/blob/main/sheets_2020q4_48dp.png)](https://docs.google.com/spreadsheets/)  [![Docs](https://github.com/h4ppy0wl/myMaterials/blob/main/docs_2020q4_48dp.png)](https://docs.google.com/document/) <img src="https://github.com/h4ppy0wl/myMaterials/blob/main/JavaScript-logo.png" alt="JS" width="50" height="50">

# AVMS
:rocket: Customer Survey with Automated Voucher Management System


This project offers a cost-effective, fully integrated solution for:

:gear: collecting customer feedback

:gear: Automated form submition Email

:gear: rewarding participation with discount vouchers

:gear: managing voucher expiration and usage



It leverages the free tier capabilities of:

<a href="https://about.appsheet.com/home/"><img src="https://github.com/h4ppy0wl/myMaterials/blob/main/480px-Google_Apps_Script.svg.png" alt="Apps Script"  width="50" height="50"></a> Google Apps Script    <a href="https://script.google.com/home/start"><img src="https://github.com/h4ppy0wl/myMaterials/blob/main/app-sheet.svg" alt="appsheet"  width="50" height="50"></a> Google AppSheet    [![Forms](https://github.com/h4ppy0wl/myMaterials/blob/main/forms_2020q4_48dp.png)](https://docs.google.com/forms/) Google Forms    [![Docs](https://github.com/h4ppy0wl/myMaterials/blob/main/docs_2020q4_48dp.png)](https://docs.google.com/document/) Google Docs    [![Sheets](https://github.com/h4ppy0wl/myMaterials/blob/main/sheets_2020q4_48dp.png)](https://docs.google.com/spreadsheets/) Google Sheets


:vertical_traffic_light: Apps created with AppSheet can be used free of charge by 10 users!


**Problem definition:**  
I wanted to run a survey for analyzing customer satisfaction and value creating elements for customers of a local cafe. I wanted to collect 250 responses at least. So, negotiated with cafe manager to provide a discount for all participants and also a raffle. We needed a reliable voucher generation and management system that
* Sends automated form submission "thank you" emails containing vouchers
* Tracks voucher usage and expiration at the service point
* Service usage be easy for survey respondents and cafe personel
* It should be free!


**Automated Voucher Management:**  
1. A Google form containing description and survey questionnaire. Don't forget to add email validity checks in the form if you are collecting emails as a non required field. example:
 
   ```regex
   ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
   ```
2. Connect the form to a Google Sheet
3. Create a Google Doc contaning "Thank you" email body. Mark variables in the body using double curly braces like {{exampleVar}} in the document text. look in the example doc in the project files.
4. Generate random vouchers in a sheet document using a formula function. You can use following formula to generate a **seven** charachter string. customize it for your need.
   ```
   =CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))& CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))&CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))& CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))&CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))& CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))&CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))
   ```
6. Create a spead Sheet using the sample .xlsx file in the repository. paste your vouchers in the table.in conatining pregenerated vouchers
Upon form  completion, Google Apps Script triggers an automated workflow:
Retrieves a voucher code from a designated Google Sheet.
Generates a personalized email based on a Google Doc template.
The email contains the voucher code, submission details (date/time), and expiration date.
Records voucher issuance details (issue date, expiration date, recipient email) in a separate voucher reference sheet.
Email Notification with Status Tracking:
The script sends the email notification to the customer, including the voucher information.
Records a note in the form result sheet to track the email sending status and the sent voucher code.
Voucher Usage Management with AppSheet:
Develop a mobile app using Google AppSheet for cashiers to efficiently manage vouchers at the service usage point.
The app, synchronized with the voucher reference sheet, allows cashiers to:
Look up vouchers by code.
Verify voucher validity, usage status, issue date, and issuance status.
(Optional) Mark vouchers as used within the app (based on your implementation).
Benefits:

Enhanced Customer Experience: Streamlined survey process coupled with automatic voucher rewards incentivizes feedback.
Improved Efficiency: Automated workflows eliminate manual voucher management tasks.
Real-Time Data: Centralized data storage in Google Sheets facilitates data analysis and reporting.
Cost-Effective Solution: Leverages free Google Apps features for businesses with less than 10 users.
Getting Started:

Clone the repository.
Follow the included setup instructions to configure Google Apps services.
Customize Google Forms questions, voucher reference sheet, and email template to meet your specific needs.
Build your AppSheet app to suit your voucher usage management requirements.
Please note: This description serves as a general guideline. Specific configuration instructions might vary depending on your implementation details.
