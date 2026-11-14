(function () {
  var root = document.querySelector("[data-booking-chat]");
  if (!root) return;

  var endpoint = root.getAttribute("data-endpoint");
  var launcher = root.querySelector("[data-chat-open]");
  var panel = root.querySelector("[data-chat-panel]");
  var closeButton = root.querySelector("[data-chat-close]");
  var thread = root.querySelector("[data-chat-thread]");
  var suggestions = root.querySelector("[data-chat-suggestions]");
  var actions = root.querySelector("[data-chat-actions]");
  var form = root.querySelector("[data-chat-form]");
  var input = root.querySelector("[data-chat-input]");
  var error = root.querySelector("[data-chat-error]");
  var messages = [];
  var draft = {};
  var busy = false;
  var lastSent = "";

  function token() {
    var meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute("content") : "";
  }

  function addMessage(role, content) {
    var item = document.createElement("p");
    item.className = "booking-chat__message booking-chat__message--" + role;
    item.textContent = content;
    thread.appendChild(item);
    thread.scrollTop = thread.scrollHeight;
    messages.push({ role: role, content: content });
    if (messages.length > 16) messages = messages.slice(-16);
  }

  function setSuggestions(items) {
    suggestions.replaceChildren();
    (items || []).forEach(function (label) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", function () {
        send(label);
      });
      suggestions.appendChild(button);
    });
  }

  function setActions(data) {
    actions.replaceChildren();
    if (data && data.checkoutUrl) {
      var pay = document.createElement("a");
      pay.className = "booking-chat__pay";
      pay.href = data.checkoutUrl;
      pay.textContent = "Complete payment";
      actions.appendChild(pay);
    }
    if (data && data.thankYouUrl) {
      var done = document.createElement("a");
      done.className = "booking-chat__pay";
      done.href = data.thankYouUrl;
      done.textContent = "View confirmation";
      actions.appendChild(done);
    }
  }

  function setBusy(value) {
    busy = value;
    form.querySelector("button").disabled = value;
    suggestions.querySelectorAll("button").forEach(function (button) {
      button.disabled = value;
    });
  }

  function retry() {
    if (!lastSent || busy) return;
    error.hidden = true;
    setSuggestions([]);
    request(lastSent);
  }

  function send(text) {
    var value = (text || "").trim();
    if (!value || busy) return;
    error.hidden = true;
    input.value = "";
    addMessage("user", value);
    setSuggestions([]);
    request(value);
  }

  function request(value) {
    lastSent = value;
    setBusy(true);

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": token(),
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        text: value,
        draft: draft,
        messages: messages.slice(0, -1),
      }),
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, status: response.status, data: data };
        });
      })
      .then(function (result) {
        if (!result.ok || !result.data || !result.data.reply) {
          throw new Error(result.status === 419 ? "Please refresh the page and try again." : "Please try again.");
        }
        draft = result.data.draft || {};
        addMessage("assistant", result.data.reply);
        setSuggestions(result.data.suggestions || []);
        setActions(result.data);
      })
      .catch(function (reason) {
        error.hidden = false;
        error.textContent = reason && reason.message ? reason.message : "Please try again.";
        suggestions.replaceChildren();
        var again = document.createElement("button");
        again.type = "button";
        again.textContent = "Try again";
        again.addEventListener("click", retry);
        suggestions.appendChild(again);
      })
      .finally(function () {
        setBusy(false);
        input.focus();
      });
  }

  launcher.addEventListener("click", function () {
    var open = panel.hidden;
    panel.hidden = !open;
    launcher.hidden = open;
    if (open && !thread.childElementCount) {
      addMessage(
        "assistant",
        "Hello, I'm the Bansal Immigration assistant. Ask me about consultations, our offices, or visa services. When you're ready, I can book an appointment for you."
      );
      setSuggestions(["Consultation fees", "Our services", "Offices and hours", "Book an appointment"]);
    }
    if (open) input.focus();
  });

  closeButton.addEventListener("click", function () {
    panel.hidden = true;
    launcher.hidden = false;
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    send(input.value);
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send(input.value);
    }
  });
})();
