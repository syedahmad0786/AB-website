import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import vm from "node:vm";

const analyticsSource = await readFile(resolve("static", "analytics.js"), "utf8");
const listeners = new Map();
const appendedScripts = [];
const appendScript = element => appendedScripts.push(element);

const context = {
  URL,
  console,
  location: { pathname: "/services/ai-automation-consulting", href: "https://ahmadbukhari.com/services/ai-automation-consulting" },
  document: {
    querySelector: selector => selector === "[data-cal-trigger][data-cal-link]" ? {} : null,
    createElement: tagName => ({ tagName, dataset: {} }),
    head: { append: appendScript, appendChild: appendScript },
    addEventListener: (type, listener) => listeners.set(type, listener),
  },
};
context.window = context;
vm.createContext(context);
new vm.Script(analyticsSource, { filename: "static/analytics.js" }).runInContext(context);

const failures = [];
if (!appendedScripts.some(script => script.src === "https://www.googletagmanager.com/gtag/js?id=G-W66WJJKGWQ")) {
  failures.push("GA4 loader was not initialized with the verified measurement ID");
}
if (!appendedScripts.some(script => script.src === "https://app.cal.com/embed/embed.js" && script.async === true)) {
  failures.push("Cal.com embed loader was not initialized asynchronously");
}

const namespace = context.Cal?.ns?.["revenue-handoff-map"];
const queue = namespace?.q || [];
const bookingListener = queue
  .map(args => Array.from(args))
  .find(args => args[0] === "on" && args[1]?.action === "bookingSuccessfulV2")?.[1]?.callback;
if (typeof bookingListener !== "function") failures.push("Cal.com bookingSuccessfulV2 listener was not registered");

function analyticsEvents() {
  return (context.dataLayer || [])
    .map(args => Array.from(args))
    .filter(args => args[0] === "event")
    .map(([, name, parameters]) => ({ name, parameters }));
}

function emitBooking(data) {
  bookingListener?.({ detail: { data } });
}

emitBooking({ uid: "accepted-1", eventTypeId: 101, startTime: "2026-08-12T10:00:00.000Z", status: "ACCEPTED", email: "private@example.com", title: "Private title", videoCallUrl: "https://example.com/private" });
emitBooking({ uid: "pending-1", eventTypeId: 101, startTime: "2026-08-13T10:00:00.000Z", status: "PENDING" });
emitBooking({ uid: "unknown-1", eventTypeId: 101, startTime: "2026-08-14T10:00:00.000Z", status: "ACCEPTED<script>" });
emitBooking({ uid: "accepted-1", eventTypeId: 101, startTime: "2026-08-12T10:00:00.000Z", status: "ACCEPTED" });

const bookingEvents = analyticsEvents().filter(event => event.name.startsWith("booking_"));
if (bookingEvents.filter(event => event.name === "booking_created").length !== 3) {
  failures.push("Exactly one booking_created event per unique successful booking is required");
}
if (bookingEvents.filter(event => event.name === "booking_confirmed").length !== 1) {
  failures.push("booking_confirmed must fire only for an accepted or confirmed booking status");
}
const pendingConfirmed = bookingEvents.some(event => event.name === "booking_confirmed" && event.parameters?.booking_status === "pending");
if (pendingConfirmed) failures.push("Pending bookings must not be reported as confirmed");
const unknownBooking = bookingEvents.find(event => event.name === "booking_created" && event.parameters?.booking_status === "unknown");
if (!unknownBooking) failures.push("Undocumented Cal.com status values must be bounded to unknown");

const forbiddenParameter = /uid|email|name|title|start|end|video|url/i;
for (const event of bookingEvents) {
  const forbiddenKeys = Object.keys(event.parameters || {}).filter(key => forbiddenParameter.test(key) && key !== "page_path");
  if (forbiddenKeys.length) failures.push(`${event.name} exposes forbidden booking parameters: ${forbiddenKeys.join(", ")}`);
  if (!event.parameters?.page_path || !event.parameters?.booking_status) failures.push(`${event.name} is missing its bounded context`);
}

const clickListener = listeners.get("click");
clickListener?.({
  target: {
    closest: () => ({ href: "https://cal.com/ahmad-bukhari/revenue-handoff-map" }),
  },
});
if (!analyticsEvents().some(event => event.name === "discovery_call_click")) {
  failures.push("Discovery-call intent event no longer fires for the verified Cal.com link");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Analytics runtime validated: CTA intent, unique booking creation, accepted-only confirmation, and privacy boundary passed.");
