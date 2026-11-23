# Ariba Shaikh — Portfolio

**Live site:** https://aribashaikhhh.github.io

My personal portfolio, built as a retro desktop inspired by Windows XP. Every section opens as its own window that you can drag, minimize, maximize, and close, just like a real desktop.

## Features

- **Desktop icons:** folders and app-style icons that open each section
- **Draggable windows:** move, stack, minimize, maximize, and close
- **Taskbar:** a Start menu, a button for each open window, and a live clock
- **Mobile-friendly:** on phones, windows open full-screen
- **No frameworks:** plain HTML, CSS, and JavaScript, written from scratch
- **Custom artwork:** every icon and the wallpaper are hand-drawn in SVG, with no image files

## Sections

| Icon | What's inside |
|---|---|
| Welcome | Intro and quick links |
| About.txt | Who I am and what I'm interested in |
| Experience | Work experience, professional development, campus involvement, volunteering |
| Projects | Professional and fun projects |
| Skills | Security, infrastructure, programming, systems, AI tools, leadership |
| Certifications | Completed and in-progress certifications |
| Contact | Email, LinkedIn, GitHub |
| Resume.pdf | Downloadable resume |

## Projects featured

- **Safe Haven** *(in progress)*: a campus safety platform with role-based dashboards, incident tickets, and an SOS mode
- **[Conjure](https://github.com/aribashaikhhh/Conjure)** *(completed)*: about 3,000 particles controlled by hand gestures in the browser
- **[Logic Pro MCP](https://github.com/aribashaikhhh/logic-pro-mcp)** *(completed, actively improving)*: an MCP server that lets Claude control Logic Pro

## Files

```
index.html   page structure, window content, and the SVG icon set
style.css    XP-style theme: windows, taskbar, Start menu, icons
script.js    window manager: open, drag, focus, minimize, taskbar, clock
resume.pdf   my resume
```

## Run it locally

No build step needed. Clone the repo and open `index.html` in a browser:

```bash
git clone https://github.com/aribashaikhhh/aribashaikhhh.github.io.git
cd aribashaikhhh.github.io
open index.html
```

(On Windows, double-click `index.html` instead of using `open`.)

## Customize

All external links live in one place, at the top of `script.js`:

```js
const LINKS = {
  github:   "https://github.com/aribashaikhhh",
  linkedin: "https://www.linkedin.com/in/ariba-shaikh",
  resume:   "resume.pdf",
  ...
};
```

To add a new section, add a desktop icon with `data-open="name"` and a matching `<section class="window" id="win-name">` in `index.html`. The script builds the title bar and taskbar button automatically.

## Hosting

Hosted for free on **GitHub Pages**. Any change pushed to `main` goes live within a minute or two.

---

*Inspired by the look of Windows XP. Not affiliated with Microsoft. All icons and artwork are original.*
