# Shivadevi Foundation - Admin Panel Documentation

This guide is for client handover. It explains how to use the Admin Panel to manage website data.

## 1) Admin Login

- Open: `https://<your-domain>/admin/login`
- Enter admin email and password.
- Click **Sign In to Dashboard**.
- After login, you are redirected to `Dashboard`.

Default credentials currently shown in the login screen:
- Email: `admin@brightearth.org`
- Password: `BrightEarth@2024!`

Important:
- Change these credentials in backend environment before production handover.
- Backend env keys: `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## 2) Admin Navigation Overview

After login, left sidebar contains:
- `Dashboard`
- `Donations`
- `Contacts`
- `Volunteers`
- `Subscribers`
- `posts`
- `UpcomingEvents`

## 3) Dashboard (Quick Overview)

Path: `/admin/dashboard`

Use this page for quick monitoring:
- Total raised amount
- Average donation
- New contact messages
- Pending volunteers
- Subscriber count
- Posts count
- Programs count
- Annual fundraising progress
- Recent donations table

No manual edits are done here. It is a summary page only.

## 4) Donations Management

Path: `/admin/donations`

What you can do:
- View all donation records
- Search by donor name or email
- Filter by status (`completed`, `pending`, `failed`, `refunded`)
- Open a donation row to see full details in a side drawer

Details visible in drawer:
- Donor name, email, phone
- Amount, cause, recurring/one-time
- Receipt number
- Payment/order IDs
- Date/time

Note:
- This screen is read-only (no manual edit/delete from UI).

## 5) Contact Messages Management

Path: `/admin/contacts`

What you can do:
- View all contact form submissions
- Filter by status (`new`, `read`, `replied`, `archived`)
- Open any row to view full message and sender details
- Update status from table dropdown or drawer buttons
- Click **Reply via Email** from drawer

Recommended workflow:
1. Keep new submissions as `new`.
2. After checking message, mark as `read`.
3. After sending response, mark as `replied`.
4. Move old closed items to `archived`.

## 6) Volunteers Management

Path: `/admin/volunteers`

What you can do:
- View volunteer registrations
- Filter by status (`pending`, `contacted`, `active`, `inactive`)
- See name, email, city, availability, skills, registration date

Note:
- Current UI is primarily for viewing/filtering volunteer records.

## 7) Newsletter Subscribers Management

Path: `/admin/subscribers`

What you can do:
- View subscriber list
- View status (`Active` / `Unsubscribed`)
- View source and subscription date

Note:
- Current UI is read-only for subscribers.

## 8) Blog / Posts Management

Path: `/admin/posts`

### Create a new post
1. Enter **Title**.
2. Select **Category**.
3. Upload one or more images (`Upload Images`).
4. Optionally upload a PDF (`Upload PDF`).
5. Click **Create Post**.

### Delete a post
1. Scroll to **All Posts** list.
2. Click **Delete** on the post card.
3. Confirm deletion popup.

Current behavior notes:
- Images support multiple files.
- PDF upload is optional.
- Existing UI supports **create** and **delete** directly.
- Edit/update is available in API but not exposed as a full edit form in current UI.

## 9) Events Management

Path: `/admin/events` (label shown as `UpcomingEvents`)

### Create a new event
1. Fill:
   - Title (required)
   - Category
   - Description
   - Date (required)
   - Time
   - Location
2. Upload one or more images.
3. Click **Create Event**.

### Delete an event
1. Find the event in event list.
2. Click **Delete**.
3. Confirm deletion popup.

Current behavior notes:
- Event editing is not available in UI currently.
- You can create and delete from admin panel.

## 10) Logout

- Use **Sign Out** button from sidebar.
- This clears saved admin session from browser.

## 11) Operational Best Practices (For Client Team)

- Review `Contacts` daily; keep statuses updated.
- Review `Donations` weekly for reconciliation.
- Use consistent naming/categorization for posts and events.
- Resize/compress images before upload for faster website performance.
- Keep all critical announcements in both `Posts` and `Events` if needed.
- Change admin password periodically.

## 12) Troubleshooting

### A) Admin login fails
- Confirm backend server is running.
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in backend env.
- Verify frontend `VITE_API_URL` points to correct backend.

### B) Dashboard says data failed to load
- Usually backend/API URL issue.
- Check browser dev tools network tab and backend logs.

### C) Image/PDF upload not working
- Confirm file size is not too large.
- Confirm backend upload folder permissions are correct.
- Check API response in browser network tab.

### D) Looks logged in but data not loading
- Sign out and login again.
- Clear browser local storage and retry.

## 13) Current Scope Summary

Fully manageable from UI:
- View dashboard metrics
- View/filter donations
- Manage contact statuses
- View volunteers/subscribers
- Create/edit/delete posts
- Create/edit/delete events

Not fully implemented in UI yet:
- Manual donation record editing
- Volunteer/subscriber status editing from admin panel

---

If required, the next upgrade can add:
- Bulk actions for contacts/volunteers
- Export (CSV/Excel) for donations and contacts
- Role-based access (super admin/editor/viewer)
