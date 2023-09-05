"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[5905],{3500:(oe,O,n)=>{n.r(O),n.d(O,{default:()=>lt});var e=n(27279),C=n(42925),m=n(33110),P=n(6854),H=n(35750),g=n(68263),r=n(47560),M=n(57142),S=n(8766),D=n(76825),X=n(97367),K=n(98934),l=n.n(K),f=n(10131),T=n.n(f),b=n(6078),x=n.n(b),k=n(51943),N=n.n(k),I=n(61020),J=n(51447),G=n(63434),ge=n(42879),fe=n(65913),_=n(68388),Z=n(19915),je=n(50091),Pe=n(70627),o=n.n(Pe),V=n(27523),he=n(47558),v=n(90635),$=n(72450);const ye=$.ZP.tr`
  &.component-row,
  &.dynamiczone-row {
    position: relative;
    border-top: none !important;

    table tr:first-child {
      border-top: none;
    }

    > td:first-of-type {
      padding: 0 0 0 ${(0,r.Q1)(20)};
      position: relative;

      &::before {
        content: '';
        width: ${(0,r.Q1)(4)};
        height: calc(100% - 40px);
        position: absolute;
        top: -7px;
        left: 1.625rem;
        border-radius: 4px;

        ${({isFromDynamicZone:t,isChildOfDynamicZone:a,theme:i})=>a?`background-color: ${i.colors.primary200};`:t?`background-color: ${i.colors.primary200};`:`background: ${i.colors.neutral150};`}
      }
    }
  }

  &.dynamiczone-row > td:first-of-type {
    padding: 0;
  }
`;function ae({customRowComponent:t,component:a,isFromDynamicZone:i,isNestedInDZComponent:s,firstLoopComponentUid:p}){const{modifiedData:d}=(0,V.Z)(),{schema:{attributes:h}}=l()(d,["components",a],{schema:{attributes:[]}});return e.createElement(ye,{isChildOfDynamicZone:i,className:"component-row"},e.createElement("td",{colSpan:12},e.createElement(xe,{customRowComponent:t,items:h,targetUid:a,firstLoopComponentUid:p||a,editTarget:"components",isFromDynamicZone:i,isNestedInDZComponent:s,isSub:!0,secondLoopComponentUid:p?a:null})))}ae.defaultProps={component:null,customRowComponent:null,firstLoopComponentUid:null,isFromDynamicZone:!1,isNestedInDZComponent:!1},ae.propTypes={component:o().string,customRowComponent:o().func,firstLoopComponentUid:o().string,isFromDynamicZone:o().bool,isNestedInDZComponent:o().bool};const Ee=ae;var ke=n(30117),Be=n(24204),be=n(25237);function re({isActive:t,icon:a}){return e.createElement(m.k,{alignItems:"center",background:t?"primary200":"neutral200",justifyContent:"center",height:8,width:8,borderRadius:"50%"},e.createElement(Be.J,{as:be.c[a]||be.c.cube,height:5,width:5}))}re.defaultProps={isActive:!1,icon:"Cube"},re.propTypes={isActive:o().bool,icon:o().string};const ve=(0,$.ZP)(g.x)`
  position: absolute;
  display: none;
  top: 5px;
  right: ${(0,r.Q1)(8)};

  svg {
    width: ${(0,r.Q1)(10)};
    height: ${(0,r.Q1)(10)};

    path {
      fill: ${({theme:t})=>t.colors.primary600};
    }
  }
`,Ae=(0,$.ZP)(m.k)`
  width: ${(0,r.Q1)(140)};
  height: ${(0,r.Q1)(80)};
  position: relative;
  border: 1px solid ${({theme:t})=>t.colors.neutral200};
  background: ${({theme:t})=>t.colors.neutral100};
  border-radius: ${({theme:t})=>t.borderRadius};
  max-width: 100%;

  &.active,
  &:focus,
  &:hover {
    border: 1px solid ${({theme:t})=>t.colors.primary200};
    background: ${({theme:t})=>t.colors.primary100};

    ${ve} {
      display: block;
    }

    ${Z.Z} {
      color: ${({theme:t})=>t.colors.primary600};
    }

    /* > ComponentIcon */
    > div:first-child {
      background: ${({theme:t})=>t.colors.primary200};
      color: ${({theme:t})=>t.colors.primary600};

      svg {
        path {
          fill: ${({theme:t})=>t.colors.primary600};
        }
      }
    }
  }
`;function le({component:t,dzName:a,index:i,isActive:s,isInDevelopmentMode:p,onClick:d}){const{modifiedData:h,removeComponentFromDynamicZone:B}=(0,V.Z)(),{schema:{icon:L,displayName:R}}=l()(h,["components",t],{schema:{}}),y=c=>{c.stopPropagation(),B(a,i)};return e.createElement(Ae,{alignItems:"center",direction:"column",className:s?"active":"",borderRadius:"borderRadius",justifyContent:"center",paddingLeft:4,paddingRight:4,shrink:0,onClick:d,role:"tab",tabIndex:s?0:-1,cursor:"pointer","aria-selected":s,"aria-controls":`dz-${a}-panel-${i}`,id:`dz-${a}-tab-${i}`},e.createElement(re,{icon:L,isActive:s}),e.createElement(g.x,{marginTop:1,maxWidth:"100%"},e.createElement(Z.Z,{variant:"pi",fontWeight:"bold",ellipsis:!0},R)),p&&e.createElement(ve,{as:"button",onClick:y},e.createElement(ke.Z,null)))}le.defaultProps={component:null,isActive:!1,isInDevelopmentMode:!1,onClick(){}},le.propTypes={component:o().string,dzName:o().string.isRequired,index:o().number.isRequired,isActive:o().bool,isInDevelopmentMode:o().bool,onClick:o().func};const Ie=le,Fe=(0,$.ZP)(M.Z)`
  width: ${(0,r.Q1)(32)};
  height: ${(0,r.Q1)(32)};
  padding: ${(0,r.Q1)(9)};
  border-radius: ${(0,r.Q1)(64)};
  background: ${({theme:t})=>t.colors.primary100};
  path {
    fill: ${({theme:t})=>t.colors.primary600};
  }
`,we=(0,$.ZP)(g.x)`
  height: ${(0,r.Q1)(90)};
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`,Oe=(0,$.ZP)(m.k)`
  width: 100%;
  overflow-x: auto;
`,Se=(0,$.ZP)(g.x)`
  padding-top: ${(0,r.Q1)(90)};
`,Ue=(0,$.ZP)(m.k)`
  flex-shrink: 0;
  width: ${(0,r.Q1)(140)};
  height: ${(0,r.Q1)(80)};
  justify-content: center;
  align-items: center;
`;function ie({customRowComponent:t,components:a,addComponent:i,name:s,targetUid:p}){const{isInDevelopmentMode:d}=(0,V.Z)(),[h,B]=(0,e.useState)(0),{formatMessage:L}=(0,I.Z)(),R=c=>{h!==c&&B(c)},y=()=>{i(s)};return e.createElement(ye,{className:"dynamiczone-row",isFromDynamicZone:!0},e.createElement("td",{colSpan:12},e.createElement(we,{paddingLeft:8},e.createElement(Oe,{gap:2},d&&e.createElement("button",{type:"button",onClick:y},e.createElement(Ue,{direction:"column",alignItems:"stretch",gap:1},e.createElement(Fe,null),e.createElement(Z.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600"},L({id:(0,v.Z)("button.component.add"),formatMessage:"Add a component"})))),e.createElement(m.k,{role:"tablist",gap:2},a.map((c,u)=>e.createElement(Ie,{key:c,dzName:s,index:u,component:c,isActive:h===u,isInDevelopmentMode:d,onClick:()=>R(u)}))))),e.createElement(Se,null,a.map((c,u)=>{const E={customRowComponent:t,component:c};return e.createElement(g.x,{id:`dz-${s}-panel-${u}`,role:"tabpanel",tabindex:0,"aria-labelledby":`dz-${s}-tab-${u}`,key:c,style:{display:h===u?"block":"none"}},e.createElement("table",null,e.createElement("tbody",null,e.createElement(Ee,{...E,isFromDynamicZone:!0,targetUid:p,key:c}))))}))))}ie.defaultProps={addComponent(){},components:[],customRowComponent:null,name:null},ie.propTypes={addComponent:o().func,components:o().instanceOf(Array),customRowComponent:o().func,name:o().string,targetUid:o().string.isRequired};const We=ie,Ne=(0,$.ZP)(g.x)`
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
    fill: ${({theme:t,color:a})=>t.colors[`${a}600`]};
  }
`,ze=(0,$.ZP)(g.x)`
  border-radius: 0 0 ${({theme:t})=>t.borderRadius} ${({theme:t})=>t.borderRadius};
  display: block;
  width: 100%;
  border: none;
  position: relative;
  left: -0.25rem;
`,Ce=({children:t,icon:a,color:i,...s})=>e.createElement(ze,{paddingBottom:4,paddingTop:4,as:"button",type:"button",...s},e.createElement(m.k,null,e.createElement(Ne,{color:i,"aria-hidden":!0,background:`${i}200`},a),e.createElement(g.x,{paddingLeft:3},e.createElement(Z.Z,{variant:"pi",fontWeight:"bold",textColor:`${i}600`},t))));Ce.propTypes={color:o().string.isRequired,children:o().string.isRequired,icon:o().node.isRequired};const Qe=Ce,Ke=(0,$.ZP)(g.x)`
  table {
    width: 100%;
    white-space: nowrap;
  }

  thead {
    border-bottom: 1px solid ${({theme:t})=>t.colors.neutral150};

    tr {
      border-top: 0;
    }
  }

  tr {
    border-top: 1px solid ${({theme:t})=>t.colors.neutral150};

    & td,
    & th {
      padding: ${({theme:t})=>t.spaces[4]};
    }

    & td:first-of-type,
    & th:first-of-type {
      padding: 0 ${({theme:t})=>t.spaces[1]};
    }
  }

  th,
  td {
    vertical-align: middle;
    text-align: left;
    color: ${({theme:t})=>t.colors.neutral600};
    outline-offset: -4px;
  }
`;function se({addComponentToDZ:t,customRowComponent:a,editTarget:i,firstLoopComponentUid:s,isFromDynamicZone:p,isMain:d,isNestedInDZComponent:h,isSub:B,items:L,secondLoopComponentUid:R,targetUid:y}){const{formatMessage:c}=(0,I.Z)(),{trackUsage:u}=(0,r.rS)(),{isInDevelopmentMode:E,modifiedData:z,isInContentTypeView:F}=(0,V.Z)(),{onOpenModalAddField:U}=(0,he.Z)(),A=()=>{u("hasClickedCTBAddFieldBanner"),U({forTarget:i,targetUid:y})};return y?L.length===0&&d?e.createElement(G.i,{colCount:2,rowCount:2},e.createElement(ge.h,null,e.createElement(fe.Tr,null,e.createElement(_.Th,null,e.createElement(Z.Z,{variant:"sigma",textColor:"neutral600"},c({id:"global.name",defaultMessage:"Name"}))),e.createElement(_.Th,null,e.createElement(Z.Z,{variant:"sigma",textColor:"neutral600"},c({id:"global.type",defaultMessage:"Type"}))))),e.createElement(r.c4,{action:e.createElement(P.z,{onClick:A,size:"L",startIcon:e.createElement(M.Z,null),variant:"secondary"},c({id:(0,v.Z)("table.button.no-fields"),defaultMessage:"Add new field"})),colSpan:2,content:F?{id:(0,v.Z)("table.content.no-fields.collection-type"),defaultMessage:"Add your first field to this Collection-Type"}:{id:(0,v.Z)("table.content.no-fields.component"),defaultMessage:"Add your first field to this component"}})):e.createElement(Ke,null,e.createElement(g.x,{paddingLeft:6,paddingRight:d?6:0,...d&&{style:{overflowX:"auto"}}},e.createElement("table",null,d&&e.createElement("thead",null,e.createElement("tr",null,e.createElement("th",null,e.createElement(Z.Z,{variant:"sigma",textColor:"neutral600"},c({id:"global.name",defaultMessage:"Name"}))),e.createElement("th",{colSpan:"2"},e.createElement(Z.Z,{variant:"sigma",textColor:"neutral600"},c({id:"global.type",defaultMessage:"Type"}))))),e.createElement("tbody",null,L.map(w=>{const{type:Q}=w,Y=a;return e.createElement(e.Fragment,{key:w.name},e.createElement(Y,{...w,isNestedInDZComponent:h,targetUid:y,editTarget:i,firstLoopComponentUid:s,isFromDynamicZone:p,secondLoopComponentUid:R}),Q==="component"&&e.createElement(Ee,{...w,customRowComponent:a,targetUid:y,isNestedInDZComponent:p,editTarget:i,firstLoopComponentUid:s}),Q==="dynamiczone"&&e.createElement(We,{...w,customRowComponent:a,addComponent:t,targetUid:y}))})))),d&&E&&e.createElement(je.c,{icon:e.createElement(M.Z,null),onClick:A},c({id:(0,v.Z)(`form.button.add.field.to.${z.contentType?z.contentType.schema.kind:i||"collectionType"}`),defaultMessage:"Add another field"})),B&&E&&e.createElement(Qe,{icon:e.createElement(M.Z,null),onClick:A,color:p?"primary":"neutral"},c({id:(0,v.Z)("form.button.add.field.to.component"),defaultMessage:"Add another field"}))):e.createElement(G.i,{colCount:2,rowCount:2},e.createElement(ge.h,null,e.createElement(fe.Tr,null,e.createElement(_.Th,null,e.createElement(Z.Z,{variant:"sigma",textColor:"neutral600"},c({id:"global.name",defaultMessage:"Name"}))),e.createElement(_.Th,null,e.createElement(Z.Z,{variant:"sigma",textColor:"neutral600"},c({id:"global.type",defaultMessage:"Type"}))))),e.createElement(r.c4,{colSpan:2,content:{id:(0,v.Z)("table.content.create-first-content-type"),defaultMessage:"Create your first Collection-Type"}}))}se.defaultProps={addComponentToDZ(){},customRowComponent:null,firstLoopComponentUid:null,isFromDynamicZone:!1,isNestedInDZComponent:!1,isMain:!1,isSub:!1,items:[],secondLoopComponentUid:null,targetUid:null},se.propTypes={addComponentToDZ:o().func,customRowComponent:o().func,editTarget:o().string.isRequired,firstLoopComponentUid:o().string,isFromDynamicZone:o().bool,isNestedInDZComponent:o().bool,isMain:o().bool,items:o().instanceOf(Array),secondLoopComponentUid:o().string,targetUid:o().string,isSub:o().bool};const xe=se;var Te=n(77216),Ve=n(69083),He=n(85465);const Xe=(0,$.ZP)(g.x)`
  position: absolute;
  left: -1.125rem;
  top: 0px;

  &:before {
    content: '';
    width: ${4/16}rem;
    height: ${12/16}rem;
    background: ${({theme:t,color:a})=>t.colors[a]};
    display: block;
  }
`,Je=$.ZP.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:t,color:a})=>t.colors[a]};
  }
`,Ze=t=>e.createElement(Xe,null,e.createElement(Je,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},e.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z"})));Ze.propTypes={color:o().string.isRequired};const Ge=Ze;var Ye=n(91964);const ce=({content:t})=>N()(t);ce.defaultProps={content:null},ce.propTypes={content:o().string};const qe=ce,_e=(0,$.ZP)(g.x)`
  position: relative;
`,de=({type:t,customField:a,repeatable:i})=>{const{formatMessage:s}=(0,I.Z)();let p=t;return["integer","biginteger","float","decimal"].includes(t)?p="number":["string"].includes(t)&&(p="text"),a?e.createElement(Z.Z,null,s({id:(0,v.Z)("attribute.customField"),defaultMessage:"Custom field"})):e.createElement(Z.Z,null,s({id:(0,v.Z)(`attribute.${p}`),defaultMessage:t}),"\xA0",i&&s({id:(0,v.Z)("component.repeatable"),defaultMessage:"(repeatable)"}))};de.defaultProps={customField:null,repeatable:!1},de.propTypes={type:o().string.isRequired,customField:o().string,repeatable:o().bool};const et=de;function me({configurable:t,customField:a,editTarget:i,firstLoopComponentUid:s,isFromDynamicZone:p,name:d,onClick:h,relation:B,repeatable:L,secondLoopComponentUid:R,target:y,targetUid:c,type:u}){const{contentTypes:E,isInDevelopmentMode:z,removeAttribute:F}=(0,V.Z)(),{formatMessage:U}=(0,I.Z)(),A=u==="relation"&&B.includes("morph"),w=["integer","biginteger","float","decimal"].includes(u)?"number":u,Q=l()(E,[y],{}),Y=l()(Q,["schema","displayName"],""),q=l()(Q,"plugin"),ue=y?"relation":w,ee=()=>{A||t!==!1&&h(i,R||s||c,d,u,a)};let W;return R&&s?W=2:s?W=1:W=0,e.createElement(_e,{as:"tr",...(0,r.X7)({fn:ee,condition:z&&t&&!A})},e.createElement("td",{style:{position:"relative"}},W!==0&&e.createElement(Ge,{color:p?"primary200":"neutral150"}),e.createElement(m.k,{paddingLeft:2,gap:4},e.createElement(Ye.Z,{type:ue,customField:a}),e.createElement(Z.Z,{fontWeight:"bold"},d))),e.createElement("td",null,y?e.createElement(Z.Z,null,U({id:(0,v.Z)(`modelPage.attribute.${A?"relation-polymorphic":"relationWith"}`),defaultMessage:"Relation with"}),"\xA0",e.createElement("span",{style:{fontStyle:"italic"}},e.createElement(qe,{content:Y}),"\xA0",q&&`(${U({id:(0,v.Z)("from"),defaultMessage:"from"})}: ${q})`)):e.createElement(et,{type:u,customField:a,repeatable:L})),e.createElement("td",null,z?e.createElement(m.k,{justifyContent:"flex-end",...r.UW},t?e.createElement(m.k,{gap:1},!A&&e.createElement(Te.h,{onClick:ee,label:`${U({id:"app.utils.edit",defaultMessage:"Edit"})} ${d}`,noBorder:!0,icon:e.createElement(D.Z,null)}),e.createElement(Te.h,{onClick:te=>{te.stopPropagation(),F(i,d,R||s||"")},label:`${U({id:"global.delete",defaultMessage:"Delete"})} ${d}`,noBorder:!0,icon:e.createElement(Ve.Z,null)})):e.createElement(He.Z,null)):e.createElement(g.x,{height:(0,r.Q1)(32)})))}me.defaultProps={configurable:!0,customField:null,firstLoopComponentUid:null,isFromDynamicZone:!1,onClick(){},relation:"",repeatable:!1,secondLoopComponentUid:null,target:null,targetUid:null,type:null},me.propTypes={configurable:o().bool,customField:o().string,editTarget:o().string.isRequired,firstLoopComponentUid:o().string,isFromDynamicZone:o().bool,name:o().string.isRequired,onClick:o().func,relation:o().string,repeatable:o().bool,secondLoopComponentUid:o().string,target:o().string,targetUid:o().string,type:o().string};const tt=(0,e.memo)(me),nt=t=>{let a;switch(t){case"date":case"datetime":case"time":case"timestamp":a="date";break;case"integer":case"biginteger":case"decimal":case"float":a="number";break;case"string":case"text":a="text";break;case"":a="relation";break;default:a=t}return a};var ot=n(13796);const at={collectionTypesConfigurations:[{action:"plugin::content-manager.collection-types.configure-view",subject:null}],componentsConfigurations:[{action:"plugin::content-manager.components.configure-layout",subject:null}],singleTypesConfigurations:[{action:"plugin::content-manager.single-types.configure-view",subject:null}]},pe=({disabled:t,isTemporary:a,isInContentTypeView:i,contentTypeKind:s,targetUid:p})=>{const{formatMessage:d}=(0,I.Z)(),{push:h}=(0,J.k6)(),{collectionTypesConfigurations:B,componentsConfigurations:L,singleTypesConfigurations:R}=at,y=d({id:"content-type-builder.form.button.configure-view"});let c=B;const u=()=>(a||h(i?`/content-manager/collectionType/${p}/configurations/edit`:`/content-manager/components/${p}/configurations/edit`),!1);return i&&s==="singleType"&&(c=R),i||(c=L),e.createElement(r.jW,{permissions:c},e.createElement(P.z,{startIcon:e.createElement(ot.Z,null),variant:"tertiary",onClick:u,disabled:a||t},y))};pe.defaultProps={contentTypeKind:"collectionType",isInContentTypeView:!0,isTemporary:!1,targetUid:""},pe.propTypes={disabled:o().bool.isRequired,contentTypeKind:o().string,isInContentTypeView:o().bool,isTemporary:o().bool,targetUid:o().string};const rt=(0,e.memo)(pe),lt=()=>{const{initialData:t,modifiedData:a,isInDevelopmentMode:i,isInContentTypeView:s,submitData:p}=(0,V.Z)(),{formatMessage:d}=(0,I.Z)(),{trackUsage:h}=(0,r.rS)(),B=(0,J.$B)("/plugins/content-type-builder/:kind/:currentUID"),{onOpenModalAddComponentsToDZ:L,onOpenModalAddField:R,onOpenModalEditField:y,onOpenModalEditSchema:c,onOpenModalEditCustomField:u}=(0,he.Z)(),E=s?"contentType":"component",z=[E,"schema","attributes"],F=l()(a,[E,"uid"]),U=l()(a,[E,"isTemporary"],!1),A=l()(a,[E,"schema","kind"],null),w=l()(a,z,[]),Q=T()(t,[E,"plugin"]),Y=!x()(a,t),q=s?"contentType":"component",ue=j=>{L({dynamicZoneTarget:j,targetUid:F})},ee=async(j,$e,Me,De,Re)=>{const Le=nt(De);Re?u({forTarget:j,targetUid:$e,attributeName:Me,attributeType:Le,customFieldUid:Re}):y({forTarget:j,targetUid:$e,attributeName:Me,attributeType:Le,step:De==="component"?"2":null})};let W=l()(a,[E,"schema","displayName"],"");const te=l()(a,[E,"schema","kind"],""),ne=B?.params.currentUID==="create-content-type";!W&&ne&&(W=d({id:(0,v.Z)("button.model.create"),defaultMessage:"Create new collection type"}));const it=()=>{const j=te||E;j==="collectionType"&&h("willEditNameOfContentType"),j==="singleType"&&h("willEditNameOfSingleType"),c({modalType:E,forTarget:E,targetUid:F,kind:j})};return e.createElement(e.Fragment,null,e.createElement(J.NL,{message:j=>j.hash==="#back"?!1:d({id:(0,v.Z)("prompt.unsaved")}),when:Y}),e.createElement(C.T,{id:"title",primaryAction:i&&e.createElement(m.k,{gap:2},!ne&&e.createElement(P.z,{startIcon:e.createElement(M.Z,null),variant:"secondary",onClick:()=>{R({forTarget:q,targetUid:F})}},d({id:(0,v.Z)("button.attributes.add.another")})),e.createElement(P.z,{startIcon:e.createElement(S.Z,null),onClick:()=>p(),type:"submit",disabled:x()(a,t)},d({id:"global.save",defaultMessage:"Save"}))),secondaryAction:i&&!Q&&!ne&&e.createElement(P.z,{startIcon:e.createElement(D.Z,null),variant:"tertiary",onClick:it},d({id:"app.utils.edit",defaultMessage:"Edit"})),title:N()(W),subtitle:d({id:(0,v.Z)("listView.headerLayout.description"),defaultMessage:"Build the data architecture of your content"}),navigationAction:e.createElement(r.rU,{startIcon:e.createElement(X.Z,null),to:"/plugins/content-type-builder/"},d({id:"global.back",defaultMessage:"Back"}))}),e.createElement(H.D,null,e.createElement(m.k,{direction:"column",alignItems:"stretch",gap:4},e.createElement(m.k,{justifyContent:"flex-end"},e.createElement(m.k,{gap:2},e.createElement(rt,{key:"link-to-cm-settings-view",targetUid:F,isTemporary:U,isInContentTypeView:s,contentTypeKind:A,disabled:ne}))),e.createElement(g.x,{background:"neutral0",shadow:"filterShadow",hasRadius:!0},e.createElement(xe,{items:w,customRowComponent:j=>e.createElement(tt,{...j,onClick:ee}),addComponentToDZ:ue,targetUid:F,editTarget:q,isMain:!0})))))}},35750:(oe,O,n)=>{n.d(O,{D:()=>m});var e=n(74081),C=n(68263);const m=({children:P})=>(0,e.jsx)(C.x,{paddingLeft:10,paddingRight:10,children:P})},42925:(oe,O,n)=>{n.d(O,{T:()=>D});var e=n(74081),C=n(27279),m=n(72450);const P=l=>{const f=(0,C.useRef)(null),[T,b]=(0,C.useState)(!0),x=([k])=>{b(k.isIntersecting)};return(0,C.useEffect)(()=>{const k=f.current,N=new IntersectionObserver(x,l);return k&&N.observe(f.current),()=>{k&&N.disconnect()}},[f,l]),[f,T]};var H=n(66705);const g=(l,f)=>{const T=(0,H.W)(f);(0,C.useLayoutEffect)(()=>{const b=new ResizeObserver(T);return Array.isArray(l)?l.forEach(x=>{x.current&&b.observe(x.current)}):l.current&&b.observe(l.current),()=>{b.disconnect()}},[l,T])};var r=n(68263),M=n(33110),S=n(19915);const D=l=>{const f=(0,C.useRef)(null),[T,b]=(0,C.useState)(null),[x,k]=P({root:null,rootMargin:"0px",threshold:0});return g(x,()=>{x.current&&b(x.current.getBoundingClientRect())}),(0,C.useEffect)(()=>{f.current&&b(f.current.getBoundingClientRect())},[f]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{style:{height:T?.height},ref:x,children:k&&(0,e.jsx)(K,{ref:f,...l})}),!k&&(0,e.jsx)(K,{...l,sticky:!0,width:T?.width})]})};D.displayName="HeaderLayout";const X=(0,m.ZP)(r.x)`
  width: ${({width:l})=>l?`${l/16}rem`:void 0};
  z-index: ${({theme:l})=>l.zIndices[1]};
`,K=C.forwardRef(({navigationAction:l,primaryAction:f,secondaryAction:T,subtitle:b,title:x,sticky:k,width:N,...I},J)=>{const G=typeof b=="string";return k?(0,e.jsx)(X,{paddingLeft:6,paddingRight:6,paddingTop:3,paddingBottom:3,position:"fixed",top:0,right:0,background:"neutral0",shadow:"tableShadow",width:N,"data-strapi-header-sticky":!0,children:(0,e.jsxs)(M.k,{justifyContent:"space-between",children:[(0,e.jsxs)(M.k,{children:[l&&(0,e.jsx)(r.x,{paddingRight:3,children:l}),(0,e.jsxs)(r.x,{children:[(0,e.jsx)(S.Z,{variant:"beta",as:"h1",...I,children:x}),G?(0,e.jsx)(S.Z,{variant:"pi",textColor:"neutral600",children:b}):b]}),T?(0,e.jsx)(r.x,{paddingLeft:4,children:T}):null]}),(0,e.jsx)(M.k,{children:f?(0,e.jsx)(r.x,{paddingLeft:2,children:f}):void 0})]})}):(0,e.jsxs)(r.x,{ref:J,paddingLeft:10,paddingRight:10,paddingBottom:8,paddingTop:l?6:8,background:"neutral100","data-strapi-header":!0,children:[l?(0,e.jsx)(r.x,{paddingBottom:2,children:l}):null,(0,e.jsxs)(M.k,{justifyContent:"space-between",children:[(0,e.jsxs)(M.k,{minWidth:0,children:[(0,e.jsx)(S.Z,{as:"h1",variant:"alpha",...I,children:x}),T?(0,e.jsx)(r.x,{paddingLeft:4,children:T}):null]}),f]}),G?(0,e.jsx)(S.Z,{variant:"epsilon",textColor:"neutral600",as:"p",children:b}):b]})})},50091:(oe,O,n)=>{n.d(O,{c:()=>S});var e=n(74081),C=n(72450),m=n(68263),P=n(61696),H=n(33110),g=n(19915);const r=(0,C.ZP)(m.x)`
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
    fill: ${({theme:D})=>D.colors.primary600};
  }
`,M=(0,C.ZP)(m.x)`
  border-radius: 0 0 ${({theme:D})=>D.borderRadius} ${({theme:D})=>D.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,S=({children:D,icon:X,...K})=>(0,e.jsxs)("div",{children:[(0,e.jsx)(P.i,{}),(0,e.jsx)(M,{as:"button",background:"primary100",padding:5,...K,children:(0,e.jsxs)(H.k,{children:[(0,e.jsx)(r,{"aria-hidden":!0,background:"primary200",children:X}),(0,e.jsx)(m.x,{paddingLeft:3,children:(0,e.jsx)(g.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:D})})]})})]})}}]);
