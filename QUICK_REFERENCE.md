# Quick Reference - Bintang Solusindo Website

## 🚀 Quick Start Commands

### Pertama Kali Setup

```bash
# 1. Install Node.js dari https://nodejs.org/
# 2. Install Python dari https://www.python.org/
# 3. Install Yarn
npm install -g yarn

# 4. Clone atau buat project
mkdir bintang-solusindo-website
cd bintang-solusindo-website
```

### Backend Setup

```bash
# Masuk ke folder backend
cd backend

# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn python-dotenv pydantic email-validator

# Jalankan server
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Setup

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
yarn install

# Jalankan development server
yarn start
```

## 📁 Struktur File Penting

```
project/
├── backend/
│   ├── server.py          # Main backend file
│   ├── requirements.txt   # Python dependencies
│   ├── .env              # Environment variables
│   └── data/             # Data storage
│       ├── contacts.json
│       └── portfolio.json
│
└── frontend/
    ├── src/
    │   ├── App.js         # Main app
    │   ├── components/    # React components
    │   └── pages/         # Pages
    ├── .env              # Frontend env variables
    └── package.json      # Node dependencies
```

## 🔧 Common Commands

### Backend

```bash
# Install new package
pip install package-name
pip freeze > requirements.txt

# Run server
uvicorn server:app --reload --port 8001

# Check Python version
python --version

# Deactivate virtual environment
deactivate
```

### Frontend

```bash
# Install new package
yarn add package-name

# Remove package
yarn remove package-name

# Run development server
yarn start

# Build for production
yarn build

# Check Node version
node --version
```

## 🌐 URLs

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8001/api/`
- API Docs: `http://localhost:8001/docs`

## 📝 File Templates

### Backend `.env`
```
PORT=8001
```

### Frontend `.env`
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

### `requirements.txt`
```
fastapi==0.110.1
uvicorn==0.25.0
python-dotenv>=1.0.1
pydantic>=2.6.4
email-validator>=2.2.0
```

## 🐛 Quick Fixes

### Port Already in Use

```bash
# Kill process on port 8001 (Backend)
# Windows:
netstat -ano | findstr :8001
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8001 | xargs kill -9

# Kill process on port 3000 (Frontend)
# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
rm -rf node_modules
yarn install
```

### API Not Connecting

1. Check backend is running: `http://localhost:8001/api/`
2. Check CORS is enabled in `server.py`
3. Check `.env` file has correct URL
4. Check both servers are running

## 📦 Important Packages

### Backend
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `pydantic` - Data validation
- `python-dotenv` - Environment variables

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `lucide-react` - Icons
- `sonner` - Toast notifications

## 🎨 Color Palette (Amber Theme)

```css
Primary: #d97706 (amber-600)
Primary Hover: #b45309 (amber-700)
Primary Light: #fef3c7 (amber-100)
Primary Lighter: #fef9e7 (amber-50)

Text Primary: #111827 (gray-900)
Text Secondary: #4b5563 (gray-600)

Background: #ffffff (white)
Background Alt: #f8fafc (slate-50)
```

## 🔑 Key Concepts

### Backend (FastAPI)
- Routes dengan `@api_router.get()` atau `@api_router.post()`
- Pydantic models untuk validasi data
- JSON file storage di folder `data/`
- CORS untuk allow frontend akses

### Frontend (React)
- Components adalah building blocks
- `useState` untuk state management
- `useEffect` untuk fetch data
- Axios untuk HTTP requests
- Tailwind untuk styling

## 📚 Useful Links

- React Docs: https://react.dev/
- FastAPI Docs: https://fastapi.tiangolo.com/
- Tailwind CSS: https://tailwindcss.com/
- Radix UI: https://www.radix-ui.com/
- Lucide Icons: https://lucide.dev/

## 💡 Tips

1. **Selalu aktifkan virtual environment** sebelum run backend
2. **Jangan commit `.env` file** ke Git
3. **Restart server** setelah install package baru
4. **Check browser console** untuk error di frontend
5. **Check terminal** untuk error di backend
6. **Gunakan VS Code extensions** untuk auto-complete

## 🚨 Common Errors

### "Module not found"
→ Install package yang missing

### "Port already in use"
→ Kill process di port tersebut

### "CORS policy blocked"
→ Add CORS middleware di backend

### "Cannot read property of undefined"
→ Check data loading dengan useEffect

### "Connection refused"
→ Pastikan backend running

## 🎯 Development Workflow

1. ✅ Jalankan backend (`uvicorn server:app --reload`)
2. ✅ Jalankan frontend (`yarn start`)
3. ✅ Buka browser (`http://localhost:3000`)
4. ✅ Edit code
5. ✅ Auto refresh
6. ✅ Test perubahan
7. ✅ Commit ke Git (optional)

## 📞 Support

Jika ada masalah:
1. Check error message di terminal
2. Check browser console (F12)
3. Google error message
4. Check dokumentasi official
5. Ask ChatGPT/Claude

---

**Happy Coding! 🚀**
