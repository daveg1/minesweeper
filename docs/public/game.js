(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var t,n,s,i=function(){function t(e,n,s){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.x=e,this.y=n,this.element=s,this.isMine=!1}var n,s;return n=t,(s=[{key:"state",get:function(){return this.element.dataset.state},set:function(e){this.element.dataset.state=e}},{key:"fill",value:function(e){this.element.classList.add("v-".concat(e)),this.element.textContent=e}}])&&e(n.prototype,s),Object.defineProperty(n,"prototype",{writable:!1}),t}();s={HIDDEN:"hidden",OPENED:"opened",FLAGGED:"flagged",EXPLODED:"exploded",PRESSED:"pressed"},(n="states")in(t=i)?Object.defineProperty(t,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[n]=s;const a=i;function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function r(e){return Math.floor(Math.random()*e)}const u=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;o(this,e),this.cells=[],this.grid=[],this.width=t,this.height=n,this.mines=s,this.game=i,this.element=document.getElementById("board"),this.setUpBoard(),this.generateMines(),this.handleMouseEvents()}var t,n;return t=e,(n=[{key:"setUpBoard",value:function(){this.grid=[],this.cells=[],this.element.innerHTML="";for(var e=0;e<this.width;++e){for(var t=[],n=0;n<this.height;++n){var s=document.createElement("div");s.className="c-cell",s.dataset.state="hidden";var i=new a(e,n,s);t.push(i),this.cells.push(i),this.element.appendChild(s)}this.grid.push(t)}}},{key:"generateMines",value:function(){for(var e=0;e<this.mines;++e){var t=!1;do{var n=r(this.width),s=r(this.height),i=this.grid[n][s];i.isMine||(i.isMine=!0,t=!0)}while(!t)}}},{key:"handleMouseEvents",value:function(){var e=this;this.cells.forEach((function(t){t.element.onmousedown=t.element.onmouseover=function(e){e.target.dataset.state===a.states.HIDDEN&&1===e.which&&(t.state=a.states.PRESSED)},t.element.onmouseup=function(n){1===n.which&&(e.openCell(t),e.checkWin())},t.element.onmouseout=function(e){e.target.dataset.state===a.states.PRESSED&&(t.state=a.states.HIDDEN)},t.element.oncontextmenu=function(n){n.preventDefault(),e.markCell(t),e.game.updateFlags()}}))}},{key:"getAdjacentCells",value:function(e){for(var t=e.x,n=e.y,s=[],i=t-1;i<=t+1;++i)for(var a=n-1;a<=n+1;++a)i<0||a<0||i>=this.width||a>=this.height||i===t&&a===n||s.push(this.grid[i][a]);return s}},{key:"clearMouseEvents",value:function(){this.cells.forEach((function(e){e.element.onmousedown=null,e.element.onmouseover=null,e.element.onmouseup=null,e.element.onmouseout=null,e.element.oncontextmenu=null}))}},{key:"openCell",value:function(e){if(e.state===a.states.HIDDEN||e.state===a.states.PRESSED)if(e.isMine)this.game.lose();else{e.state=a.states.OPENED;var t=this.getAdjacentCells(e),n=t.filter((function(e){return e.isMine}));0===n.length?t.forEach(this.openCell.bind(this)):(e.fill(n.length),e.remove)}}},{key:"markCell",value:function(e){e.state===a.states.FLAGGED?(e.state=a.states.HIDDEN,this.game.flags++):e.state===a.states.HIDDEN&&(e.state=a.states.FLAGGED,this.game.flags--)}},{key:"setStateOfMines",value:function(e){this.cells.filter((function(e){return e.isMine})).forEach((function(t){t.state=e}))}},{key:"checkWin",value:function(){var e=this.cells.filter((function(e){return e.state!==a.states.OPENED&&e.state!==a.states.PRESSED}));0!==this.game.flags&&e.length!==this.mines||this.game.win()}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}const c=function(){function e(t,n,s){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.width=t,this.height=n,this.mines=s,this.flags=s,this.board=null}var t,n;return t=e,(n=[{key:"updateFlags",value:function(){document.getElementById("flags").textContent=this.flags}},{key:"updateGrid",value:function(){document.getElementById("board").style.cssText="--w: ".concat(this.width,"; --h: ").concat(this.height)}},{key:"start",value:function(){this.updateGrid(),this.flags=this.mines,this.updateFlags(),this.board=new u(this.height,this.width,this.mines,this)}},{key:"win",value:function(){this.board.clearMouseEvents(),this.board.setStateOfMines(a.states.FLAGGED),document.getElementById("flags").textContent="You win!"}},{key:"lose",value:function(){this.board.clearMouseEvents(),this.board.setStateOfMines(a.states.EXPLODED),document.getElementById("flags").textContent="You lose!"}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();window.onload=function(e){var t=new c(30,20,100);t.start(),document.getElementById("new-game").onclick=t.start.bind(t)}})();
//# sourceMappingURL=game.js.map