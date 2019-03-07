(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(22),i=a.n(c),o=(a(55),a(2)),s=a(3),l=a(5),u=a(7),m=a(6),h=a(8),d=(a(56),a(115)),g=a(114),p=a(32),v=a(18),f=a.n(v),b=function e(){var t=this;Object(s.a)(this,e),this.getMovieshowAll=function(){return t.service.get("/").then(function(e){return e.data})},this.getMovieshowDetail=function(e){return t.service.get("/".concat(e)).then(function(e){return e.data})};var a=f.a.create({baseURL:"".concat("https://app-travelling.herokuapp.com","/api/movieshow"),withCredentials:!0});this.service=a},E=function e(){var t=this;Object(s.a)(this,e),this.getLocationAll=function(){return t.service.get("/").then(function(e){return e.data})},this.getLocationDetail=function(e){return t.service.get("/".concat(e)).then(function(e){return e.data})},this.getComments=function(e){return t.service.get("/".concat(e,"/comments")).then(function(e){return e.data})};var a=f.a.create({baseURL:"".concat("https://app-travelling.herokuapp.com","/api/location"),withCredentials:!0});this.service=a},O=(a(40),a(76),a(104)),j=(a(77),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).changeTextSearch=function(e){a.setState(Object(o.a)({},a.state,{search:e.target.value})),a.props.changeTextSearch(e.target.value)},a.getPadding=function(){return 0===a.state.search.length?"20% 20%":"10px 20px"},a.state={search:""},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{padding:this.getPadding()}},r.a.createElement("input",{type:"search",results:"5",name:"search",className:"form-control search",onChange:function(t){return e.changeTextSearch(t)},placeholder:"Search..."}))}}]),t}(n.Component)),w=12,y=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).getAllMovies=function(){return a.movieService.getMovieshowAll().then(function(e){return e.map(function(e){return{_id:e._id,name:e.title,address:"",backgroundUrl:e.backgroundUrl,url:"/movieshow/".concat(e._id)}})})},a.getAllLocation=function(){return a.locationService.getLocationAll().then(function(e){return e.map(function(e){return{_id:e._id,name:e.name,address:e.address,backgroundUrl:e.images[0],url:"/location/".concat(e._id)}})})},a.getBackground=function(){if(!(a.state.textToSearch.length>0)){var e=Math.floor(Math.random()*w);return a.state.items.map(function(e){return e.backgroundUrl})[e]}},a.changeTextSearch=function(e){if(e.length>0){var t=a.state.originalItems.filter(function(t){return t.name.toLowerCase().includes(e.toLowerCase())||t.address.toLowerCase().includes(e.toLowerCase())});a.setState(Object(o.a)({},a.state,{items:t,textToSearch:e}))}else a.setState(Object(o.a)({},a.state,{items:a.state.originalItems,textToSearch:e}))},a.getItemsToShow=function(){return a.state.textToSearch.length>0?a.state.items:a.state.items.filter(function(e,t){return t<w})},a.state={textToSearch:"",items:[],originalItems:[]},a.movieService=new b,a.locationService=new E,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;Promise.all([this.getAllMovies(),this.getAllLocation()]).then(function(t){var a=[].concat(Object(p.a)(t[0]),Object(p.a)(t[1]));e.setState(Object(o.a)({},e.state,{items:a,originalItems:a}))})}},{key:"render",value:function(){return null!==this.state.items?r.a.createElement("div",null,r.a.createElement("div",{className:"home-background",style:{backgroundImage:"url(".concat(this.getBackground(),")")}},r.a.createElement(j,{changeTextSearch:this.changeTextSearch})),r.a.createElement("div",{className:"card-deck "},this.getItemsToShow().map(function(e){return r.a.createElement("div",{key:e._id,className:"card"},r.a.createElement("div",{className:"thumbnail"},r.a.createElement(O.a,{to:e.url,style:{textDecoration:"none"}},r.a.createElement("img",{src:e.backgroundUrl,alt:"background",className:"card-img-top img-card"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},e.name)))))}))):r.a.createElement("h1",null,"En estos momentos no hay informaci\xf3n disponible")}}]),t}(n.Component),k=a(20),S=function(){function e(){var t=this;Object(s.a)(this,e),this.signup=function(e,a,n){return t.service.post("/signup",{username:e,email:a,password:n}).then(function(e){return e.data})},this.loggedin=function(){return t.service.get("/loggedin").then(function(e){return e.data})},this.login=function(e,a){return t.service.post("/login",{email:e,password:a}).then(function(e){return e.data})},this.logout=function(){return t.service.post("/logout").then(function(e){return e.data})},this.updatePhotoProfile=function(e){return t.loggedin().then(function(a){return a.imageUrl=e.imageUrl,t.service.post("/update",a).then(function(e){return e.data})})};var a=f.a.create({baseURL:"".concat("https://app-travelling.herokuapp.com","/api/auth"),withCredentials:!0});this.service=a}return Object(l.a)(e,[{key:"handleUpload",value:function(e){return this.service.post("/upload",e).then(function(e){return e.data})}}]),e}(),N=(a(41),a(113)),U=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=a.state,n=t.username,r=t.email,c=t.password;a.service.signup(n,r,c).then(function(e){a.setState(Object(o.a)({},a.state,{username:"",email:"",password:"",user:e})),a.props.changeUser(e)}).catch(function(e){return console.log(e)})},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(k.a)({},n,r))},a.state={username:"",email:"",password:"",user:void 0},a.service=new S,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return this.state.user?r.a.createElement(N.a,{to:"/profile"}):r.a.createElement("div",{className:"form box-container"},r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("img",{src:"/images/travelling-icon-orange.png",alt:"icon"}),r.a.createElement("div",{className:"form-group container"},r.a.createElement("h3",null,"Sign Up"),r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",name:"username",className:"form-control",placeholder:"name",value:this.state.username,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("label",null,"Email:"),r.a.createElement("input",{type:"email",name:"email",className:"form-control",placeholder:"email",value:this.state.email,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",name:"password",className:"form-control",placeholder:"password",value:this.state.password,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"submit",value:"Signup",className:"button"})),r.a.createElement("p",null,"Already have account?",r.a.createElement(O.a,{to:"/login"}," Login"))))}}]),t}(n.Component),C=a(16),L=(a(81),a(105)),x=a(106),F=a(107),I=a(108),D=a(109),A=a(110),_=a(111),M=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).componentWillReceiveProps=function(e){a.setState(Object(o.a)({},a.state,{loggedInUser:e.user}))},a.fetchUser=function(){a.service.loggedin().then(function(e){a.setState({loggedInUser:e}),a.props.changeUser(e)})},a.logoutUser=function(){a.service.logout().then(function(){a.setState({loggedInUser:null}),a.props.changeUser(null)})},a.toggle=a.toggle.bind(Object(C.a)(Object(C.a)(a))),a.state={loggedInUser:null,isOpen:!1},a.service=new S,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.fetchUser()}},{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=this;return r.a.createElement(L.a,{dark:"true",className:"nav",expand:"sm"},r.a.createElement(x.a,{href:"/"},r.a.createElement("img",{src:"/images/travelling-icon.png",alt:""})),r.a.createElement(F.a,{onClick:this.toggle}),r.a.createElement(I.a,{className:"justify-content-end",isOpen:this.state.isOpen,navbar:!0},this.state.loggedInUser?r.a.createElement(D.a,{navbar:!0},r.a.createElement(A.a,null,r.a.createElement(_.a,{href:"/profile"},r.a.createElement("span",null,"Profile"))),r.a.createElement(A.a,null,r.a.createElement(_.a,{href:"/"},r.a.createElement("button",{onClick:function(){return e.logoutUser()}},r.a.createElement("span",null,"Logout"))))):r.a.createElement(D.a,{navbar:!0},r.a.createElement(A.a,null,r.a.createElement(_.a,{href:"/login"},r.a.createElement("span",null,"Login"))),r.a.createElement(A.a,null,r.a.createElement(_.a,{href:"/signup"},r.a.createElement("span",{className:"button"},"SignUp"))))))}}]),t}(n.Component),T=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=a.state,n=t.email,r=t.password;a.service.login(n,r).then(function(e){a.setState(Object(o.a)({},a.state,{email:"",password:"",user:e})),a.props.changeUser(e)}).catch(function(e){return console.log(e)})},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(k.a)({},n,r))},a.state={username:"",email:"",password:"",user:void 0},a.service=new S,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return this.state.user?r.a.createElement(N.a,{to:"/profile"}):r.a.createElement("div",{className:"form box-container"},r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("img",{src:"/images/travelling-icon-orange.png",alt:"icon"}),r.a.createElement("div",{className:"form-group container"},r.a.createElement("h3",null,"Login"),r.a.createElement("label",null,"Email:"),r.a.createElement("input",{type:"email",name:"email",className:"form-control",placeholder:"email",value:this.state.email,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",name:"password",className:"form-control",placeholder:"password",value:this.state.password,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"submit",value:"Login",className:"button"})),r.a.createElement("p",null,"Don't have account?",r.a.createElement(O.a,{to:"/signup"}," Signup"))))}}]),t}(n.Component),P=(a(89),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleFileUpload=function(e){console.log("The file to be uploaded is: ",e.target.files[0]);var t=new FormData;t.append("imageUrl",e.target.files[0]),a.service.handleUpload(t).then(function(e){a.setState({imageUrl:e.imageUrl}),a.service.updatePhotoProfile({imageUrl:e.imageUrl}).then(function(e){console.log(e)})}).catch(function(e){console.log("Error while uploading the file: ",e)})},a.state={imageUrl:"http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png"},a.service=new S,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){void 0!==this.props.imageUrl&&this.setState(Object(o.a)({},this.state,{imageUrl:this.props.imageUrl}))}},{key:"componentWillReceiveProps",value:function(e){this.setState(Object(o.a)({},this.state,{imageUrl:e.imageUrl}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{className:"photo"},r.a.createElement("form",null,r.a.createElement("input",{className:"button-file",type:"file",onChange:function(t){return e.handleFileUpload(t)}})),r.a.createElement("img",{src:this.state.imageUrl,alt:"user profile"})))}}]),t}(n.Component)),R=(a(90),function e(){var t=this;Object(s.a)(this,e),this.getFavorites=function(){return t.service.get("/").then(function(e){return e.data})},this.deleteFavorite=function(e){return t.service.delete("/".concat(e)).then(function(e){return e.data})},this.addFavorite=function(e){return t.service.post("/",{locationId:e}).then(function(e){return e.data})};var a=f.a.create({baseURL:"".concat("https://app-travelling.herokuapp.com","/api/account/me/favorite"),withCredentials:!0});this.service=a}),W=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={locations:[],loggedInUser:null,user:null},a.service=new S,a.serviceAccount=new R,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.service.loggedin().then(function(t){console.log(t),e.setState(Object(o.a)({},e.state,{user:t})),e.props.changeUser(t)}),this.serviceAccount.getFavorites().then(function(t){e.setState(Object(o.a)({},e.state,{locations:t}))})}},{key:"componentWillReceiveProps",value:function(e){this.setState(Object(o.a)({},this.state,{loggedInUser:e.user}))}},{key:"render",value:function(){return console.log(this.props.loggedInUser),null!==this.props.loggedInUser&&null!==this.state.user?r.a.createElement("div",{className:"profile-container"},r.a.createElement("div",{className:"profile-box"},r.a.createElement("h2",null,"Welcome ",this.state.user.username,"!"),r.a.createElement(P,{imageUrl:this.state.user.imageUrl}),r.a.createElement("h5",null,"My favorites places"),r.a.createElement("div",{className:"card-deck "},this.state.locations.map(function(e){return r.a.createElement("div",{key:e._id,className:"card"},r.a.createElement("div",{class:"thumbnail"},r.a.createElement(O.a,{to:"/location/".concat(e._id),style:{textDecoration:"none"}},r.a.createElement("img",{src:e.images[0],alt:"pic place",className:"card-img-top img-card"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h6",{className:"card-title"},e.name)))))})))):r.a.createElement("div",null,"No estoy logueado")}}]),t}(n.Component),B=a(27),J=(a(46),Object(B.c)({accessToken:"pk.eyJ1Ijoic25vbWJlbGEiLCJhIjoiY2pzd2Nya2N6MGVvcTQzcHY4dDZvM2hpdiJ9.qU7Q0XZ7_De3cGHerk9rOA"})),q=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).getCenter=function(e){var t=e.reduce(function(e,t){return e.latitude+=parseFloat(t.latitude),e.longitude+=parseFloat(t.longitude),e},{latitude:0,longitude:0});return t.latitude=t.latitude/e.length,t.longitude=t.longitude/e.length,t},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.getCenter(this.props.locations);return r.a.createElement(J,{style:"mapbox://styles/mapbox/light-v9",center:[e.longitude,e.latitude],zoom:[4],containerStyle:{height:"50vh",width:"100%"}},r.a.createElement(B.b,{type:"symbol",id:"marker",layout:{"icon-image":"marker-15"}},this.props.locations.map(function(e){return r.a.createElement(B.a,{coordinates:[e.longitude,e.latitude]})})))}}]),t}(n.Component),z=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).getMovieshow=function(e){a.service.getMovieshowDetail(e).then(function(e){a.setState(Object(o.a)({},a.state,{movieshow:e}))})},a.state={movieshow:null},a.service=new b,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getMovieshow(this.props.match.params.id)}},{key:"render",value:function(){return null!==this.state.movieshow?r.a.createElement("div",null,r.a.createElement("div",{className:"image-background",style:{backgroundImage:"url(".concat(this.state.movieshow.backgroundUrl,")")}}),r.a.createElement("img",{src:this.state.movieshow.posterUrl,alt:"poster",className:"poster"}),r.a.createElement("span",{className:"movieshow-title"},this.state.movieshow.title),r.a.createElement("div",{className:"card-deck "},this.state.movieshow.locations.map(function(e,t){return r.a.createElement("div",{key:e._id,className:"card"},r.a.createElement("div",{className:"thumbnail"},r.a.createElement(O.a,{to:"/location/".concat(e._id),style:{textDecoration:"none"}},r.a.createElement("img",{src:e.images[0],alt:"pic place",className:"card-img-top img-card"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},e.name)))))})),this.state.movieshow.locations.length>0?r.a.createElement("div",{className:"map"},r.a.createElement(q,{locations:this.state.movieshow.locations})):r.a.createElement("div",null)):r.a.createElement("div",null)}}]),t}(n.Component),G=(a(98),function e(){var t=this;Object(s.a)(this,e),this.sendComment=function(e,a,n){var r={locationId:e,content:a,title:n};return t.service.post("/",r).then(function(e){return e.data})};var a=f.a.create({baseURL:"".concat("https://app-travelling.herokuapp.com","/api/comment"),withCredentials:!0});this.service=a}),H=(a(99),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleFormSubmit=function(e){var t=a.state,n=t.comment,r=t.title;a.service.sendComment(a.props.locationId,n,r).then(function(e){a.setState(Object(o.a)({},a.state,{title:"",comment:""})),a.props.changeComment(e)}).catch(function(e){return console.log(e)}),e.preventDefault()},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(k.a)({},n,r))},a.state={title:"",collapse:!1,comment:""},a.toggle=a.toggle.bind(Object(C.a)(Object(C.a)(a))),a.service=new G,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"toggle",value:function(){this.setState(function(e){return{collapse:!e.collapse}})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("div",{className:"form-group comment-container"},r.a.createElement("input",{type:"text",name:"title",className:"form-control",value:this.state.title,onChange:function(t){return e.handleChange(t)},placeholder:"Description"}),r.a.createElement("textarea",{type:"text",name:"comment",className:"form-control",value:this.state.comment,onChange:function(t){return e.handleChange(t)},placeholder:"What's your opinion?"}),r.a.createElement("input",{type:"submit",value:"Submit",className:"btn btn-primary btn-submit"}))))}}]),t}(n.Component)),Q=a(49),Y=a.n(Q),Z=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).getLocation=function(){var e=a.props.match.params.id;return a.serviceLocation.getLocationDetail(e).then(function(e){a.setState(Object(o.a)({},a.state,{location:e}))})},a.getComments=function(){var e=a.props.match.params.id;a.serviceLocation.getComments(e).then(function(e){console.log(e),a.setState(Object(o.a)({},a.state,{comments:e}))})},a.getFavorites=function(){var e=a.props.match.params.id;a.serviceAccount.getFavorites().then(function(t){var n=1===t.filter(function(t){return t._id===e}).length;a.setState(Object(o.a)({},a.state,{isFavorite:n}))})},a.changeComment=function(e){a.getComments()},a.clickFavButton=function(){var e=a.props.match.params.id;a.state.isFavorite?a.serviceAccount.deleteFavorite(e):a.serviceAccount.addFavorite(e),a.setState(Object(o.a)({},a.state,{isFavorite:!a.state.isFavorite}))},a.getDateFormatted=function(e){return e.split("T")[0].split("-").reverse().join("/")},a.state={isFavorite:!1,location:null,comments:[]},a.serviceLocation=new E,a.serviceAccount=new R,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getLocation(),this.getComments(),this.getFavorites()}},{key:"render",value:function(){var e=this;return null!==this.state.location?r.a.createElement("div",null,r.a.createElement("div",{className:"carrusel-container"},r.a.createElement(Y.a,{version:4},this.state.location.images.map(function(e){return r.a.createElement("img",{className:"image-carrusel",src:e,alt:"images"})}))),r.a.createElement("div",{className:"info-container"},r.a.createElement("div",{className:"left-container"},r.a.createElement("div",{className:"title-container"},r.a.createElement("h1",null,this.state.location.name),r.a.createElement("button",{className:"button-fav",onClick:this.clickFavButton},this.state.isFavorite?r.a.createElement("img",{src:"/images/red-heart.png",alt:"heart"}):r.a.createElement("img",{src:"/images/grey-heart.png",alt:"heart"}))),r.a.createElement("h4",null,this.state.location.address),r.a.createElement("p",null,this.state.location.description)),r.a.createElement("div",{className:"right-container"},r.a.createElement(q,{locations:[this.state.location]}))),this.state.comments.map(function(t){return r.a.createElement("div",{key:t},r.a.createElement("div",{className:"media"},r.a.createElement("img",{className:"align-self-start mr-3",src:t.userId.imageUrl,alt:"user pic"}),r.a.createElement("div",{className:"media-body"},r.a.createElement("h5",null,e.getDateFormatted(t.userId.username)+" - "+e.getDateFormatted(t.created_at)),r.a.createElement("h6",{className:"mt-0"},t.title),r.a.createElement("p",null,t.content))))}),r.a.createElement(H,{locationId:this.state.location._id,changeComment:this.changeComment})):r.a.createElement("div",null)}}]),t}(n.Component),V=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).getAllMovies=function(){return a.movieService.getMovieshowAll().then(function(e){return e.map(function(e){return{_id:e._id,name:e.title,address:"",backgroundUrl:e.backgroundUrl,url:"/movieshow/".concat(e._id)}})})},a.getAllLocation=function(){return a.locationService.getLocationAll().then(function(e){return e.map(function(e){return{_id:e._id,name:e.name,address:e.address,backgroundUrl:e.images[0],url:"/location/".concat(e._id)}})})},a.handleFormSearch=function(e){var t=e.target.value;if(a.setState(Object(o.a)({},a.state,{search:t})),t.length>0){var n=a.state.originalItems.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())||e.address.toLowerCase().includes(t.toLowerCase())});a.setState(Object(o.a)({},a.state,{items:n}))}else a.setState(Object(o.a)({},a.state,{items:a.state.originalItems}))},a.state={items:null,originalItems:null,search:""},a.movieService=new b,a.locationService=new E,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getAllMovies().then(function(t){e.getAllLocation().then(function(a){console.log(t);var n=t.concat(a);e.setState(Object(o.a)({},e.state,{items:n,originalItems:n}))})})}},{key:"render",value:function(){var e=this;return null!==this.state.items?r.a.createElement("div",null,r.a.createElement("input",{type:"text",name:"search",className:"form-control",onChange:function(t){return e.handleFormSearch(t)},placeholder:"enter your query"}),r.a.createElement(O.a,{to:"/search"}),r.a.createElement("div",{className:"card-deck "},this.state.items.map(function(e){return r.a.createElement("div",{key:e._id,className:"card"},r.a.createElement(O.a,{to:e.url,style:{textDecoration:"none"}},r.a.createElement("img",{src:e.backgroundUrl,alt:"background",className:"card-img-top img-card"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h6",{className:"card-title"},e.name))))}))):r.a.createElement("div",null)}}]),t}(n.Component),X=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleFormSearch=function(e){var t=e.target.value;if(a.setState(Object(o.a)({},a.state,{search:t})),t.length>0){var n=a.state.originalLocation.filter(function(e){return e.address.toLowerCase().includes(t.toLowerCase())||e.name.toLowerCase().includes(t.toLowerCase())});a.setState(Object(o.a)({},a.state,{location:n}))}else a.setState(Object(o.a)({},a.state,{location:a.state.originalLocation}))},a.state={location:null,originalLocation:null,search:""},a.service=new E,a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.service.getLocationAll().then(function(t){e.setState(Object(o.a)({},e.state,{location:t,originalLocation:t}))})}},{key:"render",value:function(){var e=this;return null!==this.state.location?r.a.createElement("div",null,r.a.createElement("input",{type:"text",name:"search",className:"form-control",onChange:function(t){return e.handleFormSearch(t)},placeholder:"enter your query"}),r.a.createElement(O.a,{to:"/search"}),r.a.createElement("div",{className:"card-deck "},this.state.location.map(function(e){return r.a.createElement("div",{key:e._id,className:"card"},r.a.createElement(O.a,{to:"/location/".concat(e._id),style:{textDecoration:"none"}},r.a.createElement("img",{src:e.images[0],alt:"pic place",className:"card-img-top img-card"}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},e.name),r.a.createElement("p",null,e.address))))}))):r.a.createElement("div",null)}}]),t}(n.Component),$=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).changeUser=function(e){a.setState(Object(o.a)({},a.state,{user:e,loggedInUser:!0}))},a.state={loggedInUser:null,user:null},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state.loggedInUser;return r.a.createElement("div",{className:"App"},r.a.createElement(M,{changeUser:this.changeUser,user:this.state.user}),r.a.createElement(d.a,null,r.a.createElement(g.a,{exact:!0,path:"/",component:y}),r.a.createElement(g.a,{exact:!0,path:"/signup",render:function(){return r.a.createElement(U,{changeUser:e.changeUser})}}),r.a.createElement(g.a,{exact:!0,path:"/login",render:function(){return r.a.createElement(T,{changeUser:e.changeUser})}}),r.a.createElement(g.a,{exact:!0,path:"/profile",render:function(){return r.a.createElement(W,{changeUser:e.changeUser,loggedInUser:t})}}),r.a.createElement(g.a,{exact:!0,path:"/movieshow/:id",component:z}),r.a.createElement(g.a,{exact:!0,path:"/location/:id",component:Z}),r.a.createElement(g.a,{exact:!0,path:"/search",component:V}),r.a.createElement(g.a,{exact:!0,path:"/searchLocation",component:X})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(100),a(101);var K=a(112);i.a.render(r.a.createElement(K.a,null,r.a.createElement($,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},40:function(e,t,a){},41:function(e,t,a){},50:function(e,t,a){e.exports=a(102)},55:function(e,t,a){},56:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},81:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){}},[[50,1,2]]]);
//# sourceMappingURL=main.72b7cd11.chunk.js.map