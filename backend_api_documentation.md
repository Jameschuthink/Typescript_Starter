# Backend API Documentation for Client-Side Integration

## API Base Information

- **Base URL**: `http://localhost:8080` (development)
- **Port**: 8080
- **CORS Configuration**: Configured to allow `http://localhost:3000`
- **Response Format**: ServiceResponse wrapper pattern
- **Authentication**: None currently implemented (open endpoints)

## Data Models and Schemas

### User Model

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### ServiceResponse Format

All API responses follow this structure:

```typescript
interface ServiceResponse<T> {
  success: boolean;
  message: string;
  responseObject: T | null;
  statusCode: number;
}
```

### Zod Validation Schemas

```typescript
// Current UserSchema (for reference)
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for GET users/:id
const GetUserSchema = z.object({
  params: z.object({ id: z.string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number") })
});
```

## Available API Endpoints

### GET /users

**Description**: Retrieve all users

**Request**:
- Method: GET
- URL: `/users`
- Headers: None required
- Body: None

**Response**:
```json
{
  "success": true,
  "message": "Users found",
  "responseObject": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com",
      "age": 42,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-06T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Robert",
      "email": "Robert@example.com",
      "age": 21,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-06T00:00:00.000Z"
    }
  ],
  "statusCode": 200
}
```

**Error Responses**:
- 404: No users found
- 500: Internal server error

### GET /users/:id

**Description**: Retrieve a specific user by ID

**Request**:
- Method: GET
- URL: `/users/:id` (e.g., `/users/1`)
- Headers: None required
- Body: None

**Parameters**:
- `id` (path parameter): User ID (must be positive number)

**Response**:
```json
{
  "success": true,
  "message": "User found",
  "responseObject": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "age": 42,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-06T00:00:00.000Z"
  },
  "statusCode": 200
}
```

**Error Responses**:
- 400: Invalid ID format
- 404: User not found
- 500: Internal server error

## API Integration Requirements

### CORS Configuration

The backend is configured with:
- Allowed Origin: `http://localhost:3000`
- Credentials: `true`
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed Headers: Content-Type, Authorization

### Request Requirements

1. **Headers**:
   - `Content-Type: application/json` (for all requests)
   - `credentials: 'include'` (for fetch API)

2. **Error Handling**:
   - Check `response.ok` for HTTP success
   - Check `data.success` for business logic success
   - Handle both HTTP errors and ServiceResponse errors

3. **Data Transformation**:
   - Response data is wrapped in `responseObject` property
   - Dates are returned as ISO strings

## Example Data

### Sample User Data

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "age": 42,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-06T00:00:00.000Z"
}
```

### Sample Error Response

```json
{
  "success": false,
  "message": "User not found",
  "responseObject": null,
  "statusCode": 404
}
```

## Validation Rules

### User ID Validation

- Must be a positive number
- Must be numeric (no letters or special characters)
- Must be greater than 0

### Email Validation

- Must be valid email format
- Uses Zod's built-in email validation

## Technical Stack Information

### Backend Technologies

- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod
- **Documentation**: OpenAPI (Swagger)
- **Logging**: Pino
- **Security**: Helmet, Rate Limiting

### Development Environment

- **Port**: 8080
- **Environment**: Node.js
- **Build Tool**: Vite

## API Design Patterns

### ServiceResponse Pattern

All API responses follow the ServiceResponse pattern:
- `success`: Boolean indicating operation success
- `message`: Human-readable message
- `responseObject`: Actual data payload (or null)
- `statusCode`: HTTP status code

### Error Handling

- HTTP errors (4xx, 5xx) are returned with appropriate status codes
- Business logic errors are wrapped in ServiceResponse with `success: false`
- Validation errors include detailed error messages

## Future API Extensions (Reference)

### Potential Future Endpoints

```typescript
// POST /users - Create new user
// PUT /users/:id - Update existing user
// DELETE /users/:id - Delete user
// POST /users/:id/inquiries - Submit user inquiry
```

### Extended User Model (Future)

```typescript
interface ExtendedUser {
  // ... existing fields
  address?: string;
  phone?: string;
  company?: string;
  inquiryDetails?: {
    inquiryType: 'support' | 'sales' | 'feedback' | 'other';
    inquirySubject: string;
    inquiryMessage: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'critical';
  };
}
```

## Integration Checklist for Client-Side AI

1. **API Base URL**: Use `http://localhost:8080` for development
2. **CORS**: Ensure frontend is running on `http://localhost:3000`
3. **Response Handling**: Parse ServiceResponse format
4. **Error Handling**: Handle both HTTP and business logic errors
5. **Data Types**: Convert ISO date strings to Date objects as needed
6. **Validation**: Validate user input before sending to API
7. **Loading States**: Implement proper loading states for API calls

## Notes for Client-Side Implementation

- The backend uses Zod for validation - client should implement similar validation
- All dates are in ISO format and should be converted to Date objects
- The API is designed to be extended with additional endpoints
- CORS is strictly configured - ensure frontend origin matches exactly
- No authentication is currently required, but this may change in future

This documentation provides all the necessary information for the client-side AI to generate appropriate frontend code without making implementation recommendations.