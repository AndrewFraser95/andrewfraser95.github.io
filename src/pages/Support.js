import React from "react";
import ReactMarkdown from "react-markdown";
import { SpaceContainer } from "@components/StyledComponents";
import { useNavigate } from "react-router-dom";
import "@styles/Support.css";

const supportContent = `# Support for CaliBir

**Last Updated:** March 7, 2026  
**Effective Date:** March 7, 2026

We're here to help you get the most out of CaliBir. Whether you're having trouble with a feature or want to suggest an improvement, our team is ready to assist you.

## 1. Contact Us

The fastest way to get support is by emailing us directly.

- **Email**: [calibirapp@gmail.com](mailto:calibirapp@gmail.com)
- **Response Time**: We typically respond within 24-48 hours on business days.

## 2. Frequently Asked Questions (FAQs)

### 2.1 How do I delete my account?
You can delete your account and all associated data by going to **Settings > Delete Account** within the CaliBir app. This action is permanent and cannot be undone.

### 2.2 How do I report a bug?
Please email us at [calibirapp@gmail.com](mailto:calibirapp@gmail.com) with a description of the issue, what device you're using, and any screenshots that might help us understand the problem.

### 2.3 How do I suggest a feature?
We love hearing from our users! Send your ideas to [calibirapp@gmail.com](mailto:calibirapp@gmail.com).

## 3. Privacy & Terms

For information on how we handle your data, please see our [Privacy Policy](https://andrewfraser.com/calibir/privacy).
For our terms of use, please see our [Terms of Service](https://andrewfraser.com/calibir/terms).

---

**CaliBir Team**  
Helping you reclaim your time.
`;

const Support = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <SpaceContainer>
      <div className="legal-content-container">
        <ReactMarkdown>{supportContent}</ReactMarkdown>
      </div>
      <button className="previous-button" onClick={handleClick}>
        Go to Home
      </button>
    </SpaceContainer>
  );
};

export default Support;
