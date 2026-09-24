# StatusCraft - ustaxona buyurtmalarini kuzatish tizimi

## Holat: Dars 1 + boshlang'ich UI

Backend (Dars 1):
- `Order` modeli (`backend/src/models/Order.js`)
- `POST /api/orders` - buyurtma yaratish
- `GET /api/orders` - buyurtmalar ro'yxati
- Postman kolleksiyasi: `postman/status-craft.postman_collection.json`

Frontend (React + Vite + Axios, Dars 3 doirasidan faqat forma+ro'yxat qismi):
- `OrderForm` - yangi buyurtma yaratish formasi, yuklanish/xato holatlari bilan
- `OrderList` - buyurtmalar ro'yxati, yuklanish/xato/bo'sh holatlar bilan
- Hali yo'q: login/auth, holatni o'zgartirish, mijoz kuzatuv sahifasi, Socket.IO jonli yangilanish

Hali qo'shilmagan (keyingi darslarda): auth middleware, holat almashtirish API, filtr,
mijoz kuzatuv API'si va sahifasi, Socket.IO.

## Ishga tushirish

Backend:

```bash
cd backend
npm install
cp .env.example .env   # kerak bo'lsa MONGODB_URI ni o'zgartiring
npm run dev
```

MongoDB mahalliy ishlab turishi kerak (yoki `.env` dagi `MONGODB_URI` ni Atlas manziliga almashtiring).

Frontend (alohida terminalda):

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_BASE_URL backend portiga mos bo'lsin
npm run dev
```

Postman'da `postman/status-craft.postman_collection.json` faylini import qiling va `baseUrl`
o'zgaruvchisi server portingizga mos kelishini tekshiring (standart: `http://localhost:4000`).

## Eslatma

Order modelidagi maydonlar (`clientName`, `clientPhone`, `description`, `internalNotes`,
`status` enum, `trackingToken`) loyihaning 1-7 bo'limlari (hali taqdim etilmagan) asosida emas,
balki 8-13 bo'limlardagi checklist va Socket.IO oqimidan kelib chiqib taxmin qilingan. Aniq
maydon nomlari yoki status ro'yxati boshqacha bo'lsa - ayting, modelni moslashtiraman.
