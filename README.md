# PDF Joiner Pro

<div align="center">

![PDF Joiner Pro](https://img.shields.io/badge/PDF%20Joiner-Pro-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)

**Professional PDF Management Tool - Merge, reorder, and manage PDF files with ease**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

[![GitHub stars](https://img.shields.io/github/stars/dosibridge/pdf-joiner-pro?style=social)](https://github.com/dosibridge/pdf-joiner-pro)
[![GitHub forks](https://img.shields.io/github/forks/dosibridge/pdf-joiner-pro?style=social)](https://github.com/dosibridge/pdf-joiner-pro)

</div>

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 🎯 About

**PDF Joiner Pro** is a modern, full-stack web application for managing and merging PDF files. Built with React (frontend) and Flask (backend), it provides an intuitive interface for uploading PDFs, selecting specific pages, reordering them, and merging with advanced options like watermarks and password protection.

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

## 🏗️ Architecture

This project consists of two main components:

### Frontend (`/frontend`)
- **Technology**: React 18, Vite, Tailwind CSS
- **Port**: 3000 (development)
- **Documentation**: [Frontend README](frontend/README.md)

### Backend (`/backend`)
- **Technology**: Flask, Python 3.8+
- **Port**: 5000 (development)
- **Documentation**: [Backend README](backend/README.md)

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Python** >= 3.8
- **poppler-utils** (for PDF to image conversion)
  - Ubuntu/Debian: `sudo apt-get install poppler-utils`
  - macOS: `brew install poppler`
  - Windows: [Download here](https://github.com/oschwartz10612/poppler-windows/releases)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dosibridge/pdf-joiner-pro.git
   cd pdf-joiner-pro
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your settings
   python app/main.py
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your settings
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

For detailed setup instructions, see:
- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)

## 📚 Documentation

- **[Frontend README](frontend/README.md)** - Frontend setup, development, and usage
- **[Backend README](backend/README.md)** - Backend API documentation and setup
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project
- **[Security Policy](SECURITY.md)** - Security guidelines and reporting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Code of Conduct](CONTRIBUTING.md#code-of-conduct) before contributing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](frontend/LICENSE) file for details.

## 💬 Support

- **Website**: [DosiBridge](https://dosibridge.com)
- **Issues**: [GitHub Issues](https://github.com/dosibridge/pdf-joiner-pro/issues)
- **Email**: contact@dosibridge.com
- **Security**: security@dosibridge.com (for security vulnerabilities)

## 🙏 Acknowledgments

- [React](https://react.dev/) - The UI library
- [Flask](https://flask.palletsprojects.com/) - The web framework
- [Vite](https://vitejs.dev/) - The build tool
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework
- [pypdf](https://pypdf.readthedocs.io/) - PDF processing library
- [DosiBridge](https://dosibridge.com) - For supporting open source

---

<div align="center">

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#pdf-joiner-pro)

</div>

