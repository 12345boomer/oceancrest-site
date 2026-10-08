"use client";
/*
  <SeaLayer />: mounted once in the root layout. Installs the sound and touch layer
  (lib/sea.ts) and renders the sound control fixed bottom right, same markup as sea.js's bar().
*/
import { useEffect, useState } from "react";
import { getPrefs, installSea, setPref } from "@/lib/sea";
import type { PrefKey, SeaPrefs } from "@/lib/sea";

const svgProps = { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", "aria-hidden": true } as const;

function IconFxOn() {
  return <svg {...svgProps} strokeLinejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M15.5 9a4 4 0 0 1 0 6" /><path d="M18 6.5a7.5 7.5 0 0 1 0 11" /></svg>;
}
function IconFxOff() {
  return <svg {...svgProps} strokeLinejoin="round"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M16 9.5l5 5M21 9.5l-5 5" /></svg>;
}
function IconSea() {
  return <svg {...svgProps}><path d="M2.5 9c2.4-2 4.6-2 7 0s4.6 2 7 0 3.6-1.6 5 0" /><path d="M2.5 14c2.4-2 4.6-2 7 0s4.6 2 7 0 3.6-1.6 5 0" /><path d="M2.5 19c2.4-2 4.6-2 7 0s4.6 2 7 0 3.6-1.6 5 0" /></svg>;
}

export default function SeaLayer() {
  // Server and first client render use the defaults; stored choices load after mount.
  const [prefs, setPrefs] = useState<SeaPrefs>({ fx: true, sea: false });

  useEffect(() => {
    setPrefs(getPrefs());
    return installSea();
  }, []);

  const toggle = (k: PrefKey) => setPrefs(setPref(k, !getPrefs()[k]));

  return (
    <div className="soundbar" role="group" aria-label="Sound">
      <button type="button" data-k="fx" aria-pressed={prefs.fx} title="Interface sounds" onClick={() => toggle("fx")}>
        {prefs.fx ? <IconFxOn /> : <IconFxOff />}<span>{prefs.fx ? "Sounds on" : "Sounds off"}</span>
      </button>
      <button type="button" data-k="sea" aria-pressed={prefs.sea} title={prefs.sea ? "Turn off the sound of the sea" : "Play the sound of the sea"} onClick={() => toggle("sea")}>
        <IconSea /><span>Sea</span>
      </button>
    </div>
  );
}
