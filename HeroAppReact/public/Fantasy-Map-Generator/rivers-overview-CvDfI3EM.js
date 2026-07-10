import{ht as e}from"./utils-B2UIqRdZ.js";import{t}from"./nodeUtils-5yXISZ7m.js";import{D as n,i as r}from"./index-B7kIDgkV.js";var i=`
  <div id="riversHeader" class="header" style="grid-template-columns: 9em 4em 7em 5em 5em 9em">
    <div data-tip="Click to sort by river name" class="sortable alphabetically" data-sortby="name">River&nbsp;</div>
    <div data-tip="Click to sort by river type name" class="sortable alphabetically" data-sortby="type">Type&nbsp;</div>
    <div data-tip="Click to sort by discharge (flux in m3/s)" class="sortable icon-sort-number-down" data-sortby="discharge">Discharge&nbsp;</div>
    <div data-tip="Click to sort by river length" class="sortable" data-sortby="length">Length&nbsp;</div>
    <div data-tip="Click to sort by river mouth width" class="sortable" data-sortby="width">Width&nbsp;</div>
    <div data-tip="Click to sort by river basin" class="sortable alphabetically" data-sortby="basin">Basin&nbsp;</div>
  </div>
  <div id="riversBody" class="table"></div>
  <div id="riversFooter" class="totalLine">
    <div data-tip="Rivers number" style="margin-left: 4px">Rivers:&nbsp;<span id="riversFooterNumber">0</span></div>
    <div data-tip="Average discharge" style="margin-left: 12px">Average discharge:&nbsp;<span id="riversFooterDischarge">0</span></div>
    <div data-tip="Average length" style="margin-left: 12px">Length:&nbsp;<span id="riversFooterLength">0</span></div>
    <div data-tip="Average mouth width" style="margin-left: 12px">Width:&nbsp;<span id="riversFooterWidth">0</span></div>
  </div>
  <div id="riversBottom">
    <button id="riversOverviewRefresh" data-tip="Refresh the Editor" class="icon-cw"></button>
    <button id="addNewRiver" data-tip="Automatically add river starting from clicked cell. Hold Shift to add multiple" class="icon-plus"></button>
    <button id="riverCreateNew" data-tip="Create a new river selecting river cells" class="icon-map-pin"></button>
    <button id="riversBasinHighlight" data-tip="Toggle basin highlight mode" class="icon-sitemap"></button>
    <button id="riversExport" data-tip="Save rivers-related data as a text file (.csv)" class="icon-download"></button>
    <button id="riversRemoveAll" data-tip="Remove all rivers" class="icon-trash"></button>
    <label for="riversSearch" data-tip="Filter by name, type or basin" style="margin-left: 0.2em">Search: <input id="riversSearch" type="search" /></label>
  </div>`;function a(){customization||(closeDialogs(`#riversOverview, .stable`),layerIsOn(`toggleRivers`)||toggleRivers(),t(`riversOverview`).innerHTML=i,c(),t(`riversOverviewRefresh`).on(`click`,c),t(`addNewRiver`).on(`click`,toggleAddRiver),t(`riverCreateNew`).on(`click`,s),t(`riversBasinHighlight`).on(`click`,f),t(`riversExport`).on(`click`,p),t(`riversRemoveAll`).on(`click`,g),t(`riversSearch`).on(`input`,c),$(`#riversOverview`).dialog({title:`Rivers Overview`,resizable:!1,width:fitContent(),position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},close:o}))}function o(){t(`riversOverview`).innerHTML=``}function s(){r.RiverCreator.open()}function c(){let r=t(`riversBody`);r.innerHTML=``;let i=``,a=distanceUnitInput.value,o=new Map(pack.rivers.map(e=>[e.i,e])),s=pack.rivers,c=t(`riversSearch`).value.toLowerCase().trim();c&&(s=s.filter(e=>{let t=(e.name||``).toLowerCase(),n=(e.type||``).toLowerCase(),r=o.get(e.basin),i=r?(r.name||``).toLowerCase():``;return t.includes(c)||n.includes(c)||i.includes(c)}));for(let t of s){let n=`${t.discharge} m³/s`,r=`${e(t.length*distanceScale)} ${a}`,s=`${e(t.width*distanceScale,3)} ${a}`,c=o.get(t.basin)?.name;i+=`<div
        class="states"
        data-id=${t.i}
        data-name="${t.name}"
        data-type="${t.type}"
        data-discharge="${t.discharge}"
        data-length="${t.length}"
        data-width="${t.width}"
        data-basin="${c}"
      >
        <span data-tip="Locate the river" class="icon-target"></span>
        <div data-tip="River name" style="margin-left: 0.4em;" class="riverName">${t.name}</div>
        <div data-tip="River type name" class="riverType">${t.type}</div>
        <div data-tip="River discharge (flux power)" class="biomeArea">${n}</div>
        <div data-tip="River length from source to mouth" class="biomeArea">${r}</div>
        <div data-tip="River mouth width" class="biomeArea">${s}</div>
        <input data-tip="River basin (name of the main stem)" class="stateName" value="${c}" disabled />
        <span data-tip="Edit river" class="icon-pencil"></span>
        <span data-tip="Remove river" class="icon-trash-empty"></span>
      </div>`}r.insertAdjacentHTML(`beforeend`,i),t(`riversFooterNumber`).innerHTML=`${s.length} of ${pack.rivers.length}`;let f=e(n(s.map(e=>e.discharge)))||0;t(`riversFooterDischarge`).innerHTML=`${f} m³/s`;let p=e(n(s.map(e=>e.length)))||0;t(`riversFooterLength`).innerHTML=`${p*distanceScale} ${a}`;let g=e(n(s.map(e=>e.width)),3)||0;t(`riversFooterWidth`).innerHTML=`${e(g*distanceScale,3)} ${a}`,r.querySelectorAll(`div.states`).forEach(e=>void e.on(`mouseenter`,e=>l(e))),r.querySelectorAll(`div.states`).forEach(e=>void e.on(`mouseleave`,e=>u(e))),r.querySelectorAll(`div > span.icon-target`).forEach(e=>void e.on(`click`,d)),r.querySelectorAll(`div > span.icon-pencil`).forEach(e=>void e.on(`click`,m)),r.querySelectorAll(`div > span.icon-trash-empty`).forEach(e=>void e.on(`click`,h)),applySorting(t(`riversHeader`))}function l(e){layerIsOn(`toggleRivers`)||toggleRivers();let t=+e.target.dataset.id;rivers.select(`#river${t}`).attr(`stroke`,`red`).attr(`stroke-width`,1)}function u(e){let t=+e.target.dataset.id;rivers.select(`#river${t}`).attr(`stroke`,null).attr(`stroke-width`,null)}function d(){let e=+this.parentNode.dataset.id,t=rivers.select(`#river${e}`).node();highlightElement(t,3)}function f(){if(rivers.attr(`data-basin`)===`hightlighted`)rivers.selectAll(`*`).attr(`fill`,null),rivers.attr(`data-basin`,null);else{rivers.attr(`data-basin`,`hightlighted`);let e=[...new Set(pack.rivers.map(e=>e.basin))],t=[`#1f77b4`,`#ff7f0e`,`#2ca02c`,`#d62728`,`#9467bd`,`#8c564b`,`#e377c2`,`#7f7f7f`,`#bcbd22`,`#17becf`];e.forEach((e,n)=>{let r=t[n%t.length];pack.rivers.filter(t=>t.basin===e).forEach(e=>{rivers.select(`#river${e.i}`).attr(`fill`,r)})})}}function p(){let n=`Id,River,Type,Discharge,Length,Width,Basin
`;t(`riversBody`).querySelectorAll(`:scope > div`).forEach(t=>{let r=t.dataset,i=`${r.discharge} m³/s`,a=`${e(+r.length*distanceScale)} ${distanceUnitInput.value}`,o=`${e(+r.width*distanceScale,3)} ${distanceUnitInput.value}`;n+=`${[r.id,r.name,r.type,i,a,o,r.basin].join(`,`)}\n`});let r=`${getFileName(`Rivers`)}.csv`;downloadFile(n,r)}function m(){let e=`river${this.parentNode.dataset.id}`;r.RiverEditor.open(e)}function h(){let e=+this.parentNode.dataset.id;alertMessage.innerHTML=`Are you sure you want to remove the river? All tributaries will be auto-removed`,$(`#alert`).dialog({resizable:!1,width:`22em`,title:`Remove river`,buttons:{Remove:function(){Rivers.remove(e),c(),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function g(){alertMessage.innerHTML=`Are you sure you want to remove all rivers?`,$(`#alert`).dialog({resizable:!1,title:`Remove all rivers`,buttons:{Remove:function(){$(this).dialog(`close`),_()},Cancel:function(){$(this).dialog(`close`)}}})}function _(){pack.rivers=[],pack.cells.r=new Uint16Array(pack.cells.i.length),rivers.selectAll(`*`).remove(),c()}var v={open:a};export{v as RiversOverview};