import{ht as e,pt as t}from"./utils-B2UIqRdZ.js";import{t as n}from"./nodeUtils-5yXISZ7m.js";var r=!1;function i(){closeDialogs(`#minimap, .stable`),a(),o(),c(),$(`#minimap`).dialog({title:`Minimap`,resizable:!1,width:`auto`,position:{my:`left bottom`,at:`left+10 bottom-25`,of:`svg`,collision:`fit`},open:function(){$(this).parent().addClass(`minimap-dialog`)},close:function(){$(this).dialog(`destroy`)}})}function a(){if(document.getElementById(`minimapStyles`))return;let e=document.createElement(`style`);e.id=`minimapStyles`,e.textContent=`
    .minimap-dialog .ui-dialog-content {
      padding: 0 !important;
      overflow: hidden;
    }

    #minimap {
      padding: 0 !important;
      background: transparent;
    }

    #minimapViewportWrap {
      position: relative;
      width: 20em;
      border: 0;
    }

    #minimapSurface {
      display: block;
      width: 100%;
      height: auto;
      cursor: crosshair;
    }

    #minimapMapUse {
      pointer-events: none;
    }

    #minimapViewport {
      fill: rgba(190, 255, 137, 0.1);
      stroke: #624954;
      stroke-width: 1;
      stroke-dasharray: 4;
      vector-effect: non-scaling-stroke;
      pointer-events: none;
    }
  `,document.head.append(e)}function o(){if(r)return;let e=n(`minimapContent`);e&&(r=!0,e.innerHTML=`
    <div id="minimapViewportWrap">
      <svg id="minimapSurface" preserveAspectRatio="xMidYMid meet" aria-label="Map minimap">
        <use id="minimapMapUse" href="#viewbox"></use>
        <rect id="minimapViewport"></rect>
      </svg>
    </div>
  `,n(`minimapSurface`).addEventListener(`click`,s),window.updateMinimap=c)}function s(e){let n=document.getElementById(`minimapSurface`);if(!n)return;let r=n.createSVGPoint();r.x=e.clientX,r.y=e.clientY;let i=n.getScreenCTM();if(!i)return;let a=r.matrixTransform(i.inverse()),o=t(a.x,0,graphWidth),s=t(a.y,0,graphHeight);zoomTo(o,s,scale,450)}function c(){let t=document.getElementById(`minimapSurface`),n=document.getElementById(`minimapViewport`),r=document.getElementById(`minimapMapUse`);if(!t||!n||!r)return;t.setAttribute(`viewBox`,`0 0 ${graphWidth} ${graphHeight}`);let i=scale?1/scale:1;r.setAttribute(`transform`,`translate(${e(-viewX*i,3)} ${e(-viewY*i,3)}) scale(${e(i,6)})`);let a=Math.max(0,-viewX*i),o=Math.max(0,-viewY*i),s=Math.min(graphWidth,a+svgWidth*i),c=Math.min(graphHeight,o+svgHeight*i);n.setAttribute(`x`,String(e(a,3))),n.setAttribute(`y`,String(e(o,3))),n.setAttribute(`width`,String(e(Math.max(0,s-a),3))),n.setAttribute(`height`,String(e(Math.max(0,c-o),3)))}var l={open:i};export{l as Minimap};