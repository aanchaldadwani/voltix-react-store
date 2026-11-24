# Voltix – React E-commerce Store

A modern, fully responsive **10-page electronics store** built with **React 19** and **Tailwind CSS v4**.

**Live demo:** https://aanchaldadwani.github.io/voltix-react-store/

Built by [Aanchal Dadwani](https://github.com/aanchaldadwani) – React & Tailwind CSS developer.

## Pages

| # | Page | What it does |
|---|------|--------------|
| 1 | **Home** | Auto-playing hero slider, category grid, featured product tabs, deal of the day with live countdown, promo banners, reviews, newsletter |
| 2 | **Shop** | Category, price, brand and rating filters, search, sorting, grid/list view, pagination, mobile filter drawer |
| 3 | **Product details** | Image gallery with hover zoom, colour and quantity picker, specs, reviews with rating breakdown and write-a-review form, related products |
| 4 | **Cart** | Quantity update, remove, coupon codes (`VOLT10`, `WELCOME15`), free-shipping progress, order summary |
| 5 | **Checkout** | 3-step checkout (shipping → delivery → payment) with form validation |
| 6 | **Order confirmation** | Order number, tracking timeline, estimated delivery, printable summary |
| 7 | **Wishlist** | Saved products, move to cart |
| 8 | **Account** | Login / register, order history, profile and addresses |
| 9 | **About** | Story, stats, values and timeline |
| 10 | **Contact** | Validated contact form, map, FAQ accordion |

Bonus: a **Design system** page (`/style-guide`) showing the colour tokens, typography, buttons, inputs and components – the Figma design translated into reusable React + Tailwind code.

## Features

- Slide-out cart drawer, toast notifications and smooth scroll/entry animations
- Cart, wishlist, orders and login saved in `localStorage`
- Discount badges, ratings, coupon codes, tax and shipping calculation
- Mobile-first responsive layout (phone, tablet, desktop)
- Reusable components (`ProductCard`, `QtyPicker`, `Stars`, `PageHeader`, …)
- Hash routing, so it works on GitHub Pages, Netlify or any static host
- Accessible labels, keyboard support (Esc closes the cart) and SEO-friendly titles

## Tech stack

React 19 · Tailwind CSS v4 · Vite · React Icons

## Run locally

```bash
npm install
npm run dev      # start dev server
npm run build    # production build into /docs
```

## Project structure

```
src/
  components/   Navbar, Footer, ProductCard, CartDrawer, Toasts, UI helpers
  context/      StoreContext – cart, wishlist, orders, user
  data/         products.js – products, categories, reviews
  lib/          router (hash routing) and utilities
  pages/        Home, Shop, ProductDetails, Cart, Checkout, OrderSuccess,
                Wishlist, Account, About, Contact, StyleGuide, NotFound
docs/           production build served by GitHub Pages
```

Product photos from [Pexels](https://www.pexels.com). This is a demo store – no real payments are taken.
