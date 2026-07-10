import{H as e,Nt as t,Ut as n,_ as r,ht as i,i as a,m as o}from"./utils-B2UIqRdZ.js";import{t as s}from"./nodeUtils-5yXISZ7m.js";import{T as c,i as l}from"./index-B7kIDgkV.js";var u=!1;function d(){if(customization)return;closeDialogs(`#militaryOverview, .stable`),layerIsOn(`toggleStates`)||toggleStates(),layerIsOn(`toggleBorders`)||toggleBorders(),layerIsOn(`toggleMilitary`)||toggleMilitary();let t=s(`militaryBody`);m(),$(`#militaryOverview`).dialog(),u||=(p(),$(`#militaryOverview`).dialog({title:`Military Overview`,resizable:!1,width:fitContent(),position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`}}),s(`militaryOverviewRefresh`).addEventListener(`click`,m),s(`militaryPercentage`).addEventListener(`click`,y),s(`militaryOptionsButton`).addEventListener(`click`,b),s(`militaryRegimentsList`).addEventListener(`click`,()=>f(-1)),s(`militaryOverviewRecalculate`).addEventListener(`click`,x),s(`militaryExport`).addEventListener(`click`,S),s(`militaryWiki`).addEventListener(`click`,()=>e(`Military-Forces`)),t.addEventListener(`change`,e=>{let t=e.target,n=t.parentNode;h(+n.dataset.id,n,+t.value)}),t.addEventListener(`click`,e=>{let t=e.target,n=+t.parentNode.dataset.id;t.tagName===`SPAN`&&f(n)}),!0)}async function f(e){l.RegimentsOverview.open(e)}function p(){let e=s(`militaryHeader`),t=options.military.length;e.style.gridTemplateColumns=`8em repeat(${t}, 5.2em) 4em 7em 5em 6em`,e.querySelectorAll(`.removable`).forEach(e=>{e.remove()});let n=e=>s(`militaryTotal`).insertAdjacentHTML(`beforebegin`,e);for(let e of options.military){let t=o(e.name.replace(/_/g,` `));n(`<div data-tip="State ${e.name} units number. Click to sort" class="sortable removable" data-sortby="${e.name.toLowerCase()}">${t}&nbsp;</div>`)}e.querySelectorAll(`.removable`).forEach(e=>{e.addEventListener(`click`,()=>sortLines(e))})}function m(){let e=s(`militaryBody`);e.innerHTML=``;let t=``,n=pack.states.filter(e=>e.i&&!e.removed);for(let e of n){let n=i((e.rural+e.urban*urbanization)*populationRate),r=t=>(e.military||[]).reduce((e,n)=>e+(n.u[t.name]||0),0),o=options.military.reduce((e,t)=>e+r(t)*t.crew,0),s=o/n*100,c=options.military.map(e=>`data-${e.name.toLowerCase()}="${r(e)}"`).join(` `),l=options.military.map(e=>`<div data-type="${e.name}" data-tip="State ${e.name} units number">${r(e)}</div>`).join(` `);t+=`<div
        class="states"
        data-id=${e.i}
        data-state="${e.name}"
        ${c}
        data-total="${o}"
        data-population="${n}"
        data-rate="${s}"
        data-alert="${e.alert}"
      >
        <fill-box data-tip="${e.fullName}" fill="${e.color}" disabled></fill-box>
        <input data-tip="${e.fullName}" style="width:6em" value="${e.name}" readonly />
        ${l}
        <div data-type="total" data-tip="Total state military personnel (considering crew)" style="font-weight: bold">${a(o)}</div>
        <div data-type="population" data-tip="State population">${a(n)}</div>
        <div data-type="rate" data-tip="Military personnel rate (% of state population). Depends on war alert">${i(s,2)}%</div>
        <input
          data-tip="War Alert. Editable modifier to military forces number, depends of political situation"
          style="width:4.1em"
          type="number"
          min="0"
          step=".01"
          value="${i(e.alert??0,2)}"
        />
        <span data-tip="Show regiments list" class="icon-list-bullet pointer"></span>
      </div>`}e.insertAdjacentHTML(`beforeend`,t),g(),e.querySelectorAll(`div.states`).forEach(e=>{e.addEventListener(`mouseenter`,e=>_(e))}),e.querySelectorAll(`div.states`).forEach(e=>{e.addEventListener(`mouseleave`,e=>v(e))}),e.dataset.type===`percentage`&&(e.dataset.type=`absolute`,y()),applySorting(s(`militaryHeader`))}function h(e,t,r){let o=pack.states[e],s=o.alert??1,l=s?r/s:0;o.alert=r,t.dataset.alert=String(r),(o.military||[]).forEach(e=>{Object.keys(e.u).forEach(t=>{e.u[t]=i(e.u[t]*l)}),e.a=c(Object.values(e.u)),n(`#armies > g > g#regiment${o.i}-${e.i} > text`).text(Military.getTotal(e))});let u=e=>(o.military||[]).reduce((t,n)=>t+(n.u[e.name]||0),0);options.military.forEach(e=>{let n=u(e);t.dataset[e.name]=String(n),t.querySelector(`div[data-type='${e.name}']`).innerHTML=String(n)});let d=i((o.rural+o.urban*urbanization)*populationRate),f=options.military.reduce((e,t)=>e+u(t)*t.crew,0);t.dataset.total=String(f);let p=f/d*100;t.dataset.rate=String(p),t.querySelector(`div[data-type='total']`).innerHTML=a(f),t.querySelector(`div[data-type='rate']`).innerHTML=`${i(p,2)}%`,g()}function g(){let e=s(`militaryBody`),t=Array.from(e.querySelectorAll(`:scope > div`)),n=pack.states.filter(e=>e.i&&!e.removed).length;s(`militaryFooterStates`).innerHTML=String(n);let r=c(t.map(e=>+e.dataset.total));s(`militaryFooterForcesTotal`).innerHTML=a(r),s(`militaryFooterForces`).innerHTML=a(r/n),s(`militaryFooterRate`).innerHTML=`${i(c(t.map(e=>+e.dataset.rate))/n,2)}%`,s(`militaryFooterAlert`).innerHTML=String(i(c(t.map(e=>+e.dataset.alert))/n,2))}function _(e){let r=+e.target.dataset.id;if(customization||!r||(n(`#armies > g > g#army${r}`).transition().duration(2e3).style(`fill`,`#ff0000`),!layerIsOn(`toggleStates`)))return;let i=n(`#regions`).select(`#state${r}`).attr(`d`),a=n(`#debug`).append(`path`).attr(`class`,`highlight`).attr(`d`,i).attr(`fill`,`none`).attr(`stroke`,`red`).attr(`stroke-width`,1).attr(`opacity`,1).attr(`filter`,`url(#blur1)`),o=a.node().getTotalLength(),s=(o+5e3)/2,c=t(`0,${o}`,`${o},${o}`);a.transition().duration(s).attrTween(`stroke-dasharray`,()=>e=>c(e))}function v(e){n(`#debug`).selectAll(`.highlight`).each(function(){n(this).transition().duration(1e3).attr(`opacity`,0).remove()}),n(`#armies > g > g#army${+e.target.dataset.id}`).transition().duration(1e3).style(`fill`,null)}function y(){let e=s(`militaryBody`);if(e.dataset.type===`absolute`){e.dataset.type=`percentage`;let t=e.querySelectorAll(`:scope > div`),n=Array.from(t),r={},a=e=>(r[e]||(r[e]=c(n.map(t=>+(t.dataset[e]||0)))),r[e]);t.forEach(e=>{e.querySelectorAll(`div`).forEach(t=>{let n=t.dataset.type;if(n===`rate`)return;let r=a(n);t.textContent=r?`${i(+(e.dataset[n]||0)/r*100)}%`:`0%`})})}else e.dataset.type=`absolute`,m()}function b(){let e=[`melee`,`ranged`,`mounted`,`machinery`,`naval`,`armored`,`aviation`,`magical`],t=s(`militaryOptions`).querySelector(`tbody`);if(n(),options.military.map(e=>c(e)),$(`#militaryOptions`).dialog({title:`Edit Military Units`,resizable:!1,width:fitContent(),position:{my:`center`,at:`center`,of:`svg`},buttons:{Apply:d,Add:()=>c({icon:`🛡️`,name:`custom${s(`militaryOptionsTable`).rows.length}`,rural:.2,urban:.5,crew:1,power:1,type:`melee`,separate:0}),Restore:l,Cancel:function(){$(this).dialog(`close`)}},open:function(){let e=$(this).dialog(`widget`).find(`.ui-dialog-buttonset > button`);e[0].addEventListener(`mousemove`,()=>tip(`Apply military units settings. <span style='color:#cb5858'>All forces will be recalculated!</span>`)),e[1].addEventListener(`mousemove`,()=>tip(`Add new military unit to the table`)),e[2].addEventListener(`mousemove`,()=>tip(`Restore default military units and settings`)),e[3].addEventListener(`mousemove`,()=>tip(`Close the window without saving the changes`))}}),modules.overviewMilitaryCustomize)return;modules.overviewMilitaryCustomize=!0,t.addEventListener(`click`,e=>{let t=e.target;if(t.tagName!==`BUTTON`)return;let n=t.dataset.type;if(n===`icon`){selectIcon(t.textContent||``,e=>{t.innerHTML=e.startsWith(`http`)||e.startsWith(`data:image`)?`<img src="${e}" style="width:1.2em;height:1.2em;pointer-events:none;">`:e});return}if(n===`biomes`){let{i:e,name:n,color:r}=biomesData;u(t,Array(e.length).fill(null).map((e,t)=>({i:t,name:n[t],color:r[t]})));return}if(n===`states`)return u(t,pack.states);if(n===`cultures`)return u(t,pack.cultures);if(n===`religions`)return u(t,pack.religions)});function n(){t.querySelectorAll(`tr`).forEach(e=>{e.remove()})}function i(e){return e?.join(`,`)||``}function a(e){return e?.length?`some`:`all`}function o(e,t){return e?.length?e.map(e=>t?.[e]?.name||``).join(`, `):``}function c(n){let{type:r,icon:s,name:c,rural:l,urban:u,power:d,crew:f,separate:p}=n,m=document.createElement(`tr`),h=e.map(e=>`<option ${r===e?`selected`:``} value="${e}">${e}</option>`).join(` `),g=e=>{let t=e===`biomes`?[]:pack[e];return`<button
          data-tip="Select allowed ${e}"
          data-type="${e}"
          title="${o(n[e],t)}"
          data-value="${i(n[e])}">
          ${a(n[e])}
        </button>`};m.innerHTML=`<td>
          <button data-type="icon" data-tip="Click to select unit icon">
            ${s.startsWith(`http`)||s.startsWith(`data:image`)?`<img src="${s}" style="width:1.2em;height:1.2em;pointer-events:none;">`:s||``}
          </button>
        </td>
        <td><input data-tip="Type unit name. If name is changed for existing unit, old unit will be replaced" value="${c}" /></td>
        <td>${g(`biomes`)}</td>
        <td>${g(`states`)}</td>
        <td>${g(`cultures`)}</td>
        <td>${g(`religions`)}</td>
        <td><input data-tip="Enter conscription percentage for rural population" type="number" min="0" max="100" step=".01" value="${l}" /></td>
        <td><input data-tip="Enter conscription percentage for urban population" type="number" min="0" max="100" step=".01" value="${u}" /></td>
        <td><input data-tip="Enter average number of people in crew (for total personnel calculation)" type="number" min="1" step="1" value="${f}" /></td>
        <td><input data-tip="Enter military power (used for battle simulation)" type="number" min="0" step=".1" value="${d}" /></td>
        <td>
          <select data-tip="Select unit type to apply special rules on forces recalculation">
            ${h}
          </select>
        </td>
        <td data-tip="Check if unit is <b>separate</b> and can be stacked only with the same units">
          <input id="${c}Separate" type="checkbox" class="checkbox" ${p?`checked`:``} />
          <label for="${c}Separate" class="checkbox-label"></label>
        </td>
        <td data-tip="Remove the unit">
          <span data-tip="Remove unit type" class="icon-trash-empty pointer" onclick="this.parentElement.parentElement.remove();"></span>
        </td>`,t.appendChild(m)}function l(){n(),Military.getDefaultOptions().map(e=>c(e))}function u(e,t){let n=e.dataset.type,r=e.dataset.value,i=r?r.split(`,`).map(e=>+e):[],a=t.filter(e=>e.i&&!e.removed).map(({i:e,name:t,fullName:n,color:r})=>`
          <tr data-tip="${t}">
            <td><span style="color:${r}">⬤</span></td>
            <td>
              <input data-i="${e}" id="el${e}" type="checkbox" class="checkbox"
                ${!i.length||i.includes(e)?`checked`:``} >
              <label for="el${e}" class="checkbox-label">${n||t}</label>
            </td>
          </tr>`);s(`alertMessage`).innerHTML=`<b>Limit unit by ${n}:</b>
        <table style="margin-top:.3em">
          <tbody>
            ${a.join(``)}
          </tbody>
        </table>`,$(`#alert`).dialog({width:fitContent(),title:`Limit unit`,buttons:{Invert:()=>{alertMessage.querySelectorAll(`input`).forEach(e=>{e.checked=!e.checked})},Apply:function(){let n=Array.from(alertMessage.querySelectorAll(`input`)),r=n.reduce((e,t)=>(t.checked&&e.push(t.dataset.i),e),[]);if(!r.length){tip(`Select at least one element`,!1,`error`);return}let i=r.length===n.length;e.dataset.value=i?``:r.join(`,`),e.innerHTML=i?`all`:`some`,e.setAttribute(`title`,o(r.map(Number),t)),$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function d(){let e=Array.from(t.querySelectorAll(`tr`)),n=e.map(e=>r(e.querySelector(`input`).value));if(new Set(n).size!==n.length){tip(`All units should have unique names`,!1,`error`);return}$(`#militaryOptions`).dialog(`close`),options.military=e.map((e,t)=>{let[r,,i,a,o,s,c,l,u,d,f,p]=Array.from(e.querySelectorAll(`input, button, select`)).map(e=>{let{type:t,value:n}=e.dataset||{};if(t===`icon`){let t=e.innerHTML.trim();return t.startsWith(`<img`)?t.match(/src="([^"]*)"/)[1]:t||`⠀`}return t?n?n.split(`,`).map(e=>parseInt(e,10)):null:e.type===`number`?+e.value||0:e.type===`checkbox`?+e.checked||0:e.value}),m={icon:r,name:n[t],rural:c,urban:l,crew:u,power:d,type:f,separate:p};return i&&(m.biomes=i),a&&(m.states=a),o&&(m.cultures=o),s&&(m.religions=s),m}),localStorage.setItem(`military`,JSON.stringify(options.military)),Military.generate(),p(),m()}}function x(){s(`alertMessage`).innerHTML=`Are you sure you want to recalculate military forces for all states?<br>Regiments for all states will be regenerated`,$(`#alert`).dialog({resizable:!1,title:`Recalculate military`,buttons:{Recalculate:function(){$(this).dialog(`close`),Military.generate(),m()},Cancel:function(){$(this).dialog(`close`)}}})}function S(){let e=s(`militaryBody`),t=options.military.map(e=>e.name),n=`Id,State,${t.map(e=>o(e)).join(`,`)},Total,Population,Rate,War Alert\n`;e.querySelectorAll(`:scope > div`).forEach(e=>{n+=`${e.dataset.id},`,n+=`${e.dataset.state},`,n+=`${t.map(t=>e.dataset[t.toLowerCase()]).join(`,`)},`,n+=`${e.dataset.total},`,n+=`${e.dataset.population},`,n+=`${i(Number(e.dataset.rate),2)}%,`,n+=`${e.dataset.alert}\n`});let r=`${getFileName(`Military`)}.csv`;downloadFile(n,r)}var C={open:d,refresh:m};export{C as MilitaryOverview};