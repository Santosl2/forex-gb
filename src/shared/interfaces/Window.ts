export type CustomWindowType = Window & {
  grecaptcha: {
    ready: (callback: () => Promise<void>) => void;
    execute: (id: string | undefined, action: object) => Promise<string>;
  };
};
