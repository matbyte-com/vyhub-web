(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a43844d8"],{"69de":function(t,e,n){var a={"./AppliedPackets":["8de9","chunk-708d3c80","chunk-af51d800","chunk-5379e1ad","chunk-0ce4e5e1"],"./AppliedPackets.vue":["8de9","chunk-708d3c80","chunk-af51d800","chunk-5379e1ad","chunk-0ce4e5e1"],"./Discounts":["b699","chunk-708d3c80","chunk-af51d800","chunk-5379e1ad","chunk-534ac2fe"],"./Discounts.vue":["b699","chunk-708d3c80","chunk-af51d800","chunk-5379e1ad","chunk-534ac2fe"],"./Purchases":["230b","chunk-af51d800","chunk-5379e1ad","chunk-25f9be41"],"./Purchases.vue":["230b","chunk-af51d800","chunk-5379e1ad","chunk-25f9be41"],"./Statistics":["0671","chunk-9da143c4"],"./Statistics.vue":["0671","chunk-9da143c4"]};function c(t){if(!n.o(a,t))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=a[t],c=e[0];return Promise.all(e.slice(1).map(n.e)).then((function(){return n(c)}))}c.keys=function(){return Object.keys(a)},c.id="69de",t.exports=c},"89dd":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mb-3"},[n("v-row",[n("v-col",{staticClass:"d-flex",attrs:{cols:"12"}},[n("v-card",{},[n("v-card-text",{staticClass:"text-left text-h4 d-flex align-center pa-3"},[null!=t.icon?n("v-icon",{staticClass:"mr-1",attrs:{color:"primary","x-large":""}},[t._v(t._s(t.icon))]):t._e(),n("v-sheet",{attrs:{vertical:"",color:"primary",width:"5",height:t.dividerHeight}}),n("span",{staticClass:"ml-4 mr-1"},[t._v(" "+t._s(t.title)+" "),t._t("default"),null!=t.subtitle?n("div",{staticClass:"subtitle-1"},[t._v(t._s(t.subtitle))]):t._e()],2)],1)],1)],1)],1)],1)},c=[],s={name:"PageTitle",props:{title:String,icon:String,subtitle:String},computed:{dividerHeight:function(){return null==this.subtitle?45:58}}},i=s,o=n("2877"),r=n("6544"),u=n.n(r),l=n("b0af"),d=n("99d9"),h=n("62ad"),p=n("132d"),f=n("0fd9"),m=n("8dd9"),v=Object(o["a"])(i,a,c,!1,null,"66734f8c",null);e["a"]=v.exports;u()(v,{VCard:l["a"],VCardText:d["c"],VCol:h["a"],VIcon:p["a"],VRow:f["a"],VSheet:m["a"]})},f371:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("PageTitle",{attrs:{icon:"mdi-sack"}},[t._v(t._s(t.$t("_shop.labels.admin")))]),n("v-row",[n("v-col",[n("v-card",{staticClass:"fill-height",attrs:{flat:""}},[n("v-card-text",[n("v-tabs",{model:{value:t.tabModel,callback:function(e){t.tabModel=e},expression:"tabModel"}},t._l(t.allowedTabs,(function(e){return n("v-tab",{key:e.id,staticClass:"justify-start",on:{click:function(n){return t.$router.push({name:"ShopAdmin",params:{component:e.name}})}}},[n("v-icon",{attrs:{left:""}},[t._v(t._s(e.icon))]),n("span",[t._v(t._s(e.title))])],1)})),1)],1)],1)],1)],1),n("v-row",[n("v-col",[n("v-card",{staticClass:"fill-height",attrs:{flat:""}},[n("v-card-text",[n("keep-alive",[n(t.componentInstance,{tag:"component"})],1)],1)],1)],1)],1)],1)},c=[],s=(n("7db0"),n("b0c0"),n("d3b7"),n("3ca3"),n("ddb0"),n("4de4"),n("89dd")),i={name:"Purchase",components:{PageTitle:s["a"]},data:function(){return{tabs:[{name:"purchases",icon:"mdi-clipboard-list",component:"Purchases",reqProp:"purchase_show",title:this.$t("_purchases.labels.allPurchases")},{name:"applied-packets",icon:"mdi-gift-open",component:"AppliedPackets",reqProp:"purchase_show",title:this.$t("_purchases.labels.appliedPackets")},{name:"discounts",icon:"mdi-ticket-percent",component:"Discounts",reqProp:"discount_edit",title:this.$t("discounts")},{name:"statistics",icon:"mdi-chart-areaspline",component:"Statistics",reqProp:"purchase_show",title:this.$t("statistics")}],activeComponent:"my-purchases",tabModel:null}},beforeMount:function(){this.init()},watch:{$route:function(){this.init()}},methods:{init:function(){var t=this;if(this.$route.params.component){var e=this.tabs.find((function(e){return e.name===t.$route.params.component}));this.tabModel=this.allowedTabs.indexOf(e),this.activeComponent=e.component}else this.activeComponent=this.allowedTabs[0].component}},computed:{componentInstance:function(){var t=this.activeComponent;return function(){return n("69de")("./".concat(t))}},allowedTabs:function(){var t=this;return this.tabs.filter((function(e){return!e.reqProp||!0===t.$checkProp(e.reqProp)}))}}},o=i,r=n("2877"),u=n("6544"),l=n.n(u),d=n("b0af"),h=n("99d9"),p=n("62ad"),f=n("132d"),m=n("0fd9"),v=n("71a3"),b=n("fe57"),k=Object(r["a"])(o,a,c,!1,null,"320745b8",null);e["default"]=k.exports;l()(k,{VCard:d["a"],VCardText:h["c"],VCol:p["a"],VIcon:f["a"],VRow:m["a"],VTab:v["a"],VTabs:b["a"]})}}]);
//# sourceMappingURL=chunk-a43844d8.96f61818.js.map