

## 1. Overview

This project is a full-stack Retail Sales Management System built as part of the TruEstate SDE Intern Assignment. It processes structured retail sales data and provides advanced Search, Filtering, Sorting, and Pagination features. The system is designed with clean architecture, modular code structure, and production-style backend APIs. The frontend follows the provided UI layout and supports real-time data interaction.

---

## 2. Tech Stack

**Frontend:**

* Next.js
* React
* JavaScript / TypeScript
* CSS / Tailwind

**Backend:**

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL

**Database & Tools:**

* PostgreSQL (Docker)
* Prisma Client
* Docker
* GitHub

---

## 3. Search Implementation Summary

Search is implemented using Prisma `contains` queries with case-insensitive matching on:

* Customer Name
* Phone Number

The search logic is applied inside the main `Customer` query and works simultaneously with filters, sorting, and pagination. It supports partial matches and dynamically updates results without breaking active states.

---

## 4. Filter Implementation Summary

Multi-select and range-based filters are implemented across:

* Customer Region
* Gender
* Age Range
* Product Category
* Tags
* Payment Method
* Date Range
* Quantity
* Discount Percentage
* Total Amount
* Final Amount
* Store Location
* Employee Name

All filters work independently and in combination using Prisma relational filtering with `AND` and `some` conditions. Filter state is fully preserved during search, sorting, and pagination.

---

## 5. Sorting Implementation Summary

Sorting is implemented using Prisma `orderBy` with support for:

* Customer Name (A–Z)
* Quantity
* Date (Newest First)

Sorting always respects active filters and search queries and updates results without resetting state.

---

## 6. Pagination Implementation Summary

Pagination is implemented using Prisma `skip` and `take`:

* Page size is fixed at 10 items per page
* Next and Previous navigation supported
* Pagination always retains active search, filter, and sorting parameters
* Total records and total pages are returned from the backend

---

## 7. Setup Instructions

### Backend Setup

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

   ```
   npm install
   ```
4. Create a `.env` file with:

   ```
   DATABASE_URL=postgresql://admin:admin123@localhost:5432/salesdb
   ```
5. Start PostgreSQL using Docker:

   ```
   docker run -d --name postgres-server -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=salesdb -p 5432:5432 postgres:16
   ```
6. Run Prisma setup:

   ```
   npx prisma migrate dev
   npx prisma generate
   ```
7. Start backend server:

   ```
   npx tsc 
   node out/index.js
   ```

### Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies:

   ```
   npm install
   ```
3. Start the development server:

   ```
   npm run dev
   ```

---
