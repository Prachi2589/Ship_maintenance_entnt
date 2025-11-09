# Ship Maintenance Dashboard

## Project Overview

The **Ship Maintenance Dashboard** is a React-based frontend application developed as an internal tool for ENTNT to manage ships, their components, and associated maintenance jobs. This project simulates a full maintenance workflow including user authentication, role-based access, ships and components management, maintenance jobs tracking, calendar scheduling, notifications, and KPI dashboards — all powered entirely through localStorage, without any backend integration.

---
## Live Demo

[Deployed Application Link](ship-maintenance-entnt-ten.vercel.app)

---

## GitHub Repository

[GitHub Repo Link]([YOUR_GITHUB_REPO_LINK_HERE](https://github.com/Prachi2589/Ship_maintenance_entnt/))

---

## Features

### User Authentication & Authorization
- Simulated login with hardcoded users (Admin, Inspector, Engineer)
- Email/password authentication with session persistence via localStorage
- Role-based access control restricting UI and actions based on user role

### Ships Management
- List all ships with details: Name, IMO Number, Flag, Status
- Create, edit, and delete ships
- View detailed ship profile: General info, maintenance history, and installed components

### Components Management
- Add, edit, and delete components linked to specific ships
- Component details: Name, Serial Number, Installation Date, Last Maintenance Date

### Maintenance Jobs Management
- Create jobs for components including type, priority, status, and assigned engineer
- View and filter jobs by ship, status, and priority
- Update job statuses as maintenance progresses

### Maintenance Calendar
- Monthly and weekly calendar views showing scheduled maintenance jobs
- Click on dates to see jobs scheduled for that day

### Notification Center
- In-app notifications for job creation, updates, and completion
- Notifications are dismissible for better user experience

### KPIs Dashboard
- Visual overview showing total ships, overdue maintenance components, jobs in progress, and completed jobs
- Utilizes cards and charts for intuitive data visualization

### Responsive Design
- Fully responsive UI suitable for desktop, tablet, and mobile devices

---

## Technical Details

- **Framework:** React (Functional Components)
- **Routing:** React Router for navigation
- **State Management:** React Context API managing global states for Auth, Ships, Components, and Jobs
- **Data Persistence:** All data stored and retrieved from `localStorage` to simulate backend persistence
- **Styling:** TailwindCSS (or specify your choice) for consistent, professional styling
- **Forms:** Validated with user feedback for all create/edit forms
- **Error Handling:** Graceful error and loading state management throughout the app
- **Code Structure:** Modular components organized by feature/domain for maintainability

---



---

## Known Issues / Limitations

- All data is stored on the client side; clearing browser data will reset the app state.
- No backend means no real-time multi-user synchronization.
- Authentication is simulated and not secure for production.
- Notifications do not persist after page refresh.
- Some form inputs could be enhanced with more advanced validation or UI feedback.

---

## Technical Decisions

- **LocalStorage:** Chosen to simulate persistent storage since backend APIs were disallowed.
- **React Context API:** Used over Redux for simplicity and ease of use in this medium-sized app.
- **TailwindCSS:** Provides rapid styling with consistent design and responsiveness out-of-the-box.
- **React Router:** Enables SPA-style navigation with role-based route protection.
- **Component-driven Design:** Keeps code modular, reusable, and maintainable.
- **In-app Notifications:** Implemented to improve user awareness of system changes without overwhelming.

---

## Installing Dependencies

Before running the project, make sure you have [Node.js](https://nodejs.org/) installed on your system.

To install all the required dependencies, run the following command in your project root directory:

```bash
npm install

```bash
npm start
---


##User Credentials

| Role      | Email               | Password   |
|-----------|---------------------|------------|
| Admin     | admin@entnt.in      | admin123   |
| Inspector | inspector@entnt.in  | inspect123 |
| Engineer  | engineer@entnt.in   | engine123  |
