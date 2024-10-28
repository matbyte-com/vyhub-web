import config from '../config';

interface Header {
  name: string;
  value: string;
}

export const fetchHeaders: { [key: string]: string; } = {};
const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> => {
  init = init || {};

  // Only add header if request is for backend url
  if ((typeof input === 'string' && input.startsWith(config.backend_url)) ||
    (input instanceof URL && input.href.startsWith(config.backend_url))) {
    init.headers = {
      ...fetchHeaders,
      ...(init.headers as Record<string, string>),
    };
  }

  return originalFetch(input, init);
};

export default {
  fetchHeaders,
};
