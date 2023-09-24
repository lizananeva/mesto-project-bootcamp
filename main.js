(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-12",headers:{authorization:"16ed90c9-12a0-4919-8ff0-430d22a9bbfe","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=document.querySelectorAll(".popup"),o=function(e){"Escape"===e.key&&n.forEach((function(e){return a(e)}))},r=function(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&a(e.target.closest(".popup"))},c=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",o)},a=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",o)};n.forEach((function(e){e.addEventListener("mousedown",r)}));var u=document.getElementById("card").content.querySelector(".photo-grid__item"),i=document.querySelector(".photo-grid__list"),s=document.querySelector(".popup_type_photo"),l=s.querySelector(".popup__image"),d=s.querySelector(".popup__caption"),f=document.querySelector(".popup_type_delete-card"),m={},p=function(n,o){var r=u.cloneNode(!0),a=r.querySelector(".photo__image"),i=r.querySelector(".photo__caption"),p=r.querySelector(".photo__like-button"),v=r.querySelector(".photo__like-count"),h=r.querySelector(".photo__delete-button");return a.src=n.link,a.alt=n.name,i.textContent=n.name,v.textContent=n.likes.length,n.likes.some((function(e){return e._id===o}))&&p.classList.add("photo__like-button_active"),n.owner._id!==o&&h.remove(),a.addEventListener("click",(function(e){c(s),l.src=a.src,l.alt=a.alt,d.textContent=a.alt})),p.addEventListener("click",(function(o){var r;o.target.classList.contains("photo__like-button_active")?(r=n._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){o.target.classList.remove("photo__like-button_active"),v.textContent=e.likes.length})).catch((function(e){return console.log(e.status)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(n._id).then((function(e){o.target.classList.add("photo__like-button_active"),v.textContent=e.likes.length})).catch((function(e){return console.log(e.status)}))})),h.addEventListener("click",(function(){c(f),m.id=n._id,m.card=r})),r},v=function(e){i.prepend(e)},h=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove("".concat(n.errorClass,"_active")),o.textContent=""},_=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){h(e,n,t)}))},y=function(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0},b=function(e,t){e.classList.remove(t.inactiveButtonClass),e.disabled=!1},S=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?b(t,n):y(t,n)},E=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?o:n},L=document.querySelector(".profile__edit-button"),q=document.querySelector(".popup_type_edit-profile"),k=document.forms.profile,g=k.elements.name,C=k.elements.about,x=document.querySelector(".profile__name"),U=document.querySelector(".profile__about"),A=document.querySelector(".profile__avatar"),T=document.querySelector(".profile__avatar-edit-button"),B=document.querySelector(".popup_type_edit-avatar"),D=document.forms.avatar,w=D.elements.link,P=D.querySelector(".form__save"),N=document.querySelector(".profile__add-button"),O=document.querySelector(".popup_type_add-card"),j=document.forms.card,J=j.elements.name,G=j.elements.link,H=j.querySelector(".form__save"),z=document.forms.delete,I={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__save",inactiveButtonClass:"form__save_disabled",inputErrorClass:"form__input_invalid",errorClass:"form__input-error"};Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t=e[0],n=e[1];x.textContent=t.name,U.textContent=t.about,A.src=t.avatar,n.forEach((function(e){var n=p(e,t._id);v(n)}))})).catch((function(e){return console.log(e.status)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);S(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?h(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.classList.add("".concat(o.errorClass,"_active")),r.textContent=n}(e,t,t.validationMessage,n)}(e,r,t),S(n,o,t)}))}))}(t,e)}))}(I),L.addEventListener("click",(function(e){g.value=x.textContent,C.value=U.textContent,_(k,I),b(k.querySelector(I.submitButtonSelector),I),c(q)})),T.addEventListener("click",(function(e){D.reset(),y(P,I),_(D,I),c(B)})),N.addEventListener("click",(function(e){j.reset(),y(H,I),_(j,I),c(O)})),k.addEventListener("submit",(function(n){var o;n.preventDefault(),E(!0,n.submitter),(o={name:g.value,about:C.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o.name,about:o.about})}).then((function(e){return t(e)}))).then((function(e){x.textContent=e.name,U.textContent=e.about,a(q)})).catch((function(e){return console.log(e.status)})).finally((function(){return E(!1,n.submitter)}))})),D.addEventListener("submit",(function(n){var o;n.preventDefault(),E(!0,n.submitter),(o={avatar:w.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o.avatar})}).then((function(e){return t(e)}))).then((function(e){A.src=e.avatar,a(B)})).catch((function(e){return console.log(e.status)})).finally((function(){return E(!1,n.submitter)}))})),j.addEventListener("submit",(function(n){var o;n.preventDefault(),E(!0,n.submitter),(o={name:J.value,link:G.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o.name,link:o.link})}).then((function(e){return t(e)}))).then((function(e){var t=p(e,e.owner._id);v(t),a(O)})).catch((function(e){return console.log(e.status)})).finally((function(){return E(!1,n.submitter)}))})),z.addEventListener("submit",(function(n){var o;n.preventDefault(),(o=m.id,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(){m.card.remove(),a(f)})).catch((function(e){return console.log(e.status)}))}))})();