var e=null,t=null;function n(n){localStorage.getItem(`installationDontAsk`)||(e=r(),t=n,window.addEventListener(`appinstalled`,()=>{tip(`Application is installed`,!1,`success`,8e3),a()}))}function r(){let e=document.createElement(`button`);return e.style.cssText=`
      position: fixed;
      top: 1em;
      right: 1em;
      padding: 0.6em 0.8em;
      width: auto;
    `,e.className=`options glow`,e.innerHTML=`Install`,e.onclick=i,e.onmouseenter=()=>tip(`Install the Application`),document.getElementById(`optionsContainer`).appendChild(e),e}function i(){alertMessage.innerHTML=`You can install the tool so that it will look and feel like desktop application:
    have its own icon on your home screen and work offline with some limitations
  `,$(`#alert`).dialog({resizable:!1,title:`Install the Application`,width:`38em`,buttons:{Install:function(){$(this).dialog(`close`),t?.prompt()},Cancel:function(){$(this).dialog(`close`)}},open:function(){this.parentElement.querySelector(`.ui-dialog-buttonpane`).insertAdjacentHTML(`afterbegin`,`<span><input id="dontAsk" class="checkbox" type="checkbox"><label for="dontAsk" class="checkbox-label dontAsk"><i>do not ask again</i></label></span>`)},close:function(){this.parentElement.querySelector(`.checkbox`)?.checked&&(localStorage.setItem(`installationDontAsk`,`true`),a()),$(this).dialog(`destroy`)}})}function a(){e?.remove(),e=null,t=null}var o={init:n};export{o as Installation};