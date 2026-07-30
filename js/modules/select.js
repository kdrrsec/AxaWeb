/**
 * Toegankelijke custom dropdown voor dark-theme selects.
 * Native <option> styling is cross-browser onbetrouwbaar (Safari/Chrome OS-menu).
 * De native <select> blijft de form-waarde; de UI is een combobox/listbox.
 */

function getOptionLabel(option) {
  return option.textContent.trim();
}

function syncTrigger(select, trigger) {
  const selected = select.selectedOptions[0];
  const placeholder = select.options[0]?.value === "" ? getOptionLabel(select.options[0]) : "Selecteer een optie";
  const label = selected && selected.value !== "" ? getOptionLabel(selected) : placeholder;
  trigger.textContent = label;
  trigger.classList.toggle("custom-select__trigger--placeholder", !selected || selected.value === "");
}

function closeSelect(root, trigger, list) {
  root.classList.remove("is-open");
  trigger.setAttribute("aria-expanded", "false");
  list.hidden = true;
}

function openSelect(root, trigger, list) {
  root.classList.add("is-open");
  trigger.setAttribute("aria-expanded", "true");
  list.hidden = false;

  const active = list.querySelector('[aria-selected="true"]') || list.querySelector('[role="option"]');
  active?.focus();
}

function setActiveOption(list, option) {
  list.querySelectorAll('[role="option"]').forEach((el) => {
    el.classList.toggle("is-active", el === option);
  });
}

export function enhanceSelect(select) {
  if (!select || select.dataset.enhanced === "true") return;
  select.dataset.enhanced = "true";

  const field = select.closest(".field");
  if (!field) return;

  const label = field.querySelector(`label[for="${select.id}"]`);
  const buttonId = `${select.id}-button`;
  const listId = `${select.id}-listbox`;

  select.classList.add("custom-select__native");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");

  if (label) label.setAttribute("for", buttonId);

  const root = document.createElement("div");
  root.className = "custom-select";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.id = buttonId;
  trigger.className = "field__control custom-select__trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-controls", listId);
  if (select.required) trigger.setAttribute("aria-required", "true");

  const list = document.createElement("ul");
  list.id = listId;
  list.className = "custom-select__list";
  list.setAttribute("role", "listbox");
  list.setAttribute("tabindex", "-1");
  list.hidden = true;

  const options = Array.from(select.options).map((option, index) => {
    const item = document.createElement("li");
    item.className = "custom-select__option";
    item.setAttribute("role", "option");
    item.id = `${select.id}-option-${index}`;
    item.dataset.value = option.value;
    item.textContent = getOptionLabel(option);
    item.tabIndex = -1;
    if (option.disabled) {
      item.setAttribute("aria-disabled", "true");
      item.classList.add("is-disabled");
    }
    if (option.selected) item.setAttribute("aria-selected", "true");
    else item.setAttribute("aria-selected", "false");
    list.appendChild(item);
    return item;
  });

  function selectValue(value) {
    select.value = value;
    options.forEach((item) => {
      const selected = item.dataset.value === value;
      item.setAttribute("aria-selected", String(selected));
    });
    syncTrigger(select, trigger);
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function moveHighlight(delta) {
    const enabled = options.filter((item) => item.getAttribute("aria-disabled") !== "true");
    if (!enabled.length) return;
    const current = list.querySelector(".is-active") || list.querySelector('[aria-selected="true"]');
    const index = Math.max(0, enabled.indexOf(current));
    const next = enabled[(index + delta + enabled.length) % enabled.length];
    setActiveOption(list, next);
    next.focus();
  }

  trigger.addEventListener("click", () => {
    const open = trigger.getAttribute("aria-expanded") === "true";
    if (open) closeSelect(root, trigger, list);
    else openSelect(root, trigger, list);
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (trigger.getAttribute("aria-expanded") !== "true") openSelect(root, trigger, list);
      else if (event.key === "ArrowDown") moveHighlight(1);
      else if (event.key === "ArrowUp") moveHighlight(-1);
    }
  });

  list.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveHighlight(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveHighlight(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      const first = options.find((item) => item.getAttribute("aria-disabled") !== "true");
      if (first) {
        setActiveOption(list, first);
        first.focus();
      }
    } else if (event.key === "End") {
      event.preventDefault();
      const enabled = options.filter((item) => item.getAttribute("aria-disabled") !== "true");
      const last = enabled[enabled.length - 1];
      if (last) {
        setActiveOption(list, last);
        last.focus();
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeSelect(root, trigger, list);
      trigger.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const active = list.querySelector(".is-active") || list.querySelector('[aria-selected="true"]');
      if (active && active.getAttribute("aria-disabled") !== "true") {
        selectValue(active.dataset.value);
        closeSelect(root, trigger, list);
        trigger.focus();
      }
    } else if (event.key === "Tab") {
      closeSelect(root, trigger, list);
    }
  });

  options.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.getAttribute("aria-disabled") === "true") return;
      selectValue(item.dataset.value);
      closeSelect(root, trigger, list);
      trigger.focus();
    });
    item.addEventListener("mouseenter", () => setActiveOption(list, item));
  });

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) closeSelect(root, trigger, list);
  });

  select.addEventListener("invalid", () => {
    trigger.setAttribute("aria-invalid", "true");
  });

  const observer = new MutationObserver(() => {
    const invalid = select.getAttribute("aria-invalid");
    if (invalid) trigger.setAttribute("aria-invalid", invalid);
    else trigger.removeAttribute("aria-invalid");
  });
  observer.observe(select, { attributes: true, attributeFilter: ["aria-invalid"] });

  select.addEventListener("change", () => {
    options.forEach((item) => {
      item.setAttribute("aria-selected", String(item.dataset.value === select.value));
    });
    syncTrigger(select, trigger);
  });

  select.form?.addEventListener("reset", () => {
    window.requestAnimationFrame(() => {
      options.forEach((item) => {
        item.setAttribute("aria-selected", String(item.dataset.value === select.value));
      });
      syncTrigger(select, trigger);
      closeSelect(root, trigger, list);
    });
  });

  syncTrigger(select, trigger);

  select.before(root);
  root.append(trigger, list, select);
}

export function initCustomSelects(scope = document) {
  scope.querySelectorAll("select.field__control").forEach((select) => enhanceSelect(select));
}

export function focusSelectControl(select) {
  if (!select) return;
  const button = document.getElementById(`${select.id}-button`);
  (button || select).focus();
}
