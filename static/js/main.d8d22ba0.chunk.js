(this.webpackJsonpjtdp=this.webpackJsonpjtdp||[]).push([[0],{11:function(e,t,a){e.exports={container:"styles_container__1dViq",buttonContainer:"styles_buttonContainer__2Bt1d",mainContentContainer:"styles_mainContentContainer__24AwM",button:"styles_button__1mMk9",buttonSelected:"styles_buttonSelected__3xAfS",paneContainer:"styles_paneContainer__2orr4",left:"styles_left__1X500",center:"styles_center__1m3dU",right:"styles_right__2Bb0Q",image:"styles_image__1cU1t",gallery:"styles_gallery__1yrV0"}},126:function(e,t,a){e.exports={input:"styles_input__2gjR5"}},133:function(e,t,a){e.exports=a(259)},151:function(e,t){},153:function(e,t){},191:function(e,t){},192:function(e,t){},259:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(125),s=a.n(o),c=a(41),i=a(28),l=a(19),u=a(42),m=a.n(u),d={apiKey:"AIzaSyBWyqYKmwZrc74LWhyb4zTccPQZkPtwDVA",authDomain:"jtdp-60b3d.firebaseapp.com",databaseURL:"https://jtdp-60b3d.firebaseio.com",projectId:"jtdp-60b3d",storageBucket:"jtdp-60b3d.appspot.com",messagingSenderId:"786415873557",appId:"1:786415873557:web:defecb2e86a857bf8b281c"},f=r.a.createContext(null),h=function e(){var t=this;Object(l.a)(this,e),this.signInWithEmail=function(e,a,n){t.auth.signInWithEmailAndPassword(e,a).then((function(){return n({success:!0})})).catch((function(e){return n({success:!1,err:e})}))},this.fetchAllImageUrls=function(e){t.storage.ref().listAll().then((function(t){Promise.all(t.prefixes.map((function(e){return new Promise((function(t,a){e.listAll().then((function(n){Promise.all(n.items.map((function(e){return e.getDownloadURL()}))).then((function(a){return t({name:e.name,urls:a})})).catch((function(e){return a(e)}))})).catch((function(e){return a(e)}))}))}))).then((function(t){return e({success:!0,data:t})})).catch((function(t){return e({success:!1,err:t})}))})).catch((function(t){return e({success:!1,err:t})}))},this.incrementConfettiCount=function(){var e,a=t.auth.currentUser;a&&(e=a.email.startsWith("j")?"Jasmine":"Dylan",m.a.database().ref("clicks").child(e).transaction((function(e){return(e||0)+1})))},m.a.initializeApp(d),this.auth=m.a.auth(),this.storage=m.a.storage()},b=function(e){return function(t){return r.a.createElement(f.Consumer,null,(function(a){return r.a.createElement(e,Object.assign({},t,{firebase:a}))}))}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var p=a(24),g=a(27),v=a(25),y=a(20),_=a(26),j=a(43),E=a.n(j),C=a(132),I=a(126),O=a.n(I),w=function(e){var t=e.placeholder,a=e.onChange,n=e.autoFocus,o=e.value,s=e.width,c=e.type,i=e.customStyle,l=e.id;return r.a.createElement("input",{className:O.a.input,style:Object(C.a)({width:"calc(".concat(s," - 20px)")},i),id:l,placeholder:t,onChange:a,type:c||"text",autoFocus:n?"autofocus":"",value:o})},k=a(73),A=a.n(k),N=function(){try{A.a.verify(localStorage.getItem("jwt-token"),"wCDMNmSbsNPa1pBOgRuE");return!0}catch(e){return!1}},S=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={email:"",password:"",isLoggedIn:!1},a.firebase=e.firebase,a.onSubmit=a.onSubmit.bind(Object(y.a)(a)),a}return Object(_.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){console.log("Mounted"),this.setState({isLoggedIn:N()})}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),this.firebase.signInWithEmail(this.state.email,this.state.password,(function(e){var a,n;e.success?(a=t.state.email,n=function(e){e?console.error(e):t.props.history.push("/iloveyou")},A.a.sign({user:a},"wCDMNmSbsNPa1pBOgRuE",{expiresIn:2592e3},(function(e,t){e?n(e):(localStorage.setItem("jwt-token",t),n())}))):console.error(e.err)}))}},{key:"render",value:function(){var e=this;return this.state.isLoggedIn?r.a.createElement(i.a,{to:"/iloveyou"}):r.a.createElement("div",{className:E.a.container},r.a.createElement("form",{onSubmit:this.onSubmit,className:E.a.form},r.a.createElement("div",{className:E.a.header},"Hi love :)"),r.a.createElement(w,{value:this.state.email,onChange:function(t){return e.setState({email:t.target.value})},placeholder:"email",type:"text",width:"80%"}),r.a.createElement(w,{customStyle:{marginTop:"15px"},value:this.state.password,onChange:function(t){return e.setState({password:t.target.value})},placeholder:"password",type:"password",width:"80%"}),r.a.createElement("input",{className:E.a.button,type:"submit",value:"Login",tabIndex:0})))}}]),t}(r.a.Component),M=Object(i.g)(b(S)),x=a(77),U=a(129),D=a(72),T=a(130),L=a.n(T),P=a(76),B=a.n(P),W=a(11),z=a.n(W),R=a(44),q=a.n(R),F=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).props=e,a}return Object(_.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:q.a.container},r.a.createElement("u",{className:q.a.smallText},"Countdown to 6 month anniversary"),r.a.createElement(D.a,{date:"2020-04-06T05:00:00+00:00",renderer:function(e){return e.completed?r.a.createElement("div",{className:q.a.text},"We're together!"):r.a.createElement("div",{className:q.a.text},e.days,"d ",e.hours,"h ",e.minutes,"m ",e.seconds,"s")}}))}}]),t}(r.a.Component),J=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).fetchAllImageUrls=function(e){a.firebase.fetchAllImageUrls((function(e){e.success?(e.data.forEach((function(e){a.allImages[e.name]=e.urls})),a.updateImageUrlsAndImageMode("couple-pics")):console.error(e.err)}))},a.updateImageUrlsAndImageMode=function(e){if(a.state.imageMode!==e){var t=[];"all"===e?Object.keys(a.allImages).forEach((function(e){return t.push.apply(t,Object(x.a)(a.allImages[e]))})):t.push.apply(t,Object(x.a)(a.allImages[e])),a.setState({imageMode:e,imageUrls:a._shuffleArray(t)})}},a.toggleConfetti=function(){a.firebase.incrementConfettiCount(),a.setState({confettiNumber:a.state.confettiNumber+1})},a._shuffleArray=function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}return e},a.state={imageMode:"",imageUrls:[],confettiNumber:1},a.allImages={},a.firebase=e.firebase,a.fetchAllImageUrls=a.fetchAllImageUrls.bind(Object(y.a)(a)),a.updateImageUrlsAndImageMode=a.updateImageUrlsAndImageMode.bind(Object(y.a)(a)),a.toggleConfetti=a.toggleConfetti.bind(Object(y.a)(a)),a}return Object(_.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.fetchAllImageUrls()}},{key:"render",value:function(){for(var e=this,t=function(e,t,a,n,r){e.beginPath();var o=.3*r;e.moveTo(t,a+o),e.bezierCurveTo(t,a,t-n/2,a,t-n/2,a+o),e.bezierCurveTo(t-n/2,a+(r+o)/2,t,a+(r+o)/2,t,a+r),e.bezierCurveTo(t,a+(r+o)/2,t+n/2,a+(r+o)/2,t+n/2,a+o),e.bezierCurveTo(t+n/2,a,t,a,t,a+o),e.stroke(),e.fill(),e.closePath()},a=[],n=0;n<this.state.confettiNumber;n+=1)a.push(r.a.createElement(L.a,{key:n,colors:["#ff00ff","#ff0000","#ffb6c1","#ffc0cb"],drawShape:function(e){return t(e,0,0,15,15)},recycle:!1}));return r.a.createElement("div",{className:z.a.container},a,r.a.createElement("div",{className:z.a.buttonContainer},r.a.createElement("div",{className:"couple-pics"===this.state.imageMode?z.a.buttonSelected:z.a.button,role:"button",onClick:function(t){return e.updateImageUrlsAndImageMode("couple-pics")}},"Couple"),r.a.createElement("div",{className:"all"===this.state.imageMode?z.a.buttonSelected:z.a.button,role:"button",onClick:function(t){return e.updateImageUrlsAndImageMode("all")}},"Both"),r.a.createElement("div",{className:"dylan-pics"===this.state.imageMode?z.a.buttonSelected:z.a.button,role:"button",onClick:function(t){return e.updateImageUrlsAndImageMode("dylan-pics")}},"Dylan")),r.a.createElement("div",{className:z.a.mainContentContainer},r.a.createElement("div",{className:B()(z.a.paneContainer,"left")},r.a.createElement(F,null)),r.a.createElement(U.Fade,Object.assign({},{duration:5e3,transitionDuration:500,infinite:!0,indicators:!1},{className:z.a.gallery}),this.state.imageUrls.map((function(e,t){return r.a.createElement("img",{key:t,src:e,className:z.a.image})}))),r.a.createElement("div",{className:B()(z.a.paneContainer,"right")},r.a.createElement("div",{className:z.a.button,role:"button",onClick:function(t){return e.toggleConfetti()}},"I love you!"))))}}]),t}(r.a.Component),V=Object(i.g)(b(J)),G=a(131),K=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(g.a)(this,Object(v.a)(t).call(this,e))).checkAccess=function(){var e=N();a.setState({hasAccess:e,isLoaded:!0})},a.state={hasAccess:!1,isLoaded:!1},a.checkAccess=a.checkAccess.bind(Object(y.a)(a)),a}return Object(_.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.checkAccess()}},{key:"render",value:function(){var e=this;if(!this.state.isLoaded)return null;var t=this.props,a=t.component,n=Object(G.a)(t,["component"]);return r.a.createElement(i.b,Object.assign({},n,{render:function(t){return e.state.hasAccess?r.a.createElement(a,t):r.a.createElement(i.a,{to:"/"})}}))}}]),t}(r.a.Component),Q=Object(i.g)(K);s.a.render(r.a.createElement(f.Provider,{value:new h},r.a.createElement(c.a,null,r.a.createElement(i.d,null,r.a.createElement(i.b,{exact:!0,path:"/",component:M}),r.a.createElement(Q,{exact:!0,path:"/iloveyou",component:V}),r.a.createElement(i.b,{component:M})))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},43:function(e,t,a){e.exports={container:"styles_container__2tJR3",form:"styles_form__GwXlb",header:"styles_header__1UISp",subheader:"styles_subheader__3VhGL",button:"styles_button__3y1M6"}},44:function(e,t,a){e.exports={container:"styles_container__2MdFG",text:"styles_text__iqrqT",smallText:"styles_smallText__2nesC"}}},[[133,1,2]]]);
//# sourceMappingURL=main.d8d22ba0.chunk.js.map