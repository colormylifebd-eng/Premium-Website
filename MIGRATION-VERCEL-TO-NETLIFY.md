# Migration Guide: Vercel → Netlify

## 🎯 You're Already 90% Done!

Since your site is already live on Vercel, you have everything configured. This is just a straightforward migration.

---

## 📋 Quick Migration Checklist

### ✅ What You Already Have:
- ✅ Live website on Vercel
- ✅ Database (PostgreSQL) - already connected
- ✅ Cloudinary account - already configured
- ✅ Resend account - already configured
- ✅ Environment variables - already set in Vercel
- ✅ Domain configured (if custom domain is set)

### 🔄 What We Need To Copy:
- Environment variables from Vercel → Netlify
- (Optional) Custom domain DNS settings

---

## 🚀 Migration Steps (15 minutes)

### Step 1: Export Environment Variables from Vercel

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Select your project: **`colormylifebd-eng/Premium-Website`**
3. Go to **Settings** → **Environment Variables**
4. Copy all variables (you'll need them for Netlify)

**Variables to copy:**
```
DATABASE_URL
AUTH_SECRET
SITE_URL (change to new Netlify URL)
ADMIN_EMAIL
ADMIN_PASSWORD
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RESEND_API_KEY
EMAIL_FROM
```

### Step 2: Deploy to Netlify

1. **Go to:** https://app.netlify.com
2. **Sign up/Login** (use GitHub for easy integration)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select **"Deploy with GitHub"**
5. Choose repository: **`colormylifebd-eng/Premium-Website`**
6. **Build settings** (already configured in `netlify.toml`):
   - Build command: `npm run db:deploy && npm run build`
   - Publish directory: `.next`
7. Click **"Deploy site"** (will fail initially - that's expected)

### Step 3: Add Environment Variables to Netlify

1. In Netlify Dashboard → Your site → **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Paste ALL variables from Vercel

**IMPORTANT:** Update `SITE_URL`:
- Change from: `https://your-vercel-url.vercel.app`
- To: `https://your-site.netlify.app` (get this from Netlify dashboard)

### Step 4: Trigger Rebuild

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait 2-3 minutes for build to complete
4. ✅ Your site should now be live on Netlify!

### Step 5: Test Everything

Visit your new Netlify URL and test:
- [ ] Homepage loads
- [ ] Product pages work
- [ ] Admin login works (`/admin`)
- [ ] Image uploads work (Cloudinary)
- [ ] Password reset emails send (Resend)

---

## 🌐 Custom Domain Migration (Optional)

If you have `colormylifebd.com` configured on Vercel:

### Step A: Add Domain to Netlify
1. In Netlify → **Site settings** → **Domain management**
2. Click **"Add a domain"**
3. Enter: `colormylifebd.com`
4. Netlify will show you DNS records to update

### Step B: Update DNS Records
**IMPORTANT:** Wait until Netlify site is working before changing DNS!

1. Go to your domain registrar (where you bought the domain)
2. Update DNS records as shown in Netlify:
   - Usually change **A record** or **CNAME**
3. DNS propagation takes 1-48 hours

### Step C: Update SITE_URL
Once domain is working on Netlify:
- Update `SITE_URL` environment variable to: `https://colormylifebd.com`
- Trigger a new deploy

### Step D: Remove from Vercel
After domain is fully working on Netlify:
1. Go to Vercel dashboard
2. Remove the domain from your Vercel project
3. (Optional) Delete the Vercel project

---

## ⚠️ Important Notes

### Database Access
- Your database doesn't need to change
- Same `DATABASE_URL` works for both Vercel and Netlify
- Both can run `db:deploy` during builds

### No Downtime Strategy
1. ✅ Keep Vercel running while setting up Netlify
2. ✅ Test everything on Netlify URL first
3. ✅ Only switch domain after confirming Netlify works
4. ✅ This ensures zero downtime for your client

### Cloudinary & Resend
- No changes needed
- Same API keys work on both platforms
- No reconfiguration required

---

## 📊 Comparison: What Changes?

| Aspect | Vercel | Netlify |
|--------|--------|---------|
| Hosting Platform | ✅ Vercel | ✅ Netlify |
| Database | Same PostgreSQL ✅ | Same PostgreSQL ✅ |
| Image Storage | Same Cloudinary ✅ | Same Cloudinary ✅ |
| Email Service | Same Resend ✅ | Same Resend ✅ |
| Build Process | `db:deploy && build` ✅ | `db:deploy && build` ✅ |
| Environment Vars | Copy once ✅ | Use copied values ✅ |
| Domain | Update DNS if custom | Update DNS if custom |

**Result:** Everything stays the same except the hosting platform!

---

## 🆘 Troubleshooting

### Build Fails on Netlify
**Problem:** Database migration fails
**Solution:** 
- Verify `DATABASE_URL` is correct in Netlify env vars
- Ensure database is accessible from Netlify servers
- Check build logs for specific error

### Images Not Loading
**Problem:** Cloudinary images don't show
**Solution:**
- Verify all 3 Cloudinary env vars are set in Netlify
- Check `CLOUDINARY_CLOUD_NAME` matches your account
- Redeploy after adding variables

### Password Reset Emails Don't Send
**Problem:** Resend emails fail
**Solution:**
- Verify `RESEND_API_KEY` is correct
- Check `EMAIL_FROM` domain is verified in Resend
- Ensure `SITE_URL` matches your Netlify URL

---

## 💰 Cost Comparison

### Vercel (Current)
- Free tier = Not for commercial use ❌
- Pro tier = $20/month per user

### Netlify (New)
- Pro tier = $19/month per site ✅
- Allows commercial use ✅
- 100GB bandwidth included
- Better pricing for your use case

---

## ✅ Post-Migration

Once everything is working on Netlify:

1. **Test thoroughly** - All features working?
2. **Update bookmarks** - New Netlify URL
3. **Inform client** - New admin URL if domain changed
4. **Keep Vercel for 1 week** - Safety backup period
5. **Delete Vercel project** - After confirming stability

---

## Need Help?

If you run into issues:
1. Check Netlify build logs: Deploy → Click on failed deploy → View logs
2. Check environment variables: All set correctly?
3. Test database connection: Can Netlify reach your DB?

You've got this! The migration is straightforward since everything is already working.
