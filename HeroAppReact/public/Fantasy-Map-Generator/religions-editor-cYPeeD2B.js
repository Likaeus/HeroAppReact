import{At as e,D as t,Ht as n,N as r,O as i,Ut as a,Y as o,h as s,ht as c,i as l,x as u}from"./utils-B2UIqRdZ.js";import{t as d}from"./drag-D017NiMT.js";import{t as f}from"./nodeUtils-5yXISZ7m.js";import{C as p,i as m}from"./index-B7kIDgkV.js";var h=_();v();function g(){customization||(closeDialogs(`#religionsEditor, .stable`),layerIsOn(`toggleReligions`)||toggleReligions(),layerIsOn(`toggleStates`)&&toggleStates(),layerIsOn(`toggleBiomes`)&&toggleBiomes(),layerIsOn(`toggleCultures`)&&toggleCultures(),layerIsOn(`toggleProvinces`)&&toggleProvinces(),y(),I(),$(`#religionsEditor`).dialog({title:`Religions Editor`,resizable:!1,close:oe,position:{my:`right top`,at:`right-10 top+10`,of:`svg`}}),h.focus())}function _(){return f(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="religionsEditor" class="dialog stable">
    <div id="religionsHeader" class="header" style="grid-template-columns: 13em 6em 7em 18em 6em 7em 6em 7em">
      <div data-tip="Click to sort by religion name" class="sortable alphabetically" data-sortby="name">Religion&nbsp;</div>
      <div data-tip="Click to sort by religion type" class="sortable alphabetically icon-sort-name-down" data-sortby="type">Type&nbsp;</div>
      <div data-tip="Click to sort by religion form" class="sortable alphabetically" data-sortby="form">Form&nbsp;</div>
      <div data-tip="Click to sort by supreme deity" class="sortable alphabetically hide" data-sortby="deity">Supreme Deity&nbsp;</div>
      <div data-tip="Click to sort by religion area" class="sortable hide" data-sortby="area">Area&nbsp;</div>
      <div data-tip="Click to sort by number of believers (religion area population)" class="sortable hide" data-sortby="population">Believers&nbsp;</div>
      <div data-tip="Click to sort by potential extent type" class="sortable alphabetically hide" data-sortby="expansion">Potential&nbsp;</div>
      <div data-tip="Click to sort by expansionism" class="sortable hide" data-sortby="expansionism">Expansion&nbsp;</div>
    </div>
    <div id="religionsBody" class="table" data-type="absolute"></div>

    <div id="religionsFooter" class="totalLine">
      <div data-tip="Total number of organized religions" style="margin-left: 12px">
        Organized:&nbsp;<span id="religionsOrganized">0</span>
      </div>
      <div data-tip="Total number of heresies" style="margin-left: 12px">
        Heresies:&nbsp;<span id="religionsHeresies">0</span>
      </div>
      <div data-tip="Total number of cults" style="margin-left: 12px">
        Cults:&nbsp;<span id="religionsCults">0</span>
      </div>
      <div data-tip="Total number of folk religions" style="margin-left: 12px">
        Folk:&nbsp;<span id="religionsFolk">0</span>
      </div>
      <div data-tip="Total land area" style="margin-left: 12px">
        Land Area:&nbsp;<span id="religionsFooterArea">0</span>
      </div>
      <div data-tip="Total number of believers (population)" style="margin-left: 12px">
        Believers:&nbsp;<span id="religionsFooterPopulation">0</span>
      </div>
    </div>

    <div id="religionsBottom">
      <button id="religionsEditorRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
      <button id="religionsEditStyle" data-tip="Edit religions style in Style Editor" class="icon-adjust"></button>
      <button id="religionsLegend" data-tip="Toggle Legend box" class="icon-list-bullet"></button>
      <button id="religionsPercentage" data-tip="Toggle percentage / absolute values display mode" class="icon-percent"></button>
      <button id="religionsHeirarchy" data-tip="Show religions hierarchy tree" class="icon-sitemap"></button>
      <button id="religionsExtinct" data-tip="Show/hide extinct religions (religions without cells)" class="icon-eye-off"></button>

      <button id="religionsManually" data-tip="Manually re-assign religions" class="icon-brush"></button>
      <div id="religionsManuallyButtons" style="display: none">
        <div data-tip="Change brush size. Shortcuts: + or ] to increase; - or [ to decrease" style="margin-block: 0.3em;">
          <slider-input id="religionsBrush" min="1" max="100" value="15">Brush size:</slider-input>
        </div>
        <button id="religionsManuallyApply" data-tip="Apply assignment" class="icon-check"></button>
        <button id="religionsManuallyCancel" data-tip="Cancel assignment" class="icon-cancel"></button>
        <div data-tip="When enabled, only cells without religion can be painted" style="display: inline-block">
          <input id="religionsManuallyProtect" class="checkbox" type="checkbox" />
          <label for="religionsManuallyProtect" class="checkbox-label"><i>do not overwrite existing</i></label>
        </div>
      </div>
      <button id="religionsAdd" data-tip="Add a new religion. Hold Shift to add multiple" class="icon-plus"></button>
      <button id="religionsExport" data-tip="Download religions-related data" class="icon-download"></button>
      <button id="religionsRecalculate" data-tip="Recalculate religions based on current values of growth-related attributes" class="icon-retweet"></button>
      <span data-tip="Allow religion center, extent, and expansionism changes to take an immediate effect">
        <input id="religionsAutoChange" class="checkbox" type="checkbox" />
        <label for="religionsAutoChange" class="checkbox-label"><i>auto-apply changes</i></label>
      </span>
    </div>
  </div>`),f(`religionsBody`)}function v(){applySortingByHeader(`religionsHeader`),f(`religionsEditorRefresh`).on(`click`,y),f(`religionsEditStyle`).on(`click`,()=>editStyle(`relig`)),f(`religionsLegend`).on(`click`,R),f(`religionsPercentage`).on(`click`,z),f(`religionsHeirarchy`).on(`click`,B),f(`religionsExtinct`).on(`click`,V),f(`religionsManually`).on(`click`,ne),f(`religionsManuallyApply`).on(`click`,q),f(`religionsManuallyCancel`).on(`click`,()=>J()),f(`religionsAdd`).on(`click`,Y),f(`religionsExport`).on(`click`,ie),f(`religionsRecalculate`).on(`click`,()=>Q(!0))}function y(){ee(),b()}function ee(){let{cells:e,religions:t,burgs:n}=pack;t.forEach(e=>{e.cells=e.area=e.rural=e.urban=0});for(let r of e.i){if(e.h[r]<20)continue;let i=e.religion[r];t[i].cells+=1,t[i].area+=e.area[r],t[i].rural+=e.pop[r];let a=e.burg[r];a&&(t[i].urban+=n[a].population)}}function b(){let e=` ${getAreaUnit()}`,t=``,n=0,r=0;for(let i of pack.religions){if(i.removed||i.i&&!i.cells&&h.dataset.extinct!==`show`)continue;let a=getArea(i.area??0),o=(i.rural??0)*populationRate,s=(i.urban??0)*populationRate*urbanization,u=c(o+s),d=`Believers: ${l(u)}; Rural areas: ${l(o)}; Urban areas: ${l(s)}. Click to change`;if(n+=a,r+=u,!i.i){t+=`<div
        class="states"
        data-id="${i.i}"
        data-name="${i.name}"
        data-color=""
        data-area="${a}"
        data-population="${u}"
        data-type=""
        data-form=""
        data-deity=""
        data-expansion=""
        data-expansionism=""
      >
        <svg width="9" height="9" class="placeholder"></svg>
        <input data-tip="Religion name. Click and type to change" class="religionName italic" style="width: 11em"
          value="${i.name}" autocorrect="off" spellcheck="false" />
        <select data-tip="Religion type" class="religionType placeholder" style="width: 5em">
          ${x(i.type)}
        </select>
        <input data-tip="Religion form" class="religionForm placeholder" style="width: 6em" value="" autocorrect="off" spellcheck="false" />
        <span data-tip="Click to re-generate supreme deity" class="icon-arrows-cw placeholder hide"></span>
        <input data-tip="Religion supreme deity" class="religionDeity placeholder hide" style="width: 17em" value="" autocorrect="off" spellcheck="false" />
        <span data-tip="Religion area" style="padding-right: 4px" class="icon-map-o hide"></span>
        <div data-tip="Religion area" class="religionArea hide" style="width: 6em">${l(a)+e}</div>
        <span data-tip="${d}" class="icon-male hide"></span>
        <div data-tip="${d}" class="religionPopulation hide pointer" style="width: 5em">${l(u)}</div>
      </div>`;continue}t+=`<div
      class="states"
      data-id=${i.i}
      data-name="${i.name}"
      data-color="${i.color}"
      data-area=${a}
      data-population=${u}
      data-type="${i.type}"
      data-form="${i.form}"
      data-deity="${i.deity||``}"
      data-expansion="${i.expansion}"
      data-expansionism="${i.expansionism}"
    >
      <fill-box fill="${i.color}"></fill-box>
      <input data-tip="Religion name. Click and type to change" class="religionName" style="width: 11em"
        value="${i.name}" autocorrect="off" spellcheck="false" />
      <select data-tip="Religion type" class="religionType" style="width: 5em">
        ${x(i.type)}
      </select>
      <input data-tip="Religion form" class="religionForm" style="width: 6em"
        value="${i.form}" autocorrect="off" spellcheck="false" />
      <span data-tip="Click to re-generate supreme deity" class="icon-arrows-cw hide"></span>
      <input data-tip="Religion supreme deity" class="religionDeity hide" style="width: 17em"
        value="${i.deity||``}" autocorrect="off" spellcheck="false" />
      <span data-tip="Religion area" style="padding-right: 4px" class="icon-map-o hide"></span>
      <div data-tip="Religion area" class="religionArea hide" style="width: 6em">${l(a)+e}</div>
      <span data-tip="${d}" class="icon-male hide"></span>
      <div data-tip="${d}" class="religionPopulation hide pointer" style="width: 5em">${l(u)}</div>
      ${S(i)}
      <span data-tip="Locate the religion" class="icon-target hide"></span>
      <span data-tip="Lock this religion" class="icon-lock${i.lock?``:`-open`} hide"></span>
      <span data-tip="Remove religion" class="icon-trash-empty hide"></span>
    </div>`}h.innerHTML=t;let i=pack.religions.filter(e=>e.i&&!e.removed);f(`religionsOrganized`).innerHTML=String(i.filter(e=>e.type===`Organized`).length),f(`religionsHeresies`).innerHTML=String(i.filter(e=>e.type===`Heresy`).length),f(`religionsCults`).innerHTML=String(i.filter(e=>e.type===`Cult`).length),f(`religionsFolk`).innerHTML=String(i.filter(e=>e.type===`Folk`).length),f(`religionsFooterArea`).innerHTML=l(n)+e,f(`religionsFooterPopulation`).innerHTML=l(r),f(`religionsFooterArea`).dataset.area=String(n),f(`religionsFooterPopulation`).dataset.population=String(r),h.querySelectorAll(`:scope > div`).forEach(e=>{e.on(`mouseenter`,w),e.on(`mouseleave`,T),e.on(`click`,H)}),h.querySelectorAll(`fill-box`).forEach(e=>void e.on(`click`,te)),h.querySelectorAll(`div > input.religionName`).forEach(e=>void e.on(`input`,E)),h.querySelectorAll(`div > select.religionType`).forEach(e=>void e.on(`change`,D)),h.querySelectorAll(`div > input.religionForm`).forEach(e=>void e.on(`input`,O)),h.querySelectorAll(`div > input.religionDeity`).forEach(e=>void e.on(`input`,k)),h.querySelectorAll(`div > span.icon-arrows-cw`).forEach(e=>void e.on(`click`,A)),h.querySelectorAll(`div > div.religionPopulation`).forEach(e=>void e.on(`click`,j)),h.querySelectorAll(`div > select.religionExtent`).forEach(e=>void e.on(`change`,M)),h.querySelectorAll(`div > input.religionExpantion`).forEach(e=>void e.on(`change`,N)),h.querySelectorAll(`div > span.icon-trash-empty`).forEach(e=>void e.on(`click`,P)),h.querySelectorAll(`div > span.icon-target`).forEach(e=>void e.on(`click`,ae)),h.querySelectorAll(`div > span.icon-lock`).forEach(e=>void e.on(`click`,Z)),h.querySelectorAll(`div > span.icon-lock-open`).forEach(e=>void e.on(`click`,Z)),h.dataset.type===`percentage`&&(h.dataset.type=`absolute`,z()),applySorting(f(`religionsHeader`)),$(`#religionsEditor`).dialog({width:fitContent()})}function x(e){let t=``;return[`Folk`,`Organized`,`Cult`,`Heresy`].forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}function S(e){if(e.type===`Folk`){let e=`Folk religions are not competitive and do not expand. Initially they cover all cells of their parent culture, but get ousted by organized religions when they expand`;return`
      <span data-tip="${e}" class="icon-resize-full-alt hide" style="padding-right: 2px"></span>
      <span data-tip="${e}" class="religionExtent hide" style="width: 5em">culture</span>
      <span data-tip="${e}" class="icon-resize-full hide"></span>
      <input data-tip="${e}" class="religionExpantion hide" disabled type="number" value='0' />`}return`
    <span data-tip="Potential religion extent" class="icon-resize-full-alt hide" style="padding-right: 2px"></span>
    <select data-tip="Potential religion extent" class="religionExtent hide" style="width: 5em">
      ${C(e.expansion)}
    </select>
    <span data-tip="Religion expansionism. Defines competitive size" class="icon-resize-full hide"></span>
    <input
      data-tip="Religion expansionism. Defines competitive size. Click to change, then click Recalculate to apply change"
      class="religionExpantion hide"
      type="number"
      min="0"
      max="99"
      step=".1"
      value=${e.expansionism}
    />`}function C(e){let t=``;return[`global`,`state`,`culture`].forEach(n=>{t+=`<option ${e===n?`selected`:``} value="${n}">${n}</option>`}),t}var w=r(t=>{let n=Number(t.id||t.target.dataset.id),r=h.querySelector(`div[data-id='${n}']`);if(r&&r.classList.add(`active`),!layerIsOn(`toggleReligions`)||customization)return;let i=e().duration(2e3).ease(p);relig.select(`#religion${n}`).raise().transition(i).attr(`stroke-width`,2.5).attr(`stroke`,`#d0240f`),debug.select(`#religionsCenter${n}`).raise().transition(i).attr(`r`,3).attr(`stroke`,`#d0240f`)},200);function T(e){let t=Number(e.id||e.target.dataset.id),n=h.querySelector(`div[data-id='${t}']`);n&&n.classList.remove(`active`),relig.select(`#religion${t}`).transition().attr(`stroke-width`,null).attr(`stroke`,null),debug.select(`#religionsCenter${t}`).transition().attr(`r`,2).attr(`stroke`,null)}function te(){let e=this.getAttribute(`fill`)||`#ffffff`,t=+this.parentNode.dataset.id;openPicker(e,e=>{this.fill=e,pack.religions[t].color=e,relig.select(`#religion${t}`).attr(`fill`,e),debug.select(`#religionsCenter${t}`).attr(`fill`,e)})}function E(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.name=this.value;let t=pack.religions;t[e].name=this.value,t[e].code=o(this.value,t.flatMap(e=>e.code?[e.code]:[]))}function D(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.type=this.value;let t=this.value;pack.religions[e].type=t}function O(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.form=this.value,pack.religions[e].form=this.value}function k(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.deity=this.value,pack.religions[e].deity=this.value}function A(){let e=+this.parentNode.dataset.id,t=pack.religions[e].culture,n=Religions.getDeityName(t)??``;this.parentNode.dataset.deity=n,pack.religions[e].deity=n,this.nextElementSibling.value=n}function j(){let e=+this.parentNode.dataset.id,t=pack.religions[e];if(!t.cells){tip(`Religion does not have any cells, cannot change population`,!1,`error`);return}let n=c((t.rural??0)*populationRate),r=c((t.urban??0)*populationRate*urbanization),i=n+r,a=e=>Number(e).toLocaleString(),o=pack.burgs.filter(t=>!t.removed&&pack.cells.religion[t.cell]===e);alertMessage.innerHTML=`<div>
    <i>All population of religion territory is considered believers of this religion. It means believers number change will directly affect population</i>
    <div style="margin: 0.5em 0">
      Rural: <input type="number" min="0" step="1" id="ruralPop" value=${n} style="width:6em" />
      Urban: <input type="number" min="0" step="1" id="urbanPop" value=${r} style="width:6em"
        ${o.length?``:`disabled`} />
    </div>
    <div>Total population: ${a(i)} ⇒ <span id="totalPop">${a(i)}</span>
      (<span id="totalPopPerc">100</span>%)
    </div>
  </div>`;let s=f(`ruralPop`),l=f(`urbanPop`),u=f(`totalPop`),d=f(`totalPopPerc`),p=()=>{let e=s.valueAsNumber+l.valueAsNumber;Number.isNaN(e)||(u.innerHTML=a(e),d.innerHTML=String(c(e/i*100)))};s.oninput=()=>p(),l.oninput=()=>p(),$(`#alert`).dialog({resizable:!1,title:`Change believers number`,width:`24em`,buttons:{Apply:function(){m(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}},position:{my:`center`,at:`center`,of:`svg`}});function m(){let t=+s.value/n;if(Number.isFinite(t)&&t!==1&&pack.cells.i.filter(t=>pack.cells.religion[t]===e).forEach(e=>{pack.cells.pop[e]*=t}),!Number.isFinite(t)&&+s.value>0){let t=+s.value/populationRate,n=pack.cells.i.filter(t=>pack.cells.religion[t]===e),r=c(t/n.length);n.forEach(e=>{pack.cells.pop[e]=r})}let i=+l.value/r;if(Number.isFinite(i)&&i!==1&&o.forEach(e=>{e.population=c((e.population??0)*i,4)}),!Number.isFinite(i)&&+l.value>0){let e=c(+l.value/populationRate/urbanization/o.length,4);o.forEach(t=>{t.population=e})}layerIsOn(`togglePopulation`)&&drawPopulation(),y()}}function M(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.expansion=this.value,pack.religions[e].expansion=this.value,Q()}function N(){let e=+this.parentNode.dataset.id;this.parentNode.dataset.expansionism=this.value,pack.religions[e].expansionism=+this.value,Q()}function P(){if(customization)return;let e=+this.parentNode.dataset.id;confirmationDialog({title:`Remove religion`,message:`Are you sure you want to remove the religion? <br>This action cannot be reverted`,confirm:`Remove`,onConfirm:()=>F(e)})}function F(e){relig.select(`#religion${e}`).remove(),relig.select(`#religion-gap${e}`).remove(),debug.select(`#religionsCenter${e}`).remove(),pack.cells.religion.forEach((t,n)=>{t===e&&(pack.cells.religion[n]=0)}),pack.religions[e].removed=!0,pack.religions.filter(e=>e.i&&!e.removed).forEach(t=>{t.origins=(t.origins??[]).filter(t=>t!==e),t.origins.length||(t.origins=[0])}),y()}function I(){let e=a(`#debug`);e.select(`#religionCenters`).remove();let t=e.append(`g`).attr(`id`,`religionCenters`).attr(`stroke-width`,.8).attr(`stroke`,`#444444`).style(`cursor`,`move`),n=pack.religions.filter(e=>e.i&&e.center&&!e.removed);h.dataset.extinct!==`show`&&(n=n.filter(e=>(e.cells??0)>0)),t.selectAll(`circle`).data(n).enter().append(`circle`).attr(`id`,e=>`religionsCenter${e.i}`).attr(`data-id`,e=>e.i).attr(`r`,2).attr(`fill`,e=>e.color).attr(`cx`,e=>pack.cells.p[e.center][0]).attr(`cy`,e=>pack.cells.p[e.center][1]).on(`mouseenter`,(e,t)=>{tip(`${t.name}. Drag to move the religion center`,!0),w(e)}).on(`mouseleave`,e=>{tip(``,!0),T(e)}).call(d().on(`start`,L))}function L(e){let t=+this.dataset.id,n=s(this.getAttribute(`transform`)),i=+n[0]-e.x,a=+n[1]-e.y;function o(e){let{x:n,y:r}=e;this.setAttribute(`transform`,`translate(${i+n},${a+r})`);let o=findCell(n,r);o==null||pack.cells.h[o]<20||(pack.religions[t].center=o,Q())}let c=r(o,50);e.on(`drag`,c)}function R(){if(legend.selectAll(`*`).size()){clearLegend();return}let e=pack.religions.filter(e=>e.i&&!e.removed&&e.area).sort((e,t)=>(t.area??0)-(e.area??0)).map(e=>[e.i,e.color,e.name]);drawLegend(`Religions`,e)}function z(){if(h.dataset.type===`absolute`){h.dataset.type=`percentage`;let e=+f(`religionsFooterArea`).dataset.area,t=+f(`religionsFooterPopulation`).dataset.population;h.querySelectorAll(`:scope > div`).forEach(n=>{let{area:r,population:i}=n.dataset;n.querySelector(`.religionArea`).innerText=`${c(+r/e*100)}%`,n.querySelector(`.religionPopulation`).innerText=`${c(+i/t*100)}%`})}else h.dataset.type=`absolute`,b()}async function B(){customization||m.HierarchyTree.open({type:`religions`,data:pack.religions,onNodeEnter:w,onNodeLeave:T,getDescription:e=>{let{name:t,type:n,form:r,rural:i,urban:a}=e,o=()=>t.includes(n)||r.includes(n)?``:n===`Folk`||n===`Organized`?`. ${n} religion`:`. ${n}`,s=r===n?``:`. ${r}`,u=i*populationRate+a*populationRate*urbanization,d=u>0?`${l(c(u))} people`:`Extinct`;return`${t}${o()}${s}. ${d}`},getShape:({type:e})=>{if(e===`Folk`)return`circle`;if(e===`Organized`)return`square`;if(e===`Cult`)return`hexagon`;if(e===`Heresy`)return`diamond`}})}function V(){h.dataset.extinct=h.dataset.extinct===`show`?`hide`:`show`,b(),I()}function ne(){layerIsOn(`toggleReligions`)||toggleReligions(),customization=7,relig.append(`g`).attr(`id`,`temp`),document.querySelectorAll(`#religionsBottom > *`).forEach(e=>{e.style.display=`none`}),f(`religionsManuallyButtons`).style.display=`inline-block`,debug.select(`#religionCenters`).style(`display`,`none`),f(`religionsEditor`).querySelectorAll(`.hide`).forEach(e=>{e.classList.add(`hidden`)}),f(`religionsFooter`).style.display=`none`,h.querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`}),$(`#religionsEditor`).dialog({position:{my:`right top`,at:`right-10 top+10`,of:`svg`}}),tip(`Click on religion to select, drag the circle to change religion`,!0),a(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,U).call(d().on(`start`,W)).on(`touchmove mousemove`,K),h.querySelector(`div`)?.classList.add(`selected`)}function H(){if(customization!==7)return;let e=h.querySelector(`div.selected`);e&&e.classList.remove(`selected`),this.classList.add(`selected`)}function U(e){let t=n(e,this),r=findCell(t[0],t[1]);if(pack.cells.h[r]<20)return;let i=relig.select(`#temp`).select(`polygon[data-cell='${r}']`),a=i.size()?+i.attr(`data-religion`):pack.cells.religion[r];h.querySelector(`div.selected`)?.classList.remove(`selected`),h.querySelector(`div[data-id='${a}']`)?.classList.add(`selected`)}function W(e){let t=+f(`religionsBrush`).value;e.on(`drag`,e=>{if(!e.dx&&!e.dy)return;let[r,a]=n(e,this);moveCircle(r,a,t);let o=(t>5?u(r,a,t,pack):[findCell(r,a,t)]).filter(e=>e!==void 0&&i(e,pack));o&&G(o)})}function G(e){let n=relig.select(`#temp`),r=+h.querySelector(`div.selected`).dataset.id,i=pack.religions[r].color||`#ffffff`,a=document.getElementById(`religionsManuallyProtect`)?.checked;e.forEach(e=>{let o=n.select(`polygon[data-cell='${e}']`),s=o.size()?+o.attr(`data-religion`):pack.cells.religion[e];r!==s&&(a&&s||(o.size()?o.attr(`data-religion`,r).attr(`fill`,i):n.append(`polygon`).attr(`data-cell`,e).attr(`data-religion`,r).attr(`points`,t(e,pack)).attr(`fill`,i)))})}function K(e){showMainTip();let[t,r]=n(e,this),i=+f(`religionsBrush`).value;moveCircle(t,r,i)}function q(){let e=relig.select(`#temp`).selectAll(`polygon`);e.each(function(){let e=+this.dataset.cell,t=+this.dataset.religion;pack.cells.religion[e]=t}),e.size()&&(drawReligions(),y(),I()),J()}function J(e){customization=0,relig.select(`#temp`).remove(),removeCircle(),document.querySelectorAll(`#religionsBottom > *`).forEach(e=>{e.style.display=`inline-block`}),f(`religionsManuallyButtons`).style.display=`none`,f(`religionsEditor`).querySelectorAll(`.hide`).forEach(e=>{e.classList.remove(`hidden`)}),f(`religionsFooter`).style.display=`block`,h.querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`all`}),e||$(`#religionsEditor`).dialog({position:{my:`right top`,at:`right-10 top+10`,of:`svg`}}),debug.select(`#religionCenters`).style(`display`,null),restoreDefaultEvents(),clearMainTip();let t=h.querySelector(`div.selected`);t&&t.classList.remove(`selected`)}function Y(){if(this.classList.contains(`pressed`)){X();return}customization=8,this.classList.add(`pressed`),tip(`Click on the map to add a new religion`,!0),a(`#viewbox`).style(`cursor`,`crosshair`).on(`click`,re),h.querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`none`})}function X(){customization=0,restoreDefaultEvents(),clearMainTip(),h.querySelectorAll(`div > input, select, span, svg`).forEach(e=>{e.style.pointerEvents=`all`});let e=f(`religionsAdd`);e.classList.contains(`pressed`)&&e.classList.remove(`pressed`)}function re(e){let[t,r]=n(e,this),i=findCell(t,r);if(pack.cells.h[i]<20){tip(`You cannot place religion center into the water. Please click on a land cell`,!1,`error`);return}if(pack.religions.some(e=>!e.removed&&e.center===i)){tip(`This cell is already a religion center. Please select a different cell`,!1,`error`);return}e.shiftKey===!1&&X(),Religions.add(i),drawReligions(),y(),I()}function ie(){let e=`Id,Name,Color,Type,Form,Supreme Deity,Area ${getAreaUnit(`2`)},Believers,Origins,Potential,Expansionism`,t=Array.from(h.querySelectorAll(`:scope > div`)).map(e=>{let{id:t,name:n,color:r,type:i,form:a,deity:o,area:s,population:c,expansion:l,expansionism:u}=e.dataset,d=`"${o}"`,{origins:f}=pack.religions[+t];return[t,n,r,i,a,d,s,c,`"${(f||[]).filter(e=>e).map(e=>pack.religions[e].name).join(`, `)}"`,l,u].join(`,`)}),n=[e].concat(t).join(`
`),r=`${getFileName(`Religions`)}.csv`;downloadFile(n,r)}function ae(){let e=+this.parentNode.dataset.id,t=relig.select(`#religion${e}`).node();t&&highlightElement(t,4)}function Z(){if(customization)return;let e=+this.parentNode.dataset.id,t=this.classList,n=pack.religions[e];n.lock=!n.lock,t.toggle(`icon-lock-open`),t.toggle(`icon-lock`)}function Q(e){!e&&!f(`religionsAutoChange`).checked||(Religions.recalculate(),drawReligions(),y(),I())}function oe(){debug.select(`#religionCenters`).remove(),J(`close`),X()}var se={open:g};export{se as ReligionsEditor};