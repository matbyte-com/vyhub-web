// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-unresolved

declare global {
  interface VyHubConfig {
    backend_url: string;
    default_title: string;
  }

  interface Window {
    vyhubConfig: VyHubConfig;
  }
}

export default window.vyhubConfig;
