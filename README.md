---

# LLM Wrapper Chat

## Overview

LLM Wrapper Chat is an interactive web application that enables users to engage with a Large Language Model (LLM) using a user-friendly interface. This project utilizes **Next.js**, **React**, and **Zustand** for state management, along with **Tailwind CSS** for styling.

## Features

- **WYSIWYG editor** using React Quill for user input with formatting capabilities.
- Seamless interaction with **Hugging Face's LLM models** via API integration.
- **Custom command handling**, including URL scraping with `[include-url]` syntax.
- **Modal interface** for easy command generation.
- **Advanced mode** for customizing URL scraping parameters.
- **Abort functionality** for stopping ongoing LLM requests.
- Editable previous messages with **re-prompting capability**.

## Technologies Used

- **Frontend**: React, Next.js, Zustand (state management)
- **Styling**: Tailwind CSS
- **WYSIWYG Editor**: React Quill
- **LLM API**: Hugging Face
- **Web Scraping**: Cheerio
- **Deployment**: Vercel (free tier plan)
- **CI/CD**: Integrated using Vercel

## Getting Started

1. Clone the repository using:
   ```bash
   git clone https://github.com/toluhikay/uni-nicosia-test
   ```
2. Install dependencies using:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Start the development server using:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
4. Access the application at: [http://localhost:3000](http://localhost:3000)

## Usage

1. Open the application in a web browser.
2. Enter a message in the **React Quill editor**.
3. Use custom commands, such as `[include-url]`, to enhance prompts.
4. Click send to interact with the LLM model.
5. Edit previous messages and **re-prompt** the LLM.

## Custom Commands

- `[include-url]`: Scrapes content from a specified URL using **Cheerio**.
  - **Syntax**:
    ```
    [include-url: URL max_execution_time:300 filter:true store:true]
    ```
  - **Advanced mode**: Customize parameters (max_execution_time, filter, store).

---
