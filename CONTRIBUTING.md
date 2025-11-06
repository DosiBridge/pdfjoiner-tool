# Contributing to PDF Joiner Pro

Thank you for your interest in contributing to PDF Joiner Pro! This document provides guidelines and instructions for contributing to this open-source project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Requesting Features](#requesting-features)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow. Please be respectful, inclusive, and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/dosibridge/pdf-joiner-pro/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, browser, versions)
   - Screenshots if applicable

### Suggesting Features

1. Check existing feature requests
2. Create an issue with:
   - Clear description of the feature
   - Use case and benefits
   - Potential implementation approach (if you have ideas)

### Contributing Code

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your settings
python app/main.py
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your settings
npm run dev
```

## Coding Standards

### Backend (Python)

- Follow [PEP 8](https://pep8.org/) style guidelines
- Use type hints where possible
- Write docstrings for all functions and classes
- Use meaningful variable and function names
- Keep functions focused and single-purpose

**Code Formatting:**
```bash
# Use black for formatting
black app/

# Use flake8 for linting
flake8 app/
```

### Frontend (React/JavaScript)

- Follow React best practices
- Use functional components with hooks
- Prefer named exports over default exports
- Use meaningful component and variable names
- Keep components focused and reusable

**Code Formatting:**
```bash
# Run ESLint
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### General Guidelines

- Write clear, self-documenting code
- Add comments for complex logic
- Keep commits focused and atomic
- Write tests for new features
- Update documentation as needed

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(upload): Add drag-and-drop file upload

- Implement drag-and-drop functionality
- Add visual feedback during drag
- Update file validation logic

Closes #123
```

```
fix(merge): Resolve page ordering issue

The page reordering was not working correctly when
merging PDFs with overlapping page numbers.

Fixes #456
```

## Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Add/update code comments
   - Update API documentation if applicable

2. **Add Tests**
   - Add tests for new features
   - Ensure all tests pass
   - Maintain or improve code coverage

3. **Check Code Quality**
   - Run linters
   - Fix all warnings
   - Ensure code follows style guidelines

4. **Write Clear Description**
   - Describe what changes you made
   - Explain why you made them
   - Reference related issues

5. **Request Review**
   - Tag relevant reviewers
   - Be responsive to feedback
   - Make requested changes promptly

## Reporting Issues

### Bug Reports

Include:
- **Title**: Clear, descriptive title
- **Description**: What happened vs what you expected
- **Steps to Reproduce**: Detailed steps
- **Environment**: OS, browser, versions
- **Screenshots**: If applicable
- **Logs**: Error messages or console output

### Security Issues

**⚠️ Do NOT report security vulnerabilities publicly!**

Instead, email security concerns to: security@dosibridge.com

## Requesting Features

When requesting features, include:
- **Use Case**: Why is this feature needed?
- **Description**: What should the feature do?
- **Mockups**: Visual designs if applicable
- **Alternatives**: Have you considered alternatives?

## Getting Help

- **Documentation**: Check README files
- **Issues**: Search existing issues
- **Discussions**: Use GitHub Discussions for questions
- **Email**: contact@dosibridge.com

## Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Acknowledged in the project

Thank you for contributing to PDF Joiner Pro! 🎉

---

**Made with ❤️ by [DosiBridge](https://dosibridge.com)**

