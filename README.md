# TRIMT HOMES — Official Website

**Your Vision, Our Priority.**

A responsive real estate website and static admin dashboard preview for TRIMT HOMES, a property and construction business under Trimt Olawole Limited.

## Project contents

- `index.html`, `styles.css`, `app.js` — public website, responsive styles and client-side interactions.
- `dashboard.html`, `dashboard.css`, `dashboard.js` — dashboard preview. The dashboard currently displays sample figures and placeholder sections.
- `supabase/schema.sql` — initial Supabase PostgreSQL tables, indexes and row-level security policies.

## Run locally

This is a static website. Open `index.html` in a browser, or serve the project directory with any local static HTTP server. Open `dashboard.html` to view the dashboard preview.

## Publish with GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Choose the `main` branch and `/ (root)` folder, then save.
4. After the deployment completes, the site will be available at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

## Supabase setup

1. Create a Supabase project and open its SQL Editor.
2. Review and run `supabase/schema.sql`.
3. Implement and test application integration before collecting real customer information.

The current HTML and JavaScript do **not** connect to Supabase. The enquiry form is a preview and does not persist or send submissions until an email recipient is configured in `app.js` or a secure backend integration is implemented.

## Before launch

- Add the approved logo at `assets/trimt-homes-logo.jpeg` or update the logo path in `index.html`.
- Replace sample listing photos and sample listing text with verified company content.
- Replace the WhatsApp link with the official business number.
- Configure the business email or implement a secure server-side form endpoint.
- Add Supabase client integration and secure administrator authentication before connecting the dashboard to live data. Never put a Supabase service-role key in browser code.
- Review database policies, privacy obligations and security controls before going live.
- Test navigation, forms and layouts across mobile, tablet and desktop.

## Important

This repository is a frontend website and dashboard preview with an initial database schema. It is not a production-ready property platform. The dashboard is not protected by authentication, and its displayed data is sample content. Secure authentication, live database features and operational workflows still need implementation and testing.
