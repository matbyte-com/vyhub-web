interface Header {
  name: string;
  value: string;
}

export const fetchHeaders: { [key: string]: string; } = {};
const originalFetch = window.fetch;

window.fetch = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> => {
  init = init || {};

  init.headers = {
    ...fetchHeaders,
    ...(init.headers as Record<string, string>),
  };

  return originalFetch(input, init);
};

export default {
  fetchHeaders,
};
