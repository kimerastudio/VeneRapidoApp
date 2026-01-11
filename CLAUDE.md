# CLAUDE.md - VeneRápido Delivery Ecosystem

## Project Overview

**Project Name:** VeneRápido Delivery Ecosystem
**Target Market:** Eastern Venezuela (infrastructure-constrained environment)
**Core Philosophy:** "Build things that don't scale" (MVP). High reliance on manual operations (human-in-the-loop) via WhatsApp to bypass unreliable automated payment and logistics infrastructure.
**Platform Strategy:** Three interconnected Web Applications (PWA/Mobile-Responsive) sharing a single database. No native mobile apps.

## Tech Stack

- **Frontend:** React with TypeScript
- **UI Components:** shadcn/ui with Lucide Icons and Yellow theme
- **Database:** Supabase (authentication, database, and real-time listeners)
- **Deployment:** Vercel

## Core Guidelines

1. **Delivery App Industry Standards:** Prioritize geospatial efficiency, data integrity for orders, and real-time UX
2. **UI Components:** Use shadcn/ui for all UI components
3. **Backend Services:** Implement Supabase for authentication, database, and real-time listeners
4. **Deployment:** Ensure the app is optimized for deployment on Vercel
5. **Code Structure:** Follow a clean, modular folder structure for React components
6. **Best Practices:** Follow delivery web app best practices

---

## Global System Constants & Logic

### Currency Logic

- **Base Currency:** USD ($). All product prices and fees are stored in USD.
- **Display:** Prices shown in USD. Checkout shows total in USD and local Bolívares (Bs.).
- **Exchange Rate (Tasa):** A global variable (e.g., `$1 = Bs. 300`) managed in the **App Interna**. Updates propagate instantly to all apps.

### Authentication

- **Customer:** WhatsApp Number (Primary ID) + OTP
- **Merchant:** Email + Password. 2FA through a WhatsApp OTP code
- **Operator/Admin:** Email + Password (with "Proxy Access" capabilities). 2FA through a WhatsApp OTP code

---

## Application 1: VeneRapido.com (Customer Facing)

**Role:** The storefront where users browse, order, and track deliveries.

- Directory of Stores, explorable without login
- Published information, indexable and findable in Google
- User selects "Area de Entrega" first, then a store, then views menu/product catalog
- Login required to modify anything or place orders
- Users define "Punto de Entrega" by dropping a pin on Google Maps API

### 1.1 Onboarding & Profile

- **Landing Page:** Search bar for "Comercio, comida, etc." filtered by City dropdown
- **Registration:** First Name, Last Name, ID (Cédula - hidden/private), Email (recovery), WhatsApp Number
- **User Dashboard:** Sidebar with My Profile, Saved "Puntos de Entrega", "Cerrar otros dispositivos" (Security), Order History

### 1.2 Browsing & Ordering

- **Merchant Directory:** List with tags (e.g., "Hamburguesas," "Venezolano"). Closed stores show "Cerrado" badge and are grayed out
- **Merchant Profile:** Cover image, Reviews/Tags, Product Categories
- **Product Detail Modal:**
  - Quantity: +/- Selector
  - Mandatory Selectors: E.g., "Tipo de pan" (Integral/Harina)
  - Removables (boolean): "Sin lechuga," "Sin tomate"
  - Extras (Paid): "Huevo (+$2)," "Queso Frito (+$3)"
  - Notes: Text area for comments or "Solicitudes especiales"
- **Cart (Mi Bolsa):**
  - Items grouped by Merchant
  - If store closes while browsing, show "Cerrado" warning preventing checkout
  - Edit/Remove item details

### 1.3 Hyper-Local Address Flow (Critical)

- **Step 1:** User places pin on Google Map. Button: "Ajustar marcador"
- **Step 2:** Type Selection: Casa, Apartamento, Oficina, Hotel, or "Barrio o zona poco accesible"
- **Step 3:** Conditional Fields based on type:
  - House: "Urbanización privada?" -> If Yes: "Nombre Urbanización," "Código de acceso"
  - Building: Building Name, Floor, Apt Number, accessibility question
  - Office: Company Name, Office Number
  - Hotel: Hotel Name, Room Number
- **Step 4:** Delivery Method:
  - "Entregar personalmente" (Hand-off) - requires Secret Code
  - "Dejar en recepción/garita" (Leave at gate)

### 1.4 Checkout & Payments

- **Contact Info:** "A mí" (Me) or "Otra persona" (Another person receiving)
- **Payment Methods:** Pago Móvil, Transferencia, Binance USDT
- **Financial Summary:** Products Total ($), Delivery Fee ($), Total ($), Conversión (Bs.)
- **Payment Action (Manual):**
  - Shows bank details with "Copy" button
  - CTA: "Enviar captura a este WhatsApp" (Opens WhatsApp API)
  - No automated gateway - order created in "Pending Payment" state

### 1.5 Order Tracking

**Status Progression:**
1. **Procesar pago:** Waiting for screenshot
2. **Preparando pedido:** Merchant confirmed
3. **Repartidor en camino:** Driver assigned (shows Driver Name, Photo, Vehicle, WhatsApp contact)
4. **Entregado:** Order complete

**Security Code:** 3-6 digit code displayed during "Repartidor en camino" state

---

## Application 2: VendeRápido (Merchant Platform)

**Role:** For restaurant owners to manage menus, hours, and store status.

### 2.1 Onboarding & Setup

- **Legal Entity:** "Entidad Jurídica" (Legal Name, RIF Digital, Food Handling Cert)
- **Location Setup:** Delivery Zone coordinates, Operating Hours with "Close 1 hour early" logic
- **Payout Methods:** Pago Móvil/Binance configuration

### 2.2 Menu Management

- **Structure:** Category -> Product -> Variants/Extras
- **Product Controls:**
  - Availability Toggle: "Disponible" on/off instantly
  - Image Upload: Cropper/Uploader for product photos
  - Extras Configuration: Name and price

### 2.3 Operational Dashboard

- **Global Toggle:** "Abierto/Cerrado" switch - overrides schedule for emergencies

---

## Application 3: App Interna (Operator/Admin)

**Role:** Manual control center where VeneRapido operators receive WhatsApp messages and update the system.

### 3.1 Access & Proxy

- **Login:** Admin credentials only
- **Centro de Acceso (Proxy):** Search merchant by email -> "Acceder" to view/edit their dashboard

### 3.2 Order Management Flow (The "Bridge")

- **Inbox/Feed:** Orders needing attention
- **Action 1 - Payment Verification:** Compare screenshot with Order Total. Buttons: "Aprobar Pago" or "Rechazar"
- **Action 2 - Merchant Dispatch:** "Resumen del Pedido" with COPIAR button
- **Action 3 - Driver Dispatch:** "Instrucciones de Entrega" with COPIAR button
- **Action 4 - Assign Driver:** Select from dropdown or Add New (Name + Phone + Plate)

### 3.3 Global Admin

- **Tasa Control:** Single input to set `1 USD = X Bs.` - updates across entire database instantly

---

## Technical Data Models

### Order Object

```json
{
  "order_id": "34567",
  "status": "preparando",
  "customer": {
    "name": "Andrés",
    "whatsapp": "+58777777777",
    "id_doc": "V12345678"
  },
  "address_complex": {
    "type": "casa_urbanizacion",
    "coordinates": { "lat": 9.9, "lng": -63.1 },
    "details": {
      "urbanization": "Las Mercedes",
      "gate_code": "Mencione a Juan Gomez",
      "reference_point": "Casa roja frente al Farmatodo"
    }
  },
  "cart": {
    "items": [
      {
        "product": "Super Burger",
        "base_price_usd": 5.00,
        "modifiers": ["Sin salsa rosada"],
        "extras": [{ "name": "Huevo", "price": 2.00 }]
      }
    ],
    "subtotal_usd": 15.00,
    "delivery_fee_usd": 4.00,
    "total_usd": 19.00,
    "exchange_rate_snapshot": 300.00,
    "total_bs": 5700.00
  },
  "driver_assigned": {
    "name": "Carlos Pérez",
    "phone": "+58...",
    "vehicle": "Moto Bera SBR",
    "security_code": "876"
  }
}
```

### Merchant Object

```json
{
  "merchant_id": "ortimed_01",
  "is_open_global": true,
  "schedule": {},
  "location": { "lat": 0, "lng": 0 },
  "payout_config": { "method": "binance", "address": "..." }
}
```

### Order Status Values

- `pending_payment`
- `preparing`
- `delivering`
- `delivered`
- `cancelled`

---

## Operational Workflows (Human Protocol)

1. **User** places order -> Status: `pending_payment`
2. **User** transfers money and sends screenshot to WhatsApp
3. **Operator** (App Interna) finds order, verifies amount -> Clicks "Payment Received" -> Status: `preparing`
4. **Operator** clicks "Copy Merchant Summary" -> Pastes in Merchant WhatsApp Group
5. **Merchant** confirms "Received/Cooking" via WhatsApp
6. **Merchant** messages "Ready"
7. **Operator** assigns Driver in App Interna -> Status: `delivering`
8. **Operator** clicks "Copy Driver Instructions" -> Pastes in Driver WhatsApp Group
9. **Driver** arrives, asks User for code (e.g., "876")
10. **Driver** messages code/photo to Operator
11. **Operator** marks Status: `delivered`
