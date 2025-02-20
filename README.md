# vdsp_Frontend

**Vidura De Silva Photography (vdsp)** frontend is a modern and responsive interface for the photographic management system. Built with React, Vite, and TypeScript, it ensures a fast and scalable user experience.

## Features

- **Modern UI Framework:** Built using Tailwind CSS for highly customizable and responsive designs.
- **User Authentication:** Integrated Firebase Authentication for secure and efficient user management.
- **Code Organization:**
  - **Components:** Reusable UI components.
  - **Pages:** Views for different routes in the application.
  - **Utils:** Utility functions for validation and API integration.
- **Efficient Code Management:** Uses `index.tsx` files in each folder for streamlined imports and exports.

## Technology Stack

### Frontend Framework:
- **React** with **Vite** for a fast development experience.
- **TypeScript** for type safety and maintainable code.

### Styling:
- **Tailwind CSS** for utility-first styling.

### Authentication:
- **Firebase Authentication** for login and user management.

## Project Structure

```
vdsp_frontend/
|-- src/
|   |-- components/     # Reusable UI components
|   |   |-- index.tsx   # Exports all components in this folder
|   |-- pages/          # Views for application routes
|   |   |-- index.tsx   # Exports all pages in this folder
|   |-- utils/          # Utility functions (validation, API calls)
|   |   |-- index.tsx   # Exports all utilities in this folder
|   |-- App.tsx         # Main application component
|   |-- main.tsx        # Entry point for the application
|-- public/             # Static assets
|-- tailwind.config.js  # Tailwind CSS configuration
|-- vite.config.ts      # Vite configuration
```

## Installation and Setup

### Prerequisites:
- Install **Node.js** (v16 or later).
- Set up a **Firebase** project for authentication.

### Steps:
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd vdsp_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add your Firebase configuration:
     ```env
     VITE_FIREBASE_API_KEY=<your-api-key>
     VITE_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
     VITE_FIREBASE_PROJECT_ID=<your-project-id>
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

## Key Features

### Components:
- **Reusable and Modular Design:** Components are designed to be reusable across the application.
- **Centralized Exports:** Each folder includes an `index.tsx` file for exporting all components, simplifying imports.

### Pages:
- **Dedicated Views:** Each page represents a route in the application.
- **Dynamic Navigation:** Easily extendable for new routes and views.

### Utilities:
- **Validation Functions:** Includes common validation utilities for forms and user input.
- **API Integration:** Utility functions for interacting with backend APIs.

## Contribution Guidelines
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the [MIT License](LICENSE).



