function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of children) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return node;
}

function buildAssetPath(sectionDir, methodKey, sampleKey, ext) {
  return `${BASE_PATH}/${sectionDir}/${methodKey}/${sampleKey}.${ext}`;
}

function getMethodsForSection(section) {
  const hideMethods = section.hideMethods || [];
  return METHODS.filter(m => !hideMethods.includes(m.key));
}

// 这里改：传入整个 section
function renderSampleTable(section, sampleKey) {
  const methods = getMethodsForSection(section);

  const thead = el("thead", {}, [
    el("tr", {}, methods.map(m => el("th", {}, [m.label])))
  ]);

  const imgRow = el("tr", {}, methods.map(m => {
    const src = buildAssetPath(section.dir, m.key, sampleKey, "png");
    return el("td", {}, [
      el("img", { class: "demo-img", src, loading: "lazy", alt: `${m.label}-${sampleKey}` })
    ]);
  }));

  const audioRow = el("tr", {}, methods.map(m => {
    const src = buildAssetPath(section.dir, m.key, sampleKey, "wav");
    const audio = el("audio", { class: "demo-audio", controls: "" }, [
      el("source", { src, type: "audio/wav" })
    ]);
    return el("td", {}, [audio]);
  }));

  const tbody = el("tbody", {}, [imgRow, audioRow]);

  const table = el("table", { class: "demo-table" }, [thead, tbody]);
  return el("div", { class: "table-wrap" }, [table]);
}

function renderSection(section) {
  const sectionAnchor = el("div", { id: section.id });

  const title = el("h2", { class: "title is-3 sample-section-title" }, [section.title]);
  const badge = el("span", { class: "badge" }, [
    el("i", { class: "fa-solid fa-layer-group" }),
    `${section.samples.length} samples`
  ]);

  const headerRow = el("div", { class: "is-flex is-justify-content-space-between is-align-items-center" }, [
    title,
    el("div", {}, [badge]),
  ]);

  const block = el("div", {}, [headerRow]);

  section.samples.forEach((sampleKey, idx) => {
    const card = el("div", { class: "sample-card" }, [
      el("h3", { class: "title is-5" }, [
        `Sample ${idx + 1}`,
        " ",
        el("span", { class: "has-text-grey is-size-7" }, [`(${sampleKey})`])
      ]),
      // 这里改：传 section，不是 section.dir
      renderSampleTable(section, sampleKey),
    ]);
    block.appendChild(card);
  });

  return el("div", {}, [
    sectionAnchor,
    block,
    el("div", { class: "section-divider" })
  ]);
}

function initJumpSelect() {
  const sel = document.getElementById("jumpSelect");
  sel.innerHTML = "";
  SECTIONS.forEach(s => {
    sel.appendChild(el("option", { value: s.id }, [s.title]));
  });
  sel.addEventListener("change", () => {
    const id = sel.value;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function initLayoutButtons() {
  const dense = document.getElementById("btnDense");
  const comfort = document.getElementById("btnComfort");

  dense.addEventListener("click", () => document.body.classList.add("is-dense"));
  comfort.addEventListener("click", () => document.body.classList.remove("is-dense"));
}

function main() {
  const root = document.getElementById("samplesRoot");
  root.innerHTML = "";

  SECTIONS.forEach(sec => root.appendChild(renderSection(sec)));

  initJumpSelect();
  initLayoutButtons();
}

document.addEventListener("DOMContentLoaded", main);
