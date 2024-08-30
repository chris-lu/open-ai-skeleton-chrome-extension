# Skeleton for an Easy OpenAI Integration in Google Chrome Extension

This project provides a basic skeleton to help developers create a Google Chrome extension that integrates with OpenAI's ChatGPT to analyze content from web pages. The extension is designed to select content from a webpage, process it using the OpenAI API, and return structured data.

## Features

- Select content from a webpage using a CSS selector.  
- Send the content to OpenAI's ChatGPT API for analysis.  
- Receive structured responses based on custom instructions.

## Getting Started

### Prerequisites

- **Google Chrome**: You need to have Google Chrome installed on your machine.  
- **OpenAI account**: Sign up at [OpenAI](https://platform.openai.com/signup) and obtain an API key.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/chris-lu/open-ai-skeleton-chrome-extension.git  
   cd open-ai-skeleton-chrome-extension
   ```

2. **Open Chrome and navigate to the Extensions page:**

   Go to `chrome://extensions/` or click on the menu (three dots) > "More tools" > "Extensions".

3. **Enable Developer Mode:**

   Toggle the "Developer mode" switch at the top right of the page.

4. **Load the extension:**

   Click "Load unpacked" and select the cloned repository folder.

5. **Login to OpenAI plateform:**

   Go on https://chat.openai.com/ url and login with your account:


## Customization

### Manifest Configuration

The `manifest.json` file is the central configuration for the extension. You can customize it to fit your needs:

- **Permissions**: Controls which permissions the extension has.  
- **Host Permissions**: Specifies which hosts the extension can interact with.  
- **Content Scripts**: Defines scripts that run on specified websites.

### Analysis Configuration

The `config.json` file allows you to customize the settings for content analysis:

- **model**: The OpenAI model to use (e.g., `"gpt-4o-mini"`).  
- **selector**: The CSS selector to determine which content is extracted from the webpage.  
- **context**: The instructions provided to ChatGPT for analyzing the content.

You can add any data you would need for your extension.

Example:

```json
{
  "model": "gpt-4o-mini",
  "selector": "#mainContent article article",
  "context": [
    "I'll send you the content of a web page, without HTML markup.",
    "In this page, you'll find all the following information:",
    "- The price (Price)",
    "- The size of the house (Size)",
    "- The size of the land (Land in m²)",
    "- If the house has dependencies (Dependencies)",
    "- if the house has a pool (Pool)",
    "You'll return the answer to these questions as following:",
    "- You'll answer only with the necessary and minimal data. One line per each information. The answer should first include the part that was used in parenthesis, then a tabulation character, then the answer.",
    "- When the question starts with 'If', you'll answer with 'Yes' or 'No'",
    "Here is an example of the answer with all the information you will find: ",
    "Price:t256000",
    "Land in m²:t150",
    "Dependencies:tYes"
  ]
}
```

## Usage

1. **Open a webpage:**

   Navigate to any webpage you want to analyze.

2. **Click the extension icon:**

   Click on the extension icon in the Chrome toolbar to open the popup.

3. **View Results:**

   The extension will display the structured response received from OpenAI.

## Files Overview

- **manifest.json**: Configuration file for the Chrome extension.  
- **background.js**: Contains the background script logic for handling requests.  
- **popup.html**: The popup interface that users interact with.  
- **content.js**: Content script to extract data from web pages.  
- **config.json**: Configuration file for OpenAI and program settings.  
- **images/**: Folder containing extension icons.  
- **fonts/**: Folder containing web fonts.

## Contributing

1. **Fork the repository**  
2. **Create a new branch:**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make your changes and commit them:**

   ```bash
   git commit -m 'Add your feature'
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/your-feature
   ```

5. **Create a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [OpenAI](https://platform.openai.com) for their powerful API.  
- [Google Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/) for guidance on creating Chrome extensions.
