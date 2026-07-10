import{J as e,tn as t}from"./utils-B2UIqRdZ.js";import{t as n}from"./nodeUtils-5yXISZ7m.js";import{_ as r,g as i,i as a,y as o}from"./index-B7kIDgkV.js";function s(e,o){let s=Array.from(n(`good-icons`).querySelectorAll(`symbol`)).map(e=>e.id),p={...e?.demandCoverage||{}},m={...e?.biomeOutput||{}},h=()=>{let e=r.map(e=>[e,p[e]??0]).filter(([,e])=>e>0);return e.length?e.map(([e,t])=>`${i[e]} ${capitalize(e)}: ${t}`).join(`, `):`none`},g=()=>{let e=Object.entries(m).filter(([,e])=>(e??0)>0);return e.length?e.map(([e,t])=>`${biomesData.name[Number(e)]}: ${t}`).join(`, `):`none`},_={cultureType:{...e?.multipliers?.cultureType??{}},culture:{...e?.multipliers?.culture??{}},state:{...e?.multipliers?.state??{}},religion:{...e?.multipliers?.religion??{}},biome:{...e?.multipliers?.biome??{}},zone:{...e?.multipliers?.zone??{}}},v=e=>{let t=_[e]??{},n=Object.entries(t).filter(([,e])=>e!==1);return n.length?n.map(([t,n])=>`${c(e,t)} ×${rn(n,2)}`).join(`, `):`none`},y=(e,t)=>`
      <label data-tip="Production multiplier by ${t.toLowerCase()}. 1 = no effect, 0 = fully suppressed.">${t}</label>
      <div class="ge-edit-row">
        <span id="mSummary_${e}">${v(e)}</span>
        <button class="mEdit icon-pencil ge-edit" data-dim="${e}" data-tip="Edit ${t} multipliers"></button>
      </div>`,b=n(`goodEditor`);b.innerHTML=`
    <style>
      .ge                 { display:flex; width: auto !important; flex-direction:column; gap:9px; max-height:72vh; overflow-y:auto; padding-right:2px; }
      .ge-section-title   { display:flex; align-items:center; justify-content:space-between; font-weight:bold; text-transform:uppercase; font-size:.8em; letter-spacing:.06em; margin-bottom:7px; padding-bottom:4px; border-bottom:1px solid #666; }
      .ge-grid            { display:grid; grid-template-columns:9em minmax(0, 1fr); gap:.2em; align-items:center; }
      .ge-grid--top       { align-items:start; }
      .ge-grid > *        { min-width:0; }
      .ge-grid > label    { color:#555; }
      .ge-field           { width:100%; }
      input.ge-num        { width:6em; }
      .ge-inline          { display:flex; align-items:center; gap:.4em; }
      .ge-icon-select     { flex:1; min-width:0; }
      .ge-icon-preview    { flex-shrink:0; }
      .ge-color           { width:2.4em; height:1.4em; padding:0; border:none; flex-shrink:0; }
      .ge-edit-row        { display:flex; align-items:flex-start; justify-content:space-between; gap:6px; }
      .ge-edit-row > span { flex:1; min-width:0; }
      .ge-edit            { flex-shrink:0; }
      .ge-dist            { flex:1; min-width:0; color:#555; font-size:.9em; font-family:var(--monospace); word-break:break-all; }
      .ge-note            { color:#777; font-style:italic; font-size:.9em; }
      .ge-error           { color:#b20000; min-height:1.2em; }
      .ge-recipe-list     { display:flex; flex-direction:column; gap:.45em; }
      .ge-recipe          { border:1px solid #ccc; border-radius:3px; }
      .ge-recipe-head     { display:flex; align-items:center; justify-content:space-between; padding:.2em .3em; }
      .ge-recipe-actions  { display:flex; gap:.3em; }
      .ge-recipe-ings     { display:flex; flex-direction:column; gap:.2em; padding:.3em .4em; }
      .ge-recipe-ing      { display:grid; grid-template-columns:1fr 5em 1.5em; gap:.25em; align-items:center; }
    </style>

    <div class="ge">
      <div>
        <div class="ge-section-title">General</div>
        <div class="ge-grid">
          <label for="newGoodName">Name*</label>
          <input id="newGoodName" class="ge-field" value="${e?.name||``}" />

          <label for="newGoodTags">Tags</label>
          <input id="newGoodTags" class="ge-field" value="${e?.tags.join(`, `)||``}" placeholder="comma separated" />

          <label for="newGoodValue">Base Price*</label>
          <span class="ge-inline"><input id="newGoodValue" class="ge-num" type="number" min="0" step="1" value="${e?.value??1}" /> 🟡</span>

          <label for="newGoodChance">Chance</label>
          <input id="newGoodChance" class="ge-num" type="number" min="0" max="100" step="0.1" value="${e?.chance??1}" />

          <label for="newGoodUnit">Unit</label>
          <input id="newGoodUnit" class="ge-field" placeholder="e.g. wagon, barrel" value="${e?.unit||``}" />

          <label for="newGoodIcon">Icon*</label>
          <div class="ge-inline">
            <select id="newGoodIcon" class="ge-icon-select">${s.map(t=>`<option value="${t}" ${e?.icon===t?`selected`:``}>${t}</option>`).join(``)}</select>
            <svg class="ge-icon-preview" width="2em" height="2em">
              <circle id="newGoodIconCircle" cx="50%" cy="50%" r="42%" fill="${e?.color||`#ff5959`}" stroke="${Goods.getStroke(e?.color||`#ff5959`)}"/>
              <use id="newGoodIconPreview" href="#${e?.icon||`good-unknown`}" x="10%" y="10%" width="80%" height="80%"/>
            </svg>
            <button id="newGoodUploadIconRaster" class="icon-upload" data-tip="Upload raster icon"></button>
            <button id="newGoodUploadIconVector" class="icon-upload-cloud" data-tip="Upload vector (SVG) icon"></button>
            <input id="newGoodColor" class="ge-color" type="color" data-tip="Set a stroke color" value="${e?.color||`#ff5959`}" />
          </div>

          <label data-tip="How much of each demand category this good satisfies. Click the pencil icon to edit.">Demand Coverage</label>
          <div class="ge-edit-row">
            <span id="demandCoverageSummary" >${h()}</span>
            <button class="dcEdit icon-pencil ge-edit" data-tip="Edit demand coverage"></button>
          </div>
        </div>
      </div>

      <div>
        <div class="ge-section-title">Raw Production</div>
        <div class="ge-grid ge-grid--top">
          <label data-tip="For raw resources: sets the baseline production per biome">Rural production</label>
          <div class="ge-edit-row">
            <span id="biomeProductionSummary">${g()}</span>
            <button class="bpEdit icon-pencil ge-edit" data-tip="Edit biome baseline production"></button>
          </div>

          <label data-tip="For raw resources: controls where and how this good is produced directly from the environment (e.g. biome, elevation, temperature)">Bonus distribution</label>
          <div class="ge-edit-row">
            <div id="newGoodDistribution" class="ge-dist">${e?.distribution||``}</div>
            <button id="newGoodDistributionEditor" class="icon-pencil ge-edit" data-tip="Open the Distribution visual editor"></button>
          </div>
        </div>
        <div id="newGoodRawNote" class="ge-note"></div>
      </div>

      <div>
        <div class="ge-section-title">
          <span data-tip="For manufactured goods: recipes define which other goods are required to produce this good">Recipes</span>
          <button id="newGoodAddRecipe" class="icon-plus" data-tip="Add a recipe"></button>
        </div>
        <div id="newGoodRecipeList" class="ge-recipe-list"></div>
        <div id="newGoodRecipeNote" class="ge-note"></div>
      </div>

      <div>
        <div class="ge-section-title">
          <span data-tip="Per-dimension production multipliers. 1 = no effect, 0 = fully suppressed.">Multipliers</span>
        </div>
        <div class="ge-grid ge-grid--top">
          ${y(`cultureType`,`Culture Type`)}
          ${y(`culture`,`Culture`)}
          ${y(`state`,`State`)}
          ${y(`religion`,`Religion`)}
          ${y(`biome`,`Biome`)}
          ${y(`zone`,`Zone`)}
        </div>
      </div>

      <div id="newGoodError" class="ge-error"></div>
    </div>
  `;let x=e?.recipes||[],S=n(`newGoodRecipeList`),C=pack.goods[0]?.i??0,w=[...pack.goods].sort((e,t)=>e.name.localeCompare(t.name)),T=()=>!Object.values(m).some(e=>(e??0)>0)&&!document.getElementById(`newGoodDistribution`)?.textContent?.trim(),E=()=>{let e=T(),t=x.length===0,r=n(`newGoodRecipeNote`);r.textContent=`This good is raw-only: gathered from the environment.`,r.style.display=t&&!e?``:`none`;let i=n(`newGoodRawNote`);i.textContent=`This good is manufactured-only: made from recipes in burgs.`,i.style.display=e&&!t?``:`none`},D=()=>{S.innerHTML=x.map((e,t)=>`
          <div class="recipeOption ge-recipe" data-recipe-index="${t}" >
            <div class="ge-recipe-head">
              <span>Recipe ${t+1}</span>
              <div class="ge-recipe-actions">
                <span class="recipeAddIngredient icon-plus pointer" data-recipe-index="${t}" data-tip="Add ingredient"></span>
                <span class="recipeRemoveOption icon-trash-empty pointer" data-recipe-index="${t}" data-tip="Remove recipe"></span>
              </div>
            </div>
            <div class="recipeIngredients ge-recipe-ings">
              ${Object.entries(e).map(([e,n],r)=>`
                    <div class="ge-recipe-ing" data-recipe-index="${t}" data-ingredient-index="${r}">
                      <select class="recipeGoodSelect" data-recipe-index="${t}" data-ingredient-index="${r}">${w.map(t=>`<option value="${t.i}" ${t.i===Number(e)?`selected`:``}>${t.name}</option>`).join(``)}</select>
                      <input class="recipeAmountInput" data-recipe-index="${t}" data-ingredient-index="${r}" type="number" min="1" step="1" value="${n}" />
                      <span class="recipeRemoveIngredient icon-trash-empty pointer" data-recipe-index="${t}" data-ingredient-index="${r}" data-tip="Remove ingredient" />
                    </div>`).join(``)}
            </div>
          </div>
        `).join(``),S.querySelectorAll(`.recipeGoodSelect`).forEach(e=>{e.onchange=()=>{let t=+e.value,n=+e.dataset.recipeIndex,r=+e.dataset.ingredientIndex,i=x[n],a=i[r]||0;delete i[r],i[t]=a,D()}}),S.querySelectorAll(`.recipeAmountInput`).forEach(e=>{e.onchange=()=>{let t=+e.dataset.recipeIndex,n=+e.dataset.ingredientIndex,r=x[t],i=Number(Object.keys(r)[n]);r[i]=+e.value}}),S.querySelectorAll(`.recipeAddIngredient`).forEach(e=>{e.onclick=t=>{t.preventDefault();let n=x[+e.dataset.recipeIndex],r=Object.keys(n).length?Math.max(...Object.keys(n).map(e=>+e))+1:C;n[r]=1,D()}}),S.querySelectorAll(`.recipeRemoveIngredient`).forEach(e=>{e.onclick=t=>{t.preventDefault();let n=+e.dataset.recipeIndex,r=+e.dataset.ingredientIndex,i=x[n];if(Object.keys(i).length>1){let e=Number(Object.keys(i)[r]);delete i[e],D()}}}),S.querySelectorAll(`.recipeRemoveOption`).forEach(e=>{e.onclick=t=>{t.preventDefault();let n=+e.dataset.recipeIndex;x.splice(n,1),D()}}),E()};D(),b.querySelectorAll(`.mEdit`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.dim;u(t,_[t]??{},e=>{_[t]=e;let n=document.getElementById(`mSummary_${t}`);n&&(n.textContent=v(t))})})}),b.querySelector(`.dcEdit`).addEventListener(`click`,()=>{d({...p},e=>{Object.keys(p).forEach(e=>void delete p[e]),Object.assign(p,e);let t=document.getElementById(`demandCoverageSummary`);t&&(t.textContent=h())})}),b.querySelector(`.bpEdit`).addEventListener(`click`,()=>{f({...m},e=>{Object.keys(m).forEach(e=>void delete m[+e]),Object.assign(m,e);let t=document.getElementById(`biomeProductionSummary`);t&&(t.textContent=g()),E()})}),n(`newGoodAddRecipe`).on(`click`,e=>{e.preventDefault(),x.push({[C]:1}),D()}),n(`newGoodDistributionEditor`).on(`click`,()=>{let e=n(`newGoodDistribution`);a.DistributionEditor.open(t=>{e.textContent=t,E()},e.textContent?.trim()??``)});let O=n(`newGoodIcon`);O.onchange=()=>n(`newGoodIconPreview`).setAttribute(`href`,`#${O.value}`);let k=n(`newGoodColor`);k.oninput=()=>{let e=n(`newGoodIconCircle`);e.setAttribute(`fill`,k.value),e.setAttribute(`stroke`,Goods.getStroke(k.value))};let A=(e,t)=>{n(`newGoodIconPreview`).setAttribute(`href`,`#${t}`),O.innerHTML+=`<option value="${t}">${t}</option>`,O.value=t};n(`newGoodUploadIconRaster`).onclick=()=>n(`imageToLoad`).click(),n(`newGoodUploadIconVector`).onclick=()=>n(`svgToLoad`).click(),n(`imageToLoad`).onchange=()=>l(`image`,A),n(`svgToLoad`).onchange=()=>l(`svg`,A),$(b).dialog({width:`30em`,resizable:!1,title:e?`Edit good`:`Add new good`,open:function(){e&&(this.parentElement?.querySelector(`.ui-dialog-buttonpane`))?.insertAdjacentHTML(`afterbegin`,`<div class="dontAsk" data-tip="Re-place this good and recompute production, trade and taxes. Uncheck to update the good only, without disturbing the current economy.">
          <input id="goodRegenerateEconomy" class="checkbox" type="checkbox" checked />
          <label for="goodRegenerateEconomy" class="checkbox-label"><i>regenerate economy on apply</i></label>
        </div>`)},close:()=>{$(b).dialog(`destroy`),b.innerHTML=``},buttons:{Cancel:function(){$(this).dialog(`close`)},[e?`Apply`:`Add`]:()=>{let r=[],i=n(`newGoodName`).value.trim(),a=t(n(`newGoodTags`).value.trim().split(`,`).map(e=>e.trim().toLocaleLowerCase())),s=+n(`newGoodValue`).value,c=+n(`newGoodChance`).value,l=n(`newGoodUnit`).value.trim(),u=n(`newGoodIcon`).value,d=n(`newGoodColor`).value,f=n(`newGoodDistribution`).textContent?.trim()??``;if(i||r.push(`Name is required`),(!Number.isFinite(s)||s<0)&&r.push(`Value must be a valid non-negative number`),(!Number.isFinite(c)||c<0||c>100)&&r.push(`Chance must be between 0 and 100`),f)try{let e=Goods.getMethods(),t=`{${Object.keys(e).join(`, `)}}`;Function(t,`return ${f}`)(e)}catch(e){r.push(`Distribution function is invalid: ${e.message||e}`)}for(let e of x){for(let[t,n]of Object.entries(e)){let e=Number(t),i=Goods.get(e);i||r.push(`Recipe references unknown good id: ${e}`);let a=Number(n);(Number.isNaN(a)||!Number.isFinite(a)||a<=0)&&r.push(`Invalid recipe amount for good ${i?.name}`)}Object.keys(e).length||r.push(`Each recipe must have at least one ingredient`)}if(n(`newGoodError`).textContent=r.join(`. `),r.length)return;function h(){let e={};for(let[t,n]of Object.entries(_)){let r=Object.fromEntries(Object.entries(n??{}).filter(([,e])=>e!==void 0&&e!==1));Object.keys(r).length&&(e[t]=r)}return Object.keys(e).length?e:void 0}e?(e.name=i,e.tags=a,e.icon=u,e.color=d,e.value=s,e.chance=c,e.unit=l,e.demandCoverage=p,e.multipliers=h(),e.distribution=f||void 0,e.biomeOutput=Object.keys(m).length?m:void 0,e.recipes=x.length?x:void 0,n(`goodRegenerateEconomy`).checked?(Goods.regeneratePlacement(e.i),regenerateEconomy()):Goods.sync()):(pack.goods.push({i:(()=>{let e=pack.goods?.at(-1)?.i??1;for(;Goods.get(e);)e++;return e})(),name:i,tags:a,icon:u,color:d,value:s,chance:c,unit:l,demandCoverage:p,multipliers:h(),distribution:f||void 0,biomeOutput:Object.keys(m).length?m:void 0,recipes:x.length?x:void 0}),Goods.sync()),tip(e?`Good is updated`:`Good is added`,!1,`success`,5e3),o?.(),$(b).dialog(`close`)}}})}function c(e,t){return e===`cultureType`?t:e===`culture`?pack.cultures[+t]?.name??`Culture ${t}`:e===`state`?pack.states[+t]?.name??`State ${t}`:e===`religion`?pack.religions[+t]?.name??`Religion ${t}`:e===`zone`?pack.zones.find(e=>e.i===+t)?.name??`Zone ${t}`:biomesData.name[+t]??`Biome ${t}`}function l(e,t){let r=n(e===`image`?`imageToLoad`:`svgToLoad`),i=r.files[0];if(r.value=``,i.size>2e5){tip(`File is too big, please optimize file size up to 200kB and re-upload. Recommended size is 48x48 px and up to 10kB`,!0,`error`,5e3);return}let a=new FileReader;a.onload=r=>{let i=r.target;if(!i)return;let a=i.result,o=`good-custom-${Math.random().toString(36).slice(-6)}`,s=n(`good-icons`);if(e===`image`){let e=`<svg id="${o}" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><image x="0" y="0" width="200" height="200" href="${a}"/></svg>`;s.insertAdjacentHTML(`beforeend`,e)}else{let e=document.createElement(`html`);e.innerHTML=a,e.querySelectorAll(`*`).forEach(e=>{e.getAttributeNames().forEach(t=>{(t.includes(`inkscape`)||t.includes(`sodipodi`))&&e.removeAttribute(t)})}),a.includes(`from the Noun Project`)&&e.querySelectorAll(`text`).forEach(e=>void e.remove());let t=e.querySelector(`svg`);if(!t)return void tip(`The file should be prepared for load to FMG. If you don't know why it's happening, try to upload raster image`,!1,`error`);let n=s.appendChild(t);n.id=o,n.setAttribute(`width`,`200`),n.setAttribute(`height`,`200`)}t(e,o)},e===`image`?a.readAsDataURL(i):a.readAsText(i)}function u(t,n,r){let i,a;switch(t){case`cultureType`:i=o.map(e=>({id:e,name:e})),a=`Culture Type`;break;case`culture`:i=pack.cultures.filter(e=>e.i&&!e.removed).map(e=>({id:String(e.i),name:e.name,color:e.color})),a=`Culture`;break;case`state`:i=pack.states.filter(e=>e.i&&!e.removed).map(e=>({id:String(e.i),name:e.fullName||e.name,color:e.color})),a=`State`;break;case`religion`:i=pack.religions.filter(e=>e.i&&!e.removed).map(e=>({id:String(e.i),name:e.name,color:e.color})),a=`Religion`;break;case`biome`:i=biomesData.i.map(e=>({id:String(e),name:biomesData.name[e],color:biomesData.color[e]})),a=`Biome`;break;case`zone`:i=pack.zones.map(e=>({id:String(e.i),name:e.name,color:e.color})),a=`Zone`;break}let s=i.map(t=>{let r=n[t.id]??1;return`${`<fill-box fill="${t.color||e()}" size="1em" disabled data-tip="${t.name}"></fill-box>`}<span>${t.name}</span><input type="number" class="mPopupInput" data-id="${t.id}" min="0" step="0.1" style="width:5em;" value="${r}" />`}),c=document.createElement(`div`);document.body.appendChild(c),c.innerHTML=`<div style="max-height:320px; overflow-y:auto; padding:.2em;">${s.length?`<div style="display:grid; grid-template-columns:auto 1fr 5em; gap:.3em .5em; align-items:center;">${s.join(``)}</div>`:`<div style="color:#777; font-style:italic;">No ${a.toLowerCase()}s available</div>`}</div>`,$(c).dialog({title:`${a} multipliers`,width:`22em`,resizable:!1,buttons:{Cancel:function(){$(this).dialog(`close`)},Apply:function(){let e=Array.from(c.querySelectorAll(`.mPopupInput`)),t={};for(let n of e){let e=n.dataset.id,r=Number(n.value);Number.isFinite(r)&&r>=0&&r!==1&&(t[e]=r)}r(t),$(this).dialog(`close`)}},close:()=>{$(c).dialog(`destroy`),c.remove()}})}function d(e,t){let n=r.map(t=>{let n=e[t]??0;return`<span>${i[t]} ${capitalize(t)}</span><input type="number" class="dcPopupInput" data-cat="${t}" min="0" step="0.05" style="width:5em;" value="${n}" />`}).join(``),a=document.createElement(`div`);document.body.appendChild(a),a.innerHTML=`<div style="display:grid;grid-template-columns:1fr 5em;gap:.3em .5em;align-items:center;padding:.2em;">${n}</div>`,$(a).dialog({title:`Demand Coverage`,width:`18em`,resizable:!1,buttons:{Cancel:function(){$(this).dialog(`close`)},Apply:function(){let e={};a.querySelectorAll(`.dcPopupInput`).forEach(t=>{let n=t.dataset.cat,r=Number(t.value);Number.isFinite(r)&&r>0&&(e[n]=r)}),t(e),$(this).dialog(`close`)}},close:()=>{$(a).dialog(`destroy`),a.remove()}})}function f(e,t){let n=biomesData.i.map(t=>{let n=e[t]??0;return`<span>${biomesData.name[t]??`Biome ${t}`}</span><input type="number" class="bpPopupInput" data-id="${t}" min="0" step="0.01" style="width:5em;" value="${n}" />`}).join(``),r=document.createElement(`div`);document.body.appendChild(r),r.innerHTML=`<div style="max-height:320px;overflow-y:auto;padding:.2em;"><div style="display:grid;grid-template-columns:1fr 5em;gap:.3em .5em;align-items:center;">${n}</div></div>`,$(r).dialog({title:`Biome Baseline Production`,width:`22em`,resizable:!1,buttons:{Cancel:function(){$(this).dialog(`close`)},Apply:function(){let e={};r.querySelectorAll(`.bpPopupInput`).forEach(t=>{let n=Number(t.dataset.id),r=Number(t.value);Number.isFinite(r)&&r>0&&(e[n]=r)}),t(e),$(this).dialog(`close`)}},close:()=>{$(r).dialog(`destroy`),r.remove()}})}var p={open:s};export{p as GoodEditor};