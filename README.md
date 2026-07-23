This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Admin API Testing Guide (Postman)

This project contains dynamic server API routes for content management. 

### Server Configuration
- **Base URL**: `http://localhost:3000`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <your-jwt-token>` (For authorized endpoints; use `Bearer mock-admin-token` to bypass Supabase check in development/demo mode).

---

### 1. Image Upload Endpoint
- **POST** `/api/admin/upload`
  - **Auth**: Required
  - **Body Type**: `form-data`
  - **Fields**: 
    - `file` (File type: select an image file like jpg, png, webp)
  - **Returns**: `{ "url": "...", "publicId": "..." }`

---

### 2. Portfolio Module API
- **GET** `/api/admin/portfolio`
  - **Auth**: Optional (Returns ordered portfolio list)
- **POST** `/api/admin/portfolio`
  - **Auth**: Required
  - **Body (JSON)**:
    ```json
    {
      "title": "Editorial Sunset",
      "description": "Golden hour portraits capturing warmth and soft grains.",
      "category": "PORTRAIT",
      "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      "publicId": "mock_id_sunset",
      "imagePosition": "center",
      "displayOrder": 5
    }
    ```
- **PATCH** `/api/admin/portfolio/:id`
  - **Auth**: Required
  - **Body (JSON)**: Any fields to update (e.g. `{ "title": "Golden Hour Portraits" }`)
- **DELETE** `/api/admin/portfolio/:id`
  - **Auth**: Required

---

### 3. Services Module API
- **GET** `/api/admin/services`
  - **Auth**: Optional
- **POST** `/api/admin/services`
  - **Auth**: Required
  - **Body (JSON)**:
    ```json
    {
      "title": "Drone & Aerial Coverage",
      "description": "High-altitude cinematic landscapes and event captures.",
      "price": "$600",
      "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "publicId": "srv_aerial",
      "displayOrder": 4
    }
    ```
- **PATCH** `/api/admin/services/:id`
  - **Auth**: Required
  - **Body (JSON)**: Any fields to update
- **DELETE** `/api/admin/services/:id`
  - **Auth**: Required

---

### 4. Testimonials Module API
- **GET** `/api/admin/testimonials`
  - **Auth**: Optional
- **POST** `/api/admin/testimonials`
  - **Auth**: Required
  - **Body (JSON)**:
    ```json
    {
      "clientName": "Seraphina & David",
      "review": "The shoot was incredible. The attention to retro tones matches our aesthetic perfectly.",
      "rating": 5,
      "eventType": "Outdoor Shoot",
      "imageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      "publicId": "testimonial_client_3",
      "displayOrder": 3
    }
    ```
- **PATCH** `/api/admin/testimonials/:id`
  - **Auth**: Required
  - **Body (JSON)**: Any fields to update
- **DELETE** `/api/admin/testimonials/:id`
  - **Auth**: Required

---

### 5. FAQ Module API
- **GET** `/api/admin/faq`
  - **Auth**: Optional
- **POST** `/api/admin/faq`
  - **Auth**: Required
  - **Body (JSON)**:
    ```json
    {
      "question": "Do you provide black and white edits?",
      "answer": "Yes, every collection includes a selection of editorial black and white conversions.",
      "displayOrder": 4
    }
    ```
- **PATCH** `/api/admin/faq/:id`
  - **Auth**: Required
  - **Body (JSON)**: Any fields to update
- **DELETE** `/api/admin/faq/:id`
  - **Auth**: Required

---

### 6. Inquiries Inbox API
- **GET** `/api/admin/inquiries`
  - **Auth**: Required (Returns inquiry inbox items)
- **POST** `/api/admin/inquiries`
  - **Auth**: Optional (Public contact form submission endpoint)
  - **Body (JSON)**:
    ```json
    {
      "clientName": "Clara Oswald",
      "email": "clara@tardis.org",
      "phone": "+1 (555) 789-0123",
      "eventType": "Birthday",
      "eventDetails": "Celebrating a vintage-style 30th birthday in a cozy brick pub."
    }
    ```
- **PATCH** `/api/admin/inquiries/:id`
  - **Auth**: Required (Manage status and record notes)
  - **Body (JSON)**:
    ```json
    {
      "status": "reviewed",
      "adminNotes": "Followed up on location booking availability."
    }
    ```
- **DELETE** `/api/admin/inquiries/:id`
  - **Auth**: Required

