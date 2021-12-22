// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-unresolved

declare global {
  interface VyHubConfig {
    backend_url: string;
    default_title: string;
    demo_mode: boolean;
    html_max_input_length: number;
    sentry_dsn: string;
  }

  interface Window {
    vyhubConfig: VyHubConfig;
  }
}

export default window.vyhubConfig;
