(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d7694946","chunk-2d21d4dd"],{ae45:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("SettingTitle",[e._v(e._s(e.$t("general")))]),n("GenForm",{ref:"form",attrs:{"form-schema":e.formSchema,"cancel-text":e.$t("cancel"),"submit-text":e.$t("submit")},on:{submit:e.saveData}})],1)},a=[],s=n("1da1"),c=(n("96cf"),n("9e77")),i=n("fe0b"),u={type:"object",required:["name"],properties:{server_name:{type:"string",title:i["a"].t("serverName")}}},o=n("cc3b"),f=n("d171"),d={name:"General",components:{SettingTitle:f["default"],GenForm:c["a"]},data:function(){return{formSchema:u}},mounted:function(){this.fetchData()},methods:{fetchData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["a"];case 2:t.sent.design_getServerName().then((function(t){e.$refs.form.setData({server_name:t.data})}));case 3:case"end":return t.stop()}}),t)})))()},saveData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.$refs.form.getData(),t.next=3,o["a"];case 3:t.sent.design_editGeneralSettings(null,n).then().catch((function(t){e.$refs.form.setErrorMessage(t.response.data.detail)}));case 4:case"end":return t.stop()}}),t)})))()}}},m=d,l=n("2877"),h=Object(l["a"])(m,r,a,!1,null,"5e3ed592",null);t["default"]=h.exports},afdd:function(e,t,n){"use strict";var r=n("8336");t["a"]=r["a"]},d171:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h5",{staticClass:"text-h5"},[e._t("default")],2),n("v-divider",{staticClass:"mb-1"})],1)},a=[],s={name:"SettingTitle"},c=s,i=n("2877"),u=n("6544"),o=n.n(u),f=n("ce7e"),d=Object(i["a"])(c,r,a,!1,null,"3a9c3a33",null);t["default"]=d.exports;o()(d,{VDivider:f["a"]})}}]);
//# sourceMappingURL=chunk-d7694946.243464e0.js.map