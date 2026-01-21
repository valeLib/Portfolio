# Dual-Build Deployment Guide

This portfolio uses a **two-deploy method** to maintain two public variants from one codebase:

1. **Unified Software-First Portfolio**: `/Portfolio/`
2. **Backup GameDev/Tech Art Portfolio**: `/Portfolio/Gamedev/`

Both builds share the same codebase, differing only by **build-time flags**.

---

## Public URLs

### 1. Unified (Primary)
- **URL**: https://valelib.github.io/Portfolio/
- **Profile**: `unified`
- **CV**: Software Engineering (`Valentina_LZ_CV.pdf`)
- **Focus**: Frontend/Software primary, Tech Art secondary
- **Navigation**: About → Experience → Projects → Skills → Contact → Tech Art

### 2. GameDev (Backup)
- **URL**: https://valelib.github.io/Portfolio/Gamedev/
- **Profile**: `gamedev`
- **CV**: Game Development (`Valentina_LZ_GameDev_CV.pdf`)
- **Focus**: Tech Art/GameDev primary, Frontend minimal
- **Navigation**: About → Gallery → Projects → Experience → Skills → Contact

---

## Local Development

### Setup

1. **Create environment files** (see `ENV_SETUP.md`):
   - `.env` (default, uses unified)
   - `.env.unified`
   - `.env.gamedev`

### Run Dev Server

```bash
# Unified (software-first) - default
npm run dev
# or explicitly:
npm run dev:unified

# GameDev (tech art-first)
npm run dev:gamedev
```

Both run on `http://localhost:5173` with live reload.

### Build Locally

```bash
# Build unified
npm run build:unified

# Build gamedev
npm run build:gamedev

# Build both (for testing deployment structure)
npm run build:unified && npm run build:gamedev
```

### Preview Builds

```bash
# Preview unified build
npm run build:unified
npm run preview:unified
# Opens on http://localhost:4173

# Preview gamedev build
npm run build:gamedev
npm run preview:gamedev
# Opens on http://localhost:4174
```

---

## Environment Variables

Each build uses different environment variables defined in `.env` files:

### `.env` (default - unified)
```env
VITE_PROFILE=unified
VITE_CV_ENABLED=true
VITE_CV_VARIANT=software
VITE_BASE=/Portfolio/
```

### `.env.unified`
```env
VITE_PROFILE=unified
VITE_CV_ENABLED=true
VITE_CV_VARIANT=software
VITE_BASE=/Portfolio/
```

### `.env.gamedev`
```env
VITE_PROFILE=gamedev
VITE_CV_ENABLED=true
VITE_CV_VARIANT=gamedev
VITE_BASE=/Portfolio/Gamedev/
```

### Variable Reference

| Variable | Values | Description |
|----------|--------|-------------|
| `VITE_PROFILE` | `unified` \| `gamedev` | Determines content hierarchy and navigation |
| `VITE_CV_ENABLED` | `true` \| `false` | Enables/disables CV download button |
| `VITE_CV_VARIANT` | `software` \| `gamedev` | Which CV PDF to link to |
| `VITE_BASE` | `/Portfolio/` \| `/Portfolio/Gamedev/` | Base path for GitHub Pages |

---

## Build Configuration

### Vite Base Paths

The base path is dynamically set in `vite.config.ts` based on the mode:

- **unified mode**: `/Portfolio/`
- **gamedev mode**: `/Portfolio/Gamedev/`

This ensures all assets (JS, CSS, images, CV PDFs) are correctly resolved for GitHub Pages.

---

## GitHub Pages Deployment

### Automatic Deployment

Deployment is handled by GitHub Actions (`.github/workflows/deploy-dual.yml`).

**Trigger**: Automatic on push to `main` branch

### Workflow Steps

1. **Checkout** repository
2. **Install** dependencies (`npm ci`)
3. **Build Unified**:
   - Run `npm run build:unified`
   - Output to `dist/`
   - Move to `deploy/` (root)
4. **Clean** dist folder
5. **Build GameDev**:
   - Run `npm run build:gamedev`
   - Output to `dist/`
   - Move to `deploy/Gamedev/`
6. **Verify** deployment structure
7. **Deploy** to GitHub Pages

### Deployment Structure

After deployment, GitHub Pages serves:

```
gh-pages branch:
├── index.html              ← Unified build (software-first)
├── assets/
├── cv/
│   └── Valentina_LZ_CV.pdf
└── Gamedev/
    ├── index.html          ← GameDev build (tech art-first)
    ├── assets/
    └── cv/
        └── Valentina_LZ_GameDev_CV.pdf
```

### Public URLs

- **Unified**: https://valelib.github.io/Portfolio/
- **GameDev**: https://valelib.github.io/Portfolio/Gamedev/

### Manual Deployment

Trigger manually from GitHub Actions tab:
1. Go to repository → Actions
2. Select "Deploy Dual Portfolio" workflow
3. Click "Run workflow" → "Run workflow"

---

## CV PDF Configuration

### CV Files

Two CV files are maintained:

```
public/
  cv/
    Valentina_LZ_CV.pdf              ← Software Engineering CV (unified)
    Valentina_LZ_GameDev_CV.pdf      ← GameDev / Tech Art CV (gamedev)
```

### CV Selection Logic

The correct CV is automatically selected based on `VITE_CV_VARIANT`:

- **Unified build**: Links to `/Portfolio/cv/Valentina_LZ_CV.pdf`
- **GameDev build**: Links to `/Portfolio/Gamedev/cv/Valentina_LZ_GameDev_CV.pdf`

### Updating CVs

**To update the Software CV**:
1. Replace `public/cv/Valentina_LZ_CV.pdf`
2. Keep the filename exactly as is
3. Commit and push to trigger deployment

**To update the GameDev CV**:
1. Replace `public/cv/Valentina_LZ_GameDev_CV.pdf`
2. Keep the filename exactly as is
3. Commit and push to trigger deployment

**Both CVs must exist** for the deployment to work correctly.

---

## Content Hierarchy

### Unified Build (Software-First)

**Hero**: "Frontend Engineer"

**Home Page Sections** (in order):
1. Hero
2. Experience (primary)
3. Projects (primary - frontend/software)
4. Tech Art Preview (secondary)
5. Skills
6. About
7. Contact

**Projects Page**: Split into two sections:
- **Primary**: Frontend & Software Engineering (React, Vue, web platforms)
- **Secondary**: Game Development & Selected VFX (Unity, VR, selected tech art)

**Navigation Order**:
About → Experience → Projects → Skills → Contact → Tech Art (last, marked as secondary)

---

### GameDev Build (Tech Art-First)

**Hero**: "Technical Artist & Game Developer"

**Home Page Sections** (in order):
1. Hero
2. Gallery (primary - tech art showcase)
3. Projects (gamedev/VR primary)
4. Experience (tech art roles emphasized)
5. Skills
6. About
7. Contact

**Projects Page**: Split into two sections:
- **Primary**: Game Development & Tech Art (Unity, Unreal, VFX, shaders)
- **Secondary**: Frontend Engineering (minimal, 2-3 items)

**Navigation Order**:
About → Gallery → Projects → Experience → Skills → Contact

---

## Adding a Third Profile

To add a new profile variant (e.g., `researcher`):

1. **Create `.env.researcher`**:
   ```env
   VITE_PROFILE=researcher
   VITE_CV_ENABLED=true
   VITE_CV_VARIANT=researcher
   VITE_BASE=/Portfolio/Researcher/
   ```

2. **Create profile content**:
   ```typescript
   // src/content/profiles/researcher.ts
   export const researcherProfile = {
     // ... profile content
   };
   ```

3. **Update profile selector** in `src/content/profiles/index.ts`:
   ```typescript
   export const profile = 
     PROFILE === 'researcher' ? researcherProfile :
     PROFILE === 'gamedev' ? gamedevProfile :
     unifiedProfile;
   ```

4. **Update config types** in `src/config.ts`:
   ```typescript
   export const PROFILE = import.meta.env.VITE_PROFILE as 'unified' | 'gamedev' | 'researcher';
   ```

5. **Add build scripts** to `package.json`:
   ```json
   "dev:researcher": "vite --mode researcher",
   "build:researcher": "tsc -b && vite build --mode researcher"
   ```

6. **Update GitHub Actions workflow**:
   ```yaml
   # Add third build step
   - name: Build Researcher Portfolio
     run: npm run build:researcher
   
   - name: Move Researcher Build
     run: |
       mkdir -p deploy/Researcher
       cp -r dist/* deploy/Researcher/
   ```

7. **Add CV file**:
   ```
   public/cv/Valentina_LZ_Researcher_CV.pdf
   ```

---

## Verification Checklist

### Before Deploying

#### Unified Build
```bash
npm run build:unified
```

Verify output shows:
```
🔧 Build Configuration:
   Profile: unified
   Base Path: /Portfolio/
   CV Variant: software
   Mode: unified
```

Check build output in `dist/`:
- [ ] `index.html` exists
- [ ] `assets/` folder has JS/CSS files
- [ ] `cv/Valentina_LZ_CV.pdf` exists

#### GameDev Build
```bash
npm run build:gamedev
```

Verify output shows:
```
🔧 Build Configuration:
   Profile: gamedev
   Base Path: /Portfolio/Gamedev/
   CV Variant: gamedev
   Mode: gamedev
```

Check build output in `dist/`:
- [ ] `index.html` exists
- [ ] `assets/` folder has JS/CSS files
- [ ] `cv/Valentina_LZ_GameDev_CV.pdf` exists

### After Deploying

#### Unified (`/Portfolio/`)
- [ ] Hero shows "Frontend Engineer"
- [ ] Navigation: About → Experience → Projects → Skills → Contact → Tech Art
- [ ] Projects page: Frontend projects primary, GameDev secondary
- [ ] Tech Art section is secondary (smaller, less emphasis)
- [ ] CV downloads `Valentina_LZ_CV.pdf`
- [ ] All routes work (no 404s)
- [ ] GSAP animations work
- [ ] Marquee bands scroll smoothly
- [ ] ScrollIndex highlights active section

#### GameDev (`/Portfolio/Gamedev/`)
- [ ] Hero shows "Technical Artist & Game Developer"
- [ ] Navigation: About → Gallery → Projects → Experience → Skills → Contact
- [ ] Gallery prominent on home page
- [ ] Projects page: GameDev projects primary, Frontend minimal
- [ ] CV downloads `Valentina_LZ_GameDev_CV.pdf`
- [ ] All routes work (no 404s)
- [ ] GSAP animations work
- [ ] Marquee bands scroll smoothly
- [ ] ScrollIndex highlights active section

#### Both Builds
- [ ] Lottie decorations present
- [ ] 3D Cat model loads
- [ ] `prefers-reduced-motion` respected
- [ ] Lazy loading works
- [ ] Theme toggle works
- [ ] Mobile navigation works
- [ ] All links resolve correctly

---

## Troubleshooting

### Build shows wrong profile
- **Problem**: Build output shows unexpected profile
- **Solution**: 
  - Delete `node_modules/.vite` cache
  - Clear dist folder: `rm -rf dist`
  - Rebuild: `npm run build:unified` or `npm run build:gamedev`

### Assets return 404
- **Problem**: JS/CSS/images not loading
- **Solution**: 
  - Verify base path in build output console
  - Check that `VITE_BASE` matches actual deployment URL
  - Clear browser cache and hard reload (Ctrl+Shift+R)

### CV download not working
- **Problem**: CV link goes to 404
- **Solution**:
  - Verify CV file exists in `public/cv/` folder
  - Check `VITE_CV_ENABLED=true` in `.env` file
  - Verify filename matches `CV_CONFIG.filename` in config
  - Check browser network tab for actual request URL

### Wrong CV downloads
- **Problem**: Unified build downloads GameDev CV (or vice versa)
- **Solution**:
  - Verify `VITE_CV_VARIANT` in `.env` file
  - Check build output console shows correct variant
  - Clear browser cache
  - Rebuild with correct mode

### Navigation shows wrong links
- **Problem**: Navigation order doesn't match expected profile
- **Solution**:
  - Verify `VITE_PROFILE` in build output
  - Check `NAV_LINKS` in `src/config.ts` exports correct array
  - Clear browser cache and reload

### Content hierarchy wrong
- **Problem**: Tech Art is prominent in unified (or vice versa)
- **Solution**:
  - Check `isUnified` / `isGameDev` flags in components
  - Verify build mode in console output
  - Make sure correct `.env` file is being used

---

## Testing Locally Before Deploy

### Full Test Sequence

1. **Build both profiles**:
   ```bash
   npm run build:unified
   npm run build:gamedev
   ```

2. **Preview unified**:
   ```bash
   npm run preview:unified
   ```
   Visit `http://localhost:4173` and verify:
   - Hero: "Frontend Engineer"
   - Nav: Software-first order
   - Projects: Frontend primary
   - Tech Art: Secondary section
   - CV: Software variant

3. **Preview gamedev**:
   ```bash
   npm run preview:gamedev
   ```
   Visit `http://localhost:4174` and verify:
   - Hero: "Technical Artist"
   - Nav: GameDev-first order
   - Gallery: Prominent
   - Projects: GameDev primary
   - CV: GameDev variant

4. **If both look correct**, push to `main`:
   ```bash
   git add .
   git commit -m "Deploy unified dual-build portfolio"
   git push origin main
   ```

5. **Monitor GitHub Actions**:
   - Go to repository → Actions tab
   - Watch "Deploy Dual Portfolio" workflow
   - Verify it completes successfully

6. **Test live URLs**:
   - https://valelib.github.io/Portfolio/
   - https://valelib.github.io/Portfolio/Gamedev/

---

## Development Workflow

### Recommended Workflow

1. **Default development** (unified):
   ```bash
   npm run dev
   ```
   Work on features using the unified (software-first) build.

2. **Test GameDev variant**:
   ```bash
   npm run dev:gamedev
   ```
   Periodically check that GameDev build still works.

3. **Before committing**:
   ```bash
   npm run build:unified
   npm run build:gamedev
   ```
   Verify both builds succeed.

4. **Deploy**:
   ```bash
   git push origin main
   ```
   GitHub Actions handles the rest.

---

## Quick Reference

### Build Commands
```bash
npm run dev              # Dev server (unified)
npm run dev:unified      # Dev server (unified, explicit)
npm run dev:gamedev      # Dev server (gamedev)
npm run build            # Build (uses default .env - unified)
npm run build:unified    # Build unified → /Portfolio/
npm run build:gamedev    # Build gamedev → /Portfolio/Gamedev/
npm run preview:unified  # Preview unified build
npm run preview:gamedev  # Preview gamedev build
```

### File Locations
```
Configuration:
  .env                              ← Default (unified)
  .env.unified                      ← Unified config
  .env.gamedev                      ← GameDev config
  src/config.ts                     ← Profile flags & CV config
  vite.config.ts                    ← Base path config

Content:
  src/content/profiles/unified.ts   ← Software-first profile
  src/content/profiles/gamedev.ts   ← GameDev-first profile
  src/content/profiles/index.ts     ← Profile selector

CVs:
  public/cv/Valentina_LZ_CV.pdf           ← Software CV
  public/cv/Valentina_LZ_GameDev_CV.pdf   ← GameDev CV

Deployment:
  .github/workflows/deploy-dual.yml  ← Dual-build workflow
```

---

## Support

### Documentation
- `UNIFIED_REFACTOR_PLAN.md` - Complete refactor plan
- `UNIFIED_REFACTOR_PROGRESS.md` - Implementation progress
- `ENV_SETUP.md` - Environment file setup guide
- `SCROLL_PATTERNS.md` - Scroll choreography documentation

### Need Help?
Check the documentation files above or open an issue in the repository.

---

**End of deployment guide.**
