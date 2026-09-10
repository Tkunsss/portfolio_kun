# Deploying the portfolio

## 1. Push the project to GitHub

Create a GitHub repository and push this project. Do not commit `.env`.

## 2. Deploy the backend on Render

1. Open Render and choose **New > Blueprint**.
2. Select the GitHub repository.
3. Render will read `render.yaml` and create the Node service.
4. Add these secret values in the Render service environment settings:
   - `SMTP_USER`: your email address
   - `SMTP_PASSWORD`: your Gmail App Password
   - `FROM_EMAIL`: the same sending email address
   - `TO_EMAIL`: the inbox that should receive messages
   - `FRONTEND_URL`: the Vercel URL, added after the frontend is deployed
5. Copy the Render service URL, for example `https://portfolio-email-api.onrender.com`.
6. Check that `https://your-render-url.onrender.com/health` returns `{ "status": "ok" }`.

## 3. Deploy the frontend on Vercel

1. Open Vercel and import the same GitHub repository.
2. Keep the Vite defaults. `vercel.json` already defines the build settings.
3. Add this environment variable in Vercel:
   - `VITE_API_URL`: your Render service URL, without a trailing slash
4. Deploy the project.
5. Copy the Vercel URL and set it as `FRONTEND_URL` in Render.
6. Redeploy the Render service after changing `FRONTEND_URL`.

## 4. Test

Open the Vercel URL, submit the contact form, and check the `TO_EMAIL` inbox. If it fails, inspect the Render service logs first.
