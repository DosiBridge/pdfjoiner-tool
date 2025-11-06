# PDF Joiner Pro - Frontend

<div align="center">

![PDF Joiner Pro](https://img.shields.io/badge/PDF%20Joiner-Pro-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Professional PDF Management Tool - Merge, reorder, and manage PDF files with ease**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Development](#-development) • [Contributing](#-contributing)

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

</div>

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 🎯 About

**PDF Joiner Pro** is a modern, responsive web application for managing and merging PDF files. Built with React and Vite, it provides an intuitive interface for uploading PDFs, selecting specific pages, reordering them, and merging with advanced options like watermarks and password protection.

This project is part of the [DosiBridge](https://dosibridge.com) open-source initiative, providing professional-grade PDF management tools to the community.

## ✨ Features

### Core Functionality
- 📄 **Multi-file Upload** - Upload up to 20 PDF files simultaneously (50MB each)
- 🖼️ **Page Preview** - Visual thumbnail previews for all PDF pages
- ✅ **Selective Page Selection** - Choose specific pages from each PDF
- 🔄 **Drag & Drop Reordering** - Intuitively reorder pages before merging
- 🔀 **PDF Merging** - Combine selected pages into a single PDF

### Advanced Options
- 📝 **Custom Output Filename** - Name your merged PDF
- 🔢 **Page Numbering** - Optional automatic page numbers
- 💧 **Watermarking** - Add custom text watermarks
- 🔒 **Password Protection** - Secure your PDFs with passwords

### User Experience
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- ⚡ **Fast Performance** - Optimized with Vite for lightning-fast builds
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS
- 🔔 **Real-time Feedback** - Toast notifications for all actions
- 📊 **Progress Tracking** - Visual indicators for uploads and merges

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) 18.2.0
- **Build Tool**: [Vite](https://vitejs.dev/) 5.0.8
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.3.6
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **File Upload**: [React Dropzone](https://react-dropzone.js.org/)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **yarn** / **pnpm**)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dosibridge/pdf-joiner-pro.git
   cd pdf-joiner-pro/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables** (optional)
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and customize the settings:
   - **VITE_API_URL**: API endpoint URL (default: `/api` uses proxy)
   - **VITE_API_TARGET**: Backend URL for proxy (default: `http://localhost:5000`)
   - **VITE_DEV_SERVER_PORT**: Development server port (default: `3000`)
   - Other settings as needed
   
   > **Note**: See `.env.example` for all available configuration options with detailed comments.
   > 
   > **For Development**: The default `/api` uses Vite's proxy. No configuration needed if backend runs on `localhost:5000`.
   > 
   > **For Production**: Set `VITE_API_URL` to your production API URL (e.g., `https://api.example.com/api`).

## 💻 Usage

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build for production:

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🏗️ Development

### Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── DownloadManager.jsx
│   │   ├── FileList.jsx
│   │   ├── FileUploader.jsx
│   │   ├── MergeOptions.jsx
│   │   ├── PageReorderer.jsx
│   │   └── PageSelector.jsx
│   ├── services/            # API services
│   │   └── api.js
│   ├── utils/              # Utility functions
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

### Key Components

- **App.jsx** - Main application component managing state and workflow
- **FileUploader** - Drag & drop file upload with validation
- **PageSelector** - Visual page selection with thumbnails
- **PageReorderer** - Drag & drop page reordering
- **MergeOptions** - Configuration for merge operations
- **DownloadManager** - Download status and progress tracking

### API Integration

The frontend communicates with a Flask backend API. Ensure the backend is running on `http://localhost:5000` (or configure via `VITE_API_URL`).

### Styling Guidelines

- Uses Tailwind CSS utility classes
- Responsive breakpoints: `xs` (475px), `sm` (640px), `md` (768px), `lg` (1024px)
- Custom components defined in `src/index.css`
- Color scheme uses primary blue palette

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow React best practices and hooks patterns
- Write clean, readable code with meaningful variable names
- Add comments for complex logic
- Ensure responsive design works on all screen sizes
- Test your changes thoroughly before submitting

### Code Style

- Use ESLint for code quality checks
- Follow existing code formatting
- Use functional components with hooks
- Prefer named exports over default exports where appropriate

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- **Website**: [DosiBridge](https://dosibridge.com)
- **Issues**: [GitHub Issues](https://github.com/dosibridge/pdf-joiner-pro/issues)
- **Documentation**: Check the `/docs` folder for detailed API documentation

## 🙏 Acknowledgments

- [React](https://react.dev/) - The UI library
- [Vite](https://vitejs.dev/) - The build tool
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework
- [DosiBridge](https://dosibridge.com) - For supporting open source

---

<div align="center">

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#pdf-joiner-pro---frontend)

</div>

