# Tribal Uddan deployment

This folder is configured for Vercel. It serves `eduproject.html` at `/` and
deploys `api/study-mentor.js` as the `/api/study-mentor` serverless endpoint.

## Deploy

1. Import this project into Vercel and set the project root directory to
   `TEJASWANI/projects` (the folder containing `vercel.json`).
2. In **Project Settings → Environment Variables**, add `OPENAI_API_KEY` with
   your OpenAI API key. Do not add the key to HTML, JavaScript, or source
   control. Optionally set `OPENAI_MODEL`; the default is `gpt-4o-mini`.
3. Deploy the project. The LMS will be available at `/`, and the mentor API at
   `/api/study-mentor`.

You can also deploy from this folder using the Vercel CLI:

```powershell
npx vercel
npx vercel --prod
```

Set the same environment variables in Vercel before deploying production, then
redeploy after changing an environment variable.
