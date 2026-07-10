import{j as e,nn as t}from"./utils-B2UIqRdZ.js";import{t as n}from"./nodeUtils-5yXISZ7m.js";import{c as r,d as i,l as a,u as o}from"./index-B7kIDgkV.js";var s=t(e()),c=[{id:`coastMaxDepth`,label:`Detail depth`,tip:`Maximum recursion levels per edge. Each +1 can double point count in rough zones.`,min:1,max:5,step:1,key:`maxDepth`},{id:`coastBaseAmplitude`,label:`Roughness amplitude`,tip:`Peak perpendicular displacement. Scales with √(edge length) so large edges stay proportional.`,min:.2,max:4,step:.1,key:`baseAmplitude`},{id:`coastAmplitudeDecay`,label:`Amplitude decay`,tip:`Amplitude multiplier per recursion level (Hurst exponent). Lower = more jagged finer detail.`,min:.01,max:.99,step:.01,key:`amplitudeDecay`},{id:`coastMinEdge`,label:`Minimum edge`,tip:`Edges shorter than this (map units) are never subdivided regardless of roughness.`,min:.1,max:10,step:.1,key:`minEdge`},{id:`coastSmoothThreshold`,label:`Smooth threshold`,tip:`Profile values below this receive zero displacement → glassy arc. Controls calm-coast coverage.`,min:.01,max:.5,step:.01,key:`smoothThreshold`},{id:`coastRoughnessContrast`,label:`Roughness contrast`,tip:`Power applied to the roughness profile. Higher = sharper calm/rough transition.`,min:.5,max:10,step:.1,key:`roughnessContrast`},{id:`coastProfileHarmonics`,label:`Roughness zones`,tip:`Number of cosine harmonics shaping the roughness envelope. 1 = one large concentrated patch; 8 = many small scattered zones.`,min:1,max:8,step:1,key:`profileHarmonics`},{id:`coastLakeSmoothThreshMult`,label:`Lake smooth multiplier`,tip:`Smooth-threshold multiplier for lake shores. 1 = same roughness as ocean.`,min:.1,max:5,step:.1,key:`lakeSmoothThreshMult`}],l={Default:{...a},Smooth:{maxDepth:3,baseAmplitude:1,amplitudeDecay:.6,minEdge:1,smoothThreshold:.3,roughnessContrast:2,profileHarmonics:1,lakeSmoothThreshMult:3},Rocky:{maxDepth:4,baseAmplitude:3,amplitudeDecay:.7,minEdge:.5,smoothThreshold:.05,roughnessContrast:.8,profileHarmonics:7,lakeSmoothThreshMult:1.2},Fjords:{maxDepth:4,baseAmplitude:2.8,amplitudeDecay:.92,minEdge:.3,smoothThreshold:.25,roughnessContrast:5,profileHarmonics:2,lakeSmoothThreshMult:2.5},Archipelago:{maxDepth:4,baseAmplitude:1.8,amplitudeDecay:.88,minEdge:.5,smoothThreshold:.18,roughnessContrast:1,profileHarmonics:8,lakeSmoothThreshMult:1.5}},u=`preview_coastline`;function d(){if(customization)return;document.getElementById(`coastlineSettingsDialog`)||document.body.insertAdjacentHTML(`beforeend`,f());for(let{id:e,key:t}of c){let r=n(e),i=n(`${e}Reset`),o=a[t];r.on(`input`,e=>{e.target===e.currentTarget&&(a[t]=r.valueAsNumber,p(),drawFeatures())}),i.on(`click`,()=>{a[t]=o,r.value=String(o),p(),drawFeatures()})}let e=n(`coastEnabled`),t=n(`coastSliders`),r=n(`coastEnabledTrack`),i=n(`coastEnabledThumb`);e.checked=a.enabled;let o=()=>{r.style.background=a.enabled?`#33bb88`:`#bbb`,i.style.left=a.enabled?`18px`:`2px`,t.style.opacity=a.enabled?``:`0.4`,t.style.pointerEvents=a.enabled?``:`none`,Object.keys(l).forEach(e=>{let t=n(`coastPreset_${e}`);t.disabled=!a.enabled})};o(),e.on(`change`,()=>{a.enabled=e.checked,o(),p(),drawFeatures()});for(let e of Object.keys(l))n(`coastPreset_${e}`).on(`click`,()=>{let t=l[e];for(let{id:e,key:r}of c){if(!(r in t))continue;let i=t[r];a[r]=i;let o=n(e);o.value=String(i)}p(),drawFeatures()});p(),closeDialogs(`#culturesEditor, .stable`),$(`#coastlineSettingsDialog`).dialog({title:`Coastline Settings Editor`,resizable:!1,width:`auto`,position:{my:`right top`,at:`right-10 top+10`,of:`svg`}})}function f(){let e=Object.keys(l).map(e=>`<button id="coastPreset_${e}" style="font-size:.78em;padding:2px 8px">${e}</button>`).join(``),t=c.map(({id:e,label:t,tip:n,min:r,max:i,step:o,key:s})=>`
      <tr data-tip="${n}">
        <td style="padding:2px 0;white-space:nowrap">${t}</td>
        <td style="padding:2px 4px">
          <slider-input id="${e}" min="${r}" max="${i}" step="${o}" value="${a[s]}"></slider-input>
        </td>
        <td style="padding:2px 0">
          <button id="${e}Reset" title="Reset to default"
            style="font-size:.75em;padding:1px 5px;cursor:pointer">↺</button>
        </td>
      </tr>`).join(``);return`
    <div id="coastlineSettingsDialog" style="display:none">
      <style>
        #coastlineSettingsDialog slider-input input[type=range] { width:100%; }
      </style>
      <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #ddd">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none" data-tip="Enable or disable coastline fractalization. When disabled, coastlines are simple arcs between feature vertices. Enabling adds naturalistic roughness but can increase rendering time, especially at high detail levels.">
          <input id="coastEnabled" type="checkbox" ${a.enabled?`checked`:``}
            style="position:absolute;opacity:0;pointer-events:none;width:0;height:0"/>
          <span id="coastEnabledTrack" style="position:relative;display:inline-block;width:36px;height:20px;border-radius:10px;background:${a.enabled?`#33bb88`:`#bbb`};cursor:pointer;flex-shrink:0">
            <span id="coastEnabledThumb" style="position:absolute;top:2px;left:${a.enabled?`18px`:`2px`};width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3)"></span>
          </span>
        </label>
        <div style="display:flex;align-items:center;gap:4px">
          <span style="color:#999;font-size:.85em">Preset</span>
          ${e}
        </div>
      </div>
      <div id="coastSliders">
        <table style="border-collapse:collapse;width:100%">
          <colgroup>
            <col style="width:35%">
            <col style="width:60%">
            <col style="width:5%">
          </colgroup>
          <tbody>${t}</tbody>
        </table>
      </div>
      <div style="display:flex;gap:6px;margin-top:10px;align-items:flex-start">
        <div style="flex:1;min-width:0">
          <div style="color:#999;font-size:.85em;margin-bottom:3px">Roughness profile</div>
          <canvas id="coastRoughnessGraph" width="auto" height="100" style="display:block"></canvas>
        </div>
        <div>
          <div style="color:#999;font-size:.85em;margin-bottom:3px">Shape preview</div>
          <canvas id="coastShapePreview" width="100" height="100" style="display:block"></canvas>
        </div>
      </div>
    </div>`}function p(){m(n(`coastRoughnessGraph`)),h(n(`coastShapePreview`))}function m(e){let t=e.width,n=e.height,r=e.getContext(`2d`);r.clearRect(0,0,t,n);let o=i((0,s.default)(u),a.roughnessContrast,a.profileHarmonics),c=n*(1-Math.min(Math.max(a.smoothThreshold,0),1)),l=n,d=[],f=[];for(let e=0;e<=256;e++)d.push(e/256*t),f.push(n*(1-o[e%256]));let p=(e,n,i)=>{let a=n-e;if(!(a<=0)){r.save(),r.beginPath(),r.rect(0,e,t,a),r.clip(),r.beginPath(),r.moveTo(d[0],f[0]);for(let e=1;e<d.length;e++)r.lineTo(d[e],f[e]);r.lineTo(d[d.length-1],l),r.lineTo(d[0],l),r.closePath(),r.fillStyle=i,r.fill(),r.restore()}},m=(e,n,i)=>{let a=n-e;if(!(a<=0)){r.save(),r.beginPath(),r.rect(0,e,t,a),r.clip(),r.beginPath(),r.moveTo(d[0],f[0]);for(let e=1;e<d.length;e++)r.lineTo(d[e],f[e]);r.strokeStyle=i,r.lineWidth=1.5,r.stroke(),r.restore()}};p(0,c,`rgba(210,90,30,0.20)`),m(0,c,`#c85520`),p(c,l,`rgba(30,165,135,0.20)`),m(c,l,`#18a888`),r.save(),r.beginPath(),r.setLineDash([4,3]),r.moveTo(0,c),r.lineTo(t,c),r.strokeStyle=`rgba(30,140,100,0.75)`,r.lineWidth=1,r.stroke(),r.setLineDash([]),r.restore(),r.font=`bold 8px sans-serif`,r.textAlign=`left`,c>12&&(r.fillStyle=`#c85520`,r.fillText(`ROUGH`,12,11)),l-c>10&&(r.fillStyle=`#18a888`,r.fillText(`CALM`,12,l-4)),a.enabled||(r.fillStyle=`rgba(0,0,0,0.38)`,r.fillRect(0,0,t,n),r.fillStyle=`#fff`)}function h(e){let t=e.width,n=e.height,i=e.getContext(`2d`);i.clearRect(0,0,t,n);let c=t/2,l=n/2,d=Math.min(t,n)*.34,f=[[c,l-d],[c+d,l],[c,l+d],[c-d,l]],p=a.enabled?o(f,(0,s.default)(u),a):{points:f,origIndices:[0,1,2,3]},m=new Path2D(`${r(p)}Z`),h=i.createRadialGradient(c,l,0,c,l,Math.max(t,n)*.85);h.addColorStop(0,`#cce5f5`),h.addColorStop(1,`#6aa4cb`),i.fillStyle=h,i.fillRect(0,0,t,n);let g=i.createRadialGradient(c-d*.1,l-d*.1,d*.05,c,l,d*1.1);g.addColorStop(0,`#d8c87a`),g.addColorStop(.5,`#9cbc60`),g.addColorStop(1,`#5c8e40`),i.save(),i.shadowColor=`rgba(0,20,60,0.35)`,i.shadowBlur=8,i.shadowOffsetX=3,i.shadowOffsetY=3,i.fillStyle=g,i.fill(m),i.restore(),i.strokeStyle=`#5c4526`,i.lineWidth=1.5,i.stroke(m);let _=p.origIndices.map(e=>p.points[e]);i.beginPath();for(let e=0;e<_.length;e++){let[t,n]=_[e];e===0?i.moveTo(t,n):i.lineTo(t,n)}i.closePath(),i.strokeStyle=`rgba(255,255,255,0.45)`,i.lineWidth=.8,i.setLineDash([3,3]),i.stroke(),i.setLineDash([]);for(let[e,t]of _)i.beginPath(),i.arc(e,t,2.5,0,Math.PI*2),i.fillStyle=`rgba(255,255,255,0.85)`,i.fill(),i.strokeStyle=`rgba(60,40,10,0.55)`,i.lineWidth=.8,i.stroke();a.enabled||(i.fillStyle=`rgba(0,0,0,0.38)`,i.fillRect(0,0,t,n),i.fillStyle=`#fff`,i.font=`bold 11px sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillText(`OFF`,c,l),i.textBaseline=`alphabetic`,i.textAlign=`left`)}var g={open:d};export{g as CoastlineEditor};