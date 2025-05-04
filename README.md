# Campus Caution

A web-based issue tracking system designed for university campuses, enabling staff to efficiently report, track, and manage campus-related issues with department-based access control and a modern user interface.

## Features

- **Department-Based Access Control**
  - Users can only view and manage issues relevant to their department
  - Mock authentication system with department-specific users
  - Persistent login sessions

- **Issue Management**
  - Real campus building coordinates for accurate mapping
  - Status tracking (Open, In Review, Resolved)
  - Priority levels (Urgent, High, Medium)
  - Creation date tracking
  - Search functionality

- **User Interface**
  - Modern, responsive design
  - Interactive campus map using Leaflet
  - Visual status progression
  - Resolved issues highlighting
  - Detailed issue modal with all information

- **Multilingual Support**
  - Bilingual interface (Turkish/English)
  - Easy language switching
  - Localized content

- **Notification System**
  - Latest 5 issues display
  - Quick access to issue details
  - Status and date information

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd campus-caution
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run serve
```

4. Build for production:
```bash
npm run build
```

## Development

### Available Scripts

- `npm run serve` - Compiles and hot-reloads for development
- `npm run build` - Compiles and minifies for production
- `npm run lint` - Lints and fixes files

### Project Structure

```
campus-caution/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── store/
│   ├── i18n/
│   └── App.vue
├── package.json
└── README.md
```

## Future Enhancements

- Backend/API integration
- Real-time updates
- Role-based access management
- Advanced filtering and sorting
- User profile management
- Email/push notifications
- Issue assignment system
- Audit logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/yourusername/campus-caution](https://github.com/yourusername/campus-caution)
