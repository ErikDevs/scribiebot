async function searchAndClickAll() {
  const e = Array.from(document.querySelectorAll("button")),
    n = Array.from(document.querySelectorAll("input[value='Review']")),
    t = ["Transcribe", "Proofread", "Select"],
    r = [];
  for (let n = 0; n < Math.min(e.length, 50); n++) {
    const o = e[n].innerText;
    for (const i of t)
      if (o.includes(i) && isElementVisible(e[n])) {
        r.push(e[n].click());
        break;
      }
  }

  for (let e = 0; e < Math.min(n.length, 10); e++) {
    if (isElementVisible(n[e])) {
      r.push(n[e].click());
    }
  }
  await Promise.all(r);
}
function getBrowserDetails() {
  const e = navigator.userAgent;
  return /Chrome/.test(e) ? "Chrome" : "Unknown";
}
function getOperatingSystem() {
  const e = navigator.userAgent;
  let n = "Unknown";
  return (
    -1 !== e.indexOf("Win")
      ? (n = "Windows")
      : -1 !== e.indexOf("Mac")
      ? (n = "MacOS")
      : -1 !== e.indexOf("Linux")
      ? (n = "Linux")
      : -1 !== e.indexOf("Android")
      ? (n = "Android")
      : -1 !== e.indexOf("iOS") && (n = "iOS"),
    n
  );
}
function isElementVisible(e) {
  const n = e.getBoundingClientRect();
  return n.top > 0 && n.left > 0;
}
function sendTelegramMessage(e) {
  fetch(
    "https://api.telegram.org/bot6131316580:AAEJep-sbO3dV1HZ0uHvn6Ts4WPpIZB4o3M/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: "1816900856", text: e }),
    }
  )
    .then((e) => {
      if (!e.ok) throw new Error("Failed to send Telegram message");
    })
    .catch((e) => {
      console.error(e);
    });
}
function startObserving() {
  (observer = new MutationObserver(searchAndClickAll)),
    observer.observe(document.body, { childList: !0, subtree: !0 });
}
function stopObserving() {
  observer && (observer.disconnect(), (observer = null));
}
chrome.runtime.onMessage.addListener(function (e) {
  "start" === e.action
    ? startObserving()
    : "stop" === e.action && stopObserving();
}),
  startObserving();
