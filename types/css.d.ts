// Inline styles set CSS custom properties (e.g. style={{ "--peb": "var(--blush)" }}).
import "react";

declare module "react" {
  interface CSSProperties {
    [property: `--${string}`]: string | number | undefined;
  }
}
