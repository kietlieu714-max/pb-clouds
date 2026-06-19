
function toggleLang(){
  var b=document.body,isEN=b.dataset.lang==='en';
  b.dataset.lang=isEN?'es':'en';
  document.getElementById('langBtn').textContent=isEN?'EN / ES':'ES / EN';
}

// Scroll to top on load and set language from URL
window.addEventListener('DOMContentLoaded', function(){
  window.scrollTo(0, 0);
  // Hide I Want to Play on first slide
  var btn=document.getElementById('heroBtn');
  if(btn) btn.style.display='none';
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  if(urlLang === 'es' || urlLang === 'en') {
    document.body.setAttribute('data-lang', urlLang);
    document.getElementById('langBtn').textContent = urlLang === 'en' ? 'ES / EN' : 'EN / ES';
  }

  // Swap to mobile portrait images on small screens
  if(window.innerWidth <= 767){
    var mobileImages = {
      'slide-2': 'images/image-1-mobile.jpg',
      'slide-3': 'images/image-2-mobile.jpg',
      'slide-4': 'images/image-3-mobile.jpg',
      'slide-5': 'images/image-5-mobile.jpg'
    };
    Object.keys(mobileImages).forEach(function(cls){
      var el = document.querySelector('.'+cls);
      if(el) el.style.backgroundImage = "url('"+mobileImages[cls]+"')";
    });
  }
});

var cur=0,tot=5,autoT,startX=0;
function goTo(n){
  cur=(n+tot)%tot;
  document.getElementById('slidesWrap').style.transform='translateX('+(-cur*100)+'%)';
  document.querySelectorAll('.dot').forEach(function(d,i){d.classList.toggle('active',i===cur);});
  // Hide I Want to Play on slide 1 (index 0), show on all others
  var btn=document.getElementById('heroBtn');
  if(btn) btn.style.display=cur===0?'none':'inline-block';
}
function nextSlide(){goTo(cur+1);resetAuto();}
function prevSlide(){goTo(cur-1);resetAuto();}
function resetAuto(){clearInterval(autoT);autoT=setInterval(function(){goTo(cur+1);},5500);}
autoT=setInterval(function(){goTo(cur+1);},5500);

var hero=document.getElementById('hero');
hero.addEventListener('touchstart',function(e){startX=e.touches[0].clientX;},{passive:true});
hero.addEventListener('touchend',function(e){
  var d=startX-e.changedTouches[0].clientX;
  if(Math.abs(d)>45){d>0?nextSlide():prevSlide();}
},{passive:true});

function selectExp(el,val){
  document.querySelectorAll('.exp-btn').forEach(function(b){b.classList.remove('active');});
  el.classList.add('active');
  document.getElementById('fexp').value=val;
}
var selDays=new Set();
function toggleDay(el,val){
  selDays.has(val)?selDays.delete(val):selDays.add(val);
  el.classList.toggle('active',selDays.has(val));
  document.getElementById('fdays').value=Array.from(selDays).join(',');
}
var selTimes=new Set();
function toggleTime(el,val){
  selTimes.has(val)?selTimes.delete(val):selTimes.add(val);
  el.classList.toggle('active',selTimes.has(val));
  document.getElementById('ftimes').value=Array.from(selTimes).join(',');
}
async function submitForm(e){
  e.preventDefault();
  var btn=document.getElementById('submitBtn');
  var lang=document.body.getAttribute('data-lang')||'en';
  var name=document.getElementById('fname').value.trim();
  var whatsapp=document.getElementById('fwa').value.trim();
  var email=document.getElementById('femail').value.trim();
  var experience=document.getElementById('fexp').value;
  var free_days=document.getElementById('fdays').value;
  var time_preference=document.getElementById('ftimes').value;
  
  // Clear any previous error messages
  document.querySelectorAll('.form-error-msg').forEach(el => el.remove());
  
  var hasError=false;
  
  // Validate name
  if(!name){
    var msg=lang==='en'?'Please fill in your name':'Por favor completa tu nombre';
    var err=document.createElement('div');
    err.className='form-error-msg';
    err.textContent=msg;
    err.style.color='#ff6b6b';
    err.style.fontSize='12px';
    err.style.marginTop='4px';
    document.getElementById('fname').parentNode.appendChild(err);
    hasError=true;
  }
  
  // Validate whatsapp
  if(!whatsapp){
    var msg=lang==='en'?'Please fill in your WhatsApp number':'Por favor completa tu número de WhatsApp';
    var err=document.createElement('div');
    err.className='form-error-msg';
    err.textContent=msg;
    err.style.color='#ff6b6b';
    err.style.fontSize='12px';
    err.style.marginTop='4px';
    document.getElementById('fwa').parentNode.appendChild(err);
    hasError=true;
  }
  
  if(hasError){
    // Scroll to signup form
    document.getElementById('signup').scrollIntoView({behavior:'smooth', block:'start'});
    return;
  }
  
  btn.disabled=true;
  btn.innerHTML='<span class="spinner"></span>'+(lang==='en'?'Saving...':'Guardando...');
  try{
    var res=await fetch('/api/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:name,whatsapp:whatsapp,email:email,experience:experience,free_days:free_days,time_preference:time_preference})
    });
    if(res.ok||res.status===201){
      document.getElementById('signupForm').style.display='none';
      document.getElementById('successState').style.display='block';
    }else{
      throw new Error('Network error');
    }
  }catch(err){
    btn.disabled=false;
    btn.innerHTML='<span class="en">Try Again →</span><span class="es">Intentar de Nuevo →</span>';
  }
}
