import React from "react";
import ReactMarkdown from "react-markdown";
import { SpaceContainer } from "@components/StyledComponents";
import { useNavigate } from "react-router-dom";
import "@styles/Privacy.css";

const privacyContent = `# Privacy Policy for CaliBir

**Last Updated:** January 1, 2026  
**Effective Date:** January 1, 2026

CaliBir ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "App"). Please read this policy carefully.

## 1. Information We Collect

### 1.1 Information You Provide

- **Account Information**: Name, email address, phone number (optional), password
- **Profile Information**: Birthday, bio, profile photo
- **User Content**: Events you create, event details, photos, messages, posts, and comments

### 1.2 Information Collected Automatically

- **Device Information**: Device type, operating system, unique device identifiers
- **Usage Data**: App features used, interaction patterns, crash reports
- **Push Notification Tokens**: For sending event reminders and notifications

### 1.3 Information from Your Device (With Permission)

- **Contacts**: To help you find friends using the app and sync birthdays
- **Calendar**: To add birthday reminders and events to your calendar
- **Camera/Photo Library**: To upload profile pictures and event photos
- **Notifications**: To send you event reminders and friend activity updates

## 2. How We Use Your Information

We use your information to:

- Provide and maintain the App's core functionality
- Create and manage your account
- Enable you to connect with friends and create/manage events
- Send birthday reminders and event notifications
- Sync birthdays to your device calendar
- Display profile pictures and event photos
- Improve app performance and fix bugs
- Respond to your support requests
- Detect and prevent fraud or abuse

## 3. How We Store Your Information

### 3.1 Cloud Storage

- Account data, events, friendships, and messages are stored securely in Firebase (Google Cloud)
- Photos are stored in Firebase Cloud Storage
- All data transmissions use HTTPS encryption

### 3.2 Local Storage

- Some data is cached locally on your device for offline access and performance
- Sensitive data stored locally is encrypted using industry-standard encryption

### 3.3 Data Location

- Your data may be stored and processed in data centers located in the United States and other countries where Firebase operates

## 4. Information Sharing and Disclosure

### 4.1 We DO NOT sell your personal information.

### 4.2 We Share Information With:

**Service Providers:**

- **Firebase/Google Cloud**: For authentication, database, storage, and analytics
- **Expo**: For push notifications
- **Giphy**: For GIF search functionality (searches are anonymous)

**Other Users:**

- Your name, profile photo, and birthday are visible to your friends within the app
- Events you create are visible to invited friends
- Posts and photos you share on events are visible to event participants

**Legal Requirements:**
We may disclose your information if required by law, court order, or to:

- Comply with legal processes
- Protect our rights, property, or safety
- Investigate fraud or security issues
- Protect users' safety

## 5. Your Privacy Rights

You have the right to:

### 5.1 Access Your Data

- View and manage your profile information within the app
- Contact us to request a copy of your data

### 5.2 Correct Your Data

- Update your profile information at any time in the app

### 5.3 Delete Your Data

- Delete your account and all associated data from Settings > Delete Account
- This permanently removes your profile, events, messages, posts, and friendships
- Some data may be retained in backups for up to 30 days

### 5.4 Withdraw Permissions

- Revoke contacts, calendar, or photo access through your device settings
- Note: Some features may not work without required permissions

### 5.5 Opt-Out of Communications

- Disable push notifications in your device settings
- You cannot opt-out of essential service communications (e.g., security alerts)

## 6. Children's Privacy

CaliBir is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we discover we have collected information from a child under 13, we will delete it immediately. If you believe we have collected information from a child under 13, please contact us at calibirapp@gmail.com.

## 7. Data Retention

- **Active Accounts**: We retain your data as long as your account is active
- **Deleted Accounts**: Data is permanently deleted within 30 days of account deletion
- **Backups**: Backup copies may persist for up to 30 days before automatic deletion
- **Legal Requirements**: Some data may be retained longer if required by law

## 8. Security

We implement industry-standard security measures including:

- HTTPS encryption for all data transmissions
- Encrypted storage for sensitive local data
- Firebase security rules to prevent unauthorized access
- Regular security audits and updates

However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.

## 9. International Data Transfers

Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have different data protection laws. By using the App, you consent to these transfers.

## 10. Third-Party Links

The App may contain links to third-party websites or services (e.g., Giphy). We are not responsible for the privacy practices of these third parties. Please review their privacy policies.

## 11. California Privacy Rights (CCPA)

If you are a California resident, you have additional rights under the California Consumer Privacy Act:

- Right to know what personal information is collected
- Right to know if personal information is sold or disclosed
- Right to opt-out of the sale of personal information (we do not sell data)
- Right to deletion of personal information
- Right to non-discrimination for exercising your rights

To exercise these rights, contact us at calibirapp@gmail.com.

## 12. European Privacy Rights (GDPR)

If you are in the European Economic Area, you have rights under the General Data Protection Regulation:

- Right of access to your personal data
- Right to rectification of inaccurate data
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability
- Right to object to processing
- Right to withdraw consent

To exercise these rights, contact us at calibirapp@gmail.com.

## 13. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of significant changes by:

- Posting the new policy in the app
- Updating the "Last Updated" date
- Sending a notification (for material changes)

Continued use of the App after changes means you accept the updated policy.

## 14. Contact Us

If you have questions or concerns about this Privacy Policy, please contact us:

**Email**: calibirapp@gmail.com  
**Privacy & Support**: calibirapp@gmail.com

**Policy Available At**: https://andrewfraser.com/calibir/privacy

---

**Your Consent**: By using CaliBir, you consent to this Privacy Policy.`;

const Privacy = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <SpaceContainer>
      <div className="legal-content-container">
        <ReactMarkdown>{privacyContent}</ReactMarkdown>
      </div>
      <button className="previous-button" onClick={handleClick}>
        Go to Home
      </button>
    </SpaceContainer>
  );
};

export default Privacy;
