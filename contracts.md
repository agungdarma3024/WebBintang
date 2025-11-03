# API Contracts - Bintang Solusindo Abadi Website

## Backend Implementation Overview

### Data Storage
- **Storage Type**: File-based (JSON files)
- **Location**: `/app/backend/data/`
- **Files**:
  - `contacts.json` - Stores contact form submissions
  - `portfolio.json` - Stores portfolio items

### API Endpoints

All endpoints are prefixed with `/api`

#### 1. Root Endpoint
- **URL**: `GET /api/`
- **Description**: Health check endpoint
- **Response**:
  ```json
  {
    "message": "Welcome to Bintang Solusindo Abadi API"
  }
  ```

#### 2. Submit Contact Form
- **URL**: `POST /api/contact`
- **Description**: Submit a new contact form message
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string (valid email)",
    "phone": "string (optional)",
    "message": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "CNT-20240103120000",
    "name": "string",
    "email": "string",
    "phone": "string",
    "message": "string",
    "timestamp": "2024-01-03T12:00:00",
    "status": "new"
  }
  ```

#### 3. Get All Contacts
- **URL**: `GET /api/contacts`
- **Description**: Retrieve all contact messages
- **Response**: Array of contact objects

#### 4. Get Portfolio
- **URL**: `GET /api/portfolio`
- **Description**: Retrieve all portfolio items
- **Response**: Array of portfolio items

#### 5. Get Portfolio by Category
- **URL**: `GET /api/portfolio/{category}`
- **Description**: Retrieve portfolio items filtered by category
- **Parameters**: 
  - `category`: "all", "MICE", "Multimedia", "Ceremonies", "Workshops"
- **Response**: Array of filtered portfolio items

## Frontend Integration

### What Needs to be Updated

1. **Contact Component** (`/app/frontend/src/components/Contact.jsx`)
   - Remove mock submission
   - Add API call to `POST /api/contact`
   - Handle success/error responses

2. **Portfolio Component** (`/app/frontend/src/components/Portfolio.jsx`)
   - Remove mock data import
   - Fetch data from `GET /api/portfolio` on component mount
   - Update state with real data

3. **Mock Data File** (`/app/frontend/src/data/mock.js`)
   - Can be removed after integration

### Implementation Steps

1. ✅ Backend created with file-based storage
2. ⏳ Update Contact component to use real API
3. ⏳ Update Portfolio component to use real API
4. ⏳ Remove mock data dependencies
5. ⏳ Test end-to-end functionality

## Data Persistence

- Contact submissions are automatically saved to `contacts.json`
- Portfolio data is initialized from predefined data and stored in `portfolio.json`
- All data persists between server restarts
- Data files are human-readable JSON format for easy editing

## Error Handling

- Backend validates all input data
- Returns appropriate HTTP status codes
- Logs all errors for debugging
- Frontend should handle API errors gracefully with user-friendly messages
