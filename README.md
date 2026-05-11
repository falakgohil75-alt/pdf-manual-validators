# PDF Manual Validator

A production-ready web application for colleges to validate student manual PDFs against official format standards. Teachers can upload both official and student manuals, and the system automatically detects formatting and content mistakes.

## Features

### 1. Upload System
- 🎯 Drag & drop PDF upload
- 📄 Official format PDF upload
- 📄 Student manual PDF upload
- 👁️ PDF preview panel
- ✅ Real-time validation

### 2. Advanced Validation Engine

#### A. First Page Validation
- Student Name extraction and validation
- Enrollment Number extraction and validation
- Academic Year extraction and validation
- Field format checking
- Placement validation

#### B. Second Page Validation
- Name matching with first page
- Enrollment number matching
- Marks field blank validation
- Signature field blank validation

#### C. Third Page Validation
- Required content validation
- Page number checking
- Remaining sections validation

#### D. Header/Footer Validation (Page 4 onwards)
- Header format matching
- Footer format matching
- Position and spacing validation
- Auto-match student data from Page 1

#### E. Font Validation
- Font family checking
- Font size validation
- Bold/Italic style checking
- Text alignment validation
- Line spacing validation
- Margin validation

#### F. Practical Validation
- Index page detection
- Practical list extraction
- Order validation
- Missing practical detection
- Extra practical detection
- Numbering sequence validation

#### G. Blank Page Detection
- Complete blank page detection
- Partial content tolerance
- Smart blank page reporting

#### H. Page Number Validation
- Printed numbering from Page 4
- Numbering starts from "1"
- No prefix/suffix validation
- Correct placement checking

#### I. Instruction Page Validation
- Instruction page detection
- Unauthorized instruction page warning
- Copy detection

#### J. Structure Validation
- First 3 pages strict format matching
- Remaining pages practical structure validation

### 3. Error Detection System
- Detailed error panel with:
  - Page number
  - Error type
  - Severity level (Critical, High, Medium, Low)
  - Suggested fixes
  - Error statistics

### 4. Highlighted PDF Generator
- Download PDF with error highlighting:
  - Red highlights on wrong text
  - Red borders around mistakes
  - Margin comments
  - Error summary at end

### 5. Professional Dashboard
- Modern UI with sidebar navigation
- Validation progress bars
- Error statistics
- Validation percentage
- PDF viewer
- Dark/Light mode toggle
- Fully responsive design

### 6. Authentication
- JWT-based admin login
- Secure session management
- Role-based access control

### 7. Additional Features
- Validation history tracking
- Batch student upload support
- Multiple PDF support
- Export validation reports (PDF)
- Gujarati + English language support
- Docker containerization
- Comprehensive logging
- Secure file upload validation
- MongoDB integration

## Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Navigation
- **pdf-lib** - PDF manipulation
- **pdfjs-dist** - PDF rendering
- **Tesseract.js** - OCR

### Backend
- **Node.js** - Runtime
- **Express** - Framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File upload
- **pdf-parse** - PDF processing
- **Tesseract.js** - OCR
- **Sharp** - Image processing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Orchestration

## Project Structure

```
pdf-manual-validators/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Validation.jsx
│   │   │   ├── ErrorPanel.jsx
│   │   │   ├── PDFViewer.jsx
│   │   │   └── Navigation.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Home.jsx
│   │   │   └── History.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── upload.js
│   │   │   └── validation.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── uploadController.js
│   │   │   └── validationController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Validation.js
│   │   │   └── ValidationResult.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   ├── validators/
│   │   │   ├── pageValidator.js
│   │   │   ├── fontValidator.js
│   │   │   ├── structureValidator.js
│   │   │   └── practicalValidator.js
│   │   ├── utils/
│   │   │   ├── pdfProcessor.js
│   │   │   ├── ocrProcessor.js
│   │   │   └── errorGenerator.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Installation

### Prerequisites
- Node.js 16+ and npm
- MongoDB 4.4+
- Docker (optional)

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/falakgohil75-alt/pdf-manual-validators.git
cd pdf-manual-validators
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Docker Setup

```bash
docker-compose up -d
```

Access the application at http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token

### Upload
- `POST /api/upload/reference` - Upload official format PDF
- `POST /api/upload/student` - Upload student manual PDF

### Validation
- `POST /api/validate` - Start validation process
- `GET /api/validation/:id` - Get validation results
- `GET /api/validation/:id/errors` - Get detailed errors

### Download
- `GET /api/download/highlighted-pdf/:id` - Download highlighted PDF
- `GET /api/download/report/:id` - Download validation report

### History
- `GET /api/validations` - Get validation history
- `GET /api/validations/:id` - Get specific validation

## Configuration

Create `.env` file in backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/pdf-validator

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=24h

# File Upload
MAX_FILE_SIZE=50000000
ALLOWED_FORMATS=pdf

# Frontend
FRONTEND_URL=http://localhost:5173

# Email (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# OCR
TESSERACT_LANG=eng+guj
```

## Usage

1. **Admin Login**
   - Login with admin credentials
   - Secure JWT token generation

2. **Upload PDFs**
   - Drag & drop or click to upload
   - Upload official format PDF
   - Upload student manual PDF

3. **Validate**
   - Click validate button
   - System processes both PDFs
   - Detailed analysis begins

4. **Review Errors**
   - View error panel with all issues
   - See severity levels
   - Get suggested fixes

5. **Download Results**
   - Download highlighted PDF with errors marked
   - Export validation report
   - Save for records

## Deployment

### Heroku
```bash
heroku create pdf-manual-validator
git push heroku main
```

### AWS
1. Create EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Configure environment variables
5. Start application with PM2

### Docker
```bash
docker build -t pdf-validator .
docker run -p 3000:5000 pdf-validator
```

## Contributing

Contributions are welcome! Please follow the standard pull request process.

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please create an issue on GitHub.

## Author

Falak Gohil

---

**Status**: Production Ready ✅
**Last Updated**: 2026-05-11
