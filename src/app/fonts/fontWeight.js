import localFont from "next/font/local";

export const slimFont = localFont({
  src: "./firago-latin-400-normal.ttf",
  fallback: ["sans-serif"],
});

export const boldFont = localFont({
  src: "./firago-latin-700-normal.ttf",
  fallback: ["sans-serif"],
});

export const mediumFont = localFont({
  src: "./firago-latin-500-normal.ttf",
  fallback: ["sans-serif"],
});
