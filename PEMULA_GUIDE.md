# Panduan untuk Pemula - Step by Step dari NOL

## 🎓 Untuk yang Baru Pertama Kali Coding

Tutorial ini ditulis untuk orang yang **belum pernah coding sama sekali**. Saya akan jelaskan semuanya dari awal.

---

## Bagian 1: Persiapan Komputer

### Step 1: Install VS Code (Text Editor)

1. Buka browser → ketik `download vs code`
2. Atau langsung ke: https://code.visualstudio.com/
3. Klik tombol **Download** yang besar
4. Install seperti install aplikasi biasa (Next → Next → Install)
5. Buka VS Code setelah selesai install

**Tips VS Code:**
- `Ctrl + S` = Save file
- `Ctrl + C` = Copy
- `Ctrl + V` = Paste
- `Ctrl + Z` = Undo
- `Ctrl + \`` = Buka Terminal (backtick, di samping angka 1)

### Step 2: Install Node.js (Untuk Frontend)

1. Buka: https://nodejs.org/
2. Klik tombol **Download** yang hijau besar (pilih yang LTS)
3. Install seperti biasa (Next → Next → Install)
4. **PENTING**: Tunggu sampai selesai, jangan close

**Cara cek berhasil atau tidak:**
1. Buka Command Prompt (Windows) atau Terminal (Mac)
   - Windows: Tekan `Win + R`, ketik `cmd`, Enter
   - Mac: Tekan `Cmd + Space`, ketik `terminal`, Enter
2. Ketik: `node --version`
3. Kalau muncul angka versi (misal: v18.17.0), berarti berhasil!

### Step 3: Install Python (Untuk Backend)

1. Buka: https://www.python.org/downloads/
2. Klik **Download Python 3.x** (yang versi terbaru)
3. **PENTING**: Centang "Add Python to PATH" sebelum install
4. Klik Install Now

**Cara cek berhasil:**
1. Buka Command Prompt/Terminal baru
2. Ketik: `python --version`
3. Kalau muncul versi Python, berarti berhasil!

### Step 4: Install Yarn

Yarn adalah tool untuk manage package JavaScript (lebih cepat dari npm).

1. Buka Command Prompt/Terminal
2. Ketik: `npm install -g yarn`
3. Tunggu sampai selesai
4. Cek: `yarn --version`

---

## Bagian 2: Buat Project Baru

### Step 1: Buat Folder Project

**Cara Manual:**
1. Buat folder baru di komputer (misalnya di Desktop)
2. Namanya: `my-event-website`

**Atau Pakai Terminal:**
```bash
cd Desktop
mkdir my-event-website
cd my-event-website
```

**Penjelasan Command:**
- `cd` = Change Directory (pindah folder)
- `mkdir` = Make Directory (buat folder)
- `Desktop` = nama folder tujuan

### Step 2: Buka di VS Code

1. Buka VS Code
2. File → Open Folder
3. Pilih folder `my-event-website` yang tadi dibuat
4. Klik **Select Folder**

### Step 3: Buat Struktur Folder

Di VS Code, klik icon **New Folder** (folder dengan plus):
1. Buat folder `backend`
2. Buat folder `frontend`

Sekarang struktur folder Anda:
```
my-event-website/
├── backend/
└── frontend/
```

---

## Bagian 3: Setup Backend (Server)

Backend adalah bagian yang menyimpan data dan memproses request.

### Step 1: Masuk ke Folder Backend

Di VS Code, buka Terminal:
- Menu: Terminal → New Terminal
- Atau tekan: `Ctrl + \`` (backtick)

Ketik:
```bash
cd backend
```

### Step 2: Buat Virtual Environment

Virtual environment adalah "kotak terpisah" untuk Python agar tidak bentrok dengan Python lain di komputer.

```bash
python -m venv venv
```

**Penjelasan:**
- `python -m venv` = perintah buat virtual environment
- `venv` (yang kedua) = nama folder virtual environment

### Step 3: Aktifkan Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

Kalau berhasil, di terminal akan muncul `(venv)` di awal baris:
```
(venv) C:\Users\YourName\Desktop\my-event-website\backend>
```

### Step 4: Install Package Python

```bash
pip install fastapi uvicorn python-dotenv pydantic email-validator
```

**Tunggu sampai selesai!** Ini akan download dan install package yang dibutuhkan.

### Step 5: Buat File `server.py`

1. Di VS Code, klik kanan di folder `backend`
2. Pilih **New File**
3. Namanya: `server.py`

Copy paste code ini ke `server.py`:

```python
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import json
from datetime import datetime
from pathlib import Path

# Setup
app = FastAPI()
api_router = APIRouter(prefix="/api")
DATA_DIR = Path(__file__).parent / 'data'
DATA_DIR.mkdir(exist_ok=True)

# Model untuk contact form
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

# Route hello world
@api_router.get("/")
async def root():
    return {"message": "Hello from Backend!"}

# Route untuk submit contact form
@api_router.post("/contact")
async def submit_contact(contact: ContactMessage):
    # Simpan ke file JSON
    file_path = DATA_DIR / 'contacts.json'
    
    # Baca data yang sudah ada
    if file_path.exists():
        with open(file_path, 'r') as f:
            contacts = json.load(f)
    else:
        contacts = []
    
    # Tambah data baru
    new_contact = {
        "id": f"CNT-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "name": contact.name,
        "email": contact.email,
        "phone": contact.phone,
        "message": contact.message,
        "timestamp": datetime.now().isoformat()
    }
    
    contacts.append(new_contact)
    
    # Simpan kembali ke file
    with open(file_path, 'w') as f:
        json.dump(contacts, f, indent=2)
    
    return {"success": True, "data": new_contact}

# Include router
app.include_router(api_router)

# CORS (biar frontend bisa akses)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Save file**: `Ctrl + S`

### Step 6: Jalankan Backend

Di terminal (yang masih di folder backend):
```bash
uvicorn server:app --reload --port 8001
```

Kalau berhasil, akan muncul:
```
INFO:     Uvicorn running on http://0.0.0.0:8001
INFO:     Application startup complete.
```

**Jangan close terminal ini!** Backend harus terus jalan.

**Test:** Buka browser, ketik: `http://localhost:8001/api/`
Kalau muncul `{"message":"Hello from Backend!"}`, berarti berhasil! ✅

---

## Bagian 4: Setup Frontend (Tampilan Website)

Frontend adalah bagian yang dilihat user (tampilan website).

### Step 1: Buka Terminal Baru

Di VS Code:
- Klik icon **+** di sebelah terminal yang sedang jalan
- Atau: Terminal → New Terminal

### Step 2: Masuk ke Folder Frontend

```bash
cd frontend
```

### Step 3: Buat React App

```bash
npx create-react-app .
```

**Penjelasan:**
- `npx` = tool untuk jalankan package
- `create-react-app` = tool untuk buat project React
- `.` = buat di folder ini (frontend)

**Tunggu 5-10 menit** (download dan install banyak file)

### Step 4: Install Package Tambahan

```bash
yarn add axios react-router-dom lucide-react
yarn add -D tailwindcss postcss autoprefixer
```

### Step 5: Setup Tailwind CSS

```bash
npx tailwindcss init
```

Buka file `tailwind.config.js` dan ganti isinya:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 6: Update CSS

Buka file `src/index.css` dan **ganti semua isinya** dengan:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
}

html {
  scroll-behavior: smooth;
}
```

### Step 7: Buat File `.env`

Di folder `frontend`, buat file baru namanya `.env`:

```
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Step 8: Buat Komponen Pertama

Buka file `src/App.js` dan ganti isinya:

```javascript
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
      setStatus('Pesan berhasil dikirim!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('Gagal mengirim pesan. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bintang Solusindo Abadi
          </h1>
          <p className="text-xl text-gray-600">
            Event Organizer Professional
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Hubungi Kami
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama lengkap Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telepon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="08123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesan *
              </label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ceritakan tentang event Anda..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Kirim Pesan
            </button>
          </form>

          {status && (
            <div className={`mt-4 p-4 rounded-lg ${
              status.includes('berhasil') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {status}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>📧 bintangsolusindo723@gmail.com</p>
          <p>📞 (021) 486 70139</p>
          <p>📍 Jakarta Pusat</p>
        </div>
      </div>
    </div>
  );
}

export default App;
```

Update `src/App.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
```

### Step 9: Jalankan Frontend

```bash
yarn start
```

Browser akan otomatis terbuka ke `http://localhost:3000`

**Kalau muncul website dengan form kontak, SELAMAT! Anda berhasil! 🎉**

---

## Bagian 5: Test Aplikasi

### Test 1: Cek Backend Jalan

Buka: `http://localhost:8001/api/`
Harus muncul: `{"message":"Hello from Backend!"}`

### Test 2: Cek Frontend Jalan

Buka: `http://localhost:3000`
Harus muncul website dengan form

### Test 3: Test Form

1. Isi form contact di website
2. Klik "Kirim Pesan"
3. Harus muncul pesan sukses

### Test 4: Cek Data Tersimpan

Buka file: `backend/data/contacts.json`
Harus ada data yang baru disubmit

---

## Bagian 6: Memahami Kode

### File Penting Backend:

**server.py** = Otak backend
- `@api_router.get("/")` = Handle request GET ke /api/
- `@api_router.post("/contact")` = Handle form submit
- `json.dump()` = Simpan data ke file JSON

### File Penting Frontend:

**App.js** = Komponen utama
- `useState` = Buat variabel yang bisa berubah
- `handleChange` = Fungsi saat input berubah
- `handleSubmit` = Fungsi saat form disubmit
- `axios.post()` = Kirim data ke backend

### Alur Kerja:

```
User isi form → Click submit → Frontend kirim data → 
Backend terima → Backend simpan ke JSON → 
Backend kirim response → Frontend tampilkan pesan
```

---

## Bagian 7: Troubleshooting untuk Pemula

### "Command not found"

**Penyebab**: Software belum ter-install atau belum di PATH

**Solusi**:
1. Install ulang software (Node.js atau Python)
2. Restart Command Prompt/Terminal
3. Restart komputer

### "Port already in use"

**Penyebab**: Ada program lain pakai port yang sama

**Solusi**:
- Ganti port di command:
  ```bash
  # Backend
  uvicorn server:app --reload --port 8002
  
  # Jangan lupa update .env di frontend jadi:
  REACT_APP_BACKEND_URL=http://localhost:8002
  ```

### "Module not found"

**Penyebab**: Package belum ter-install

**Solusi**:
```bash
# Backend
pip install nama-package

# Frontend
yarn add nama-package
```

### Website tidak muncul

**Checklist**:
1. ✅ Backend jalan? (cek terminal backend)
2. ✅ Frontend jalan? (cek terminal frontend)
3. ✅ URL benar? (localhost:3000)
4. ✅ .env file ada?
5. ✅ Browser di-refresh?

### Data tidak tersimpan

**Checklist**:
1. ✅ Folder `backend/data/` ada?
2. ✅ Backend tidak error? (cek terminal)
3. ✅ Form terisi semua?
4. ✅ Email valid?

---

## Bagian 8: Next Steps

Setelah website dasar jalan, Anda bisa:

### Level 1 (Easy):
- ✨ Ganti warna dan teks
- ✨ Tambah logo
- ✨ Tambah gambar

### Level 2 (Medium):
- 🎨 Tambah halaman About
- 🎨 Tambah halaman Services
- 🎨 Buat navbar (menu navigation)

### Level 3 (Advanced):
- 🚀 Tambah login/register
- 🚀 Upload gambar
- 🚀 Admin dashboard
- 🚀 Deploy ke internet

---

## Tips Belajar Coding

### 1. Jangan Takut Error
Error itu normal! Bahkan programmer senior sering error. Yang penting baca error message-nya.

### 2. Google adalah Teman
Kalau error, copy paste error message ke Google. Biasanya ada solusinya.

### 3. Belajar Step by Step
Jangan langsung bikin website kompleks. Mulai dari yang simple dulu.

### 4. Practice Makes Perfect
Coding itu skill, makin sering practice makin jago.

### 5. Join Community
- Reddit: r/learnprogramming
- Discord: banyak server coding
- YouTube: banyak tutorial gratis

---

## Vocabulary Penting

| Istilah | Artinya |
|---------|---------|
| Frontend | Bagian website yang terlihat user |
| Backend | Bagian server yang proses data |
| API | Jembatan antara frontend dan backend |
| Component | Potongan UI yang bisa dipakai ulang |
| State | Data yang bisa berubah di component |
| Route | Alamat URL (misal: /home, /about) |
| Package | Library/tool buatan orang lain |
| Terminal | Program untuk ketik command |
| JSON | Format untuk simpan data (seperti Excel tapi untuk programming) |
| CSS | Bahasa untuk styling (warna, ukuran, dll) |

---

## Kesimpulan

Selamat! Anda sudah berhasil membuat website full-stack dari NOL! 🎉

**Yang sudah Anda pelajari:**
✅ Install tools development
✅ Setup backend dengan Python + FastAPI
✅ Setup frontend dengan React
✅ Buat form yang bisa simpan data
✅ Koneksi frontend dengan backend
✅ Simpan data ke file JSON

Terus belajar dan jangan menyerah! 💪

**Happy Coding! 🚀**
