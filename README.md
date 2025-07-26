# Video Monitoring Dashboard

A modern, responsive dashboard template built with React, TailwindCSS, and Vite. This flexible dashboard provides video stream monitoring capabilities with customizable controls and multiple viewing modes.

## Live Demo

Check out the live demo: [https://ai-video-monitor.netlify.app/](https://ai-video-monitor.netlify.app/)

<img width="927" height="923" alt="image" src="https://github.com/user-attachments/assets/b48827a5-ce5c-4348-bb84-2d33fd0243f6" />

## Features

- **Multi-Stream Video Display**: Grid layout supporting multiple video streams
- **Customizable Controls**: Toggle various features and settings
- **Multiple Modes**: Switch between different monitoring scenarios
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live status indicators and controls
- **Modern UI**: Clean, intuitive interface with TailwindCSS styling

## Technology Stack

- **Frontend Framework**: React 18
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Package Manager**: npm
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/855princekumar/ai-video-monitoring.git
cd ai-video-monitoring
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
ai-video-monitoring/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── VideoGrid/
│   │   ├── Controls/
│   │   ├── ModeSelector/
│   │   └── StatusIndicator/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Usage

### Video Stream Management

The dashboard displays video streams in a responsive grid layout. You can:

- View multiple video feeds simultaneously
- Switch between different sources
- Adjust grid layout based on number of active streams

### Control Panel

Toggle different features using the control panel:

```javascript
// Example of feature toggle states
const [features, setFeatures] = useState({
  feature1: false,
  feature2: false,
  feature3: false
});
```

### Monitoring Modes

Select from predefined monitoring scenarios:

- **Mode 1**: Campus monitoring configuration
- **Mode 2**: Traffic monitoring setup  
- **Mode 3**: Wildlife observation layout

## Backend Integration

This dashboard template is designed for easy integration with any backend system. Customize the API endpoints and data structure according to your needs.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```

### Customization

The dashboard is built as a flexible template that can be easily modified:

- **API Integration**: Update the service layer to match your backend structure
- **Feature Controls**: Modify toggle switches and controls as needed
- **Data Models**: Adapt data structures to your specific use case
- **Styling**: Customize colors, layouts, and components using TailwindCSS

## Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables in Netlify dashboard

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

**Author**: Prince Kumar

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Prince Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
