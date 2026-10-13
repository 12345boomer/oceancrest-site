"use client";
/*
  <CalendlyEmbed />: Ben's Calendly event, inline on the page (/book). Loads Calendly's widget script once;
  without JavaScript, or if the script is blocked, the link below still opens the calendar.
*/
import { useEffect } from "react";
import { BOOKING_URL } from "@/lib/site";

const SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

export default function CalendlyEmbed() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const url = `${BOOKING_URL}?hide_gdpr_banner=1&primary_color=2563eb&text_color=0f1d33`;
  return (
    <div className="calendly">
      <div className="calendly-inline-widget" data-url={url} />
      <p className="calendly-alt">
        Calendar not showing? <a href={BOOKING_URL} target="_blank" rel="noopener">Open it in a new tab ↗</a>
      </p>
    </div>
  );
}
