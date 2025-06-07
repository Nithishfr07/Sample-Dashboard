# SaaS Dashboard

A modern, full-featured SaaS dashboard built with React, TypeScript, and Tailwind CSS. Features comprehensive user management, analytics, and a beautiful responsive design.

# Features

- **Authentication System** - Secure login/logout functionality
- **User Onboarding** - Multi-step onboarding process for new users
- **Responsive Dashboard** - Beautiful analytics dashboard with charts and metrics
- **Dark/Light Mode** - Toggle between dark and light themes
- **Grid/List Views** - Flexible layout options for data presentation
- **Team Management** - View and manage team members
- **Real-time Analytics** - Interactive charts and statistics
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Data Fetching**: TanStack Query
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd saas-dashboard
Install dependencies:
npm install
Start the development server:
npm run dev
Open http://localhost:5173 in your browser.
🏗️ Project Structure
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Chart.tsx       # Chart components
│   ├── Navbar.tsx      # Navigation bar
│   └── ...
├── context/            # React Context providers
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Onboarding.tsx  # User onboarding
│   └── ...
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── lib/                # Library configurations

🎨 Design System
The app uses a comprehensive design system defined in:
src/index.css - CSS custom properties and design tokens
tailwind.config.ts - Tailwind CSS configuration
Semantic color tokens for consistent theming
Responsive breakpoints and animations
🌙 Dark Mode
Toggle between light and dark themes using the theme switcher in the navigation bar. The app automatically saves your preference.
📱 Responsive Design
Fully responsive design that works on:
Desktop (1920px+)
Laptop (1024px+)
Tablet (768px+)
Mobile (320px+)
🔧 Available Scripts
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint
🚀 Deployment
Vercel (Recommended)
Push your code to GitHub
Connect your repository to Vercel
Deploy automatically on every push
Netlify
Build the project: npm run build
Deploy the dist folder to Netlify
Manual Deployment
Build the project: npm run build
Upload the dist folder to your hosting provider
🤝 Contributing
Fork the repository
Create a feature branch: git checkout -b feature-name
Commit changes: git commit -am 'Add feature'
Push to branch: git push origin feature-name
Submit a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments
shadcn/ui for the beautiful UI components
Tailwind CSS for the utility-first CSS framework
Recharts for the charting library
Lucide for the icon set
📞 Support
If you have any questions or need help, please open an issue on GitHub.

