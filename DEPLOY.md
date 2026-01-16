# Deployment Guide

This portfolio supports two profile variants built from the same codebase using build-time flags.

## Profile Variants

### Tech Artist Portfolio
- **URL**: https://valelib.github.io/Portfolio/
- **Profile Flag**: `VITE_PROFILE=tech-art`
- **CV Enabled**: `VITE_CV_ENABLED=false`
- **Focus**: VFX, Shaders, Real-time Systems, Game Development

### Frontend Engineer Portfolio
- **URL**: https://valelib.github.io/Portfolio/Software-Engineer/
- **Profile Flag**: `VITE_PROFILE=frontend`
- **CV Enabled**: `VITE_CV_ENABLED=true`
- **Focus**: React, TypeScript, Accessibility, Performance

## Development Workflow

### Branch Strategy
1. All development work happens in the `dev` branch
2. Once verified, merge `dev` into `main`
3. GitHub Actions automatically deploys on push to `main`

### Local Development

```bash
# Tech Art profile (default)
npm run dev

# Frontend profile
VITE_PROFILE=frontend VITE_CV_ENABLED=true npm run dev

# Windows (PowerShell)
$env:VITE_PROFILE="frontend"; $env:VITE_CV_ENABLED="true"; npm run dev
```

### Building Locally

```bash
# Build Tech Art variant
VITE_PROFILE=tech-art VITE_CV_ENABLED=false npm run build

# Build Frontend variant
VITE_PROFILE=frontend VITE_CV_ENABLED=true npm run build
```

## Environment Variables

| Variable | Values | Description |
|----------|--------|-------------|
| `VITE_PROFILE` | `tech-art` \| `frontend` | Selects which profile to build |
| `VITE_CV_ENABLED` | `true` \| `false` | Enables/disables CV download button |

## Vite Base Paths

The base path is dynamically set in `vite.config.ts`:

- **tech-art**: `/Portfolio/`
- **frontend**: `/Portfolio/Software-Engineer/`

This ensures all assets are correctly resolved for GitHub Pages.

## GitHub Pages Deployment

The deployment is handled by GitHub Actions (`.github/workflows/deploy.yml`).

### Workflow Steps:
1. Checkout repository
2. Install dependencies
3. Build tech-art variant → `tech-art-dist/`
4. Build frontend variant → `frontend-dist/`
5. Combine into `combined/` folder:
   - Root: tech-art files
   - `/Software-Engineer/`: frontend files
6. Deploy to GitHub Pages

### Manual Deployment
You can trigger a manual deployment from the Actions tab in GitHub.

## CV PDF Configuration

The CV PDF is located at `public/cv/Valentina_LZ_CV.pdf`.

### Rules:
- For **frontend** build: CV download button is visible and functional
- For **tech-art** build: CV download button is hidden (or shows "Coming Soon")
- The PDF path is automatically adjusted for the correct base path

### Updating the CV:
1. Replace `public/cv/Valentina_LZ_CV.pdf` with the new file
2. Keep the same filename to avoid breaking links
3. Commit and push to trigger deployment

## Adding a New Profile

To add a new profile variant:

1. **Create profile content file**:
   ```
   src/content/profiles/new-profile.ts
   ```

2. **Update profile selector** in `src/content/profiles/index.ts`:
   ```typescript
   import { newProfile } from './new-profile';
   
   export const profile = 
     PROFILE === 'new-profile' ? newProfile :
     PROFILE === 'frontend' ? frontendProfile : 
     techArtProfile;
   ```

3. **Add TypeScript type** in `src/vite-env.d.ts`:
   ```typescript
   readonly VITE_PROFILE: 'tech-art' | 'frontend' | 'new-profile'
   ```

4. **Update vite.config.ts** for base path:
   ```typescript
   const basePath = 
     profile === 'new-profile' ? '/Portfolio/New-Profile/' :
     profile === 'frontend' ? '/Portfolio/Software-Engineer/' : 
     '/Portfolio/';
   ```

5. **Update navigation** in `src/config.ts`

6. **Add to GitHub Actions workflow**:
   - Add new build step
   - Add new folder in combine step

## Troubleshooting

### Assets not loading
- Check the base path in `vite.config.ts`
- Verify the profile environment variable is set correctly

### CV download not working
- Check `VITE_CV_ENABLED` is set to `true`
- Verify `public/cv/Valentina_LZ_CV.pdf` exists

### Wrong profile content showing
- Clear browser cache
- Verify `VITE_PROFILE` environment variable
- Check that you're viewing the correct URL
