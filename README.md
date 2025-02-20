# vdsp_Backend

**Vidura De Silva Photography (vdsp)** is a comprehensive photographic management system designed to streamline event reservations, team allocations, and payment processing. This backend serves as the backbone of the system, ensuring smooth operations for both users and staff members.

## Features

- **Event Reservations:** Users can book events with ease through the system.
- **Team Allocation:** Staff members can efficiently allocate teams to reserved events.
- **Payment Processing:** Integrated with PayHere sandbox payment gateway to facilitate secure and seamless transactions.
- **User Authentication:** Firebase authentication for secure and reliable user management.

## Technology Stack

### Backend Framework:
- **.NET 9 ASP.NET Core**
- **Entity Framework** for ORM (Object-Relational Mapping)

### Database:
- **MySQL** for structured data storage

### Authentication:
- **Firebase Authentication**

### Payment Gateway:
- **PayHere Sandbox**

### Architecture:
- **Clean Architecture Design**

## System Architecture
The backend follows a modular and scalable clean architecture approach, ensuring separation of concerns and ease of maintenance. Key layers include:

1. **Presentation Layer:** Handles incoming API requests.
2. **Application Layer:** Contains business logic and use case implementations.
3. **Domain Layer:** Core system abstractions and domain models.
4. **Infrastructure Layer:** Manages database and external services like Firebase and PayHere integrations.

## Installation and Setup

### Prerequisites:
- Install **.NET 9 SDK**.
- Set up **MySQL** server.
- Configure **Firebase** project for authentication.

### Steps:
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd vdsp_Backend
   ```
2. Configure the application settings:
   - Update `appsettings.json` with:
     - Database connection string
     - Firebase configuration
     - PayHere API keys
3. Restore dependencies:
   ```bash
   dotnet restore
   ```
4. Run database migrations:
   ```bash
   dotnet ef database update
   ```
5. Start the backend server:
   ```bash
   dotnet run
   ```

## API Endpoints


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



