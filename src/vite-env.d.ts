/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROFILE: 'tech-art' | 'frontend'
  readonly VITE_CV_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
