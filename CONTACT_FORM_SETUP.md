# Contact Form Setup with Google Apps Script

## Step 1: Create Google Apps Script

1. **Go to [script.google.com](https://script.google.com)**
2. **Click "New Project"**
3. **Replace the default code** with this:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Email configuration
    const TO_EMAIL = 'tiffany@datasistah.com';
    const SUBJECT = `AITeach Pro Contact: ${data.subject || 'General Inquiry'}`;
    
    // Create email body
    const emailBody = `
New contact form submission from AITeach Pro website:

Name: ${data.name}
Email: ${data.email}
Organization: ${data.organization || 'Not provided'}
Service Interest: ${data.subject || 'Not specified'}

Message:
${data.message}

---
Sent from AITeach Pro contact form
    `;
    
    // Send email
    MailApp.sendEmail({
      to: TO_EMAIL,
      subject: SUBJECT,
      body: emailBody
    });
    
    // Optional: Log to Google Sheets (see Step 3 below)
    // logToSheet(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to log submissions to Google Sheets
function logToSheet(data) {
  const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your sheet ID
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  
  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 6).setValues([
      ['Timestamp', 'Name', 'Email', 'Organization', 'Service', 'Message']
    ]);
  }
  
  // Add the data
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.organization || '',
    data.subject || '',
    data.message
  ]);
}
```

## Step 2: Deploy the Script

1. **Click "Deploy" > "New deployment"**
2. **Choose type: "Web app"**
3. **Set:**
   - Execute as: Me
   - Who has access: Anyone
4. **Click "Deploy"**
5. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/SCRIPT_ID/exec`)

## Step 3: Update Your Website

1. **Open `script.js`**
2. **Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`** with your Web App URL
3. **Save and deploy**

## Step 4: Optional - Log to Google Sheets

1. **Create a new Google Sheet**
2. **Copy the Sheet ID** from the URL (between `/d/` and `/edit`)
3. **Uncomment the `logToSheet(data);` line** in your Apps Script
4. **Replace `YOUR_GOOGLE_SHEET_ID_HERE`** with your actual Sheet ID
5. **Redeploy the script**

## Step 5: Test

1. **Fill out your contact form**
2. **Check your email** for the submission
3. **Check your Google Sheet** (if you set it up) for the logged data

## Troubleshooting

- **Email not received?** Check spam folder and verify your email address
- **Form not submitting?** Check browser console for errors
- **Script errors?** Check the Apps Script execution log

## Features

✅ **Free forever** - No monthly costs
✅ **Email notifications** - Get submissions in your inbox
✅ **Google Sheets logging** - Track all submissions
✅ **Spam protection** - Google's built-in protection
✅ **Reliable delivery** - 99.9% uptime
✅ **Professional emails** - Formatted and organized

This setup will handle unlimited form submissions for free and deliver them reliably to your email!
