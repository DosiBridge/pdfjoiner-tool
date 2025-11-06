# PDF Joiner Pro - Backend API

<div align="center">

![PDF Joiner Pro](https://img.shields.io/badge/PDF%20Joiner-Pro-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?style=for-the-badge&logo=flask)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**RESTful API for Professional PDF Management - Merge, process, and manage PDF files**

[API Documentation](#-api-endpoints) • [Installation](#-installation) • [Usage](#-usage) • [Development](#-development) • [Contributing](#-contributing)

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

</div>

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 🎯 About

**PDF Joiner Pro Backend** is a robust Flask-based REST API for processing and managing PDF files. It provides secure file uploads, page selection, PDF merging with advanced features like watermarks and password protection, and automatic thumbnail generation.

This project is part of the [DosiBridge](https://dosibridge.com) open-source initiative, providing professional-grade PDF management tools to the community.

## ✨ Features

### Core Functionality
- 📄 **Secure File Upload** - Upload and validate PDF files (up to 20 files, 50MB each)
- 🖼️ **Thumbnail Generation** - Automatic thumbnail generation for PDF pages
- 📑 **PDF Metadata Extraction** - Extract page count, file size, and other metadata
- 🔀 **PDF Merging** - Merge multiple PDFs with selective page inclusion
- 📝 **Page Selection** - Select specific pages from each PDF for merging

### Advanced Features
- 🔒 **Password Protection** - Add password protection to merged PDFs
- 💧 **Watermarking** - Add custom text watermarks to PDFs
- 🔢 **Page Numbering** - Automatic page numbering in merged documents
- 📊 **Session Management** - Secure session-based file management
- 🧹 **Automatic Cleanup** - Scheduled cleanup of old sessions and temporary files

### Security & Performance
- 🔐 **File Validation** - MIME type and content validation
- 🛡️ **Rate Limiting** - Configurable rate limiting per endpoint
- 🌐 **CORS Support** - Configurable cross-origin resource sharing
- ⚡ **Async Processing** - Background job processing for large operations
- 📈 **Logging** - Comprehensive logging for debugging and monitoring

## 🛠️ Tech Stack

- **Framework**: [Flask](https://flask.palletsprojects.com/) 3.0.0
- **PDF Processing**: [pypdf](https://pypdf.readthedocs.io/) 3.17.4
- **Image Processing**: [pdf2image](https://github.com/Belval/pdf2image) 1.16.3, [Pillow](https://pillow.readthedocs.io/) 10.2.0
- **Validation**: [Pydantic](https://docs.pydantic.dev/) 2.5.2
- **Security**: [Flask-CORS](https://flask-cors.readthedocs.io/) 4.0.0, [Flask-Limiter](https://flask-limiter.readthedocs.io/) 3.5.0
- **Scheduling**: [APScheduler](https://apscheduler.readthedocs.io/) 3.10.4
- **Server**: [Gunicorn](https://gunicorn.org/) 21.2.0
- **Environment**: [python-dotenv](https://github.com/theskumar/python-dotenv) 1.0.0

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python** >= 3.8
- **pip** (Python package installer)
- **poppler-utils** (for PDF to image conversion)
  - **Ubuntu/Debian**: `sudo apt-get install poppler-utils`
  - **macOS**: `brew install poppler`
  - **Windows**: Download from [poppler-windows](https://github.com/oschwartz10612/poppler-windows/releases)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DosiBridge/pdfjoiner-tool.git
   cd pdfjoiner-tool/backend
   ```

2. **Create a virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Upgrade pip**
   ```bash
   pip install --upgrade pip setuptools wheel
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and customize the settings:
   - **SECRET_KEY**: Generate a secure key for production
   - **CORS_ORIGINS**: Add your frontend URL(s)
   - **DEBUG**: Set to `False` in production
   - Other settings as needed
   
   > **Note**: See `.env.example` for all available configuration options with detailed comments.

## ⚙️ Configuration

The application uses environment variables for configuration. Key settings:

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Flask secret key | `dev-secret-key-change-in-production` |
| `DEBUG` | Debug mode | `True` |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `5000` |
| `MAX_FILE_SIZE` | Maximum file size in bytes | `52428800` (50MB) |
| `MAX_FILES_PER_REQUEST` | Maximum files per upload | `20` |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:3000,http://localhost:5173` |
| `RATE_LIMIT` | Rate limit per endpoint | `100/hour` |
| `CLEANUP_INTERVAL` | Cleanup interval in seconds | `3600` (1 hour) |

All configuration is managed through `config.py` and can be overridden via environment variables.

## 💻 Usage

### Development Mode

Run the development server:

```bash
python app/main.py
```

Or using Flask's development server:

```bash
export FLASK_APP=app/main.py
export FLASK_ENV=development
flask run
```

The API will be available at `http://localhost:5000`

### Production Mode

Using Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app.main:app
```

Or with custom configuration:

```bash
gunicorn -c gunicorn.conf.py app.main:app
```

### Using the Startup Script

```bash
# From project root
./run_backend.sh
```

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Check API health status

### File Upload
- **POST** `/api/upload` - Upload PDF files
  - Multipart form data with `files[]` array
  - Optional `session_id` parameter

### PDF Preview
- **GET** `/api/pdf/<session_id>/<file_id>/thumbnail/<page_number>` - Get page thumbnail
- **POST** `/api/pdf/<session_id>/<file_id>/thumbnails` - Generate all thumbnails
- **GET** `/api/pdf/<session_id>/<file_id>/metadata` - Get PDF metadata

### Session Management
- **GET** `/api/session/<session_id>/files` - List session files
- **DELETE** `/api/session/<session_id>/file/<file_id>` - Delete a file
- **DELETE** `/api/session/<session_id>` - Clean up entire session

### PDF Merging
- **POST** `/api/merge` - Merge PDFs with selected pages
  - Request body: `MergeRequest` schema
  - Returns: Job ID for async processing

### Job Status
- **GET** `/api/job/<job_id>/status` - Get merge job status
- **GET** `/api/download/<job_id>` - Download merged PDF

### Request/Response Examples

#### Upload Files
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf" \
  -F "session_id=your-session-id"
```

#### Merge PDFs
```bash
curl -X POST http://localhost:5000/api/merge \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "session-123",
    "selections": [
      {
        "file_id": "file-1",
        "pages": [1, 2, 3]
      }
    ],
    "output_filename": "merged.pdf",
    "add_page_numbers": true,
    "watermark_text": "Confidential",
    "password": "optional-password"
  }'
```

## 🏗️ Development

### Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Application entry point
│   ├── models/
│   │   └── schemas.py       # Pydantic models
│   ├── routes/
│   │   ├── upload.py        # File upload endpoints
│   │   ├── merge.py         # PDF merge endpoints
│   │   └── preview.py       # Preview/thumbnail endpoints
│   ├── services/
│   │   ├── pdf_processor.py      # PDF processing logic
│   │   ├── thumbnail_generator.py # Thumbnail generation
│   │   └── file_manager.py       # File management
│   └── utils/
│       ├── validators.py    # File validation
│       ├── security.py      # Security utilities
│       └── helpers.py       # Helper functions
├── config.py                # Configuration
├── requirements.txt         # Python dependencies
├── .env                     # Environment variables (not in git)
└── logs/                    # Application logs
```

### Key Components

- **main.py** - Flask application initialization and route registration
- **pdf_processor.py** - Core PDF merging and processing logic
- **thumbnail_generator.py** - PDF to image conversion for thumbnails
- **file_manager.py** - Session and file lifecycle management
- **validators.py** - File validation and security checks
- **schemas.py** - Request/response data models using Pydantic

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-cov

# Run tests
pytest

# With coverage
pytest --cov=app
```

### Code Style

Follow PEP 8 style guidelines:
- Use `black` for code formatting
- Use `flake8` or `pylint` for linting
- Type hints are encouraged

## 🔒 Security

### File Validation
- MIME type checking
- File extension validation
- Content-based PDF validation
- File size limits

### Rate Limiting
- Configurable per-endpoint limits
- Default: 100 requests per hour
- Customizable via `RATE_LIMIT` environment variable

### CORS
- Configurable allowed origins
- Set via `CORS_ORIGINS` environment variable

### Session Management
- Secure session IDs
- Automatic cleanup of old sessions
- Temporary file management

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   pytest
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 style guidelines
- Write docstrings for all functions and classes
- Add type hints where possible
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- **Website**: [DosiBridge](https://dosibridge.com)
- **GitHub Repository**: [DosiBridge/pdfjoiner-tool](https://github.com/DosiBridge/pdfjoiner-tool)
- **Issues**: [GitHub Issues](https://github.com/DosiBridge/pdfjoiner-tool/issues)
- **Main Documentation**: [Main README](../README.md)
- **Documentation Index**: [DOCUMENTATION.md](../DOCUMENTATION.md)
- **Frontend Documentation**: [Frontend README](../frontend/README.md)
- **Docker Guide**: [DOCKER.md](../DOCKER.md)
- **Production Deployment**: [PRODUCTION_DEPLOYMENT.md](../PRODUCTION_DEPLOYMENT.md)

## 🙏 Acknowledgments

- [Flask](https://flask.palletsprojects.com/) - The web framework
- [pypdf](https://pypdf.readthedocs.io/) - PDF processing library
- [pdf2image](https://github.com/Belval/pdf2image) - PDF to image conversion
- [DosiBridge](https://dosibridge.com) - For supporting open source

## 🐛 Troubleshooting

### Common Issues

**Issue**: `pdf2image` fails to convert PDFs
- **Solution**: Install poppler-utils (see Prerequisites)

**Issue**: Port 5000 already in use
- **Solution**: Change `PORT` environment variable or kill the process using the port

**Issue**: CORS errors
- **Solution**: Add your frontend URL to `CORS_ORIGINS` environment variable

**Issue**: File size limit exceeded
- **Solution**: Increase `MAX_FILE_SIZE` in environment variables

---

<div align="center">

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#pdf-joiner-pro---backend-api)

</div>

