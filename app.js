// Finyl Image AI — front-end connectivity script
const API_BASE = "https://firenexus-api.onrender.com";

// --- Connectivity Test ---
async function refreshStatus() {
  const statusEl = document.getElementById("status");
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    if (data.ok) {
      statusEl.textContent = "FIREneXus: Online";
      statusEl.className = "status online";
    } else {
      statusEl.textContent = "FIREneXus: Offline";
      statusEl.className = "status offline";
    }
  } catch (e) {
    statusEl.textContent = "FIREneXus: Offline";
    statusEl.className = "status offline";
  }
}

// --- API Ping Button ---
document.getElementById("pingBtn")?.addEventListener("click", async () => {
  const pingOut = document.getElementById("pingOut");
  pingOut.textContent = "Pinging...";
  try {
    const res = await fetch(`${API_BASE}/`);
    const data = await res.json();
    pingOut.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    pingOut.textContent = `Error: ${e.message}`;
  }
});

// --- Contact / Event Form ---
document.getElementById("contact-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const out = document.getElementById("contact-output");

  out.textContent = "Sending...";
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "Send failed");

    out.textContent = `✅ Message sent successfully! Ticket: ${data.id}`;
  } catch (err) {
    out.textContent = `❌ ${err.message || "Error sending message"}`;
  }
});

// --- Run initial connectivity check ---
refreshStatus();
