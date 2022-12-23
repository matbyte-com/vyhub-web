// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-unresolved

declare global {
  interface VyHubConfig {
    backend_url: string;
    default_title: string;
    demo_mode: boolean;
    html_max_input_length: number;
    discord_bot_invite_url: string;
    sentry_dsn: string;
    branding: boolean;
  }

  interface Window {
    vyhubConfig: VyHubConfig;
  }
}

export default window.vyhubConfig;
