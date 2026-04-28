# Coding Standards & Policy

## Version Control

### Git Workflow
- Work on separate branches for features
- Commit often with descriptive messages
- Pull request before merging to main

### Commit Message Format
```
type: short description

Detailed description (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Example
```
feat: add user profile page

- Created profile.html with edit functionality
- Added form validation
- Updated routes for profile saving
```

---

## Code Style

### HTML
- Use semantic HTML5 tags
- Include alt attributes for images
- Use lowercase for tags and attributes
- Indent with 2 spaces

### CSS
- Use meaningful class names (kebab-case)
- Group related properties
- Use CSS variables for colors
- Comment section headers

### JavaScript
- Use const/let, avoid var
- Use descriptive variable names
- Add comments for complex logic
- Use ES6+ features (arrow functions, template literals)

### Node.js/Express
- Use async/await for database operations
- Add error handling for all routes
- Log important events
- Use environment variables for sensitive data

---

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| HTML | lowercase | `browse.html` |
| CSS | lowercase | `style.css` |
| JS | lowercase | `site.js` |
| Images | lowercase with dashes | `hero-image.jpg` |
| Folders | lowercase | `css/` |

---

## Project Structure

```
Free_Sewaa/
├── html/           # HTML pages
├── css/            # Stylesheets
├── js/             # JavaScript files
├── server/          # Backend code
├── docs/           # Documentation
└── presentation/   # Presentation files
```

---

## Review Checklist

Before submitting PR:
- [ ] Code runs without errors
- [ ] No console errors
- [ ] Tested on local server
- [ ] Documentation updated if needed
- [ ] Commit messages are clear

---

## Security

- Never commit secrets/API keys
- Use .env for configuration
- Validate all user input
- Sanitize data before display

---

*Last Updated: Week 8 - Midterm*