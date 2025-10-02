# Contributing to WA API Message Node.JS

Thank you for your interest in contributing to WA API Message Node.JS! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/sendzen-io/wa-api-message-node.js.git
   cd wa-message-api.js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```


## How to Contribute

### Reporting Issues

- Use the [GitHub issue tracker](https://github.com/sendzen-io/wa-api-message-node.js/issues)
- Search existing issues before creating new ones
- Use the issue template for bug reports and feature requests
- Include steps to reproduce for bugs

### Submitting Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the pull request template
   - Link related issues
   - Provide a clear description of changes

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(whatsapp): add support for audio messages
fix(validation): improve phone number validation
docs: update README with new examples
```

### Testing

- Write unit tests for new functionality
- Ensure all tests pass before submitting
- Test with different Node.js versions if possible

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new public methods
- Update type definitions in `src/types/index.ts`

## Project Structure

```
src/
├── client/          # HTTP client implementation
├── core/            # Core SDK functionality
├── services/        # Service classes (WhatsApp, Template)
├── types/           # TypeScript type definitions
└── index.ts         # Main entry point

dist/                # Compiled JavaScript output
tests/               # Test files
docs/                # Documentation
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build artifacts

## Bug Reports

When reporting bugs, please include:

1. **Environment information**
   - Node.js version
   - npm version
   - Operating system

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior

3. **Code example**
   - Minimal code that reproduces the issue
   - Error messages or stack traces

4. **Additional context**
   - Any relevant configuration
   - Related issues or discussions

## Feature Requests

When requesting features, please include:

1. **Use case description**
   - What problem does this solve?
   - How would you use this feature?

2. **Proposed solution**
   - How should the feature work?
   - Any API design considerations?

3. **Alternatives considered**
   - Other ways to solve the problem
   - Why this approach is preferred

## Pull Request Process

1. **Before submitting**
   - Ensure all tests pass
   - Update documentation
   - Follow commit message conventions

2. **Pull request description**
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes

3. **Review process**
   - Address review feedback promptly
   - Keep PRs focused and small
   - Update PR if new commits are added

## Release Process

- Version numbers follow [Semantic Versioning](https://semver.org/)
- Releases are created from the `main` branch
- Changelog is automatically generated from commit messages

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## Getting Help

- **Documentation**: Check the [README.md](README.md)
- **Issues**: Search [existing issues](https://github.com/sendzen-io/wa-message-api.js/issues)
- **Discussions**: Use [GitHub Discussions](https://github.com/sendzen-io/wa-message-api.js/discussions)
- **Email**: Contact [milan@sendzen.io](mailto:milan@sendzen.io)

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to WA API Message Node.JS!
