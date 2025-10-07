export type Locale = (typeof locales)[number];

export const locales = ["en", "uk"] as const;
export const defaultLocale: Locale = "en";
