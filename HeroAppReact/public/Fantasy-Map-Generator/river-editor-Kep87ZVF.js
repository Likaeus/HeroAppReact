import{D as e,Ht as t,L as n,Ut as r,ht as i,lt as a}from"./utils-B2UIqRdZ.js";import{t as o}from"./drag-D017NiMT.js";import{t as s}from"./nodeUtils-5yXISZ7m.js";import{i as c}from"./index-C9o7LuyJ.js";var l=`
  <div id="riverBody" style="padding-bottom: 0.3em">
    <div>
      <div class="label" style="width: 4.8em">Name:</div>
      <span id="riverNameCulture" data-tip="Generate culture-specific name for the river" class="icon-book pointer"></span>
      <span id="riverNameRandom" data-tip="Generate random name for the river" class="icon-globe pointer"></span>
      <input id="riverName" data-tip="Type to rename the river" autocorrect="off" spellcheck="false" />
      <span data-tip="Speak the name. You can change voice and language in options" class="speaker">🔊</span>
    </div>
    <div data-tip="Type to change river type (e.g. fork, creek, river, brook, stream)">
      <div class="label">Type:</div>
      <input id="riverType" autocorrect="off" spellcheck="false" />
    </div>
    <div data-tip="Select parent river">
      <div class="label">Mainstem:</div>
      <select id="riverMainstem"></select>
    </div>
    <div data-tip="River drainage basin (watershed)">
      <div class="label">Basin:</div>
      <input id="riverBasin" disabled />
    </div>
    <div data-tip="River discharge (flux power)">
      <div class="label">Discharge:</div>
      <input id="riverDischarge" disabled />
    </div>
    <div data-tip="River length in selected units">
      <div class="label">Length:</div>
      <input id="riverLength" disabled />
    </div>
    <div data-tip="River mouth width in selected units">
      <div class="label">Mouth width:</div>
      <input id="riverWidth" disabled />
    </div>
    <div data-tip="River source additional width. Default value is 0">
      <div class="label">Source width:</div>
      <input id="riverSourceWidth" type="number" min="0" max="3" step=".01" />
    </div>
    <div data-tip="River width multiplier. Default value is 1">
      <div class="label">Width modifier:</div>
      <input id="riverWidthFactor" type="number" min=".1" max="4" step=".1" />
    </div>
  </div>
  <div id="riverBottom">
    <button id="riverCreateSelectingCells" data-tip="Create a new river selecting river cells" class="icon-map-pin"></button>
    <button id="riverEditStyle" data-tip="Edit style for all rivers in Style Editor" class="icon-brush"></button>
    <button id="riverElevationProfile" data-tip="Show the elevation profile for the river" class="icon-chart-area"></button>
    <button id="riverLegend" data-tip="Edit free text notes (legend) for the river" class="icon-edit"></button>
    <button id="riverRemove" data-tip="Remove river" data-shortcut="Delete" class="icon-trash fastDelete"></button>
  </div>`;function u(e){if(customization||elSelected&&e===elSelected.attr(`id`))return;closeDialogs(`.stable`),layerIsOn(`toggleRivers`)||toggleRivers(),s(`toggleCells`).dataset.forced=String(+!layerIsOn(`toggleCells`)),layerIsOn(`toggleCells`)||toggleCells(),elSelected=r(`#${e}`).on(`click`,x),tip(`Drag control points to change the river course. Click on point to remove it. Click on river to add additional control point. For major changes please create a new river instead`,!0),r(`#debug`).append(`g`).attr(`id`,`controlCells`),r(`#debug`).append(`g`).attr(`id`,`controlPoints`),s(`riverEditor`).innerHTML=l,m();let{cells:t,points:n}=p();_(Rivers.getRiverPoints(t,n??null)),v(t),s(`riverCreateSelectingCells`).on(`click`,d),s(`riverEditStyle`).on(`click`,f),s(`riverElevationProfile`).on(`click`,A),s(`riverLegend`).on(`click`,j),s(`riverRemove`).on(`click`,M),s(`riverName`).on(`input`,C),s(`riverType`).on(`input`,w),s(`riverNameCulture`).on(`click`,T),s(`riverNameRandom`).on(`click`,E),s(`riverMainstem`).on(`change`,D),s(`riverSourceWidth`).on(`input`,O),s(`riverWidthFactor`).on(`input`,k),$(`#riverEditor`).dialog({title:`Edit River`,resizable:!1,position:{my:`left top`,at:`left+10 top+10`,of:`#map`},close:N})}function d(){c.RiverCreator.open()}function f(){editStyle(`rivers`)}function p(){let e=+elSelected.attr(`id`).slice(5);return pack.rivers.find(t=>t.i===e)}function m(){let e=p();s(`riverName`).value=e.name,s(`riverType`).value=e.type;let t=s(`riverMainstem`);t.options.length=0;let n=e.parent||e.i;pack.rivers.slice().sort((e,t)=>e.name>t.name?1:-1).forEach(e=>{let r=new Option(e.name,String(e.i),!1,e.i===n);t.options.add(r)}),s(`riverBasin`).value=pack.rivers.find(t=>t.i===e.basin).name,s(`riverDischarge`).value=`${e.discharge} m³/s`,s(`riverSourceWidth`).value=String(e.sourceWidth),s(`riverWidthFactor`).value=String(e.widthFactor),h(e),g(e)}function h(e){e.length=i(elSelected.node().getTotalLength()/2,2);let t=`${i(e.length*distanceScale)} ${distanceUnitInput.value}`;s(`riverLength`).value=t}function g(e){let{cells:t,discharge:n,widthFactor:r,sourceWidth:a}=e,o=Rivers.addMeandering(t);e.width=Rivers.getWidth(Rivers.getOffset({flux:n,pointIndex:o.length,widthFactor:r,startingWidth:a}));let c=`${i(e.width*distanceScale,3)} ${distanceUnitInput.value}`;s(`riverWidth`).value=c}function _(e){r(`#controlPoints`).selectAll(`circle`).data(e).join(`circle`).attr(`cx`,e=>e[0]).attr(`cy`,e=>e[1]).attr(`r`,.6).call(o().on(`start`,y)).on(`click`,S)}function v(t){let n=[...new Set(t)].filter(e=>pack.cells.i[e]);r(`#controlCells`).selectAll(`polygon`).data(n).join(`polygon`).attr(`points`,t=>e(t,pack))}function y(e){let{r:t,fl:n}=pack.cells,r=p(),{x:a,y:o}=e,s=findCell(a,o),c=null;e.on(`drag`,function(e){let{x:t,y:n}=e,a=findCell(t,n);c=s===a?null:a,this.setAttribute(`cx`,t),this.setAttribute(`cy`,n),this.__data__=[i(t,1),i(n,1)],b(),v(r.cells)}),e.on(`end`,()=>{if(c&&!t[c]){t[s]=0,t[c]=r.i;let e=n[s];n[s]=n[c],n[c]=e,b()}})}function b(){let e=p();e.points=r(`#controlPoints`).selectAll(`*`).data(),e.cells=e.points.map(([e,t])=>findCell(e,t));let t=Rivers.addMeandering(e.cells,e.points),n=Rivers.getRiverPath(t,e.widthFactor,e.sourceWidth);elSelected.attr(`d`,n),h(e),s(`elevationProfile`).offsetParent&&A()}function x(e){let[a,o]=t(e,this),s=[i(a,1),i(o,1)],c=p();c.points||=r(`#controlPoints`).selectAll(`*`).data();let l=n(c.points,s,2);c.points.splice(l,0,s),_(c.points),b()}function S(){this.remove(),b();let{cells:e}=p();v(e)}function C(){p().name=this.value}function w(){p().type=this.value}function T(){let e=p();e.name=s(`riverName`).value=Rivers.getName(e.mouth)}function E(){let e=p();e&&(e.name=s(`riverName`).value=Names.getBase(a(nameBases.length-1)))}function D(){let e=p();e.parent=+this.value,e.basin=pack.rivers.find(t=>t.i===e.parent).basin,s(`riverBasin`).value=pack.rivers.find(t=>t.i===e.basin).name}function O(){let e=p();e.sourceWidth=+this.value,g(e),b()}function k(){let e=p();e.widthFactor=+this.value,g(e),b()}function A(){let e=r(`#controlPoints`).selectAll(`*`).data().map(([e,t])=>findCell(e,t)),t=i(p().length*distanceScale);c.ElevationProfile.open(e,t,!0)}function j(){let e=elSelected.attr(`id`),t=p();editNotes(e,`${t.name} ${t.type}`)}function M(){alertMessage.innerHTML=`Are you sure you want to remove the river and all its tributaries`,$(`#alert`).dialog({resizable:!1,width:`22em`,title:`Remove river and tributaries`,buttons:{Remove:function(){$(this).dialog(`close`);let e=+elSelected.attr(`id`).slice(5);Rivers.remove(e),elSelected.remove(),$(`#riverEditor`).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function N(){r(`#controlPoints`).remove(),r(`#controlCells`).remove(),elSelected.on(`click`,null),unselect(),clearMainTip();let e=+s(`toggleCells`).dataset.forced;s(`toggleCells`).dataset.forced=`0`,e&&layerIsOn(`toggleCells`)&&toggleCells(),s(`riverEditor`).innerHTML=``}var P={open:u};export{P as RiverEditor};