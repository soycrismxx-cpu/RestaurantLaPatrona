// Edita aquí los datos pendientes. WhatsApp: código de país + número, solo dígitos.
// El número de Dimo es exclusivamente de pago; no se usa para pedidos.
const CONFIG = { whatsapp: '', horario: '', direccion: '', contacto: '' };
const MENU = [
 {id:'caldos',title:'Pancita y birria',cards:[
 ['Pancita','', [['Chica',115],['Grande',120],['Consomé',45],['Tortilla · ½ docena',30],['Tortilla · docena',40]]],
 ['Birria','',[['Plato de birria',120],['Consomé',45],['Taco',40],['Quesabirria',45]]]]},
 {id:'antojitos',title:'Antojitos mexicanos',cards:[
 ['Sopecitos','ORDEN DE 6',[['Sencillo',40],['Pollo o longaniza',60],['Bistec, suadero o campechanos',80]]],
 ['Sopes','',[['Sencillo',30],['Pollo o longaniza',50],['Bistec, suadero o campechano',70]]],
 ['Enchiladas verdes','',[['Con pollo',100],['Con bistec o cecina',120],['Suizas',140]]],
 ['Chilaquiles verdes','',[['Sencillos',70],['Con huevo',80],['Pollo',100],['Con bistec o cecina',120]]],
 ['Huaraches','',[['Sencillos',40],['Huevo, pollo o longaniza',60],['Bistec, suadero, campechano o quesillo',80],['Quesillo extra',15]]],
 ['Tacos dorados','ORDEN DE 5',[['Pollo',70],['Quesillo',80],['Bañados en salsa verde',100]]],
 ['Tacos','CON NOPALES O PAPAS',[['Pollo',35],['Bistec, suadero, cecina o longaniza',35],['Quesillo extra',15]]],
 ['Quesadillas','',[['Pollo, queso u hongos',35],['Tinga o chicharrón',35],['Panza',40],['Quesillo extra',15]]],
 ['Tostadas','',[['Tinga',40],['Pata',40]]]]},
 {id:'ligero',title:'Sabor ligero',cards:[['A tu gusto','',[['Pechuga al grill',120],['Arrachera',140]]]]},
 {id:'bebidas',title:'Pan y bebidas',cards:[
 ['Pan','',[['Dulce',20],['Salado',6]]],
 ['Bebidas','',[['Café de olla',20],['Atole de temporada',30],['Coca, Sangría o Boing',25],['Coca · 3 litros',75],['Jarrito · 2 litros',50]]],
 ['Para refrescarte','',[['Refresco preparado',35],['Copa de agua del día',30],['Agua del día · 1 litro',45],['Agua del día · 2 litros',80],['Tarro escarchado',20]]]]}
];
const container = document.getElementById('menu-content');
for(const group of MENU){
 const section=document.createElement('section');section.className='menu-group';section.id=group.id;
 const title=document.createElement('h3');title.className='group-title';title.textContent=group.title;section.append(title);
 const grid=document.createElement('div');grid.className='menu-grid';
 for(const [name,subtitle,items] of group.cards){
  const card=document.createElement('article');card.className='menu-card';const h=document.createElement('h3');h.textContent=name;card.append(h);
  if(subtitle){const p=document.createElement('p');p.className='subtitle';p.textContent=subtitle;card.append(p);}
  const list=document.createElement('ul');
  for(const [dish,price] of items){const li=document.createElement('li');const label=document.createElement('span');label.textContent=dish;const amount=document.createElement('span');amount.className='price';amount.textContent=`$${price}`;li.append(label,amount);list.append(li);}
  card.append(list);grid.append(card);
 } section.append(grid);container.append(section);
}
const payment={clabe:'722969020741362396',all:'CLABE: 722969020741362396\nBeneficiario: Veronica Camacho Luna\nInstitución: Mercado Pago W\nCelular vinculado a Dimo: 525616780736'};
const receiptMessage='Hola, acabo de realizar mi transferencia. Adjunto mi comprobante de pago.';
const receiptLink=document.getElementById('receipt-whatsapp');
receiptLink.href=`https://wa.me/?text=${encodeURIComponent(receiptMessage)}`;
let toastTimer;
function notify(message){const toast=document.getElementById('toast');toast.textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.textContent='';},4000);}
async function copy(text){
 try{await navigator.clipboard.writeText(text);return true;}catch{
  const previous=document.activeElement;const area=document.createElement('textarea');area.value=text;area.setAttribute('aria-label','Datos para copiar');area.style.cssText='position:fixed;left:0;top:0;opacity:0';document.body.append(area);area.select();let success=false;try{success=document.execCommand('copy');}catch{}area.remove();previous?.focus();return success;
 }
}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const success=await copy(payment[button.dataset.copy]);document.getElementById('copy-help').hidden=success;notify(success?'Datos copiados.':'Selecciona y copia los datos manualmente.');}));
for(const [key,id] of [['horario','hours'],['direccion','address'],['contacto','contact']])if(CONFIG[key])document.getElementById(id).textContent=CONFIG[key];
if(/^\d{10,15}$/.test(CONFIG.whatsapp)){
 const link=document.getElementById('whatsapp');link.href=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hola, quisiera hacer un pedido en La Patrona. ¿Me ayudan?')}`;link.hidden=false;document.getElementById('order-note').textContent='Escríbenos para consultar disponibilidad y hacer tu pedido.';
 receiptLink.href=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(receiptMessage)}`;
}
