---
title: 'Page Speed Kills: How Slow Websites Destroy Your Ad ROI'
excerpt: 'You are paying for every click. If your website takes 5 seconds to load, you are paying for clicks that never see your offer. Here is the maths and the fix.'
coverImage: ''
date: '2026-03-10'
publishDate: '2026-03-10T06:00:00'
status: published
tags:
  - Page Speed
  - Website Performance
  - Ad ROI
  - South Africa
author: Stacked Marketing
---

Every time someone clicks your Facebook ad, you pay. Whether they see your landing page or not. Whether they wait for it to load or bounce after 3 seconds. You pay.

If your website takes 5–8 seconds to load (which is common for South African business websites, especially WordPress sites on cheap shared hosting), here's what actually happens to your money.

## The Maths of Slow

### Bounce Rate by Load Time

Research from Google's Web Performance team shows:

| Load Time | Probability of Bounce |
|-----------|----------------------|
| 1–3 seconds | 32% bounce |
| 3–5 seconds | 53% bounce |
| 5–6 seconds | 67% bounce |
| 6–10 seconds | 90% bounce |

"Bounce" means they left before interacting with anything. They clicked your ad, waited, and gave up.

### What This Costs You

Let's say you're spending R10,000/month on Meta ads and getting 2,000 clicks at R5 per click.

**If your site loads in 2 seconds:**
- ~32% bounce = 640 people leave
- ~1,360 people see your offer
- At 5% conversion rate = 68 leads
- Cost per lead: R147

**If your site loads in 5 seconds:**
- ~53% bounce = 1,060 people leave
- ~940 people see your offer
- At 5% conversion rate = 47 leads
- Cost per lead: R213

**If your site loads in 7 seconds:**
- ~80% bounce = 1,600 people leave
- ~400 people see your offer
- At 5% conversion rate = 20 leads
- Cost per lead: R500

Same ads. Same R10,000 budget. The slow site generates 3.4x fewer leads and the cost per lead is 3.4x higher.

That R10,000/month at R500 CPL versus R147 CPL is R4,244 in wasted ad spend every single month. Over a year, that's R50,928 — thrown away because the website is slow.

## Why South African Sites Are Especially Affected

### Mobile Data Connections
South African users frequently browse on 3G/4G mobile data. A page that loads in 2 seconds on fibre might take 6–8 seconds on a 3G connection. If your site isn't optimised for slower connections, you're losing the majority of your SA mobile audience.

### Shared Hosting
Most SA web developers use cheap shared hosting (R50–R200/month). Shared hosting means your website shares server resources with hundreds of other sites. During peak hours, performance degrades for everyone.

A dedicated server or modern hosting platform (Vercel, Netlify) costs R200–R500/month but delivers consistent sub-2-second load times.

### WordPress + Plugin Bloat
The average South African WordPress business site has 15–25 plugins installed. Each plugin adds JavaScript, CSS, and database queries. Even "lightweight" plugins add up:

- Contact Form 7: Loads scripts on every page, not just the contact page
- Slider Revolution: Adds 500KB+ of JavaScript
- WooCommerce (even if not using e-commerce): Loads styles and scripts globally
- Yoast SEO: Adds rendering overhead
- Social share buttons: External scripts that block page rendering

The fix isn't removing necessary plugins — it's choosing a tech stack that doesn't need 25 plugins to function.

## How to Diagnose Your Speed Issue

### Step 1: Measure
Go to Google PageSpeed Insights and enter your URL. Check the mobile score.

**Benchmarks:**
- 90–100: Excellent
- 70–89: Good
- 50–69: Needs improvement
- 0–49: Poor (most SA business sites fall here)

### Step 2: Identify the Bottleneck
PageSpeed gives you specific diagnostics. The most common issues:

**Largest Contentful Paint (LCP):** How long until the biggest visible element loads. Usually a hero image. Target: under 2.5 seconds.

**First Input Delay (FID) / Interaction to Next Paint (INP):** How responsive the page is to interaction. If clicking a button has a delay, JavaScript is blocking the main thread. Target: under 200ms.

**Cumulative Layout Shift (CLS):** How much the page "jumps around" as it loads. Images without dimensions, dynamically injected content, and fonts that load late cause this. Target: under 0.1.

### Step 3: Prioritise Fixes
Fix them in this order (biggest impact first):
1. Image optimisation (largest LCP improvement)
2. Server response time (hosting upgrade)
3. Remove render-blocking JavaScript
4. Reduce third-party scripts
5. Add caching headers

## The Quick Wins

### 1. Compress and Resize Images
This single fix often improves load time by 2–4 seconds.

- Convert all images to WebP format (30–50% smaller than JPEG)
- Resize images to the maximum display size (a hero image doesn't need to be 4000px wide)
- Lazy-load images below the fold
- Target: no single image over 200KB

### 2. Remove Unnecessary Scripts
Audit every external script loading on your page:
- Do you actually use that chat widget? If nobody chats, remove it.
- Are social share buttons adding value? If shares are near zero, remove them.
- Is that analytics tool providing insights you act on? If not, remove it.

Every removed script improves load time.

### 3. Upgrade Hosting
Moving from R50/month shared hosting to a proper hosting platform is often the most cost-effective speed improvement:

| Hosting Type | Monthly Cost | Typical Load Time |
|-------------|-------------|-------------------|
| Shared hosting (cheap) | R50–R150 | 4–8 seconds |
| Quality shared hosting | R200–R400 | 2–4 seconds |
| VPS hosting | R300–R800 | 1–3 seconds |
| Modern platform (Vercel/Netlify) | R0–R500 | 0.5–2 seconds |

For R200–R300 more per month, you can cut your load time in half. Given the impact on ad ROI, this is one of the highest-return investments in your marketing stack.

## The Nuclear Option: Rebuild for Speed

Sometimes the fastest path to a fast site is starting over. If your current site is a heavily customised WordPress theme with 20+ plugins and years of accumulated bloat, patching it will only get you so far.

A modern website built on a framework like Next.js or Astro, deployed on a modern hosting platform, with optimised images and minimal JavaScript, will load in under 2 seconds on mobile data in South Africa.

Our client websites consistently score 90+ on PageSpeed Insights because we build for speed from the foundation, not as an afterthought.

The investment is R2,499–R5,000 for a new site. If your current site is costing you R4,000+/month in wasted ad spend, the new site pays for itself in the first month.

## The Algorithm Factor

Here's something many SA businesses don't know: both Google and Meta penalise slow websites.

**Google:** Page speed is a direct ranking factor. Slow sites rank lower in search results. Google uses Core Web Vitals (LCP, FID, CLS) as ranking signals.

**Meta:** The ads algorithm considers landing page experience. If users bounce quickly from your site (because it's slow), Meta learns that your destination is low-quality and charges you more for future ad delivery. You're literally paying a "slow website tax" on every campaign.

Fixing your page speed doesn't just improve conversion rates — it reduces your ad costs and improves your organic search visibility simultaneously.

---

*Fast websites that convert. R2,499, delivered in 5 days. [Stop wasting ad spend on a slow site.](/)*
