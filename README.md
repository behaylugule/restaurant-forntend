# Restaurant SaaS Frontend

A modern, full-featured restaurant management system built with Next.js 15, TypeScript, and Tailwind CSS. This application provides both admin dashboard functionality for restaurant management and client-facing features for customers.



## 🚀 Features

### Admin Dashboard
- **Dashboard Analytics**: Real-time metrics, charts, and performance insights
- **Menu Management**: Create, update, and organize restaurant menus with categories
- **Order Management**: Track and manage customer orders
- **Dining Table Management**: Organize and manage restaurant seating
- **User Management**: Handle staff and customer accounts
- **Organization Management**: Multi-restaurant support
- **Chat System**: Customer support and communication
- **Feedback Management**: Collect and analyze customer feedback
- **Reports & Analytics**: Comprehensive business insights
### Client Features
- **Restaurant Discovery**: Browse restaurants by location
- **Menu Browsing**: View restaurant menus with categories and items
- **Shopping Cart**: Add items to cart and manage quantities
- **Order Placement**: Place orders with real-time updates
- **AI Assistance**: Chat-based customer support
- **Order Tracking**: Monitor order status and history
- **Interactive Maps**: Location-based restaurant discovery

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Charts**: Chart.js with React Chart.js 2
- **Maps**: Leaflet with React Leaflet
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── (client)/                # Client-facing routes
│   │   └── [restaurantId]/      # Restaurant-specific pages
│   ├── dashboard/               # Admin dashboard routes
│   ├── login/                   # Authentication pages
│   └── register/
├── components/                   # Reusable components
│   ├── admins/                  # Admin-specific components
│   ├── client/                  # Client-facing components
│   ├── ui/                      # Base UI components
│   └── commens/                 # Common components
├── lib/                         # Utilities and services
│   ├── services/                # API service layer
│   └── utils.ts
├── type/                        # TypeScript type definitions
├── hook/                        # Custom React hooks
└── utils/                       # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurantSaaS/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_CDN_URL=https://d36lcv4gslu2wd.cloudfront.net
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Architecture

### Authentication
- JWT-based authentication with refresh tokens
- Role-based access control (Admin, User)
- Protected routes with automatic redirects

### State Management
- **AuthContext**: User authentication and session management
- **CartContext**: Shopping cart state management
- **Local State**: Component-level state with React hooks

### API Integration
- Centralized API service layer in `lib/services/`
- Axios configuration with interceptors
- Type-safe API responses with TypeScript

### UI/UX
- Responsive design with Tailwind CSS
- Component library built on Radix UI
- Consistent design system
- Accessibility-first approach

## 🔧 Key Components

### Admin Components
- **Dashboard**: Analytics cards, charts, and metrics
- **Menu Management**: CRUD operations for menu items
- **Order Management**: Order tracking and status updates
- **User Management**: Staff and customer account management

### Client Components
- **Restaurant List**: Browse and filter restaurants
- **Menu Display**: Interactive menu with categories
- **Shopping Cart**: Add/remove items with quantity management
- **Order Tracking**: Real-time order status updates

### Common Components
- **Authentication**: Login/register forms
- **Navigation**: Sidebar and top navigation
- **UI Elements**: Buttons, forms, modals, tables

## 🌐 API Integration

The application integrates with a backend API providing:

- **User Management**: Authentication, profiles, roles
- **Restaurant Data**: Menus, categories, locations
- **Order Processing**: Order creation, tracking, updates
- **Analytics**: Dashboard metrics and reports
- **File Management**: Image uploads and CDN integration

## 🎨 Styling

- **Tailwind CSS 4**: Utility-first CSS framework
- **Custom Components**: Reusable UI components
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme support (configurable)

## 📊 Features Overview

### For Restaurant Owners
- Complete restaurant management dashboard
- Real-time order tracking
- Menu and inventory management
- Customer feedback and analytics
- Multi-location support

### For Customers
- Easy restaurant discovery
- Interactive menu browsing
- Seamless ordering experience
- Order tracking and history
- AI-powered customer support

## 🔒 Security

- JWT token-based authentication
- Protected API routes
- Input validation with Zod
- XSS protection
- CSRF protection

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Ensure all required environment variables are set:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_CDN_URL`: CDN URL for assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---




Built with ❤️ using Next.js, TypeScript, and modern web technologies.
