import{Ut as e,gt as t,pt as n}from"./utils-B2UIqRdZ.js";import{t as r}from"./drag-D017NiMT.js";import{r as i,t as a}from"./stratify-hs75pSAd.js";import{t as o}from"./nodeUtils-5yXISZ7m.js";import{D as s}from"./index-C9o7LuyJ.js";function c(e,t){return e.parent===t.parent?1:2}function l(e){var t=e.children;return t?t[0]:e.t}function u(e){var t=e.children;return t?t[t.length-1]:e.t}function d(e,t,n){var r=n/(t.i-e.i);t.c-=r,t.s+=n,e.c+=r,t.z+=n,t.m+=n}function f(e){for(var t=0,n=0,r=e.children,i=r.length,a;--i>=0;)a=r[i],a.z+=t,a.m+=t,t+=a.s+(n+=a.c)}function p(e,t,n){return e.a.parent===t.parent?e.a:n}function m(e,t){this._=e,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=t}m.prototype=Object.create(i.prototype);function h(e){for(var t=new m(e,0),n,r=[t],i,a,o,s;n=r.pop();)if(a=n._.children)for(n.children=Array(s=a.length),o=s-1;o>=0;--o)r.push(i=n.children[o]=new m(a[o],o)),i.parent=n;return(t.parent=new m(null,0)).children=[t],t}function g(){var e=c,t=1,n=1,r=null;function i(i){var s=h(i);if(s.eachAfter(a),s.parent.m=-s.z,s.eachBefore(o),r)i.eachBefore(m);else{var c=i,l=i,u=i;i.eachBefore(function(e){e.x<c.x&&(c=e),e.x>l.x&&(l=e),e.depth>u.depth&&(u=e)});var d=c===l?1:e(c,l)/2,f=d-c.x,p=t/(l.x+d+f),g=n/(u.depth||1);i.eachBefore(function(e){e.x=(e.x+f)*p,e.y=e.depth*g})}return i}function a(t){var n=t.children,r=t.parent.children,i=t.i?r[t.i-1]:null;if(n){f(t);var a=(n[0].z+n[n.length-1].z)/2;i?(t.z=i.z+e(t._,i._),t.m=t.z-a):t.z=a}else i&&(t.z=i.z+e(t._,i._));t.parent.A=s(t,i,t.parent.A||r[0])}function o(e){e._.x=e.z+e.parent.m,e.m+=e.parent.m}function s(t,n,r){if(n){for(var i=t,a=t,o=n,s=i.parent.children[0],c=i.m,f=a.m,m=o.m,h=s.m,g;o=u(o),i=l(i),o&&i;)s=l(s),a=u(a),a.a=t,g=o.z+m-i.z-c+e(o._,i._),g>0&&(d(p(o,t,r),t,g),c+=g,f+=g),m+=o.m,c+=i.m,h+=s.m,f+=a.m;o&&!u(a)&&(a.t=o,a.m+=m-f),i&&!l(s)&&(s.t=i,s.m+=c-h,r=t)}return r}function m(e){e.x*=t,e.y=e.depth*n}return i.separation=function(t){return arguments.length?(e=t,i):e},i.size=function(e){return arguments.length?(r=!1,t=+e[0],n=+e[1],i):r?null:[t,n]},i.nodeSize=function(e){return arguments.length?(r=!0,t=+e[0],n=+e[1],i):r?[t,n]:null},i}N(),P();var _={top:10,right:10,bottom:-5,left:10},v=t().scaleExtent([.2,1.5]).on(`zoom`,e=>x.attr(`transform`,e.transform.toString())),y,b=e(`#hierarchyTree > svg`).call(v),x=b.select(`g#hierarchyTree_viewbox`),S=x.select(`g#hierarchyTree_linksPrimary`),C=x.select(`g#hierarchyTree_linksSecondary`),w=x.select(`g#hierarchyTree_nodes`),T=x.select(`path#hierarchyTree_dragLine`),E,D,O,k,A,j;function M(e){if(closeDialogs(`#hierarchyTree, .stable`),E=e.data,D=F(E),D.length<3){tip(`Not enough ${e.type} to show hierarchy`,!1,`error`);return}O=e.onNodeEnter,k=e.onNodeLeave,A=e.getDescription,j=e.getShape;let t=I();if(!t)return;let r=t.leaves().length*50,i=t.height*50,a=r-_.left-_.right,o=i+30-_.top-_.bottom,s=g().size([a,o]),c=n(r,300,innerWidth*.75),l=n(i,200,innerHeight*.75);v.extent([[0,0],[c,l]]),b.attr(`viewBox`,`0, 0, ${c}, ${l}`),$(`#hierarchyTree`).dialog({title:`${capitalize(e.type)} tree`,position:{my:`left center`,at:`left+10 center`,of:`svg`},width:c}),U(t,s)}function N(){let e=document.createElement(`style`);e.textContent=`
    #hierarchyTree_selectedOrigins > button {
      margin: 0 2px;
    }

    #hierarchyTree {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #hierarchyTree > svg {
      height: 100%;
    }

    .hierarchyTree_selectedOrigins {
      margin-right: 15px;
    }

    .hierarchyTree_selectedOrigin {
      border: 1px solid #aaa;
      background: none;
      padding: 1px 4px;
    }

    .hierarchyTree_selectedOrigin:hover {
      border: 1px solid #333;
    }

    .hierarchyTree_selectedOrigin::after {
      content: "✕";
      margin-left: 8px;
      color: #999;
    }

    .hierarchyTree_selectedOrigin:hover:after {
      color: #333;
    }

    #hierarchyTree_originSelector {
      display: none;
    }

    #hierarchyTree_originSelector > form > div {
      padding: 0.3em;
      margin: 1px 0;
      border-radius: 1em;
    }

    #hierarchyTree_originSelector > form > div:hover {
      background-color: #ddd;
    }

    #hierarchyTree_originSelector > form > div[checked] {
      background-color: #c6d6d6;
    }

    #hierarchyTree_nodes > g > text {
      pointer-events: none;
      stroke: none;
      font-size: 11px;
    }

    #hierarchyTree_nodes > g.selected {
      stroke: #c13119;
      stroke-width: 1;
      cursor: move;
    }

    #hierarchyTree_dragLine {
      marker-end: url(#end-arrow);
      stroke: #333333;
      stroke-dasharray: 5;
      stroke-dashoffset: 1000;
      animation: dash 80s linear backwards;
    }
  `,document.head.appendChild(e)}function P(){o(`dialogs`).insertAdjacentHTML(`beforeend`,`<div id="hierarchyTree" class="dialog" style="overflow: hidden;">
    <svg>
      <g id="hierarchyTree_viewbox" style="text-anchor: middle; dominant-baseline: central">
        <g transform="translate(10, -45)">
          <g id="hierarchyTree_links" fill="none" stroke="#aaa">
            <g id="hierarchyTree_linksPrimary"></g>
            <g id="hierarchyTree_linksSecondary" stroke-dasharray="1"></g>
          </g>
          <g id="hierarchyTree_nodes"></g>
          <path id="hierarchyTree_dragLine" path='' />
        </g>
      </g>
    </svg>

    <div id="hierarchyTree_details" class='chartInfo'>
      <div id='hierarchyTree_infoLine' style="display: block">&#8205;</div>
      <div id='hierarchyTree_selected' style="display: none">
        <span><span id='hierarchyTree_selectedName'></span>. </span>
        <span data-name="Type short name (abbreviation)">Abbreviation: <input id='hierarchyTree_selectedCode' type='text' maxlength='3' size='3' /></span>
        <span>Origins: <span id='hierarchyTree_selectedOrigins'></span></span>
        <button data-tip='Edit this node's origins' class="hierarchyTree_selectedButton" id='hierarchyTree_selectedSelectButton'>Edit</button>
        <button data-tip='Unselect this node' class="hierarchyTree_selectedButton" id='hierarchyTree_selectedCloseButton'>Unselect</button>
      </div>
    </div>
    <div id="hierarchyTree_originSelector"></div>
  </div>`)}function F(e){let t=e.filter(e=>!e.removed);return t.map(e=>(e.i===0?e.origins=[null]:e.origins.length&&t.find(t=>e.origins[0]===t.i)||(e.origins=[0]),e))}function I(){try{let e=a().id(e=>String(e.i)).parentId(e=>e.origins[0]==null?null:String(e.origins[0]))(D);return y=e,e}catch(e){return tip(`Hierarchy data issue. ${e}`,!1,`error`,6e3),y}}function L(e){return`${e.source.id}-${e.target.id}`}function R(e){return e.id}function z(e){let{source:{x:t,y:n},target:{x:r,y:i}}=e;return`M${t},${n} C${t},${(n*3+i)/4} ${r},${(n*2+i)/3} ${r},${i}`}function B(e){let t=e.descendants(),n=[];for(let e of t){let r=e.data.origins;for(let i=1;i<r.length;i++){let a=t.find(e=>e.data.i===r[i]);a&&n.push({source:a,target:e})}}return n}var V={undefined:`M5,0A5,5,0,1,1,-5,0A5,5,0,1,1,5,0`,circle:`M11.3,0A11.3,11.3,0,1,1,-11.3,0A11.3,11.3,0,1,1,11.3,0`,square:`M-11,-11h22v22h-22Z`,hexagon:`M-6.5,-11.26l13,0l6.5,11.26l-6.5,11.26l-13,0l-6.5,-11.26Z`,diamond:`M0,-14L14,0L0,14L-14,0Z`,concave:`M-11,-11l11,2l11,-2l-2,11l2,11l-11,-2l-11,2l2,-11Z`,octagon:`M-4.97,-12.01 l9.95,0 l7.04,7.04 l0,9.95 l-7.04,7.04 l-9.95,0 l-7.04,-7.04 l0,-9.95Z`,pentagon:`M0,-14l14,11l-6,14h-16l-6,-14Z`},H=e=>{let t=e.descendants().flatMap(({data:e})=>e.origins.slice(1));return t.length===0?e.data.i:s(t)??0};function U(e,t){t(e.sort((e,t)=>H(e)-H(t))),S.selectAll(`path`).data(e.links(),L).join(`path`).attr(`d`,z),C.selectAll(`path`).data(B(e),L).join(`path`).attr(`d`,z);let n=w.selectAll(`g`).data(e.descendants(),R).join(`g`).attr(`data-id`,e=>e.data.i).attr(`stroke`,`#333`).attr(`transform`,e=>`translate(${e.x}, ${e.y})`).on(`mouseenter`,q).on(`mouseleave`,J).on(`click`,(e,t)=>K(t)).call(r().on(`start`,Y));n.selectAll(`path`).data(e=>[e]).join(`path`).attr(`d`,e=>V[j(e.data)??`undefined`]).attr(`fill`,e=>e.data.color||`#ffffff`).attr(`stroke-dasharray`,e=>e.data.cells?`none`:`1`),n.selectAll(`text`).data(e=>[e]).join(`text`).text(e=>e.data.code||``)}function W(e,t){e.x=t.x,e.y=t.y;for(let n of e.descendants()){let e=t.descendants().find(e=>e.data.i===n.data.i);e&&(n.x=e.x,n.y=e.y)}}function G(){let e=y,t=I();W(t,e);let n=1e3,r=e=>e.append(`path`).attr(`d`,z).attr(`opacity`,0).call(e=>e.transition().duration(50).attr(`opacity`,1)),i=e=>e.call(e=>e.transition().duration(50).attr(`d`,z)),a=e=>e.call(e=>e.transition().duration(50).attr(`opacity`,0).remove());S.selectAll(`path`).data(t.links(),L).join(r,i,a),C.selectAll(`path`).data(B(t),L).join(r,i,a);let o=t.leaves().length*50,s=t.height*50,c=o-_.left-_.right,l=s+30-_.top-_.bottom;g().size([c,l])(t.sort((e,t)=>H(e)-H(t))),S.selectAll(`path`).data(t.links(),L).transition().duration(n).delay(50).attr(`d`,z),C.selectAll(`path`).data(B(t),L).transition().duration(n).delay(50).attr(`d`,z),w.selectAll(`g`).data(t.descendants(),R).transition().delay(50).duration(n).attr(`transform`,e=>`translate(${e.x},${e.y})`)}function K(e){let t=e.data;if(e.id===0)return;let n=w.select(`g[data-id="${e.id}"]`);w.selectAll(`g`).style(`outline`,`none`),n.style(`outline`,`1px solid #c13119`),o(`hierarchyTree_selected`).style.display=`block`,o(`hierarchyTree_infoLine`).style.display=`none`,o(`hierarchyTree_selectedName`).innerText=t.name,o(`hierarchyTree_selectedCode`).value=t.code||``,o(`hierarchyTree_selectedCode`).onchange=function(){let e=this;if(e.value.length>3)return tip(`Abbreviation must be 3 characters or less`,!1,`error`,3e3);if(!e.value.length)return tip(`Abbreviation cannot be empty`,!1,`error`,3e3);n.select(`text`).text(e.value),t.code=e.value};let r=()=>{o(`hierarchyTree_selectedOrigins`).innerHTML=t.origins.filter(e=>e).map((e,t)=>{let{name:n,code:r}=D.find(t=>t.i===e)||{};return`<button data-id="${e}" class="hierarchyTree_selectedButton hierarchyTree_selectedOrigin" data-tip="${`${t?`Secondary`:`Primary`} origin: ${n}. Click to remove link to that origin`}">${r}</button>`}).join(``),o(`hierarchyTree_selectedOrigins`).onclick=e=>{let n=e.target;if(n.tagName!==`BUTTON`)return;let r=Number(n.dataset.id),i=t.origins.filter(e=>e!==r);t.origins=i.length?i:[0],n.remove(),G()}};r(),o(`hierarchyTree_selectedSelectButton`).onclick=()=>{let n=t.origins,i=e.descendants().map(e=>e.data.i),a=D.filter(({i:e})=>!i.includes(e)).map(({i:e,name:t,code:r,color:i})=>{let a=n[0]===e?`checked`:``,o=n.includes(e)?`checked`:``;return e===0?`
        <div ${o}>
          <input data-tip="Set as primary origin" type="radio" name="primary" value="${e}" ${a} />
          Top level
        </div>
      `:`
        <div ${o}>
          <input data-tip="Set as primary origin" type="radio" name="primary" value="${e}" ${a} />
          <input data-id="${e}" id="selectElementOrigin${e}" class="checkbox" type="checkbox" ${o} />
          <label data-tip="Check to set as a secondary origin" for="selectElementOrigin${e}" class="checkbox-label">
            <fill-box fill="${i}" size=".8em" disabled></fill-box>
            ${r}: ${t}
          </label>
        </div>
      `});o(`hierarchyTree_originSelector`).innerHTML=`
      <form style="max-height: 35vh">
        ${a.join(``)}
      </form>
    `,$(`#hierarchyTree_originSelector`).dialog({title:`Select origins`,position:{my:`center`,at:`center`,of:`svg`},buttons:{Select:()=>{$(`#hierarchyTree_originSelector`).dialog(`close`);let e=o(`hierarchyTree_originSelector`),n=e.querySelector(`input[type='radio']:checked`),i=e.querySelectorAll(`input[type='checkbox']:checked`),a=n?Number(n.value):0;t.origins=[a,...Array.from(i).map(e=>Number(e.dataset.id)).filter(e=>e!==a)],G(),r()},Cancel:()=>{$(`#hierarchyTree_originSelector`).dialog(`close`)}}})},o(`hierarchyTree_selectedCloseButton`).onclick=()=>{n.style(`outline`,`none`),o(`hierarchyTree_selected`).style.display=`none`,o(`hierarchyTree_infoLine`).style.display=`block`}}function q(e,t){t.depth!==0&&(this.classList.add(`selected`),O(t),o(`hierarchyTree_infoLine`).innerText=A(t.data),tip(`Drag to other node to add parent, click to edit`))}function J(e,t){this.classList.remove(`selected`),k(t),o(`hierarchyTree_infoLine`).innerHTML=`&#8205;`,tip(``)}function Y(e,t){t.id!==0&&(T.attr(`d`,`M${t.x},${t.y}L${t.x},${t.y}`),e.on(`drag`,e=>{T.attr(`d`,`M${t.x},${t.y}L${e.x},${e.y}`)}),e.on(`end`,()=>{T.attr(`d`,``);let e=w.select(`g.selected`);if(!e.size())return;let n=t.data.i,r=e.datum().data.i;if(n===r||t.data.origins.includes(r)||t.descendants().some(e=>e.data.i===r))return;let i=E.find(({i:e})=>e===n);i&&(i.origins[0]===0&&(i.origins=[]),i.origins.push(r),K(t),G())}))}var X={open:M};export{X as HierarchyTree};