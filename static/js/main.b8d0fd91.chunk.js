(this.webpackJsonpjtdp=this.webpackJsonpjtdp||[]).push([[0],{127:function(e,t,n){e.exports={input:"styles_input__2gjR5"}},132:function(e,t,n){e.exports=n.p+"static/media/heart.de7e3083.png"},135:function(e,t,n){e.exports=n(261)},153:function(e,t){},155:function(e,t){},193:function(e,t){},194:function(e,t){},261:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(126),i=n.n(o),s=n(34),c=n(28),l=n(17),u=n(35),m=n.n(u),f={apiKey:"AIzaSyBWyqYKmwZrc74LWhyb4zTccPQZkPtwDVA",authDomain:"jtdp-60b3d.firebaseapp.com",databaseURL:"https://jtdp-60b3d.firebaseio.com",projectId:"jtdp-60b3d",storageBucket:"jtdp-60b3d.appspot.com",messagingSenderId:"786415873557",appId:"1:786415873557:web:defecb2e86a857bf8b281c"},d=r.a.createContext(null),p=function e(){var t=this;Object(l.a)(this,e),this.signInWithEmail=function(e,n,a){t.auth.signInWithEmailAndPassword(e,n).then((function(){return a({success:!0})})).catch((function(e){return a({success:!1,err:e})}))},this.fetchAllImageUrls=function(e){t.storage.ref().listAll().then((function(t){Promise.all(t.prefixes.map((function(e){return new Promise((function(t,n){e.listAll().then((function(a){Promise.all(a.items.map((function(e){return e.getDownloadURL()}))).then((function(n){return t({name:e.name,urls:n})})).catch((function(e){return n(e)}))})).catch((function(e){return n(e)}))}))}))).then((function(t){return e({success:!0,data:t})})).catch((function(t){return e({success:!1,err:t})}))})).catch((function(t){return e({success:!1,err:t})}))},this.fetchLetter=function(e,t){m.a.database().ref().child("letters").once("value",(function(n){if(n.val()){var a=n.val()[e];t({success:!0,text:a})}else t({success:!1})}))},this.incrementConfettiCount=function(){var e,n=t.auth.currentUser;n&&(e=n.email.startsWith("j")?"Jasmine":"Dylan",m.a.database().ref("clicks").child(e).transaction((function(e){return(e||0)+1})))},this.uploadDylanImage=function(e,n){var a="Dylan"===n?"dylan-pics/":"couple-pics/";t.storage.ref().child(a+e.name).put(e)},m.a.initializeApp(f),this.auth=m.a.auth(),this.storage=m.a.storage()},h=function(e){return function(t){return r.a.createElement(d.Consumer,null,(function(n){return r.a.createElement(e,Object.assign({},t,{firebase:n}))}))}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var b=n(21),g=n(23),y=n(22),v=n(19),_=n(24),E=n(43),C=n.n(E),j=n(134),I=n(127),O=n.n(I),k=function(e){var t=e.placeholder,n=e.onChange,a=e.autoFocus,o=e.value,i=e.width,s=e.type,c=e.customStyle,l=e.id;return r.a.createElement("input",{className:O.a.input,style:Object(j.a)({width:"calc(".concat(i," - 20px)")},c),id:l,placeholder:t,onChange:n,type:s||"text",autoFocus:a?"autofocus":"",value:o})},w=n(75),N=n.n(w),x=function(){try{N.a.verify(localStorage.getItem("jwt-token"),"wCDMNmSbsNPa1pBOgRuE");return!0}catch(e){return!1}},A=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(g.a)(this,Object(y.a)(t).call(this,e))).state={email:"",password:"",isLoggedIn:!1},n.firebase=e.firebase,n.onSubmit=n.onSubmit.bind(Object(v.a)(n)),n}return Object(_.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){console.log("Mounted"),this.setState({isLoggedIn:x()})}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),this.firebase.signInWithEmail(this.state.email,this.state.password,(function(e){var n,a;e.success?(n=t.state.email,a=function(e){e?console.error(e):t.props.history.push("/iloveyou")},N.a.sign({user:n},"wCDMNmSbsNPa1pBOgRuE",{expiresIn:2592e3},(function(e,t){e?a(e):(localStorage.setItem("jwt-token",t),a())}))):console.error(e.err)}))}},{key:"render",value:function(){var e=this;return this.state.isLoggedIn?r.a.createElement(c.a,{to:"/iloveyou"}):r.a.createElement("div",{className:C.a.container},r.a.createElement("form",{onSubmit:this.onSubmit,className:C.a.form},r.a.createElement("div",{className:C.a.header},"Hi love :)"),r.a.createElement(k,{value:this.state.email,onChange:function(t){return e.setState({email:t.target.value})},placeholder:"email",type:"text",width:"80%"}),r.a.createElement(k,{customStyle:{marginTop:"15px"},value:this.state.password,onChange:function(t){return e.setState({password:t.target.value})},placeholder:"password",type:"password",width:"80%"}),r.a.createElement("input",{className:C.a.button,type:"submit",value:"Login",tabIndex:0})))}}]),t}(r.a.Component),S=Object(c.g)(h(A)),M=n(54),U=n(130),D=n(74),P=n(131),B=n.n(P),L=n(78),T=n.n(L),W=n(9),z=n.n(W),F=n(44),R=n.n(F),J=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(g.a)(this,Object(y.a)(t).call(this,e))).props=e,n}return Object(_.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:R.a.container},r.a.createElement("u",{className:R.a.smallText},"Countdown to 10 month anniversary"),r.a.createElement(D.a,{date:"2020-08-06T05:00:00+00:00",renderer:function(e){return e.completed?r.a.createElement("div",{className:R.a.text},"Happy Anniversary!"):r.a.createElement("div",{className:R.a.text},e.days,"d ",e.hours,"h ",e.minutes,"m ",e.seconds,"s")}}))}}]),t}(r.a.Component),V=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(g.a)(this,Object(y.a)(t).call(this,e))).pushConfettiElement=function(){n.setState({confettiElements:[].concat(Object(M.a)(n.state.confettiElements),[r.a.createElement(B.a,{key:n.state.confettiNumber,colors:["#ff00ff","#ff0000","#ffb6c1","#f774b4"],drawShape:function(e){return n.drawHeart(e,0,0,15,15)},recycle:!1,onConfettiComplete:n.removeConfettiElement})]),confettiNumber:n.state.confettiNumber+1})},n.removeConfettiElement=function(){var e=n.state.confettiElements;e.shift(),n.setState({confettiElements:e})},n.fetchAllImageUrls=function(e){n.firebase.fetchAllImageUrls((function(e){e.success?(e.data.forEach((function(e){n.allImages[e.name]=e.urls})),n.updateImageUrlsAndImageMode("couple-pics")):console.error(e.err)}))},n.drawHeart=function(e,t,n,a,r){e.beginPath();var o=.3*r;e.moveTo(t,n+o),e.bezierCurveTo(t,n,t-a/2,n,t-a/2,n+o),e.bezierCurveTo(t-a/2,n+(r+o)/2,t,n+(r+o)/2,t,n+r),e.bezierCurveTo(t,n+(r+o)/2,t+a/2,n+(r+o)/2,t+a/2,n+o),e.bezierCurveTo(t+a/2,n,t,n,t,n+o),e.stroke(),e.fill(),e.closePath()},n.updateImageUrlsAndImageMode=function(e){if(n.state.imageMode!==e){var t=[];"all"===e?Object.keys(n.allImages).forEach((function(e){return t.push.apply(t,Object(M.a)(n.allImages[e]))})):t.push.apply(t,Object(M.a)(n.allImages[e])),n.setState({imageMode:e,imageUrls:n._shuffleArray(t)})}},n.toggleConfetti=function(){n.firebase.incrementConfettiCount(),n.pushConfettiElement()},n.uploadImage=function(e,t){n.firebase.uploadDylanImage(e.target.files[0],t)},n._shuffleArray=function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}return e},n.state={imageMode:"",imageUrls:[],confettiNumber:1,confettiElements:[]},n.allImages={},n.firebase=e.firebase,n.fetchAllImageUrls=n.fetchAllImageUrls.bind(Object(v.a)(n)),n.updateImageUrlsAndImageMode=n.updateImageUrlsAndImageMode.bind(Object(v.a)(n)),n.toggleConfetti=n.toggleConfetti.bind(Object(v.a)(n)),n.uploadImage=n.uploadImage.bind(Object(v.a)(n)),n}return Object(_.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.fetchAllImageUrls(),this.pushConfettiElement()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:z.a.container},this.state.confettiElements.map((function(e){return e})),r.a.createElement("div",{className:z.a.buttonContainer},r.a.createElement("div",{className:"couple-pics"===this.state.imageMode?z.a.buttonSelected:z.a.button,role:"button",onClick:function(t){return e.updateImageUrlsAndImageMode("couple-pics")}},"Couple"),r.a.createElement("div",{className:"all"===this.state.imageMode?z.a.buttonSelected:z.a.button,role:"button",onClick:function(t){return e.updateImageUrlsAndImageMode("all")}},"Both"),r.a.createElement("div",{className:"dylan-pics"===this.state.imageMode?z.a.buttonSelected:z.a.button,role:"button",onClick:function(t){return e.updateImageUrlsAndImageMode("dylan-pics")}},"Dylan")),r.a.createElement("div",{className:z.a.mainContentContainer},r.a.createElement("div",{className:T()(z.a.paneContainer,"left")},r.a.createElement(J,null)),r.a.createElement(U.Fade,Object.assign({},{duration:5e3,transitionDuration:500,infinite:!0,indicators:!1},{className:z.a.gallery}),this.state.imageUrls.map((function(e,t){return r.a.createElement("img",{key:t,src:e,className:z.a.image})}))),r.a.createElement("div",{className:T()(z.a.paneContainer,"right")},r.a.createElement("div",{className:z.a.button,role:"button",onClick:function(t){return e.toggleConfetti()}},"I love you!"))),r.a.createElement("div",{className:z.a.filePickerContainer},r.a.createElement("input",{type:"file",onChange:function(t){return e.uploadImage(t,"Dylan")},style:{display:"none"},ref:function(t){return e.fileInput=t}}),r.a.createElement("button",{className:z.a.filePickerButton,onClick:function(){return e.fileInput.click()}},"Upload Dylan Image"),r.a.createElement("input",{type:"file",onChange:function(t){return e.uploadImage(t,"Couple")},style:{display:"none"},ref:function(t){return e.coupleFileInput=t}}),r.a.createElement("button",{className:z.a.filePickerButton,onClick:function(){return e.coupleFileInput.click()}},"Upload Couple Image")))}}]),t}(r.a.Component),q=Object(c.g)(h(V)),H=n(53),G=n.n(H),K=n(132),Q=n.n(K),X=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(g.a)(this,Object(y.a)(t).call(this,e))).firebase=e.firebase,n.state={letter:""},n}return Object(_.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.firebase.fetchLetter("six-month",(function(t){t.success?e.setState({letter:t.text}):console.error("Error retrieving data")}))}},{key:"render",value:function(){return r.a.createElement("div",{className:G.a.container},r.a.createElement("div",{className:G.a.textContainer},this.state.letter.split("\\n").map((function(e){return r.a.createElement("p",null,e)}))),r.a.createElement("div",{className:G.a.image},r.a.createElement("img",{src:Q.a})))}}]),t}(a.Component),Y=h(Object(c.g)(X)),Z=n(133),$=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(g.a)(this,Object(y.a)(t).call(this,e))).checkAccess=function(){var e=x();n.setState({hasAccess:e,isLoaded:!0})},n.state={hasAccess:!1,isLoaded:!1},n.checkAccess=n.checkAccess.bind(Object(v.a)(n)),n}return Object(_.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.checkAccess()}},{key:"render",value:function(){var e=this;if(!this.state.isLoaded)return null;var t=this.props,n=t.component,a=Object(Z.a)(t,["component"]);return r.a.createElement(c.b,Object.assign({},a,{render:function(t){return e.state.hasAccess?r.a.createElement(n,t):r.a.createElement(c.a,{to:"/"})}}))}}]),t}(r.a.Component),ee=Object(c.g)($);i.a.render(r.a.createElement(d.Provider,{value:new p},r.a.createElement(s.a,null,r.a.createElement(c.d,null,r.a.createElement(c.b,{exact:!0,path:"/",component:S}),r.a.createElement(ee,{exact:!0,path:"/iloveyou",component:q}),r.a.createElement(ee,{exact:!0,path:"/sixmonths",component:Y}),r.a.createElement(c.b,{component:S})))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},43:function(e,t,n){e.exports={container:"styles_container__2tJR3",form:"styles_form__GwXlb",header:"styles_header__1UISp",subheader:"styles_subheader__3VhGL",button:"styles_button__3y1M6"}},44:function(e,t,n){e.exports={container:"styles_container__2MdFG",text:"styles_text__iqrqT",smallText:"styles_smallText__2nesC"}},53:function(e,t,n){e.exports={container:"styles_container__19NJp",textContainer:"styles_textContainer__B6SEM",image:"styles_image__Ce49u"}},9:function(e,t,n){e.exports={container:"styles_container__1dViq",buttonContainer:"styles_buttonContainer__2Bt1d",filePickerContainer:"styles_filePickerContainer__MtY7Q",filePickerButton:"styles_filePickerButton__1V8IK",mainContentContainer:"styles_mainContentContainer__24AwM",button:"styles_button__1mMk9",buttonSelected:"styles_buttonSelected__3xAfS",paneContainer:"styles_paneContainer__2orr4",left:"styles_left__1X500",center:"styles_center__1m3dU",right:"styles_right__2Bb0Q",image:"styles_image__1cU1t",gallery:"styles_gallery__1yrV0"}}},[[135,1,2]]]);
//# sourceMappingURL=main.b8d0fd91.chunk.js.map