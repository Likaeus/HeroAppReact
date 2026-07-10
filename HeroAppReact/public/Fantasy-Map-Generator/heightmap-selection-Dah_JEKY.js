import{A as e,T as t,b as n,ot as r}from"./utils-B2UIqRdZ.js";import{t as i}from"./nodeUtils-5yXISZ7m.js";var a=r(),o=h(grid);c(),l(),u();function s(){closeDialogs(`.stable`);let e=i(`templateInput`);f(e.value),o=h(o),$(`#heightmapSelection`).dialog({title:`Select Heightmap`,resizable:!1,position:{my:`center`,at:`center`,of:`svg`},buttons:{Cancel:function(){$(this).dialog(`close`)},Select:function(){let t=d();t&&(applyOption(e,t,m(t)),lock(`template`),$(this).dialog(`close`))},"New Map":function(){let t=d();if(!t)return;applyOption(e,t,m(t)),lock(`template`);let n=p();regeneratePrompt({seed:n,graph:o}),$(this).dialog(`close`)}}})}function c(){let e=document.createElement(`style`);e.textContent=`
    div.dialog > div.heightmap-selection {
      width: 70vw;
      height: 70vh;
    }

    .heightmap-selection_container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      grid-gap: 6px;
    }

    @media (max-width: 600px) {
      .heightmap-selection_container {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        grid-gap: 4px;
      }
    }

    @media (min-width: 2000px) {
      .heightmap-selection_container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 8px;
      }
    }

    .heightmap-selection_options {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }

    .heightmap-selection_options > div:first-child {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      justify-self: start;
      justify-items: start;
    }

    @media (max-width: 600px) {
      .heightmap-selection_options {
        grid-template-columns: 3fr 1fr;
      }

      .heightmap-selection_options > div:first-child {
        display: block;
      }
    }

    .heightmap-selection_options > div:last-child {
      justify-self: end;
    }

    .heightmap-selection article {
      padding: 4px;
      border-radius: 8px;
      transition: all 0.1s ease-in-out;
      filter: drop-shadow(1px 1px 4px #999);
    }

    .heightmap-selection article:hover {
      background-color: #ddd;
      filter: drop-shadow(1px 1px 8px #999);
      cursor: pointer;
    }

    .heightmap-selection article.selected {
      background-color: #ccc;
      outline: 1px solid var(--dark-solid);
      filter: drop-shadow(1px 1px 8px #999);
    }

    .heightmap-selection article > div {
      display: flex;
      justify-content: space-between;
      padding: 2px 1px;
    }

    .heightmap-selection article > img {
      width: 100%;
      aspect-ratio: ${graphWidth}/${graphHeight};
      border-radius: 8px;
      object-fit: fill;
    }

    .heightmap-selection article .regeneratePreview {
      outline: 1px solid #bbb;
      padding: 1px 3px;
      border-radius: 4px;
      transition: all 0.1s ease-in-out;
    }

    .heightmap-selection article .regeneratePreview:hover {
      outline: 1px solid #666;
    }

    .heightmap-selection article .regeneratePreview:active {
      outline: 1px solid #333;
      color: #000;
      transform: rotate(45deg);
    }
  `,document.head.appendChild(e)}function l(){let e=`<div id="heightmapSelection" class="dialog stable">
    <div class="heightmap-selection">
      <section data-tip="Select heightmap template – template provides unique, but similar-looking maps on generation">
        <header><h1>Heightmap templates</h1></header>
        <div class="heightmap-selection_container"></div>
      </section>
      <section data-tip="Select precreated heightmap – it will be the same for each map">
        <header><h1>Precreated heightmaps</h1></header>
        <div class="heightmap-selection_container"></div>
      </section>
      <section>
        <header><h1>Options</h1></header>
        <div class="heightmap-selection_options">
          <div>
            <label data-tip="Rerender all preview images" class="checkbox-label" id="heightmapSelectionRedrawPreview">
              <i class="icon-cw"></i>
              Redraw preview
            </label>
            <div>
              <input id="heightmapSelectionRenderOcean" class="checkbox" type="checkbox" />
              <label data-tip="Draw heights of water cells" for="heightmapSelectionRenderOcean" class="checkbox-label">Render ocean heights</label>
            </div>
            <div data-tip="Color scheme used for heightmap preview">
              Color scheme
              <select id="heightmapSelectionColorScheme">${Object.keys(heightmapColorSchemes).map(e=>`<option value="${e}">${e}</option>`).join(``)}</select>
            </div>
          </div>
          <div>
            <button data-tip="Open Template Editor" data-tool="templateEditor" id="heightmapSelectionEditTemplates">Edit Templates</button>
            <button data-tip="Open Image Converter" data-tool="imageConverter" id="heightmapSelectionImportHeightmap">Import Heightmap</button>
          </div>
        </div>
      </section>
    </div>
  </div>`;i(`dialogs`).insertAdjacentHTML(`beforeend`,e);let t=document.getElementsByClassName(`heightmap-selection_container`);t[0].innerHTML=Object.keys(heightmapTemplates).map(e=>{let t=heightmapTemplates[e].name;return Math.random=aleaPRNG(a),`<article data-id="${e}" data-seed="${a}">
        <img src="${x(HeightmapGenerator.fromTemplate(o,e))}" alt="${t}" />
        <div>
          ${t}
          <span data-tip="Regenerate preview" class="icon-cw regeneratePreview"></span>
        </div>
      </article>`}).join(``),t[1].innerHTML=Object.keys(precreatedHeightmaps).map(e=>{let t=precreatedHeightmaps[e].name;return _(e),`<article data-id="${e}" data-seed="${a}">
        <img alt="${t}" />
        <div>${t}</div>
      </article>`}).join(``)}function u(){i(`heightmapSelection`).on(`click`,e=>{let t=e.target,n=t.closest(`#heightmapSelection article`);if(!n)return;let r=n.dataset.id;r&&(t.matches(`span.icon-cw`)&&v(n,r),f(r))}),i(`heightmapSelectionRenderOcean`).on(`change`,y),i(`heightmapSelectionColorScheme`).on(`change`,y),i(`heightmapSelectionRedrawPreview`).on(`click`,y),i(`heightmapSelectionEditTemplates`).on(`click`,e=>b(e.currentTarget)),i(`heightmapSelectionImportHeightmap`).on(`click`,e=>b(e.currentTarget))}function d(){return i(`heightmapSelection`).querySelector(`.selected`)?.dataset?.id}function f(e){let t=i(`heightmapSelection`);t.querySelector(`.selected`)?.classList?.remove(`selected`),t.querySelector(`[data-id="${e}"]`)?.classList?.add(`selected`)}function p(){return i(`heightmapSelection`).querySelector(`.selected`)?.dataset?.seed}function m(e){return e in heightmapTemplates?heightmapTemplates[e].name:precreatedHeightmaps[e].name}function h(n){let r=e(n,seed,graphWidth,graphHeight)?t(seed,graphWidth,graphHeight):structuredClone(n);return delete r.cells.h,r}function g(e){let t=x(HeightmapGenerator.fromTemplate(o,e));i(`heightmapSelection`).querySelector(`[data-id="${e}"]`)?.querySelector(`img`)?.setAttribute(`src`,t)}async function _(e){let t=x(await HeightmapGenerator.fromPrecreated(o,e));i(`heightmapSelection`).querySelector(`[data-id="${e}"]`)?.querySelector(`img`)?.setAttribute(`src`,t)}function v(e,t){o=h(o);let n=r();e.dataset.seed=n,Math.random=aleaPRNG(n),g(t)}function y(){o=h(o);let e=i(`heightmapSelection`).querySelectorAll(`article`);for(let t of e){let{id:e,seed:n}=t.dataset;!e||!n||(Math.random=aleaPRNG(n),e in heightmapTemplates?g(e):_(e))}}function b(e){let t=e.dataset.tool;t&&confirmationDialog({title:e.dataset.tip??``,message:`Opening the tool will erase the current map. Are you sure you want to proceed?`,confirm:`Continue`,onConfirm:()=>editHeightmap({mode:`erase`,tool:t})})}function x(e){let t=getColorScheme(i(`heightmapSelectionColorScheme`).value),r=i(`heightmapSelectionRenderOcean`).checked;return n({heights:e,width:o.cellsX,height:o.cellsY,scheme:t,renderOcean:r})}var S={open:s};export{S as HeightmapSelection};