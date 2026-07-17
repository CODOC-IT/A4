<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&pause=1000&color=2F80ED&center=true&vCenter=true&width=600&lines=ServiceFlow+Portal;CSS+%26+Status+Style+Fixes+%F0%9F%9A%80;Team+Beta+%F0%9F%92%99" alt="Typing SVG" />

![Status](https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge)
![Branch](https://img.shields.io/badge/branch-beta%2Fbug%2Ffix--css--and--status--styles-blueviolet?style=for-the-badge)
![Node](https://img.shields.io/badge/node-18-339933?style=for-the-badge&logo=node.js)

</div>

# 🛠️ ServiceFlow Portal

Internal portal for booking field services and assigning operations staff.

---

## 🚀 Getting Started

You need **Node 18** and **npm 8**. Copy `.env.example` to `.env` and run:

```bash
npm ci
npm start
```

Development is available at **http://localhost:8080** 🌐
Booking information is stored under `storage/bookings.json` 💾

---

## 📦 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts development server ⚡ |
| `npm run lint` | Checks formatting and code quality 🔍 |
| `npm test` | Runs the unit test suite 🧪 |

---

## 🌿 This Branch: `beta/bug/fix-css-and-status-styles`

<div align="center">
<img src="https://raw.githubusercontent.com/gist/damianesteban/9bd3d8b989e8158f34b1bf1e26ff2fd1/raw/loading.gif" width="60" alt="working" />
</div>

**Purpose:** Frontend UI and UX improvements for the dashboard, focused on styling consistency.

### ✨ What's Changed

- 🐛 **Fixed invalid CSS** in `legacy.css`, corrected `margin-top: 18 px;` to `margin-top: 18px;`
- 🎨 **Unified status styling** on the dashboard, replaced inline styles with shared CSS classes from `globals.css`
- 🧩 **Improved maintainability**, status badges now use the same `.status` classes across all pages

### 🎯 Impact

- ✅ Consistent UI across dashboard and bookings page
- ✅ Better code maintainability, one single source of truth for status styles
- ✅ Proper status colors 🟢 green for completed, 🔴 red for cancelled, 🔵 blue for in progress

### 🖌️ Status Badge Preview

<p>
  <img src="https://img.shields.io/badge/Completed-2ECC71?style=flat-square" alt="completed" />
  <img src="https://img.shields.io/badge/Cancelled-E74C3C?style=flat-square" alt="cancelled" />
  <img src="https://img.shields.io/badge/In%20Progress-3498DB?style=flat-square" alt="in progress" />
</p>

---

## 📁 Project Structure

```
A4/
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Dashboard (fixed in this branch)
│   │   ├── bookings/   # Bookings pages
│   │   └── globals.css # Global styles
│   ├── components/     # Reusable components
│   └── lib/             # Utilities and helpers
├── data/                # JSON data storage
├── public/              # Static assets
└── docs/                # Documentation
```

---

## 🔗 Documentation

See [deployment notes](docs/deployment.md) 📘 and [API reference](docs/api.md) 📗 for more information.

---

## 👥 Team Beta 🎨 Frontend & UX

| Member | GitHub |
|--------|--------|
| Bilal Mughal | [@Bilalmughal-07](https://github.com/Bilalmughal-07) |
| Abdul Azeem Hashmi | [@AbdulAzeemHashmi](https://github.com/AbdulAzeemHashmi) ⬅️ **You are here** |
| Emaan Ahmed | [@emaanahmed5](https://github.com/emaanahmed5) |
| Abdul Rafih Khan | [@RafihKhan-47](https://github.com/RafihKhan-47) |

---

## 📝 Status

| Check | Status |
|-------|--------|
| Lint | ✅ Passed |
| Build | ✅ Passed |
| Review | 🔄 In Progress |

<div align="center">

![Made with love](https://img.shields.io/badge/made%20with-%E2%9D%A4-red?style=flat-square)

*ServiceFlow operations portal. Updated 2025.* 🚀

</div>
