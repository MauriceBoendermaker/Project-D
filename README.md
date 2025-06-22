# Logistics Dashboard Visualisation Tool

This project is a logistics data dashboard developed in React (TypeScript) and ASP.NET Core, focused on the evaluation and integration of advanced data visualisation tools. It was created as part of a university research project exploring the capabilities of various libraries in the context of large-scale logistical datasets.

## Tech Stack

- Frontend: React (TypeScript)
- Backend: ASP.NET Core (C#)
- Database: SQLite
- Styling: SCSS & Bootstrap
- Charts: Apache ECharts
- Maps: Leaflet
- Calendar: FullCalendar

## Prerequisites

- Node.js (v18 or higher)
- Yarn or npm
- .NET 8 SDK
- Visual Studio or VS Code
- Optional: Postman or Thunder Client

## Getting Started

### Frontend

1. Navigate to `prototype/dashboard`
2. Install dependencies:
    ```bash
    yarn install
    # or
    npm install
    ```
3. Create a `.env` file:
    ```ini
    PORT=5000
    SMTP_PASS=<your-smtp-password>
    ```
4. Start the app:
    ```bash
    yarn start
    # or
    npm start
    ```

### Backend

1. Navigate to `prototype/data-fetch-api`
2. Restore and run:
    ```bash
    dotnet restore
    dotnet run
    ```

API runs on `http://localhost:3000` and creates `DashboardData.db` automatically.

## Optional: Import Data

Uncomment the import block in `Program.cs` to load initial data from `data/*.json` into the SQLite database.

## Swagger

API documentation available at:  
`http://localhost:3000/swagger`

## Authentication

Login is enabled. Users and roles are managed via the backend.  
SMTP credentials are required in the frontend `.env`.
