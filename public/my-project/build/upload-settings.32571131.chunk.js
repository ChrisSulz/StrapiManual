"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[695],{56752:(j,m,t)=>{t.r(m),t.d(m,{SettingsPage:()=>I,default:()=>H});var e=t(27279),i=t(65e3),f=t(42925),p=t(6854),E=t(35750),x=t(9),s=t(33110),v=t(68263),y=t(19915),P=t(86049),C=t(25667),b=t(9618),n=t(47560),o=t(8766),d=t(5466),l=t(6078),r=t.n(l),u=t(364),D=t(61020),L=t(11727),c=t(24359);const k=a=>a;var N=t(61815),Z=t(43433),W=t.n(Z);const K={isLoading:!0,isSubmiting:!1,initialData:{responsiveDimensions:!0,sizeOptimization:!0,autoOrientation:!1,videoPreview:!1},modifiedData:{responsiveDimensions:!0,sizeOptimization:!0,autoOrientation:!1,videoPreview:!1}},G=(a,O)=>(0,N.ZP)(a,g=>{switch(O.type){case"CANCEL_CHANGES":{g.modifiedData=a.initialData;break}case"GET_DATA_SUCCEEDED":{g.isLoading=!1,g.initialData=O.data,g.modifiedData=O.data;break}case"ON_CHANGE":{W()(g,["modifiedData",...O.keys.split(".")],O.value);break}case"ON_SUBMIT":{g.isSubmiting=!0;break}case"SUBMIT_SUCCEEDED":{g.initialData=a.modifiedData,g.isSubmiting=!1;break}case"ON_SUBMIT_ERROR":{g.isSubmiting=!1;break}default:return a}}),I=()=>{const{formatMessage:a}=(0,D.Z)(),{lockApp:O,unlockApp:g}=(0,n.o1)(),F=(0,n.lm)(),{get:$,put:X}=(0,n.kY)();(0,n.go)();const[{initialData:Y,isLoading:J,isSubmiting:Q,modifiedData:B},T]=(0,e.useReducer)(G,K,k),z=(0,e.useRef)(!0);(0,e.useEffect)(()=>{const M=d.default.CancelToken.source(),w=async()=>{try{const{data:{data:R}}=await $("/upload/settings",{cancelToken:M.token});T({type:"GET_DATA_SUCCEEDED",data:R})}catch(R){console.error(R)}};return z.current&&w(),()=>{M.cancel("Operation canceled by the user."),z.current=!1}},[]);const U=r()(Y,B),V=async h=>{if(h.preventDefault(),!U){O(),T({type:"ON_SUBMIT"});try{await X("/upload/settings",B),T({type:"SUBMIT_SUCCEEDED"}),F({type:"success",message:{id:"notification.form.success.fields"}})}catch(M){console.error(M),T({type:"ON_SUBMIT_ERROR"})}g()}},A=({target:{name:h,value:M}})=>{T({type:"ON_CHANGE",keys:h,value:M})};return e.createElement(i.o,{tabIndex:-1},e.createElement(u.q,{title:a({id:(0,c.OB)("page.title"),defaultMessage:"Settings - Media Libray"})}),e.createElement("form",{onSubmit:V},e.createElement(f.T,{title:a({id:(0,c.OB)("settings.header.label"),defaultMessage:"Media Library"}),primaryAction:e.createElement(p.z,{disabled:U,"data-testid":"save-button",loading:Q,type:"submit",startIcon:e.createElement(o.Z,null),size:"S"},a({id:"global.save",defaultMessage:"Save"})),subtitle:a({id:(0,c.OB)("settings.sub-header.label"),defaultMessage:"Configure the settings for the Media Library"})}),e.createElement(E.D,null,J?e.createElement(n.dO,null):e.createElement(x.A,null,e.createElement(s.k,{direction:"column",alignItems:"stretch",gap:12},e.createElement(v.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(s.k,{direction:"column",alignItems:"stretch",gap:4},e.createElement(s.k,null,e.createElement(y.Z,{variant:"delta",as:"h2"},a({id:(0,c.OB)("settings.blockTitle"),defaultMessage:"Asset management"}))),e.createElement(P.r,{gap:6},e.createElement(C.P,{col:6,s:12},e.createElement(b.s,{"aria-label":"responsiveDimensions","data-testid":"responsiveDimensions",checked:B.responsiveDimensions,hint:a({id:(0,c.OB)("settings.form.responsiveDimensions.description"),defaultMessage:"Enabling this option will generate multiple formats (small, medium and large) of the uploaded asset."}),label:a({id:(0,c.OB)("settings.form.responsiveDimensions.label"),defaultMessage:"Responsive friendly upload"}),name:"responsiveDimensions",offLabel:a({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:a({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:h=>{A({target:{name:"responsiveDimensions",value:h.target.checked}})}})),e.createElement(C.P,{col:6,s:12},e.createElement(b.s,{"aria-label":"sizeOptimization","data-testid":"sizeOptimization",checked:B.sizeOptimization,hint:a({id:(0,c.OB)("settings.form.sizeOptimization.description"),defaultMessage:"Enabling this option will reduce the image size and slightly reduce its quality."}),label:a({id:(0,c.OB)("settings.form.sizeOptimization.label"),defaultMessage:"Size optimization"}),name:"sizeOptimization",offLabel:a({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:a({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:h=>{A({target:{name:"sizeOptimization",value:h.target.checked}})}})),e.createElement(C.P,{col:6,s:12},e.createElement(b.s,{"aria-label":"autoOrientation","data-testid":"autoOrientation",checked:B.autoOrientation,hint:a({id:(0,c.OB)("settings.form.autoOrientation.description"),defaultMessage:"Enabling this option will automatically rotate the image according to EXIF orientation tag."}),label:a({id:(0,c.OB)("settings.form.autoOrientation.label"),defaultMessage:"Auto orientation"}),name:"autoOrientation",offLabel:a({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:a({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:h=>{A({target:{name:"autoOrientation",value:h.target.checked}})}}))))))))))},H=()=>e.createElement(n.O4,{permissions:L._I.settings},e.createElement(I,null))},35750:(j,m,t)=>{t.d(m,{D:()=>f});var e=t(74081),i=t(68263);const f=({children:p})=>(0,e.jsx)(i.x,{paddingLeft:10,paddingRight:10,children:p})},42925:(j,m,t)=>{t.d(m,{T:()=>P});var e=t(74081),i=t(27279),f=t(72450);const p=n=>{const o=(0,i.useRef)(null),[d,l]=(0,i.useState)(!0),r=([u])=>{l(u.isIntersecting)};return(0,i.useEffect)(()=>{const u=o.current,D=new IntersectionObserver(r,n);return u&&D.observe(o.current),()=>{u&&D.disconnect()}},[o,n]),[o,d]};var E=t(66705);const x=(n,o)=>{const d=(0,E.W)(o);(0,i.useLayoutEffect)(()=>{const l=new ResizeObserver(d);return Array.isArray(n)?n.forEach(r=>{r.current&&l.observe(r.current)}):n.current&&l.observe(n.current),()=>{l.disconnect()}},[n,d])};var s=t(68263),v=t(33110),y=t(19915);const P=n=>{const o=(0,i.useRef)(null),[d,l]=(0,i.useState)(null),[r,u]=p({root:null,rootMargin:"0px",threshold:0});return x(r,()=>{r.current&&l(r.current.getBoundingClientRect())}),(0,i.useEffect)(()=>{o.current&&l(o.current.getBoundingClientRect())},[o]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{style:{height:d?.height},ref:r,children:u&&(0,e.jsx)(b,{ref:o,...n})}),!u&&(0,e.jsx)(b,{...n,sticky:!0,width:d?.width})]})};P.displayName="HeaderLayout";const C=(0,f.ZP)(s.x)`
  width: ${({width:n})=>n?`${n/16}rem`:void 0};
  z-index: ${({theme:n})=>n.zIndices[1]};
`,b=i.forwardRef(({navigationAction:n,primaryAction:o,secondaryAction:d,subtitle:l,title:r,sticky:u,width:D,...L},c)=>{const S=typeof l=="string";return u?(0,e.jsx)(C,{paddingLeft:6,paddingRight:6,paddingTop:3,paddingBottom:3,position:"fixed",top:0,right:0,background:"neutral0",shadow:"tableShadow",width:D,"data-strapi-header-sticky":!0,children:(0,e.jsxs)(v.k,{justifyContent:"space-between",children:[(0,e.jsxs)(v.k,{children:[n&&(0,e.jsx)(s.x,{paddingRight:3,children:n}),(0,e.jsxs)(s.x,{children:[(0,e.jsx)(y.Z,{variant:"beta",as:"h1",...L,children:r}),S?(0,e.jsx)(y.Z,{variant:"pi",textColor:"neutral600",children:l}):l]}),d?(0,e.jsx)(s.x,{paddingLeft:4,children:d}):null]}),(0,e.jsx)(v.k,{children:o?(0,e.jsx)(s.x,{paddingLeft:2,children:o}):void 0})]})}):(0,e.jsxs)(s.x,{ref:c,paddingLeft:10,paddingRight:10,paddingBottom:8,paddingTop:n?6:8,background:"neutral100","data-strapi-header":!0,children:[n?(0,e.jsx)(s.x,{paddingBottom:2,children:n}):null,(0,e.jsxs)(v.k,{justifyContent:"space-between",children:[(0,e.jsxs)(v.k,{minWidth:0,children:[(0,e.jsx)(y.Z,{as:"h1",variant:"alpha",...L,children:r}),d?(0,e.jsx)(s.x,{paddingLeft:4,children:d}):null]}),o]}),S?(0,e.jsx)(y.Z,{variant:"epsilon",textColor:"neutral600",as:"p",children:l}):l]})})},9:(j,m,t)=>{t.d(m,{A:()=>x});var e=t(74081),i=t(72450),f=t(68263);const p=(0,i.ZP)(f.x)`
  display: grid;
  grid-template-columns: ${({hasSideNav:s})=>s?"auto 1fr":"1fr"};
`,E=(0,i.ZP)(f.x)`
  overflow-x: hidden;
`,x=({sideNav:s,children:v})=>(0,e.jsxs)(p,{hasSideNav:!!s,children:[s,(0,e.jsx)(E,{paddingBottom:10,children:v})]})},65e3:(j,m,t)=>{t.d(m,{o:()=>E});var e=t(74081),i=t(72450),f=t(68263);const p=(0,i.ZP)(f.x)`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`,E=({labelledBy:x="main-content-title",...s})=>(0,e.jsx)(p,{"aria-labelledby":x,as:"main",id:"main-content",tabIndex:-1,...s})}}]);