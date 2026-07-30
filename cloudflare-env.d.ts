declare module "cloudflare:workers" {
  export const env: {
    DB?: any;
    [key: string]: unknown;
  };
}

interface Fetcher {
  fetch(input: Request): Promise<Response>;
}

type D1Database = any;
