
function toggleLang(){
  var b=document.body,isEN=b.dataset.lang==='en';
  b.dataset.lang=isEN?'es':'en';
  document.getElementById('langBtn').textContent=isEN?'EN / ES':'ES / EN';
}

// Auto-set language from URL parameter
window.addEventListener('DOMContentLoaded', function(){
  var urlLang = new URLSearchParams(window.location.search).get('lang');
  if(urlLang === 'es' || urlLang === 'en') {
    document.body.setAttribute('data-lang', urlLang);
    document.getElementById('langBtn').textContent = urlLang === 'en' ? 'ES / EN' : 'EN / ES';
  }
});

var cur=0,tot=5,autoT,startX=0;
function goTo(n){
  cur=(n+tot)%tot;
  document.getElementById('slidesWrap').style.transform='translateX('+(-cur*100)+'%)';
  document.querySelectorAll('.dot').forEach(function(d,i){d.classList.toggle('active',i===cur);});
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
    var res=await fetch('https://zmpzumykgmugrgepaoef.supabase.co/rest/v1/pickleball_signups',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptcHp1bXlrZ211Z3JnZXBhb2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNTkwNzUsImV4cCI6MjA1OTczNTA3NX0.BhBPsVCpXhVXQ8G0_0dA_L0TFiI1p_ghOj5kBXLj8qE',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptcHp1bXlrZ211Z3JnZXBhb2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNTkwNzUsImV4cCI6MjA1OTczNTA3NX0.BhBPsVCpXhVXQ8G0_0dA_L0TFiI1p_ghOj5kBXLj8qE',
        'Prefer':'return=minimal'
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
