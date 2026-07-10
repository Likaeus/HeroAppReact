import{Ct as e,Dt as t,Et as n,Jt as r,Ut as i,Wt as a,Yt as o,ht as s,i as c,k as l,m as u,n as d,qt as f,t as p,wt as m}from"./utils-B2UIqRdZ.js";import{n as h,r as ee}from"./axis-I8_pxNLd.js";import{t as g}from"./nodeUtils-5yXISZ7m.js";import{D as _,O as v,T as y}from"./index-B7kIDgkV.js";var b=class extends Map{constructor(e,t=w){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),e!=null)for(let[t,n]of e)this.set(t,n)}get(e){return super.get(x(this,e))}has(e){return super.has(x(this,e))}set(e,t){return super.set(S(this,e),t)}delete(e){return super.delete(C(this,e))}};function x({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):n}function S({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function C({_intern:e,_key:t},n){let r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function w(e){return typeof e==`object`&&e?e.valueOf():e}function T(e,t,...n){return E(e,Array.from,t,n)}function E(e,t,n,r){return(function e(i,a){if(a>=r.length)return n(i);let o=new b,s=r[a++],c=-1;for(let e of i){let t=s(e,++c,i),n=o.get(t);n?n.push(e):o.set(t,[e])}for(let[t,n]of o)o.set(t,e(n,a));return t(o)})(e,0)}function D(e){return i(a(e).call(document.documentElement))}var O=Symbol(`implicit`);function k(){var e=new b,n=[],r=[],i=O;function a(t){let a=e.get(t);if(a===void 0){if(i!==O)return i;e.set(t,a=n.push(t)-1)}return r[a%r.length]}return a.domain=function(t){if(!arguments.length)return n.slice();n=[],e=new b;for(let r of t)e.has(r)||e.set(r,n.push(r)-1);return a},a.range=function(e){return arguments.length?(r=Array.from(e),a):r.slice()},a.unknown=function(e){return arguments.length?(i=e,a):i},a.copy=function(){return k(n,r).unknown(i)},t.apply(a,arguments),a}function A(){var e=k().unknown(void 0),n=e.domain,r=e.range,i=0,a=1,o,s,c=!1,l=0,u=0,d=.5;delete e.unknown;function p(){var e=n().length,t=a<i,p=t?a:i,m=t?i:a;o=(m-p)/Math.max(1,e-l+u*2),c&&(o=Math.floor(o)),p+=(m-p-o*(e-l))*d,s=o*(1-l),c&&(p=Math.round(p),s=Math.round(s));var h=f(e).map(function(e){return p+o*e});return r(t?h.reverse():h)}return e.domain=function(e){return arguments.length?(n(e),p()):n()},e.range=function(e){return arguments.length?([i,a]=e,i=+i,a=+a,p()):[i,a]},e.rangeRound=function(e){return[i,a]=e,i=+i,a=+a,c=!0,p()},e.bandwidth=function(){return s},e.step=function(){return o},e.round=function(e){return arguments.length?(c=!!e,p()):c},e.padding=function(e){return arguments.length?(l=Math.min(1,u=+e),p()):l},e.paddingInner=function(e){return arguments.length?(l=Math.min(1,e),p()):l},e.paddingOuter=function(e){return arguments.length?(u=+e,p()):u},e.align=function(e){return arguments.length?(d=Math.max(0,Math.min(1,e)),p()):d},e.copy=function(){return A(n(),[i,a]).round(c).paddingInner(l).paddingOuter(u).align(d)},t.apply(p(),arguments)}function j(e,t){if((o=e.length)>1)for(var n=1,r,i,a=e[t[0]],o,s=a.length;n<o;++n)for(i=a,a=e[t[n]],r=0;r<s;++r)a[r][1]+=a[r][0]=isNaN(i[r][1])?i[r][0]:i[r][1]}function M(e){for(var t=e.length,n=Array(t);--t>=0;)n[t]=t;return n}function N(e,t){return e[t]}function P(e){let t=[];return t.key=e,t}function te(){var t=m([]),n=M,r=j,i=N;function a(a){var o=Array.from(t.apply(this,arguments),P),s,c=o.length,l=-1,u;for(let e of a)for(s=0,++l;s<c;++s)(o[s][l]=[0,+i(e,o[s].key,l,a)]).data=e;for(s=0,u=e(n(o));s<c;++s)o[u[s]].index=s;return r(o,u),o}return a.keys=function(e){return arguments.length?(t=typeof e==`function`?e:m(Array.from(e)),a):t},a.value=function(e){return arguments.length?(i=typeof e==`function`?e:m(+e),a):i},a.order=function(e){return arguments.length?(n=e==null?M:typeof e==`function`?e:m(Array.from(e)),a):n},a.offset=function(e){return arguments.length?(r=e??j,a):r},a}function F(e,t){if((r=e.length)>0){for(var n,r,i=0,a=e[0].length,o;i<a;++i){for(o=n=0;n<r;++n)o+=e[n][i][1]||0;if(o)for(n=0;n<r;++n)e[n][i][1]/=o}j(e,t)}}function ne(e,t){if((c=e.length)>0)for(var n,r=0,i,a,o,s,c,l=e[t[0]].length;r<l;++r)for(o=s=0,n=0;n<c;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=o,i[1]=o+=a):a<0?(i[1]=s,i[0]=s+=a):(i[0]=0,i[1]=a)}var I={states:{label:`State`,getId:e=>pack.cells.state[e],getName:Z(`states`),getColors:Q(`states`),landOnly:!0},cultures:{label:`Culture`,getId:e=>pack.cells.culture[e],getName:Z(`cultures`),getColors:Q(`cultures`),landOnly:!0},religions:{label:`Religion`,getId:e=>pack.cells.religion[e],getName:Z(`religions`),getColors:Q(`religions`),landOnly:!0},provinces:{label:`Province`,getId:e=>pack.cells.province[e],getName:Z(`provinces`),getColors:Q(`provinces`),landOnly:!0},biomes:{label:`Biome`,getId:e=>pack.cells.biome[e],getName:me,getColors:he,landOnly:!1},markets:{label:`Market`,getId:e=>pack.cells.market[e],getName:ge,getColors:_e,landOnly:!1},goods:{label:`Good`,requires:`good`,getId:(e,t)=>t.good,getName:ve,getColors:ye,landOnly:!1}},L={total_population:{label:`Total population`,quantize:e=>xe(e)+Se(e),aggregate:e=>s(y(e)),formatTicks:e=>c(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},urban_population:{label:`Urban population`,quantize:xe,aggregate:e=>s(y(e)),formatTicks:e=>c(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},rural_population:{label:`Rural population`,quantize:Se,aggregate:e=>s(y(e)),formatTicks:e=>c(e),stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},area:{label:`Land area`,quantize:e=>getArea(pack.cells.area[e]),aggregate:e=>s(y(e)),formatTicks:e=>`${c(e)} ${getAreaUnit()}`,stringify:e=>`${e.toLocaleString()} ${getAreaUnit()}`,stackable:!0,landOnly:!0},cells:{label:`Cells`,hint:`Number of land cells`,quantize:()=>1,aggregate:e=>y(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},burgs_number:{label:`Burgs`,hint:`Number of burgs`,quantize:e=>+!!pack.cells.burg[e],aggregate:e=>y(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},average_elevation:{label:`Average elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>_(e),formatTicks:e=>getHeight(e),stringify:e=>getHeight(e),stackable:!1,landOnly:!1},max_elevation:{label:`Maximum mean elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>o(e),formatTicks:e=>getHeight(e),stringify:e=>getHeight(e),stackable:!1,landOnly:!1},min_elevation:{label:`Minimum mean elevation`,quantize:e=>pack.cells.h[e],aggregate:e=>r(e),formatTicks:e=>getHeight(e),stringify:e=>getHeight(e),stackable:!1,landOnly:!1},average_temperature:{label:`Annual mean temperature`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>_(e),formatTicks:e=>p(e),stringify:e=>p(e),stackable:!1,landOnly:!1},max_temperature:{label:`Annual max temperature`,hint:`Highest mean temperature of the year`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>o(e),formatTicks:e=>p(e),stringify:e=>p(e),stackable:!1,landOnly:!1},min_temperature:{label:`Annual min temperature`,hint:`Lowest mean temperature of the year`,quantize:e=>grid.cells.temp[pack.cells.g[e]],aggregate:e=>r(e),formatTicks:e=>p(e),stringify:e=>p(e),stackable:!1,landOnly:!1},average_precipitation:{label:`Annual mean precipitation`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>s(_(e)),formatTicks:e=>getPrecipitation(s(e)),stringify:e=>getPrecipitation(s(e)),stackable:!1,landOnly:!0},max_precipitation:{label:`Annual max precipitation`,hint:`Highest mean precipitation of the year`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>s(o(e)),formatTicks:e=>getPrecipitation(s(e)),stringify:e=>getPrecipitation(s(e)),stackable:!1,landOnly:!0},min_precipitation:{label:`Annual min precipitation`,hint:`Lowest mean precipitation of the year`,quantize:e=>grid.cells.prec[pack.cells.g[e]],aggregate:e=>s(r(e)),formatTicks:e=>getPrecipitation(s(e)),stringify:e=>getPrecipitation(s(e)),stackable:!1,landOnly:!0},coastal_cells:{label:`Number of coastal cells`,quantize:e=>+(pack.cells.t[e]===1),aggregate:e=>y(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},river_cells:{label:`Number of river cells`,quantize:e=>+!!pack.cells.r[e],aggregate:e=>y(e),formatTicks:e=>e,stringify:e=>e.toLocaleString(),stackable:!0,landOnly:!0},production_value:{label:`Production value`,hint:`Worth of produced goods`,provides:[`good`],prepare:()=>({biomeProduction:Goods.getBiomesProduction()}),getContributions:(e,{biomeProduction:t})=>{let n=be(e,t),r=[];for(let[e,t]of Object.entries(n)){let n=Goods.get(+e);n&&r.push({good:+e,value:t*n.value})}return r},aggregate:e=>s(y(e)),formatTicks:e=>c(e),stringify:e=>d(e),stackable:!0,landOnly:!0},production_units:{label:`Production volume`,hint:`Units of goods produced`,provides:[`good`],prepare:()=>({biomeProduction:Goods.getBiomesProduction()}),getContributions:(e,{biomeProduction:t})=>{let n=be(e,t),r=[];for(let[e,t]of Object.entries(n))r.push({good:+e,value:t});return r},aggregate:e=>s(y(e)),formatTicks:e=>c(e),stringify:e=>`${e.toLocaleString()} units`,stackable:!0,landOnly:!0},burgs_profit:{label:`Burgs profit`,hint:`Burgs profit from trade and manufacturing`,quantize:e=>{let t=pack.cells.burg[e];return t&&pack.burgs[t].product||0},aggregate:e=>s(y(e)),formatTicks:e=>c(e),stringify:e=>d(e),stackable:!0,landOnly:!0}},R={stackedBar:{offset:ne},normalizedStackedBar:{offset:F,formatX:e=>`${s(e*100)}%`}},z=[],B,V=!1;function H(){if(V||=(re(),ie(),ae(),K(),U(),!0),closeDialogs(`#chartsOverview, .stable`),B!==mapId&&(z=[],B=mapId),!z.length)W();else for(let e of z)G(e);$(`#chartsOverview`).dialog({title:`Data Charts`,width:`60vw`,height:`auto`,position:{my:`center`,at:`center`,of:`svg`},close:ce})}function re(){let e=document.createElement(`style`);e.textContent=`
    #chartsOverview {
      max-width: 90vw !important;
      max-height: 90vh !important;
      overflow: hidden;
      display: grid;
      grid-template-rows: auto 1fr;
    }

    #chartsOverview__form {
      display: grid;
      font-size: 1.1em;
      margin: 0.3em 0;
    }

    #chartsOverview__form > div:first-child {
      display: flex;
      align-items: center;
      gap: 0.2em;
    }

    #chartsOverview__form > div:nth-child(2) {
      display: flex;
      align-items: center;
      gap: 1em;
    }

    #chartsOverview__form label {
      display: inline-flex;
      align-items: center;
    }

    #chartsOverview__charts {
      overflow: auto;
      scroll-behavior: smooth;
      display: grid;
    }

    #chartsOverview__charts figure {
      margin: 0;
      padding: 0.6em 0 1em;
      border-top: 1px solid rgba(128, 128, 128, 0.4);
    }

    #chartsOverview__charts figcaption {
      font-size: 1.2em;
      margin: 0 1% 0.4em 4%;
      display: grid;
      align-items: center;
      grid-template-columns: 1fr auto;
    }

    #chartsOverview__plotByInfo {
      margin-left: 0.3em;
      cursor: help;
      opacity: 0.6;
    }
  `,document.head.appendChild(e)}function ie(){let e=Object.entries(I).map(([e,{label:t}])=>[e,t]),t=Object.entries(L).map(([e,{label:t}])=>[e,t]),n=([e,t])=>`<option value="${e}">${t}</option>`,r=e=>e.map(n).join(``),i=`<div id="chartsOverview" class="dialog stable">
    <form id="chartsOverview__form">
      <div>
        <button data-tip="Add a chart" type="submit">Plot</button>

        <select data-tip="Select entity (y axis)" id="chartsOverview__entitiesSelect">
          ${r(e)}
        </select>

        <label for="chartsOverview__plotBySelect" data-tip="Select metric to plot (x axis)">
          <span>by</span>
          <select id="chartsOverview__plotBySelect">
            ${r(t)}
          </select>
          <i id="chartsOverview__plotByInfo" class="icon-info-circled" style="display: none"></i>
        </label>

        <label for="chartsOverview__groupBySelect" data-tip="Select entity to group by. If you don't need grouping, set it the same as the entity">
          <span>grouped by</span>
          <select id="chartsOverview__groupBySelect">
            ${r(e)}
          </select>
        </label>

        <label data-tip="Sorting type" for="chartsOverview__sortingSelect">
          <span>sorted</span>
          <select id="chartsOverview__sortingSelect">
            <option value="value">by value</option>
            <option value="name">by name</option>
            <option value="natural">naturally</option>
          </select>
        </label>
      </div>

      <div>
        <label data-tip="Select chart type" for="chartsOverview__chartType">
          <span>Type</span>
          <select id="chartsOverview__chartType">
            <option value="stackedBar" selected>Stacked Bar</option>
            <option value="normalizedStackedBar">Normalized Bar</option>
          </select>
        </label>

        <label data-tip="Show the charts in 1, 2, 3 or 4 columns" for="chartsOverview__viewColumns">
          <span>Columns</span>
          <select id="chartsOverview__viewColumns">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>

        <label data-tip="Exclude zero element from the results (id 0, e.g. the neutral state)" for="chartsOverview__excludeNeutral">
          <input id="chartsOverview__excludeNeutral" type="checkbox" class="native" />
          <span>Exclude neutral</span>
        </label>
      </div>
    </form>

    <section id="chartsOverview__charts"></section>
  </div>`;g(`dialogs`).insertAdjacentHTML(`beforeend`,i),g(`chartsOverview__entitiesSelect`).value=`states`,g(`chartsOverview__plotBySelect`).value=`total_population`,g(`chartsOverview__groupBySelect`).value=`cultures`}function ae(){g(`chartsOverview__form`).on(`submit`,W),g(`chartsOverview__viewColumns`).on(`change`,K),g(`chartsOverview__plotBySelect`).on(`change`,U)}function U(){let e=g(`chartsOverview__plotBySelect`).value,t=g(`chartsOverview__plotByInfo`),{hint:n}=L[e];n?(t.dataset.tip=n,t.style.display=``):t.style.display=`none`}function W(e){e&&e.preventDefault();let t=g(`chartsOverview__entitiesSelect`).value,n=g(`chartsOverview__plotBySelect`).value,r=g(`chartsOverview__groupBySelect`).value,i=g(`chartsOverview__sortingSelect`).value,a=g(`chartsOverview__chartType`).value,o=g(`chartsOverview__excludeNeutral`).checked,{label:s,stackable:c,provides:l=[]}=L[n],u=[t,r].find(e=>{let t=I[e].requires;return t?!l.includes(t):!1});if(u){tip(`${s} cannot be broken down by ${I[u].label.toLowerCase()}`,!1,`error`,4e3);return}!c&&r!==t&&(tip(`Grouping is not supported for ${n}`,!1,`warn`,4e3),r=t);let d={id:Date.now(),entity:t,plotBy:n,groupBy:r,sorting:i,type:a,excludeNeutral:o};z.push(d),G(d),q()}function G({id:e,entity:t,plotBy:n,groupBy:r,sorting:i,type:a,excludeNeutral:o}){let{label:c,stringify:d,quantize:f,getContributions:p,prepare:m,aggregate:h,formatTicks:ee,landOnly:_}=L[n],v=r===t,{label:y,getName:b,getId:x,landOnly:S}=I[t],{label:C,getName:w,getId:T,getColors:E}=I[r],D=m?m():void 0,O=p?e=>p(e,D):e=>[{value:f(e)}],k=`${u(t)} by ${c}${v?``:` grouped by ${C}`}`,A=(e,t,n,r)=>{let i=`${y}: ${e}`,a=v?``:`${C}: ${t}`,o=`${c}: ${d(n)}`;return v||(o+=` (${s(r*100)}%)`),[i,a,o].filter(Boolean)},j={},M=new Set;for(let e of pack.cells.i)if(!((S||_)&&l(e,pack)))for(let t of O(e)){let n=x(e,t),r=T(e,t);if(o&&(n===0||r===0))continue;let{value:i}=t;j[n]?j[n][r]?j[n][r].push(i):j[n][r]=[i]:j[n]={[r]:[i]},M.add(r)}let N=Ce(Object.entries(j).flatMap(([e,t])=>{let n=b(e);return Object.entries(t).map(([e,t])=>({name:n,group:w(e),value:h(t)}))}),i),P=E(),{offset:te,formatX:F=ee}=R[a];se(e,N,oe(N,{colors:P,tooltip:A,offset:te,formatX:F}),k),g(`chartsOverview__charts`).lastElementChild?.scrollIntoView()}function oe(e,{colors:t,tooltip:r,offset:i,formatX:a}){let o=e.map(e=>e.value),s=e.map(e=>e.name),c=e.map(e=>e.group),l=new Set(s),u=new Set(c),d=f(o.length).filter(e=>l.has(s[e])&&u.has(c[e])),p=Array.from(l),m=Array.from(u),g=fe(p),_=pe(m,X-g-15),b={top:30,right:15,bottom:_*20+10,left:g},x=[b.left,X-b.right],S=l.size*25+b.top+b.bottom,C=[S-b.bottom,b.top],w=T(d,([e])=>e,e=>s[e],e=>c[e]),E=te().keys(m).value(([,e],t)=>o[new Map(e).get(t)]).order(M).offset(i)(w).map(e=>{let t=e.filter(e=>!Number.isNaN(e[1])).map(t=>Object.assign(t,{i:new Map(t.data[1]).get(e.key)}));return{key:e.key,data:t}}),O=n(v(E.flatMap(e=>e.data.flatMap(e=>[e[0],e[1]]))),x),k=A(p,C).paddingInner(le),j=ee(O).ticks(X/80,null),N=h(k).tickSizeOuter(0),P=D(`svg`).attr(`version`,`1.1`).attr(`xmlns`,`http://www.w3.org/2000/svg`).attr(`viewBox`,`0 0 ${X} ${S}`).attr(`style`,`max-width: 100%; height: auto; height: intrinsic;`);P.append(`g`).attr(`transform`,`translate(0,${b.top})`).call(j).call(e=>e.select(`.domain`).remove()).call(e=>e.selectAll(`text`).text(e=>a(e))).call(e=>e.selectAll(`.tick line`).clone().attr(`y2`,S-b.top-b.bottom).attr(`stroke-opacity`,.1));let F=P.append(`g`).attr(`stroke`,`#666`).attr(`stroke-width`,.5).selectAll(`g`).data(E).join(`g`).attr(`fill`,e=>t[e.key]).selectAll(`rect`).data(e=>e.data.filter(([e,t])=>e!==t)).join(`rect`).attr(`x`,([e,t])=>Math.min(O(e),O(t))).attr(`y`,({i:e})=>k(s[e])).attr(`width`,([e,t])=>Math.abs(O(e)-O(t))).attr(`height`,k.bandwidth()),ne=Object.fromEntries(T(d,e=>y(e,e=>o[e]),e=>s[e])),I=({i:e})=>r(s[e],c[e],o[e],o[e]/ne[s[e]]);F.append(`title`).text(e=>I(e).join(`\r
`)),F.on(`mouseover`,(e,t)=>tip(I(t).join(`. `))),P.append(`g`).attr(`transform`,`translate(${O(0)},0)`).call(N);let L=Math.ceil(m.length/_),R=X/(L+.5),z=(e,t)=>t%L*R,B=(e,t)=>z(e,t)+de,V=(e,t)=>Math.floor(t/L)*20,H=P.append(`g`).attr(`stroke`,`#666`).attr(`stroke-width`,.5).attr(`dominant-baseline`,`central`).attr(`transform`,`translate(${b.left},${S-b.bottom+15})`);return H.selectAll(`circle`).data(m).join(`rect`).attr(`x`,z).attr(`y`,V).attr(`width`,10).attr(`height`,10).attr(`transform`,`translate(-5, -5)`).attr(`fill`,e=>t[e]),H.selectAll(`text`).data(m).join(`text`).attr(`x`,B).attr(`y`,V).text(e=>e),P.node()}function se(e,t,n,r){let i=g(`chartsOverview__charts`),a=document.createElement(`figure`),o=document.createElement(`figcaption`);o.innerHTML=`
    <div>
      <strong>Figure ${i.childElementCount+1}</strong>. ${r}
    </div>
    <div>
      <button data-tip="Download chart data as a text file (.csv)" class="icon-download"></button>
      <button data-tip="Download the chart as a PNG image" class="icon-export"></button>
      <button data-tip="Download the chart in SVG format (vector, opens in a browser or Inkscape)" class="icon-chart-bar"></button>
      <button data-tip="Remove the chart" class="icon-trash"></button>
    </div>
  `,a.appendChild(o),a.appendChild(n),i.appendChild(a),a.querySelector(`button.icon-download`)?.on(`click`,()=>{let e=`${getFileName(r)}.csv`,n=t.map(({name:e,group:t,value:n})=>`${e},${t},${n}`).join(`
`);downloadFile(`Name,Group,Value
`+n,e)}),a.querySelector(`button.icon-export`)?.on(`click`,()=>{let{width:e,height:t}=n.viewBox.baseVal,i=n.cloneNode(!0);i.setAttribute(`width`,String(e)),i.setAttribute(`height`,String(t));let a=new XMLSerializer().serializeToString(i),o=URL.createObjectURL(new Blob([a],{type:`image/svg+xml;charset=utf-8`})),s=new Image;s.onload=()=>{let n=document.createElement(`canvas`);n.width=e*2,n.height=t*2;let i=n.getContext(`2d`);i&&(i.fillStyle=`#fff`,i.fillRect(0,0,n.width,n.height),i.drawImage(s,0,0,n.width,n.height),n.toBlob(e=>e&&downloadFile(e,`${getFileName(r)}.png`,`image/png`))),URL.revokeObjectURL(o)},s.src=o}),a.querySelector(`button.icon-chart-bar`)?.on(`click`,()=>{let e=`${getFileName(r)}.svg`;downloadFile(n.outerHTML,e)}),a.querySelector(`button.icon-trash`)?.on(`click`,()=>{a.remove(),z=z.filter(t=>t.id!==e),q()})}function K(){let e=g(`chartsOverview__viewColumns`).value,t=g(`chartsOverview__charts`);t.style.gridTemplateColumns=`repeat(${e}, 1fr)`,q()}function q(){$(`#chartsOverview`).dialog({position:{my:`center`,at:`center`,of:`svg`}})}function ce(){let e=g(`chartsOverview__charts`);e.innerHTML=``,$(`#chartsOverview`).dialog(`destroy`)}var J=`#ccc`,Y=`no`,X=800,le=.2,ue=7,de=10;function fe(e){return o(e.map(e=>e.length))*ue}function pe(e,t){if(!e.length)return 0;let n=de+fe(e),r=Math.max(1,Math.floor(t/n));return Math.ceil(e.length/r)}function Z(e){return t=>pack[e][+t]?.name||Y}function Q(e){return()=>Object.fromEntries(pack[e].map(e=>[e.name||Y,e.color||J]))}function me(e){return biomesData.name[+e]||Y}function he(){return Object.fromEntries(biomesData.i.map(e=>[biomesData.name[e],biomesData.color[e]]))}function ge(e){let t=Markets.get(+e);return t?t.name||pack.burgs[t.centerBurgId]?.name||`Market ${t.i}`:Y}function _e(){return Object.fromEntries((pack.markets||[]).map(e=>[ge(e.i),e.color||J]))}function ve(e){return Goods.get(+e)?.name||Y}function ye(){return Object.fromEntries((pack.goods||[]).map(e=>[e.name||Y,e.color||J]))}function be(e,t){let n=Production.getCellProduction(e,t),r=pack.cells.burg[e];if(r){let e=Production.getBurgProduction(pack.burgs[r]);for(let[t,r]of Object.entries(e))n[+t]=(n[+t]||0)+r}return n}function xe(e){let t=pack.cells.burg[e];return t?(pack.burgs[t].population||0)*populationRate*urbanization:0}function Se(e){return pack.cells.pop[e]*populationRate}function Ce(e,t){if(t===`natural`)return e;if(t===`name`)return e.sort((e,t)=>e.name===t.name?e.group.localeCompare(t.group):t.name.localeCompare(e.name));if(t===`value`){let t={},n={};for(let{name:r,group:i,value:a}of e)t[r]=(t[r]||0)+a,n[i]=(n[i]||0)+a;return e.sort((e,r)=>e.name===r.name?n[r.group]-n[e.group]:t[e.name]-t[r.name])}return e}var we={open:H};export{we as ChartsOverview};