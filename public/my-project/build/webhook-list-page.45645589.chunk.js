"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[4121],{9100:(I,u,t)=>{t.r(u),t.d(u,{default:()=>me});var e=t(27279),s=t(47560),c=t(49402),m=t(36364),g=t(20600),T=t(9),D=t(65e3),S=t(42925),j=t(53141),l=t(19915),p=t(6854),P=t(35750),U=t(68263),_=t(63434),ee=t(50091),te=t(42879),K=t(65913),i=t(68388),V=t(35727),ne=t(30249),ae=t(81228),k=t(33110),E=t(74081),F=t(72450);const $=F.ZP.div`
  background: ${({theme:o})=>o.colors.danger500};
  border: none;
  border-radius: 16px;
  position: relative;
  height: ${24/16}rem;
  width: ${40/16}rem;

  & span {
    font-size: ${({visibleLabels:o})=>o?"1rem":0};
  }

  &:before {
    content: '';
    background: ${({theme:o})=>o.colors.neutral0};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    transition: all 0.5s;
    left: ${({theme:o})=>o.spaces[1]};
    top: ${({theme:o})=>o.spaces[1]};
  }

  @media (prefers-reduced-motion: reduce) {
    &:before {
      transition: none;
    }
  }
`,se=F.ZP.button`
  background: transparent;
  padding: 0;
  border: none;

  &[aria-checked='true'] ${$} {
    background: ${({theme:o})=>o.colors.success500};
  }

  &[aria-checked='true'] ${$}:before {
    transform: translateX(1rem);
  }
`,oe=e.forwardRef(({label:o,onChange:h,onLabel:f="On",offLabel:d="Off",selected:y,visibleLabels:a=!1,...b},v)=>(0,E.jsx)(se,{ref:v,role:"switch","aria-checked":y,"aria-label":o,onClick:h,visibleLabels:a,type:"button",...b,children:(0,E.jsxs)(k.k,{children:[(0,E.jsxs)($,{children:[(0,E.jsx)("span",{children:f}),(0,E.jsx)("span",{children:d})]}),a&&(0,E.jsx)(U.x,{as:"span","aria-hidden":!0,paddingLeft:2,color:y?"success600":"danger600",children:y?f:d})]})}));var z=t(77216),le=t(29631),w=t(57142),H=t(69083),re=t(76825),ie=t(95231),de=t(61020),O=t(40464),N=t(51447);const ce=()=>{const[o,h]=(0,e.useState)(!1),[f,d]=(0,e.useState)([]),y=(0,c.v9)(m._),{formatMessage:a}=(0,de.Z)(),{formatAPIError:b}=(0,s.So)(),v=(0,s.lm)();(0,s.go)();const{push:he}=(0,N.k6)(),{pathname:Q}=(0,N.TH)(),{isLoading:ue,allowedActions:{canCreate:Z,canUpdate:Y,canDelete:G}}=(0,s.ss)(y.settings.webhooks),{get:ge,post:Ee,put:fe}=(0,s.kY)(),{notifyStatus:X}=(0,g.G)(),be="webhooks",{isLoading:ve,data:x,error:A,refetch:J}=(0,O.useQuery)(be,async()=>{const{data:{data:n}}=await ge("/admin/webhooks");return n});(0,e.useEffect)(()=>{if(A){v({type:"warning",message:b(A)});return}x&&X(a({id:"Settings.webhooks.list.loading.success",defaultMessage:"Webhooks have been loaded"}))},[x,A,v,a,X,b]);const q=(0,O.useMutation)(async()=>{await Ee("/admin/webhooks/batch-delete",{ids:f})},{onError(n){v({type:"warning",message:b(n)}),h(!1)},onSuccess(){d([]),h(!1),J()}}),xe=(0,O.useMutation)(async({isEnabled:n,id:r})=>{const{id:L,...R}=x.find(Le=>Le.id===r)??{},Ce={...R,isEnabled:n};await fe(`/admin/webhooks/${r}`,Ce)},{onError(n){v({type:"warning",message:b(n)})},onSuccess(){J()}}),ye=()=>q.mutate(),Me=n=>d(n?x.map(r=>r.id):[]),pe=(n,r)=>d(n?L=>[...L,r]:L=>L.filter(R=>R!==r)),B=n=>he(`${Q}/${n}`),W=ue||ve,C=x?.length??0,M=f.length;return e.createElement(T.A,null,e.createElement(s.SL,{name:"Webhooks"}),e.createElement(D.o,{"aria-busy":W},e.createElement(S.T,{title:a({id:"Settings.webhooks.title",defaultMessage:"Webhooks"}),subtitle:a({id:"Settings.webhooks.list.description",defaultMessage:"Get POST changes notifications"}),primaryAction:Z&&!W&&e.createElement(s.Qj,{startIcon:e.createElement(w.Z,null),variant:"default",to:`${Q}/create`,size:"S"},a({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))}),M>0&&G&&e.createElement(j.Z,{startActions:e.createElement(e.Fragment,null,e.createElement(l.Z,{variant:"epsilon",textColor:"neutral600"},a({id:"Settings.webhooks.to.delete",defaultMessage:"{webhooksToDeleteLength, plural, one {# webhook} other {# webhooks}} selected"},{webhooksToDeleteLength:M})),e.createElement(p.z,{onClick:()=>h(!0),startIcon:e.createElement(H.Z,null),size:"L",variant:"danger-light"},a({id:"global.delete",defaultMessage:"Delete"})))}),e.createElement(P.D,null,W?e.createElement(U.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0},e.createElement(s.dO,null)):C>0?e.createElement(_.i,{colCount:5,rowCount:C+1,footer:e.createElement(ee.c,{onClick:()=>Z?B("create"):{},icon:e.createElement(w.Z,null)},a({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))},e.createElement(te.h,null,e.createElement(K.Tr,null,e.createElement(i.Th,null,e.createElement(V.C,{"aria-label":a({id:"global.select-all-entries",defaultMessage:"Select all entries"}),indeterminate:M>0&&M<C,value:M===C,onValueChange:Me})),e.createElement(i.Th,{width:"20%"},e.createElement(l.Z,{variant:"sigma",textColor:"neutral600"},a({id:"global.name",defaultMessage:"Name"}))),e.createElement(i.Th,{width:"60%"},e.createElement(l.Z,{variant:"sigma",textColor:"neutral600"},a({id:"Settings.webhooks.form.url",defaultMessage:"URL"}))),e.createElement(i.Th,{width:"20%"},e.createElement(l.Z,{variant:"sigma",textColor:"neutral600"},a({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"}))),e.createElement(i.Th,null,e.createElement(ne.T,null,a({id:"Settings.webhooks.list.th.actions",defaultMessage:"Actions"}))))),e.createElement(ae.p,null,x.map(n=>e.createElement(K.Tr,{key:n.id,...(0,s.X7)({fn:()=>B(n.id),condition:Y})},e.createElement(i.Td,{...s.UW},e.createElement(V.C,{"aria-label":`${a({id:"global.select",defaultMessage:"Select"})} ${n.name}`,value:f?.includes(n.id),onValueChange:r=>pe(r,n.id),name:"select"})),e.createElement(i.Td,null,e.createElement(l.Z,{fontWeight:"semiBold",textColor:"neutral800"},n.name)),e.createElement(i.Td,null,e.createElement(l.Z,{textColor:"neutral800"},n.url)),e.createElement(i.Td,null,e.createElement(k.k,null,e.createElement(oe,{onLabel:a({id:"global.enabled",defaultMessage:"Enabled"}),offLabel:a({id:"global.disabled",defaultMessage:"Disabled"}),label:`${n.name} ${a({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"})}`,selected:n.isEnabled,onChange:r=>{r.stopPropagation(),xe.mutate({isEnabled:!n.isEnabled,id:n.id})},visibleLabels:!0}))),e.createElement(i.Td,null,e.createElement(k.k,{gap:1},Y&&e.createElement(z.h,{label:a({id:"Settings.webhooks.events.update",defaultMessage:"Update"}),icon:e.createElement(re.Z,null),noBorder:!0}),G&&e.createElement(z.h,{onClick:r=>{r.stopPropagation(),d([n.id]),h(!0)},label:a({id:"Settings.webhooks.events.delete",defaultMessage:"Delete webhook"}),icon:e.createElement(H.Z,null),noBorder:!0}))))))):e.createElement(le.x,{icon:e.createElement(ie.Z,{width:"160px"}),content:a({id:"Settings.webhooks.list.empty.description",defaultMessage:"No webhooks found"}),action:e.createElement(p.z,{variant:"secondary",startIcon:e.createElement(w.Z,null),onClick:()=>Z?B("create"):{}},a({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"}))}))),e.createElement(s.QH,{isOpen:o,onToggleDialog:()=>h(n=>!n),onConfirm:ye,isConfirmButtonLoading:q.isLoading}))},me=()=>{const o=(0,c.v9)(m._);return e.createElement(s.O4,{permissions:o.settings.webhooks.main},e.createElement(ce,null))}},53141:(I,u,t)=>{t.d(u,{Z:()=>c});var e=t(74081),s=t(33110);const c=({startActions:m,endActions:g})=>!m&&!g?null:(0,e.jsxs)(s.k,{justifyContent:"space-between",alignItems:"flex-start",paddingBottom:4,paddingLeft:10,paddingRight:10,children:[(0,e.jsx)(s.k,{gap:2,wrap:"wrap",children:m}),(0,e.jsx)(s.k,{gap:2,shrink:0,wrap:"wrap",children:g})]})},50091:(I,u,t)=>{t.d(u,{c:()=>j});var e=t(74081),s=t(72450),c=t(68263),m=t(61696),g=t(33110),T=t(19915);const D=(0,s.ZP)(c.x)`
  height: ${24/16}rem;
  width: ${24/16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
  }

  svg path {
    fill: ${({theme:l})=>l.colors.primary600};
  }
`,S=(0,s.ZP)(c.x)`
  border-radius: 0 0 ${({theme:l})=>l.borderRadius} ${({theme:l})=>l.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,j=({children:l,icon:p,...P})=>(0,e.jsxs)("div",{children:[(0,e.jsx)(m.i,{}),(0,e.jsx)(S,{as:"button",background:"primary100",padding:5,...P,children:(0,e.jsxs)(g.k,{children:[(0,e.jsx)(D,{"aria-hidden":!0,background:"primary200",children:p}),(0,e.jsx)(c.x,{paddingLeft:3,children:(0,e.jsx)(T.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:l})})]})})]})}}]);
