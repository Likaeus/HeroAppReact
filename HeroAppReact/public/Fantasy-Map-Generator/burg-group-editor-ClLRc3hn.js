import"./utils-B2UIqRdZ.js";import{t as e}from"./nodeUtils-5yXISZ7m.js";var t=/^[\p{L}_][\p{L}\p{N}_-]*$/u,n=!1;function r(){customization||(i(),$(`#burgGroupsEditor`).dialog({title:`Configure Burg groups`,resizable:!1,position:{my:`center`,at:`center`,of:`svg`},buttons:{Apply:()=>{e(`burgGroupsForm`).requestSubmit()},Add:()=>{e(`burgGroupsBody`).insertAdjacentHTML(`beforeend`,a({name:``,active:!0}))},Restore:()=>{options.burgs.groups=Burgs.getDefaultGroups(),i()},Cancel:function(){$(this).dialog(`close`)}}}),!n&&(n=!0,e(`burgGroupsForm`).on(`change`,l).on(`submit`,u),e(`burgGroupsBody`).on(`click`,e=>{let t=e.target,n=t.closest(`tr`);if(n){if(t.getAttribute(`name`)===`biomes`)return o(t,Array(biomesData.i.length).fill(null).map((e,t)=>({i:t,name:biomesData.name[t],color:biomesData.color[t]})));if(t.getAttribute(`name`)===`states`)return o(t,pack.states);if(t.getAttribute(`name`)===`cultures`)return o(t,pack.cultures);if(t.getAttribute(`name`)===`religions`)return o(t,pack.religions);if(t.getAttribute(`name`)===`features`)return s(t);if(t.getAttribute(`name`)===`up`){let e=n.previousElementSibling;e&&n.parentNode.insertBefore(n,e);return}if(t.getAttribute(`name`)===`down`){let e=n.nextElementSibling;e&&n.parentNode.insertBefore(e,n);return}if(t.getAttribute(`name`)===`remove`)return c(n)}})))}function i(){let t=options.burgs.groups.map(a);e(`burgGroupsBody`).innerHTML=t.join(``)}function a(e){let t=pack.burgs.filter(t=>!t.removed&&t.group===e.name).length;return`<tr name="${e.name}">
      <td data-tip="Rendering order: higher values are rendered on top"><input type="number" name="order" min="1" max="999" step="1" required value="${e.order||``}" /></td>
      <td data-tip="Type group name. Must start with a letter or underscore, followed by letters, digits, underscores, or dashes. Spaces are not allowed"><input type="text" name="name" value="${e.name}" required /></td>
      <td data-tip="Burg preview generator">
        <select name="preview">
          <option value="" ${e.preview?``:`selected`}>no</option>
          <option value="watabou-city" ${e.preview===`watabou-city`?`selected`:``}>Watabou City</option>
          <option value="watabou-village" ${e.preview===`watabou-village`?`selected`:``}>Watabou Village</option>
          <option value="watabou-dwelling" ${e.preview===`watabou-dwelling`?`selected`:``}>Watabou Dwelling</option>
        </select>
      </td>
      <td data-tip="Set min population constraint in population points (see the multiplier in Units Editor)"><input type="number" name="min" min="0" step="any" value="${e.min||``}" /></td>
      <td data-tip="Set max population constraint in population points (see the multiplier in Units Editor)"><input type="number" name="max" min="0" step="any" value="${e.max||``}" /></td>
      <td data-tip="Set population percentile: 0-100, where 90 means the burg must have a population higher than 90% of all burgs"><input type="number" name="percentile" min="0" max="100" step="any" value="${e.percentile||``}" /></td>
      <td data-tip="Select allowed biomes">
        <input type="hidden" name="biomes" value="${e.biomes||``}">
        <button type="button" name="biomes">${e.biomes?`some`:`all`}</button>
      </td>
      <td data-tip="Select allowed states">
        <input type="hidden" name="states" value="${e.states||``}">
        <button type="button" name="states">${e.states?`some`:`all`}</button>
      </td>
      <td data-tip="Select allowed cultures">
        <input type="hidden" name="cultures" value="${e.cultures||``}">
        <button type="button" name="cultures">${e.cultures?`some`:`all`}</button>
      </td>
      <td data-tip="Select allowed religions">
        <input type="hidden" name="religions" value="${e.religions||``}">
        <button type="button" name="religions">${e.religions?`some`:`all`}</button>
      </td>
      <td data-tip="Select allowed features" >
        <input type="hidden" name="features" value='${JSON.stringify(e.features||{})}'>
        <button type="button" name="features">${Object.keys(e.features||{}).length?`some`:`any`}</button>
      </td>
      <td data-tip="Number of burgs in group">${t}</td>
      <td data-tip="Activate/deactivate group"><input type="checkbox" name="active" class="native" ${e.active&&`checked`} /></td>
      <td data-tip="Select group to be assigned if other groups are not passed"><input type="radio" name="isDefault" ${e.isDefault&&`checked`}></td>
      <td data-tip="Assignment order: move group up"><button type="button" name="up" class="icon-up-big"></button></td>
      <td data-tip="Assignment order: move group down"><button type="button" name="down" class="icon-down-big"></button></td>
      <td data-tip="Remove group"><button type="button" name="remove" class="icon-trash"></button></td>
    </tr>`}function o(e,t){let n=e.previousElementSibling.value,r=n?n.split(`,`).map(e=>+e):[],i=t.filter(e=>e.i&&!e.removed).map(({i:e,name:t,fullName:n,color:i})=>`
        <tr data-tip="${t}">
          <td>
            <span style="color:${i}">⬤</span>
          </td>
          <td>
            <input data-i="${e}" id="el${e}" type="checkbox" class="checkbox" ${!r.length||r.includes(e)?`checked`:``} >
            <label for="el${e}" class="checkbox-label">${n||t}</label>
          </td>
        </tr>`);alertMessage.innerHTML=`<b>Limit group by ${e.getAttribute(`name`)}:</b>
      <table style="margin-top:.3em">
        <tbody>
          ${i.join(``)}
        </tbody>
      </table>`,$(`#alert`).dialog({width:fitContent(),title:`Limit group`,buttons:{Invert:()=>{alertMessage.querySelectorAll(`input`).forEach(e=>{e.checked=!e.checked})},Apply:function(){let t=Array.from(alertMessage.querySelectorAll(`input`)),n=t.reduce((e,t)=>(t.checked&&e.push(t.dataset.i),e),[]);if(!n.length)return tip(`Select at least one element`,!1,`error`);let r=n.length===t.length;e.previousElementSibling.value=r?``:n.join(`,`),e.innerHTML=r?`all`:`some`,$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function s(t){let n=t.previousElementSibling.value,r=n?JSON.parse(n):{},i=[{name:`capital`,icon:`icon-star`},{name:`port`,icon:`icon-anchor`},{name:`citadel`,icon:`icon-chess-rook`},{name:`walls`,icon:`icon-fort-awesome`},{name:`plaza`,icon:`icon-store`},{name:`temple`,icon:`icon-chess-bishop`},{name:`shanty`,icon:`icon-campground`}],a=i.map(({name:e,icon:t})=>`
        <tr data-tip="Select limitation for burg feature: ${e}">
          <td>
            <span class="${t}"></span>
            <span style="margin-left:.2em">${e}</span>
          </td>
          <td>
            <input type="radio" name="${e}" value="true" ${r[e]===!0?`checked`:``} style="margin:0" >
          </td>
          <td>
            <input type="radio" name="${e}" value="false" ${r[e]===!1?`checked`:``} style="margin:0">
          </td>
          <td>
            <input type="radio" name="${e}" value="undefined" ${r[e]===void 0?`checked`:``} style="margin:0">
          </td>
        </tr>`);alertMessage.innerHTML=`
      <form id="featuresLimitationForm">
        <table>
          <thead style="font-weight:bold">
            <td style="width:6em">Features</td>
            <td style="width:3em">True</td>
            <td style="width:3em">False</td>
            <td style="width:3em">Any</td>
          </thead>
          <tbody>
            ${a.join(``)}
          </tbody>
        </table>
      </form>`,$(`#alert`).dialog({width:fitContent(),title:`Limit group by features`,buttons:{Apply:function(){let n=e(`featuresLimitationForm`),r=i.reduce((e,{name:t})=>{let r=n[t].value;return r!==`undefined`&&(e[t]=r===`true`),e},{});t.previousElementSibling.value=JSON.stringify(r),t.innerHTML=Object.keys(r).length?`some`:`any`,$(this).dialog(`close`)},Cancel:function(){$(this).dialog(`close`)}}})}function c(t){if(e(`burgGroupsBody`).children.length<2){tip(`At least one group should be defined`,!1,`error`);return}confirmationDialog({title:`Remove group`,message:`Are you sure you want to remove the group? <br>This WON'T change the burgs unless the changes are applied`,confirm:`Remove`,onConfirm:()=>{t.remove(),l()}})}function l(){let n=e(`burgGroupsForm`),r=n.name;if(r.length){let e=Array.from(r).map(e=>e.value);r.forEach(n=>{let r=n.value,i=t.test(r),a=e.filter(e=>e===r).length===1,o=i?a?``:`Group name should be unique`:`Group name must start with a letter or underscore and then contain only letters, digits, underscores, or dashes`;n.setCustomValidity(o)})}else{let e=r.value,n=t.test(e)?``:`Group name must start with a letter or underscore and then contain only letters, digits, underscores, or dashes`;r.setCustomValidity(n)}let i=n.active;if(i.length){let e=Array.from(i).map(e=>e.checked);i[0].setCustomValidity(e.includes(!0)?``:`At least one group should be active`)}else i.setCustomValidity(i.checked?``:`At least one group should be active`);let a=n.isDefault;if(a.length){let e=Array.from(a).map(e=>e.checked);a[0].setCustomValidity(e.includes(!0)?``:`At least one group should be default`)}else a.setCustomValidity(a.checked?``:`At least one group should be default`);let o=n.checkValidity();return o||n.reportValidity(),o}function u(t){if(t.preventDefault(),!l())return;let n=Array.from(e(`burgGroupsBody`).children);if(!n.length){tip(`At least one group should be defined`,!1,`error`);return}function r(e){if(e.name===`name`)return e.value;if(e.name===`features`){let t=JSON.isValid(e.value)?JSON.parse(e.value):{};return Object.keys(t).length?t:null}if(e.type===`hidden`)return e.value||null;if(e.type===`radio`||e.type===`checkbox`)return e.checked;if(e.type===`number`){let t=e.valueAsNumber;return t===0||Number.isNaN(t)?null:t}return e.value||null}options.burgs.groups=n.map(e=>{let t=e.querySelectorAll(`input, select`);return Array.from(t).reduce((e,t)=>{let n=r(t);return n!==null&&(e[t.name]=n),e},{})}),localStorage.setItem(`burg-groups`,JSON.stringify(options.burgs.groups));let i=pack.burgs.filter(e=>e.i&&!e.removed),a=i.map(e=>e.population).sort((e,t)=>e-t);i.forEach(e=>void Burgs.defineGroup(e,a)),layerIsOn(`toggleBurgIcons`)&&drawBurgIcons(),layerIsOn(`toggleLabels`)&&drawBurgLabels();let o=e(`burgsOverviewRefresh`);o.offsetParent&&o.click(),$(`#burgGroupsEditor`).dialog(`close`)}var d={open:r};export{d as BurgGroupEditor};