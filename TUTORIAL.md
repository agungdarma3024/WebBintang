# Tutorial: Membuat Website Event Organizer dari Awal

## Daftar Isi
1. [Persiapan dan Instalasi](#persiapan-dan-instalasi)
2. [Setup Project](#setup-project)
3. [Membuat Backend (FastAPI)](#membuat-backend-fastapi)
4. [Membuat Frontend (React)](#membuat-frontend-react)
5. [Menjalankan Aplikasi](#menjalankan-aplikasi)
6. [Troubleshooting](#troubleshooting)

---

## Persiapan dan Instalasi

### Software yang Dibutuhkan:

#### 1. **Node.js & NPM**
Node.js adalah runtime JavaScript yang diperlukan untuk menjalankan React.

**Windows:**
- Download dari: https://nodejs.org/
- Pilih versi LTS (Long Term Support)
- Install dengan klik Next-Next-Finish
- Verifikasi instalasi:
  ```bash
  node --version
  npm --version
  ```

**macOS:**
```bash
# Menggunakan Homebrew
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. **Python 3.8+**
Python diperlukan untuk backend FastAPI.

**Windows:**
- Download dari: https://www.python.org/downloads/
- Centang "Add Python to PATH" saat instalasi
- Verifikasi:
  ```bash
  python --version
  pip --version
  ```

**macOS:**
```bash
brew install python3
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip
```

#### 3. **Yarn (Package Manager)**
Yarn lebih cepat dan reliable daripada npm.

```bash
npm install -g yarn
yarn --version
```

#### 4. **Git (Optional, untuk version control)**
```bash
# Windows: Download dari https://git-scm.com/
# macOS: brew install git
# Linux: sudo apt install git
```

#### 5. **VS Code Extensions (Recommended)**
Buka VS Code dan install extensions berikut:
- Python (by Microsoft)
- Pylance
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- Auto Close Tag
- Auto Rename Tag

---

## Setup Project

### 1. Buat Folder Project

```bash
# Buat folder utama
mkdir bintang-solusindo-website
cd bintang-solusindo-website

# Buat struktur folder
mkdir frontend
mkdir backend
```

### 2. Struktur Project Akhir
```
bintang-solusindo-website/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   └── HomePage.jsx
│   │   ├── hooks/
│   │   │   └── use-toast.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── craco.config.js
├── backend/
│   ├── data/
│   │   ├── contacts.json
│   │   └── portfolio.json
│   ├── server.py
│   └── requirements.txt
└── README.md
```

---

## Membuat Backend (FastAPI)

### 1. Setup Backend

```bash
cd backend
```

### 2. Buat Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

Buat file `requirements.txt`:
```txt
fastapi==0.110.1
uvicorn==0.25.0
python-dotenv>=1.0.1
pydantic>=2.6.4
email-validator>=2.2.0
```

Install:
```bash
pip install -r requirements.txt
```

### 4. Buat `.env` File

```bash
# backend/.env
PORT=8001
```

### 5. Buat `server.py`

```python
from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import json
import os
from datetime import datetime
from pathlib import Path
import logging

# Setup paths
ROOT_DIR = Path(__file__).parent
DATA_DIR = ROOT_DIR / 'data'
CONTACTS_FILE = DATA_DIR / 'contacts.json'
PORTFOLIO_FILE = DATA_DIR / 'portfolio.json'

# Create data directory
DATA_DIR.mkdir(exist_ok=True)

# Initialize files
if not CONTACTS_FILE.exists():
    with open(CONTACTS_FILE, 'w') as f:
        json.dump([], f)

if not PORTFOLIO_FILE.exists():
    portfolio_data = [
        {
            "id": 1,
            "title": "International Business Summit 2024",
            "description": "Large-scale international convention with 1000+ attendees.",
            "category": "MICE",
            "client": "PT. Bank Mandiri",
            "year": "2024",
            "location": "Jakarta"
        }
        # ... tambahkan project lainnya
    ]
    with open(PORTFOLIO_FILE, 'w') as f:
        json.dump(portfolio_data, f, indent=2)

# Create FastAPI app
app = FastAPI(title="Bintang Solusindo Abadi API")
api_router = APIRouter(prefix="/api")

# Models
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    message: str
    timestamp: str
    status: str = "new"

class PortfolioItem(BaseModel):
    id: int
    title: str
    description: str
    category: str
    client: str
    year: str
    location: str

# Helper functions
def read_json_file(file_path: Path) -> list:
    with open(file_path, 'r') as f:
        return json.load(f)

def write_json_file(file_path: Path, data: list) -> bool:
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    return True

# Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to Bintang Solusindo Abadi API"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactMessage):
    contacts = read_json_file(CONTACTS_FILE)
    
    contact_id = f"CNT-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    new_contact = {
        "id": contact_id,
        "name": contact.name,
        "email": contact.email,
        "phone": contact.phone,
        "message": contact.message,
        "timestamp": datetime.now().isoformat(),
        "status": "new"
    }
    
    contacts.append(new_contact)
    write_json_file(CONTACTS_FILE, contacts)
    
    return ContactResponse(**new_contact)

@api_router.get("/portfolio", response_model=List[PortfolioItem])
async def get_portfolio():
    portfolio = read_json_file(PORTFOLIO_FILE)
    return [PortfolioItem(**item) for item in portfolio]

# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 6. Test Backend

```bash
# Jalankan server
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Buka browser: http://localhost:8001/api/
# Atau test dengan curl:
curl http://localhost:8001/api/
```

---

## Membuat Frontend (React)

### 1. Setup React App

```bash
cd ../frontend
```

### 2. Create React App (Jika belum ada)

```bash
npx create-react-app .
# atau jika folder sudah ada file:
npx create-react-app . --force
```

### 3. Install Dependencies

```bash
# Install Tailwind CSS
yarn add -D tailwindcss postcss autoprefixer
yarn add -D @craco/craco

# Install shadcn/ui dependencies
yarn add @radix-ui/react-accordion @radix-ui/react-alert-dialog
yarn add @radix-ui/react-aspect-ratio @radix-ui/react-avatar
yarn add @radix-ui/react-checkbox @radix-ui/react-dialog
yarn add @radix-ui/react-dropdown-menu @radix-ui/react-label
yarn add @radix-ui/react-popover @radix-ui/react-scroll-area
yarn add @radix-ui/react-select @radix-ui/react-separator
yarn add @radix-ui/react-slider @radix-ui/react-slot
yarn add @radix-ui/react-switch @radix-ui/react-tabs
yarn add @radix-ui/react-toast @radix-ui/react-tooltip

# Install utilities
yarn add class-variance-authority clsx tailwind-merge
yarn add lucide-react
yarn add axios
yarn add react-router-dom
yarn add sonner
```

### 4. Setup Tailwind CSS

**Buat `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... (copy dari project yang sudah ada)
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
```

**Buat `craco.config.js`:**
```javascript
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
```

**Update `package.json` scripts:**
```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test"
}
```

### 5. Setup Environment Variables

Buat file `.env`:
```bash
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 6. Update `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto";
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    /* ... copy semua CSS variables */
  }
}
```

### 7. Buat Komponen Shadcn UI

Buat folder `src/components/ui/` dan copy semua komponen dari project:
- button.jsx
- card.jsx
- input.jsx
- textarea.jsx
- dll.

### 8. Buat Komponen Utama

#### `src/components/Header.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Header = () => {
  // ... (copy dari project)
};

export default Header;
```

Ulangi untuk komponen lain:
- Hero.jsx
- Services.jsx
- About.jsx
- Portfolio.jsx
- Contact.jsx
- Footer.jsx

### 9. Buat `src/pages/HomePage.jsx`

```jsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
```

### 10. Update `src/App.js`

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
```

### 11. Update `src/App.css`

```css
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

/* Custom transitions */
button {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #d97706;
  border-radius: 5px;
}
```

---

## Menjalankan Aplikasi

### 1. Terminal 1: Jalankan Backend

```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

Output:
```
INFO:     Uvicorn running on http://0.0.0.0:8001
INFO:     Application startup complete.
```

### 2. Terminal 2: Jalankan Frontend

```bash
cd frontend
yarn start
```

Output:
```
Compiled successfully!
You can now view frontend in the browser.
  Local:            http://localhost:3000
```

### 3. Buka Browser

```
http://localhost:3000
```

---

## Troubleshooting

### Problem: Port sudah digunakan

**Backend (8001):**
```bash
# Windows
netstat -ano | findstr :8001
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8001 | xargs kill -9
```

**Frontend (3000):**
```bash
# Pilih port lain saat diminta, atau:
# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Problem: Module not found

```bash
# Hapus node_modules dan install ulang
cd frontend
rm -rf node_modules
yarn install
```

### Problem: Python module not found

```bash
cd backend
pip install -r requirements.txt
```

### Problem: CORS Error

Pastikan backend sudah include CORS middleware:
```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Problem: Data tidak tersimpan

Cek apakah folder `backend/data/` sudah dibuat:
```bash
mkdir -p backend/data
```

---

## Tips Pengembangan

### 1. Hot Reload
- Backend: `--reload` flag pada uvicorn
- Frontend: Otomatis reload saat save file

### 2. Debug Mode

**Backend:**
```python
# Tambahkan di server.py
import logging
logging.basicConfig(level=logging.DEBUG)
```

**Frontend:**
```javascript
// Gunakan console.log
console.log('Data:', data);
```

### 3. VS Code Settings

Buat `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true
}
```

### 4. Git Ignore

Buat `.gitignore`:
```
# Python
venv/
__pycache__/
*.pyc

# Node
node_modules/
build/
.env

# Data
backend/data/*.json

# OS
.DS_Store
Thumbs.db
```

---

## Deployment (Optional)

### Vercel (Frontend)
```bash
cd frontend
yarn add -D vercel
npx vercel
```

### Railway (Backend)
1. Buat `Procfile`:
```
web: uvicorn server:app --host 0.0.0.0 --port $PORT
```

2. Push ke GitHub
3. Connect di Railway.app

### Heroku (Full Stack)
```bash
heroku login
heroku create bintang-solusindo
git push heroku main
```

---

## Kesimpulan

Sekarang Anda sudah bisa membuat website event organizer dari awal! 

**Yang sudah dipelajari:**
✅ Setup Node.js dan Python environment
✅ Membuat backend dengan FastAPI
✅ Membuat frontend dengan React + Tailwind
✅ Integrasi frontend-backend
✅ File-based storage untuk data
✅ Responsive design
✅ Deploy aplikasi

**Next Steps:**
- Tambahkan authentication
- Upload gambar untuk portfolio
- Email notification untuk contact form
- Admin panel untuk manage portfolio
- Database upgrade (MongoDB/PostgreSQL)

Selamat coding! 🚀
