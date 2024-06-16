# AVMS (Automated Voucher Management)
:rocket: Customer Survey with Automated Voucher Management System


This project offers a cost-effective, fully integrated solution for:

:gear: collecting customer feedback

:gear: Automated form submission Email

:gear: rewarding participation with discount vouchers

:gear: managing voucher expiration and usage



It leverages the free tier capabilities of:

<a href="https://about.appsheet.com/home/"><img src="https://github.com/h4ppy0wl/myMaterials/blob/main/480px-Google_Apps_Script.svg.png" alt="Apps Script"  width="50" height="50"></a> Google Apps Script    <a href="https://script.google.com/home/start"><img src="https://github.com/h4ppy0wl/myMaterials/blob/main/app-sheet.svg" alt="appsheet"  width="50" height="50"></a> Google AppSheet    [![Forms](https://github.com/h4ppy0wl/myMaterials/blob/main/forms_2020q4_48dp.png)](https://docs.google.com/forms/) Google Forms    [![Docs](https://github.com/h4ppy0wl/myMaterials/blob/main/docs_2020q4_48dp.png)](https://docs.google.com/document/) Google Docs    [![Sheets](https://github.com/h4ppy0wl/myMaterials/blob/main/sheets_2020q4_48dp.png)](https://docs.google.com/spreadsheets/) Google Sheets


:vertical_traffic_light: Apps created with AppSheet can be used free of charge by 10 users!  
:vertical_traffic_light: I don't explain how to create the service point app using AppSheet, in this document. There are lots of good tutorials that help create your app in just 1 hour. I share links at the end.

**Solution Benefits:** 
1. Increase response rates by incentivizing participation with discount vouchers just after submiting the form.
2. Automate email responses with vouchers upon survey completion, and integrating the system with voucher managagement app.
3. Manage voucher expiration and usage efficiently and with multiple users.
4. User device independant.

## Problem definition 
I wanted to run a survey for analyzing customer satisfaction and value creating elements for customers of a local cafe. I wanted to collect 250 responses at least. So, negotiated with cafe manager to provide a discount for all participants and also a raffle. We needed a reliable voucher generation and management system that
* Sends automated form submission "thank you" emails containing vouchers
* Tracks voucher usage and expiration at the service point
* Service usage be easy for survey respondents and cafe personel
* It should be free!


## Solution (steps to follow) 
1. Create a Google Form to collect customer feedback. A Google form containing description and survey questionnaire. Don't forget to add email validity checks in the form if you are collecting emails as a non required field. example:
 
   ```regex
   ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
   ```

<img src="https://github.com/h4ppy0wl/myMaterials/blob/main/ScreenshotForm.png">

2. Connect the form to a Google Sheet
3. Create a Google Doc using "Send curated content email template.docx" in the repository. Texts in the ```{{text}}``` are used as varables in the code.gs; you can edit the document but keep those. otherwise remember to edit the Apps Script code too. From **Share** click on the **Copy link**, and keep it for later (in a note :D )
<img src="https://github.com/h4ppy0wl/myMaterials/blob/main/ScreenshotTemplate.png"> 
4. Generate random vouchers in a sheet document using a formula function. You can use following formula to generate a **seven** charachter string. customize it for your need.

   ```
   =CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))& CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))&CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))& CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))&CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))& CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))&CHOOSE(RANDBETWEEN(1;2);CHAR(RANDBETWEEN(65;90)); CHAR(RANDBETWEEN(97;122)))
   ```

6. Create a spead Sheet using the sample vouchers.xlsx file in the repository. Paste your column of vouchers in the table. Let other columns and cell structures as it is. From **Share** click on the **Copy link**, and keep it for later (in the same note :D )
<img src="https://github.com/h4ppy0wl/myMaterials/blob/main/ScreenshotVouchers.png"> 

7. Open the survey responses spreadsheet connected to your form click **Extensions > Apps Script**.

    a. copy ```Code.js``` file in the repository and paste it to the ```code.gs``` in the Apps Script project.  
    b. change the ```url``` in ```const EMAIL_TEMPLATE_DOC_URL = "url"``` with email template Doc link.  
    c. change the ```url``` in ```const VOUCHERS_SHEET_URL =``` with voucher reference sheet link.  
    d. Edit ```const EMAIL_SUBJECT = "text"``` and ```const EMAIL_BCC = "adress_1@email.com, address_2@email.com"``` and ```const EXPIRATION_DURATION_IN_DAYS = 14``` based on your preference.  
    e. In the function dropdown, select ```installTrigger```.  
    f. Click Run.  
    g. When prompted, authorize the script. If the OAuth consent screen displays the warning, This app isn't verified, continue by selecting **Advanced > Go to {Project Name} (unsafe)**.  
   
   :rotating_light: **Important**: If you run ```installTrigger``` more than once, the script creates multiple triggers that each send an email when a user submits the form. To delete extra triggers and avoid duplicate emails, click Triggers alarm. Right-click on each extra trigger and click Delete trigger. you can delete this function from code and do the trigger installation manually from Apps Script.

## Test automated email response
Switch back to the survey responses spreadsheet and click **Tools > Manage form > Go to live form**. Fill out the form and click Submit. Check your email for an email with links to the content you selected. you can check other email addresses that you entered as BCC. If you look into the vouchers spread sheet, you should notice new information. :four_leaf_clover: I Hope everything works till here.

## Voucher Management App
You need a voucher management app at the service point to check validity of each discount voucher and mark that it is used or not: and do all this in realtime and multiuser. I used Google AppSheet to quickly create the app. App can be used in mobile phone and computers and you can limit the users by requiring signin if you use the premium service. **The service is no code**, so I can not effectively reflect what I did to create the app. But I highly suggest you to visit this <a href= "https://about.appsheet.com/how-to-create-an-app/">tutorial</a>. You can find a lot more in youtube and specially <a href="https://support.google.com/appsheet/">AppSheet help center</a>. 
I share screenshot of the app I created to give you ideas:  
<img src="https://github.com/h4ppy0wl/myMaterials/blob/main/Screenshot01.png"> <img src="https://github.com/h4ppy0wl/myMaterials/blob/main/Screenshot02.png"><img src="https://github.com/h4ppy0wl/myMaterials/blob/main/Screenshot03.png">



**Disclaimer:** This solution and code is provided "as is" without warranty of any kind, express or implied. The author are not responsible for any damages or losses arising from the use of this code. Consider that this solution is aimed for personal use and app users are considered trusted parties of the main user. Consider GDPR and personal data requirements in managing surveys.
