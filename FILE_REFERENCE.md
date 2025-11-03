# File Reference - Daftar Semua File di Project

## 📚 Penjelasan Setiap File

### Root Directory

```
bintang-solusindo-website/
├── TUTORIAL.md              # Tutorial lengkap dari awal
├── QUICK_REFERENCE.md       # Cheat sheet commands
├── PEMULA_GUIDE.md         # Panduan untuk pemula
├── FILE_REFERENCE.md       # File ini (penjelasan semua file)
├── README.md               # Deskripsi project
├── .gitignore              # File yang tidak di-track Git
├── backend/                # Folder backend (server)
└── frontend/               # Folder frontend (UI)
```

---

## Backend Files

### 📁 `/backend/`

#### `server.py` (PENTING!)
```python
# Main file backend - berisi semua API endpoints
```

**Fungsi:**
- Handle request dari frontend
- Simpan data ke JSON files
- Return response ke frontend

**Main Components:**
- `app = FastAPI()` → Buat FastAPI app
- `@api_router.get("/")` → GET endpoint
- `@api_router.post("/contact")` → POST endpoint untuk form
- `CORS middleware` → Allow frontend akses backend

**Cara Edit:**
```python
# Tambah endpoint baru:
@api_router.get("/new-endpoint")
async def new_function():
    return {"message": "Hello"}
```

---

#### `requirements.txt`
```txt
fastapi==0.110.1
uvicorn==0.25.0
python-dotenv>=1.0.1
...
```

**Fungsi:** List semua Python packages yang dibutuhkan

**Cara Update:**
```bash
# Install package baru
pip install nama-package

# Update requirements.txt
pip freeze > requirements.txt
```

---

#### `.env`
```bash
PORT=8001
```

**Fungsi:** Store environment variables (variables yang berbeda per environment)

**Contoh:**
```bash
PORT=8001
DEBUG=True
DATABASE_URL=mongodb://localhost:27017
```

**JANGAN commit file ini ke Git!** (sudah di .gitignore)

---

#### 📁 `/backend/data/`

#### `contacts.json`
```json
[
  {
    "id": "CNT-20240103120000",
    "name": "Budi Santoso",
    "email": "budi@example.com",
    "phone": "08123456789",
    "message": "Test message",
    "timestamp": "2024-01-03T12:00:00",
    "status": "new"
  }
]
```

**Fungsi:** Store semua contact form submissions

**Format:** Array of objects (JSON)

---

#### `portfolio.json`
```json
[
  {
    "id": 1,
    "title": "International Business Summit 2024",
    "description": "Large-scale convention...",
    "category": "MICE",
    "client": "PT. Bank Mandiri",
    "year": "2024",
    "location": "Jakarta"
  }
]
```

**Fungsi:** Store portfolio items

**Cara Edit:** Edit langsung file JSON atau buat admin panel

---

#### `venv/` (Folder Virtual Environment)
**JANGAN edit folder ini!**
Folder ini berisi Python packages yang ter-install.

---

## Frontend Files

### 📁 `/frontend/`

#### `package.json`
```json
{
  "name": "frontend",
  "version": "0.1.0",
  "dependencies": {
    "react": "^19.0.0",
    "axios": "^1.8.4",
    ...
  },
  "scripts": {
    "start": "craco start",
    "build": "craco build"
  }
}
```

**Fungsi:**
- List semua npm packages
- Define scripts untuk run app

**Cara Install Package:**
```bash
yarn add nama-package
```

---

#### `.env`
```bash
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Fungsi:** Store environment variables untuk frontend

**Aturan:**
- Variable harus diawali `REACT_APP_`
- Bisa diakses dengan `process.env.REACT_APP_BACKEND_URL`

---

#### `tailwind.config.js`
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // custom colors
      }
    }
  }
}
```

**Fungsi:** Konfigurasi Tailwind CSS

**Cara Tambah Custom Color:**
```javascript
theme: {
  extend: {
    colors: {
      'brand-blue': '#1E40AF',
    }
  }
}
```

---

#### `craco.config.js`
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

**Fungsi:** Override Create React App config untuk support Tailwind

**Jangan edit** kecuali tahu apa yang dilakukan

---

### 📁 `/frontend/src/`

#### `index.js` (Entry Point)
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Fungsi:** File pertama yang dijalankan React

**Flow:**
1. Import React
2. Import CSS
3. Import App component
4. Render App ke HTML

**Biasanya tidak perlu diedit**

---

#### `index.css` (Global CSS)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, ...;
}
```

**Fungsi:**
- Import Tailwind CSS
- Define global styles

**Cara Tambah Global Style:**
```css
/* Di bawah @tailwind utilities */
.my-custom-class {
  color: red;
}
```

---

#### `App.js` (Main Component)
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

**Fungsi:** Component utama yang wrap semua component lain

**Components:**
- `BrowserRouter` → Enable routing
- `Routes` → Define routes
- `Route` → Individual route
- `Toaster` → Toast notifications

**Cara Tambah Route:**
```javascript
<Route path="/about" element={<AboutPage />} />
```

---

#### `App.css`
```css
html {
  scroll-behavior: smooth;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

button {
  transition: all 0.3s ease;
}
```

**Fungsi:** Styles untuk App component dan global animations

---

### 📁 `/frontend/src/components/`

#### `Header.jsx`
```javascript
export const Header = () => {
  // Sticky header dengan navigation
  return (
    <header className="fixed top-0...">
      {/* Logo, Menu, CTA Button */}
    </header>
  );
};
```

**Fungsi:**
- Navigation bar
- Logo
- Menu links
- Mobile menu

**Props:** None
**State:**
- `isScrolled` → Track scroll position
- `isMobileMenuOpen` → Mobile menu open/close

---

#### `Hero.jsx`
```javascript
export const Hero = () => {
  // Hero section dengan tagline dan CTA
  return (
    <section className="min-h-screen...">
      {/* Headline, Description, Buttons, Stats */}
    </section>
  );
};
```

**Fungsi:** Landing section pertama

**Components:**
- Headline text
- Subheadline
- CTA buttons
- Stats (10+ years, 500+ events, dll)

---

#### `Services.jsx`
```javascript
export const Services = () => {
  const services = [/* array of services */];
  
  return (
    <section>
      {services.map(service => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </section>
  );
};
```

**Fungsi:** Display company services

**Data:**
```javascript
const services = [
  {
    icon: Users,
    title: 'MICE Event Organizer',
    description: '...',
    features: ['...']
  }
];
```

**Cara Tambah Service:**
```javascript
// Tambah object baru di array services
{
  icon: NewIcon,
  title: 'New Service',
  description: 'Description...',
  features: ['Feature 1', 'Feature 2']
}
```

---

#### `About.jsx`
```javascript
export const About = () => {
  return (
    <section>
      {/* Company description, Vision, Mission, Stats */}
    </section>
  );
};
```

**Fungsi:** About company section

**Content:**
- Company description
- Vision statement
- Mission points
- Stats (years, events, clients)
- Key strengths

---

#### `Portfolio.jsx`
```javascript
export const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch portfolio from backend
    fetchPortfolio();
  }, []);
  
  return (
    <section>
      {/* Category filter, Portfolio grid, Pagination */}
    </section>
  );
};
```

**Fungsi:** Display portfolio items

**State:**
- `portfolioData` → Array of projects
- `activeCategory` → Selected category filter
- `currentPage` → Pagination
- `loading` → Loading state

**Features:**
- Category filtering
- Pagination
- Loading state

---

#### `Contact.jsx`
```javascript
export const Contact = () => {
  const [formData, setFormData] = useState({...});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    // Submit form to backend
    await axios.post(`${API}/contact`, formData);
  };
  
  return (
    <section>
      {/* Contact info, Contact form */}
    </section>
  );
};
```

**Fungsi:** Contact section dengan form

**State:**
- `formData` → Form input values
- `isSubmitting` → Submit loading state

**API Call:**
```javascript
await axios.post(`${API}/contact`, formData);
```

---

#### `Footer.jsx`
```javascript
export const Footer = () => {
  return (
    <footer>
      {/* Company info, Links, Contact, Copyright */}
    </footer>
  );
};
```

**Fungsi:** Footer dengan links dan info

**Sections:**
- Company info + logo
- Quick links
- Services list
- Contact info
- Copyright

---

### 📁 `/frontend/src/components/ui/`

Folder ini berisi Shadcn UI components (pre-built components).

#### `button.jsx`
```javascript
export const Button = React.forwardRef(({ className, ...props }, ref) => {
  return <button className={...} ref={ref} {...props} />
});
```

**Fungsi:** Reusable button component

**Usage:**
```javascript
<Button variant="primary" size="lg">
  Click Me
</Button>
```

#### `card.jsx`
```javascript
export const Card = ({ className, ...props }) => (
  <div className={cn("rounded-lg border...", className)} {...props} />
);
```

**Fungsi:** Card container component

**Usage:**
```javascript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

#### `input.jsx`, `textarea.jsx`, dll
Similar pattern - reusable UI components

---

### 📁 `/frontend/src/pages/`

#### `HomePage.jsx`
```javascript
const HomePage = () => {
  return (
    <div>
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

**Fungsi:** Compose semua sections jadi satu halaman

**Pattern:** Import dan render components

---

### 📁 `/frontend/src/hooks/`

#### `use-toast.js`
```javascript
export const useToast = () => {
  // Toast notification hook
  return { toast };
};
```

**Fungsi:** Custom hook untuk toast notifications

**Usage:**
```javascript
const { toast } = useToast();

toast({
  title: "Success!",
  description: "Operation completed"
});
```

---

## File Structure Summary

```
project/
├── Backend Files (Python/FastAPI)
│   ├── server.py          → API endpoints
│   ├── requirements.txt   → Python packages
│   ├── .env               → Environment variables
│   └── data/
│       ├── contacts.json  → Contact submissions
│       └── portfolio.json → Portfolio items
│
└── Frontend Files (React)
    ├── Configuration
    │   ├── package.json       → npm packages
    │   ├── .env               → Environment variables
    │   ├── tailwind.config.js → Tailwind config
    │   └── craco.config.js    → CRA override
    │
    └── src/
        ├── Entry Point
        │   ├── index.js  → App entry
        │   └── index.css → Global CSS
        │
        ├── Main App
        │   ├── App.js    → Main component
        │   └── App.css   → App styles
        │
        ├── pages/
        │   └── HomePage.jsx → Home page
        │
        ├── components/
        │   ├── Header.jsx    → Navigation
        │   ├── Hero.jsx      → Hero section
        │   ├── Services.jsx  → Services section
        │   ├── About.jsx     → About section
        │   ├── Portfolio.jsx → Portfolio section
        │   ├── Contact.jsx   → Contact section
        │   ├── Footer.jsx    → Footer
        │   │
        │   └── ui/
        │       ├── button.jsx    → Button component
        │       ├── card.jsx      → Card component
        │       ├── input.jsx     → Input component
        │       └── ... (other UI components)
        │
        └── hooks/
            └── use-toast.js → Toast hook
```

---

## Editing Guide

### Untuk Edit Konten Website:

1. **Text di Hero**: Edit `Hero.jsx`
2. **Services**: Edit array di `Services.jsx`
3. **About Info**: Edit `About.jsx`
4. **Portfolio**: Edit `backend/data/portfolio.json`
5. **Contact Info**: Edit `Contact.jsx` dan `Footer.jsx`
6. **Colors**: Edit `tailwind.config.js`
7. **Logo**: Edit `Header.jsx` dan `Footer.jsx`

### Untuk Tambah Fitur Baru:

1. **Tambah API Endpoint**: Edit `backend/server.py`
2. **Tambah Page**: Buat file di `src/pages/`
3. **Tambah Component**: Buat file di `src/components/`
4. **Tambah Route**: Edit `App.js`

---

## Don't Touch Files

Files yang sebaiknya **TIDAK diedit** (kecuali tahu apa yang dilakukan):

- `node_modules/` → Auto-generated
- `venv/` → Auto-generated
- `build/` → Auto-generated
- `package-lock.json` → Auto-generated by npm
- `yarn.lock` → Auto-generated by yarn
- `public/index.html` → Template HTML
- `craco.config.js` → Config file

---

## Tips

1. **Selalu save file** sebelum test (`Ctrl + S`)
2. **Check terminal** untuk error messages
3. **Restart server** jika install package baru
4. **Refresh browser** untuk lihat perubahan
5. **Use Git** untuk backup dan version control

---

**Happy Coding! 🚀**
