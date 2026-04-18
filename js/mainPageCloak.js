(function(){
  var p=window.location.pathname;
  if(p.indexOf('/jqrg-games/games/')!==-1)return;
  var en=localStorage.getItem('mainPageCloak')==='true';
  if(en){
    var ct=localStorage.getItem('mainCloakTitle')||atob('SG9tZSB8IFNjaG9vbG9neQ==');
    var ci=localStorage.getItem('mainCloakIcon')||'/cloak-images/schoology.png';
    document.title=ct;
    var fi=document.querySelector('link[rel="icon"]');
    if(!fi){fi=document.createElement('link');fi.rel='icon';document.head.appendChild(fi)}
    fi.href=ci;fi.type='image/png';
    var si=document.querySelector('link[rel="shortcut icon"]');
    if(!si){si=document.createElement('link');si.rel='shortcut icon';document.head.appendChild(si)}
    si.href=ci;si.type='image/png';
  }
})();
