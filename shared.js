/* ===== UAE PROPERTIES - SHARED JS (UPDATED) ===== */

// ===== DATA =====
const defaultCityAreas = {
    'Dubai':['Downtown Dubai','Palm Jumeirah','Dubai Marina','JLT','Business Bay','Arabian Ranches','Jumeirah','Deira','Bur Dubai','Al Barsha'],
    'Abu Dhabi':['Corniche','Al Reem Island','Yas Island','Saadiyat Island','Khalifa City','Al Raha Beach','Al Bateen'],
    'Sharjah':['Al Majaz','Al Nahda','Al Taawun','Al Khan','Al Qasimia'],
    'Ajman':['Al Nuaimia','Al Rashidiya','Al Jurf','Al Mowaihat'],
    'Ras Al Khaimah':['Al Hamra Village','Al Marjan Island','Mina Al Arab'],
    'Fujairah':['Al Faseel','Al Reef','Al Maktoum'],
    'Umm Al Quwain':['Al Salamah','Al Raas','Al Aahad']
};
const defaultSubAreas = {
    'Downtown Dubai':['Burj Khalifa','The Address','South Ridge','The Lofts'],
    'Palm Jumeirah':['Atlantis','The Palm Tower','Shoreline','Frond Villas'],
    'Dubai Marina':['Marina Walk','JBR','Marina Towers'],
    'JLT':['Cluster A','Cluster B','Cluster C','Cluster D'],
    'Business Bay':['Executive Towers','Bay Avenue','Marquise Square']
};
// Sub area Google Maps links
const subAreaMapsLinks = {
    'Downtown Dubai':'https://maps.google.com/?q=Downtown+Dubai,UAE',
    'Palm Jumeirah':'https://maps.google.com/?q=Palm+Jumeirah,Dubai,UAE',
    'Dubai Marina':'https://maps.google.com/?q=Dubai+Marina,Dubai,UAE',
    'JLT':'https://maps.google.com/?q=Jumeirah+Lake+Towers,Dubai,UAE',
    'Business Bay':'https://maps.google.com/?q=Business+Bay,Dubai,UAE',
    'Arabian Ranches':'https://maps.google.com/?q=Arabian+Ranches,Dubai,UAE',
    'Jumeirah':'https://maps.google.com/?q=Jumeirah,Dubai,UAE',
    'Deira':'https://maps.google.com/?q=Deira,Dubai,UAE',
    'Bur Dubai':'https://maps.google.com/?q=Bur+Dubai,Dubai,UAE',
    'Al Barsha':'https://maps.google.com/?q=Al+Barsha,Dubai,UAE',
    'Corniche':'https://maps.google.com/?q=Corniche,Abu+Dhabi,UAE',
    'Al Reem Island':'https://maps.google.com/?q=Al+Reem+Island,Abu+Dhabi,UAE',
    'Yas Island':'https://maps.google.com/?q=Yas+Island,Abu+Dhabi,UAE',
    'Saadiyat Island':'https://maps.google.com/?q=Saadiyat+Island,Abu+Dhabi,UAE',
    'Khalifa City':'https://maps.google.com/?q=Khalifa+City,Abu+Dhabi,UAE',
    'Al Raha Beach':'https://maps.google.com/?q=Al+Raha+Beach,Abu+Dhabi,UAE',
    'Al Bateen':'https://maps.google.com/?q=Al+Bateen,Abu+Dhabi,UAE',
};

let customAreas = JSON.parse(localStorage.getItem('customAreas')) || JSON.parse(JSON.stringify(defaultCityAreas));
let customSubAreas = JSON.parse(localStorage.getItem('customSubAreas')) || JSON.parse(JSON.stringify(defaultSubAreas));
let customSubAreaLinks = JSON.parse(localStorage.getItem('customSubAreaLinks')) || {};
// Nearest points with categories
let customNearestPoints = JSON.parse(localStorage.getItem('customNearestPoints')) || {};

const propertyTypes = [
    'Studio Apartment','Bed Space','Partition','Room','Hall',
    '1 BHK','2 BHK','3 BHK','4 BHK','5 BHK','6 BHK','7 BHK','8 BHK','9 BHK','10 BHK',
    '11 BHK','12 BHK','13 BHK','14 BHK','15 BHK','16 BHK','17 BHK','18 BHK','19 BHK','20 BHK',
    'Villa','1 BHK Villa','2 BHK Villa','3 BHK Villa','4 BHK Villa','5 BHK Villa','6 BHK Villa',
    '7 BHK Villa','8 BHK Villa','9 BHK Villa','10 BHK Villa','11 BHK Villa','12 BHK Villa',
    '13 BHK Villa','14 BHK Villa','15 BHK Villa','16 BHK Villa','17 BHK Villa','18 BHK Villa',
    '19 BHK Villa','20 BHK Villa',
    'Warehouse','Shop','Office - Building','Office - Street'
];

const DATA_VERSION = 'v7';
if(localStorage.getItem('dataVersion') !== DATA_VERSION){
    localStorage.removeItem('properties');
    localStorage.setItem('dataVersion', DATA_VERSION);
}
let properties = JSON.parse(localStorage.getItem('properties')) || [];

// Seed sample data with nearest places
if(properties.length===0){
    const today=new Date();
    const in1day=new Date(today); in1day.setDate(in1day.getDate()+1);
    const in7days=new Date(today); in7days.setDate(in7days.getDate()+7);
    const in3days=new Date(today); in3days.setDate(in3days.getDate()+3);
    const day0=new Date(today);
    const day1=new Date(today); day1.setDate(day1.getDate()-1);
    const day2=new Date(today); day2.setDate(day2.getDate()-2);
    properties=[
        {id:1,profileCode:'561',title:'Skyline Residencies',city:'Dubai',area:'Dubai Marina',subArea:'Marina Walk',type:'Studio Apartment',price:280000,propertyStatus:'rent',rentalType:'monthly',bedrooms:0,bathrooms:1,areaSize:500,description:'Beautiful studio in prime location with stunning marina views.',amenities:{balcony:'yes',attachedWashroom:'yes',window:'yes',commonWashroom:'no',fullClosed:'yes',genderPreference:'male',kidsAllowed:'no',bachelorsAllowed:'yes'},imageLabels:{main:'Balcony',second:'Master Bedroom',third:'Kitchen',fourth:'Living Room',fifth:'Bathroom',sixth:'View'},images:['https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800','https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800','https://images.unsplash.com/photo-1560448075-bb4caa6c0c39?w=800','https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800','https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=800'],contact:{whatsapp:'+971 50 123 4567',phone:'+971 4 987 6543'},locationLink:'https://maps.google.com/?q=Dubai+Marina,Dubai,UAE',videoUrl:'https://www.youtube.com/embed/dQw4w9WgXcQ',userId:'user',status:'approved',createdAt:day2.toISOString(),availableFrom:in1day.toISOString(),availableIn:'1 day',timerUpdatedAt:day2.toISOString(),nearestPlaces:[{name:'Marina Mall',category:'Market',mapLink:'https://maps.google.com/?q=Marina+Mall,Dubai'},{name:'Mediclinic',category:'Hospital',mapLink:'https://maps.google.com/?q=Mediclinic+Dubai+Marina'}]},
        {id:2,profileCode:'562',title:'Luxury Villa with Pool',city:'Dubai',area:'Palm Jumeirah',subArea:'Shoreline',type:'5 BHK Villa',price:8500000,propertyStatus:'sale',rentalType:'sale',bedrooms:5,bathrooms:7,areaSize:5000,description:'Luxury villa with private pool and beach access.',amenities:{balcony:'yes',attachedWashroom:'yes',window:'yes',commonWashroom:'no',fullClosed:'yes',genderPreference:'female',kidsAllowed:'yes',bachelorsAllowed:'no'},imageLabels:{main:'Balcony',second:'Master Bedroom',third:'Kitchen',fourth:'Pool',fifth:'Garden',sixth:'View'},images:['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'],contact:{whatsapp:'+971 50 987 6543',phone:'+971 4 123 4567'},locationLink:'https://maps.google.com/?q=Palm+Jumeirah,Dubai,UAE',videoUrl:'https://www.youtube.com/embed/3AtDnEC4zak',userId:'user',status:'approved',createdAt:day1.toISOString(),availableFrom:in7days.toISOString(),availableIn:'7 days',timerUpdatedAt:day1.toISOString(),nearestPlaces:[{name:'Nakheel Mall',category:'Market',mapLink:'https://maps.google.com/?q=Nakheel+Mall'},{name:'Palm Mosque',category:'Mosque',mapLink:'https://maps.google.com/?q=Palm+Mosque'}]},
        {id:3,profileCode:'563',title:'Modern 2BHK Near Mall',city:'Abu Dhabi',area:'Al Reem Island',subArea:'',type:'2 BHK',price:95000,propertyStatus:'rent',rentalType:'yearly',bedrooms:2,bathrooms:2,areaSize:1200,description:'Modern 2 BHK apartment with great amenities.',amenities:{balcony:'yes',attachedWashroom:'yes',window:'yes',commonWashroom:'no',fullClosed:'no',genderPreference:'male',kidsAllowed:'yes',bachelorsAllowed:'yes'},imageLabels:{main:'Living Room',second:'Bedroom 1',third:'Kitchen',fourth:'Bedroom 2',fifth:'Bathroom',sixth:'View'},images:['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800','https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800','https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800'],contact:{whatsapp:'+971 55 456 7890',phone:'+971 2 345 6789'},locationLink:'https://maps.google.com/?q=Al+Reem+Island,Abu+Dhabi,UAE',videoUrl:'https://www.youtube.com/embed/ScMzIvxBSi4',userId:'user',status:'approved',createdAt:day0.toISOString(),availableFrom:in3days.toISOString(),availableIn:'3 days',timerUpdatedAt:day0.toISOString(),nearestPlaces:[]}
    ];
    localStorage.setItem('properties',JSON.stringify(properties));
}

// ===== UTILITY =====
function showToast(msg){
    const t=document.getElementById('notificationToast');
    if(!t)return;
    document.getElementById('toastMessage').textContent=msg;
    t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),3000);
}
function hideToast(){const t=document.getElementById('notificationToast');if(t)t.classList.remove('show');}

function formatDate(d){
    const diff=Math.ceil((new Date()-new Date(d))/(1000*60*60*24));
    if(diff<=1)return'Today';if(diff===2)return'Yesterday';return diff+' days ago';
}
function formatCardDate(d){
    if(!d)return'';
    try{return new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});}
    catch(e){return'';}
}
function getStatusText(s){return{rent:'For Rent',sale:'For Sale','under-construction':'Under Construction','sold-out':'Sold Out'}[s]||s}

// ===== AREA MANAGEMENT =====
function loadAreasForUpload(){
    const city=document.getElementById('propertyCity')?.value;
    const sel=document.getElementById('propertyArea');
    const subSel=document.getElementById('propertySubArea');
    if(!sel)return;
    if(!city){sel.innerHTML='<option value="">Select Area</option>';if(subSel)subSel.innerHTML='<option value="">Select Sub Area</option>';return;}
    const areas=customAreas[city]||[];
    sel.innerHTML='<option value="">Select Area</option>'+areas.map(a=>`<option value="${a}">${a}</option>`).join('');
    if(subSel)subSel.innerHTML='<option value="">Select Sub Area</option>';
}
function loadSubAreasForUpload(){
    const area=document.getElementById('propertyArea')?.value;
    const sel=document.getElementById('propertySubArea');
    if(!sel)return;
    if(!area){sel.innerHTML='<option value="">Select Sub Area</option>';return;}
    const sub=customSubAreas[area]||[];
    sel.innerHTML='<option value="">Select Sub Area</option>'+sub.map(s=>`<option value="${s}">${s}</option>`).join('');
}
function addAreaFromUpload(){
    const city=document.getElementById('propertyCity')?.value;
    const newArea=document.getElementById('uploadNewAreaInput')?.value.trim();
    if(!city)return alert('Please select a City first.');
    if(!newArea)return alert('Please enter an area name.');
    if(!customAreas[city])customAreas[city]=[];
    if(customAreas[city].includes(newArea))return alert('Area already exists.');
    customAreas[city].push(newArea);
    localStorage.setItem('customAreas',JSON.stringify(customAreas));
    if(document.getElementById('uploadNewAreaInput'))document.getElementById('uploadNewAreaInput').value='';
    loadAreasForUpload();
    if(document.getElementById('propertyArea'))document.getElementById('propertyArea').value=newArea;
    loadSubAreasForUpload();
    showToast('Area added: '+newArea);
}
function addSubAreaFromUpload(){
    const area=document.getElementById('propertyArea')?.value;
    const newSub=document.getElementById('uploadNewSubAreaInput')?.value.trim();
    const mapLink=document.getElementById('uploadSubAreaMapLink')?.value.trim()||'';
    if(!area)return alert('Please select an Area first.');
    if(!newSub)return alert('Please enter a sub area name.');
    if(!customSubAreas[area])customSubAreas[area]=[];
    if(customSubAreas[area].includes(newSub))return alert('Sub area already exists.');
    customSubAreas[area].push(newSub);
    localStorage.setItem('customSubAreas',JSON.stringify(customSubAreas));
    if(mapLink){customSubAreaLinks[newSub]=mapLink;localStorage.setItem('customSubAreaLinks',JSON.stringify(customSubAreaLinks));}
    if(document.getElementById('uploadNewSubAreaInput'))document.getElementById('uploadNewSubAreaInput').value='';
    if(document.getElementById('uploadSubAreaMapLink'))document.getElementById('uploadSubAreaMapLink').value='';
    loadSubAreasForUpload();
    if(document.getElementById('propertySubArea'))document.getElementById('propertySubArea').value=newSub;
    if(typeof loadNearestPointsForUpload==='function')loadNearestPointsForUpload();
    showToast('Sub Area added: '+newSub);
}

// ===== NEAREST PLACES FUNCTIONS =====
const placeCategories = [
    {value:'school',label:'🏫 School',icon:'fa-school'},
    {value:'hospital',label:'🏥 Hospital',icon:'fa-hospital'},
    {value:'mosque',label:'🕌 Mosque',icon:'fa-mosque'},
    {value:'market',label:'🛒 Market/Supermarket',icon:'fa-store'},
    {value:'park',label:'🌳 Park',icon:'fa-tree'},
    {value:'restaurant',label:'🍽️ Restaurant',icon:'fa-utensils'},
    {value:'metro',label:'🚇 Metro Station',icon:'fa-subway'},
    {value:'bus',label:'🚌 Bus Stop',icon:'fa-bus'},
    {value:'mall',label:'🏬 Mall',icon:'fa-shopping-mall'},
    {value:'pharmacy',label:'💊 Pharmacy',icon:'fa-capsules'},
    {value:'gym',label:'💪 Gym',icon:'fa-dumbbell'},
    {value:'bank',label:'🏦 Bank',icon:'fa-landmark'}
];

function loadNearestPointsForUpload(){
    const subArea=document.getElementById('propertySubArea')?.value||'';
    const section=document.getElementById('nearestPlacesSection');
    const container=document.getElementById('nearestPlacesContainer');
    if(!section)return;
    if(!subArea){
        section.style.display='none';
        return;
    }
    section.style.display='block';
    // Load existing nearest places for this sub area
    const existingPlaces = customNearestPoints[subArea] || [];
    if(container){
        container.innerHTML = existingPlaces.map((place, idx) => `
            <div class="nearest-place-item" data-idx="${idx}">
                <div class="np-header">
                    <i class="fas ${placeCategories.find(c=>c.value===place.category)?.icon || 'fa-map-marker-alt'}"></i>
                    <strong>${place.name}</strong>
                    <span class="np-category">${placeCategories.find(c=>c.value===place.category)?.label || place.category}</span>
                    <button type="button" class="np-remove" onclick="removeNearestPlace('${subArea.replace(/'/g,"\\'")}', '${place.name.replace(/'/g,"\\'")}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                ${place.mapLink ? `<a href="${place.mapLink}" target="_blank" class="np-map-link"><i class="fas fa-map-marker-alt"></i> View on Map</a>` : ''}
            </div>
        `).join('');
        if(existingPlaces.length === 0){
            container.innerHTML = '<p class="np-empty">No nearest places added yet. Use the form below to add places like schools, hospitals, mosques, markets, etc.</p>';
        }
    }
    // Populate category dropdown
    const catSelect = document.getElementById('nearestPlaceCategory');
    if(catSelect){
        catSelect.innerHTML = placeCategories.map(c => `<option value="${c.value}">${c.label}</option>`).join('');
    }
}

function addNearestPlace(){
    const subArea = document.getElementById('propertySubArea')?.value||'';
    const name = document.getElementById('newNearestPlaceName')?.value.trim();
    const category = document.getElementById('nearestPlaceCategory')?.value;
    const mapLink = document.getElementById('newNearestPlaceMapLink')?.value.trim();
    
    if(!subArea){
        showToast('Please select a Sub Area first');
        return;
    }
    if(!name){
        showToast('Please enter a place name');
        return;
    }
    if(!category){
        showToast('Please select a category');
        return;
    }
    
    if(!customNearestPoints[subArea]) customNearestPoints[subArea] = [];
    if(customNearestPoints[subArea].find(p => p.name.toLowerCase() === name.toLowerCase())){
        showToast('This place already exists for this sub area');
        return;
    }
    
    customNearestPoints[subArea].push({
        name: name,
        category: category,
        mapLink: mapLink || `https://maps.google.com/?q=${encodeURIComponent(name + ',' + subArea + ',UAE')}`
    });
    localStorage.setItem('customNearestPoints', JSON.stringify(customNearestPoints));
    
    // Clear inputs
    if(document.getElementById('newNearestPlaceName')) document.getElementById('newNearestPlaceName').value = '';
    if(document.getElementById('newNearestPlaceMapLink')) document.getElementById('newNearestPlaceMapLink').value = '';
    
    loadNearestPointsForUpload();
    showToast(`Added: ${name} (${placeCategories.find(c=>c.value===category)?.label})`);
}

function removeNearestPlace(subArea, name){
    if(!confirm(`Remove "${name}" from nearest places?`)) return;
    if(customNearestPoints[subArea]){
        customNearestPoints[subArea] = customNearestPoints[subArea].filter(p => p.name !== name);
        localStorage.setItem('customNearestPoints', JSON.stringify(customNearestPoints));
        loadNearestPointsForUpload();
        showToast('Removed: ' + name);
    }
}

function getSelectedNearestPlaces(){
    const subArea = document.getElementById('propertySubArea')?.value||'';
    const selectedPlaces = [];
    const checkboxes = document.querySelectorAll('#nearestPlacesContainer input[type="checkbox"]:checked');
    checkboxes.forEach(cb => {
        const idx = parseInt(cb.getAttribute('data-idx'));
        if(!isNaN(idx) && customNearestPoints[subArea] && customNearestPoints[subArea][idx]){
            selectedPlaces.push(customNearestPoints[subArea][idx]);
        }
    });
    return selectedPlaces;
}

// ===== IMAGE UPLOAD =====
function triggerUpload(n){const el=document.getElementById('img'+n);if(el)el.click();}
function previewImage(n){
    const file=document.getElementById('img'+n)?.files[0];
    if(!file)return;
    const r=new FileReader();
    r.onload=e=>{
        const img=document.getElementById('prev'+n);
        if(img){img.src=e.target.result;img.classList.add('has-image');}
        const ph=document.getElementById('ph'+n);if(ph)ph.classList.add('hidden');
        const rm=document.getElementById('rm'+n);if(rm)rm.classList.add('visible');
    };
    r.readAsDataURL(file);
}
function removeImage(e,n){
    if(e)e.stopPropagation();
    const img=document.getElementById('prev'+n);
    if(img){img.src='';img.classList.remove('has-image');}
    const ph=document.getElementById('ph'+n);if(ph)ph.classList.remove('hidden');
    const rm=document.getElementById('rm'+n);if(rm)rm.classList.remove('visible');
    const inp=document.getElementById('img'+n);if(inp)inp.value='';
}
function getUploadedImages(){
    const imgs=[];
    for(let i=1;i<=6;i++){const el=document.getElementById('prev'+i);imgs.push(el&&el.src&&el.src!==window.location.href?el.src:'');}
    return imgs;
}
function getImageLabels(){
    // Updated labels for better property terms
    return{
        main:document.getElementById('lbl1')?.value||'Balcony',
        second:document.getElementById('lbl2')?.value||'Bedroom',
        third:document.getElementById('lbl3')?.value||'Kitchen',
        fourth:document.getElementById('lbl4')?.value||'Living Room',
        fifth:document.getElementById('lbl5')?.value||'Bathroom',
        sixth:document.getElementById('lbl6')?.value||'Area View'
    };
}

// ===== VIDEO UTILS =====
let _uploadedVideoDataUrl=null;
function switchVideoTab(tab,btn){
    document.querySelectorAll('.video-tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.video-tab-content').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('videoTab'+tab.charAt(0).toUpperCase()+tab.slice(1)).classList.add('active');
}
function extractYouTubeID(url){
    if(!url)return null;
    const patterns=[/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,/youtu\.be\/([^&\n?#]+)/];
    for(let p of patterns){const m=url.match(p);if(m)return m[1];}
    if(url.includes('/embed/')){const p=url.split('/embed/');if(p.length>1){const id=p[1].split('?')[0];if(id)return id;}}
    return null;
}
function getYouTubeEmbedUrl(url){
    if(!url)return null;
    const id=extractYouTubeID(url);
    if(id)return`https://www.youtube.com/embed/${id}`;
    if(url.includes('/embed/'))return url;
    return null;
}
function previewVideoUrl(){
    const url=document.getElementById('propertyVideoUrl')?.value.trim();
    const preview=document.getElementById('videoUrlPreview');
    if(!preview)return;
    preview.innerHTML='';preview.classList.remove('show');
    if(!url)return;
    const embedUrl=getYouTubeEmbedUrl(url);
    if(embedUrl){preview.innerHTML=`<iframe src="${embedUrl}" allowfullscreen frameborder="0" allow="autoplay; encrypted-media"></iframe>`;preview.classList.add('show');}
    else if(/\.(mp4|webm|ogg|mov)$/i.test(url)){preview.innerHTML=`<video src="${url}" controls></video>`;preview.classList.add('show');}
    else showToast('Invalid video URL.');
}
function handleVideoFileSelect(input){
    const file=input.files[0];
    if(!file)return;
    if(file.size>100*1024*1024){showToast('Video too large! Max 100MB.');input.value='';return;}
    document.getElementById('videoFileName').textContent=file.name+' ('+(file.size/(1024*1024)).toFixed(1)+'MB)';
    document.getElementById('videoFileSelected').classList.add('show');
    const reader=new FileReader();
    reader.onload=e=>{_uploadedVideoDataUrl=e.target.result;const p=document.getElementById('videoFilePreview');if(p){p.innerHTML=`<video src="${e.target.result}" controls></video>`;p.classList.add('show');}};
    reader.readAsDataURL(file);
    showToast('Video selected: '+file.name);
}
function removeVideoFile(){
    const fi=document.getElementById('videoFileInput');if(fi)fi.value='';
    const fs=document.getElementById('videoFileSelected');if(fs)fs.classList.remove('show');
    const fp=document.getElementById('videoFilePreview');if(fp){fp.classList.remove('show');fp.innerHTML='';}
    _uploadedVideoDataUrl=null;showToast('Video removed');
}
function getFinalVideoUrl(){
    const urlTab=document.getElementById('videoTabUrl');
    if(urlTab&&urlTab.classList.contains('active'))return document.getElementById('propertyVideoUrl')?.value.trim()||'';
    return _uploadedVideoDataUrl||'';
}

// ===== MAP MODAL =====
function openMapModal(subArea, locationLink){
    let mapUrl = locationLink || customSubAreaLinks[subArea] || subAreaMapsLinks[subArea] || '';
    if(!mapUrl) mapUrl = `https://maps.google.com/?q=${encodeURIComponent(subArea+',UAE')}`;
    let embedUrl = mapUrl;
    if(mapUrl.includes('maps.google.com')&&!mapUrl.includes('/embed')){
        const q = mapUrl.split('?q=')[1]||encodeURIComponent(subArea+',UAE');
        embedUrl = `https://maps.google.com/maps?q=${q}&output=embed&z=15`;
    }
    document.getElementById('mapModalTitle').textContent = subArea||'Location';
    document.getElementById('mapIframe').src = embedUrl;
    document.getElementById('mapModal').classList.add('active');
}
function closeMapModal(){
    document.getElementById('mapModal').classList.remove('active');
    document.getElementById('mapIframe').src='';
}

// ===== IMAGE LIGHTBOX =====
let _lbImages=[],_lbIndex=0,_lbPropertyId=null;
function openLightbox(propertyId,startIndex){
    const p=properties.find(pr=>pr.id===propertyId);
    if(!p)return;
    _lbPropertyId=propertyId;
    _lbImages=(p.images||[]).filter(x=>x&&x.trim());
    if(_lbImages.length===0)return;
    _lbIndex=(typeof startIndex==='number'&&startIndex>=0&&startIndex<_lbImages.length)?startIndex:0;
    _renderLightbox();
    document.getElementById('imgLightbox').classList.add('active');
    document.body.style.overflow='hidden';
}
function closeLightbox(){
    document.getElementById('imgLightbox').classList.remove('active');
    document.body.style.overflow='';
}
function _renderLightbox(){
    document.getElementById('lbMainImg').src=_lbImages[_lbIndex];
    document.getElementById('lbCounter').textContent=(_lbIndex+1)+' / '+_lbImages.length;
    const thumbs=document.getElementById('lbThumbs');
    if(thumbs)thumbs.innerHTML=_lbImages.map((src,i)=>`<div class="lb-thumb ${i===_lbIndex?'active':''}" onclick="lbGoTo(${i})"><img src="${src}" loading="lazy"></div>`).join('');
    setTimeout(()=>{const active=thumbs?.querySelector('.lb-thumb.active');if(active)active.scrollIntoView({block:'nearest',inline:'center'});},50);
}
function lbGoTo(i){_lbIndex=i;_renderLightbox();}
function lbNext(){_lbIndex=(_lbIndex+1)%_lbImages.length;_renderLightbox();}
function lbPrev(){_lbIndex=(_lbIndex-1+_lbImages.length)%_lbImages.length;_renderLightbox();}
function lbDownloadCurrent(){if(!_lbImages[_lbIndex])return;downloadSingleImage(_lbImages[_lbIndex],'property_image_'+(_lbIndex+1));}
function lbDownloadPDF(){if(!_lbPropertyId)return;closeLightbox();downloadPropertyPDF(_lbPropertyId);}
document.addEventListener('keydown',function(e){
    const lb=document.getElementById('imgLightbox');
    if(!lb||!lb.classList.contains('active'))return;
    if(e.key==='ArrowRight')lbNext();
    else if(e.key==='ArrowLeft')lbPrev();
    else if(e.key==='Escape')closeLightbox();
});

// ===== SINGLE IMAGE DOWNLOAD =====
function downloadSingleImage(url,label){
    if(!url||!url.trim())return;
    showToast('Downloading image...');
    const img=new Image();
    img.crossOrigin='anonymous';
    img.onload=function(){
        const c=document.createElement('canvas');c.width=img.naturalWidth||800;c.height=img.naturalHeight||600;
        c.getContext('2d').drawImage(img,0,0);
        const dataUrl=c.toDataURL('image/jpeg',0.95);
        const a=document.createElement('a');a.href=dataUrl;a.download=(label||'image')+'.jpg';
        document.body.appendChild(a);a.click();document.body.removeChild(a);showToast('Image downloaded!');
    };
    img.onerror=function(){
        const a=document.createElement('a');a.href=url;a.download=(label||'image')+'.jpg';a.target='_blank';
        document.body.appendChild(a);a.click();document.body.removeChild(a);showToast('Image opened!');
    };
    img.src=url;
}

// ===== PDF GENERATION =====
async function downloadPropertyPDF(id){
    const p=properties.find(pr=>pr.id===id);if(!p)return;
    showToast('Generating PDF...');
    if(!window.jspdf){showToast('PDF library loading, try again...');return;}
    const{jsPDF}=window.jspdf;const doc=new jsPDF('p','mm','a4');
    const margin=10,contentW=190,imgH=(297-margin*3)/2;
    const allImages=[];const labels=p.imageLabels||{};
    const labelKeys=['main','second','third','fourth','fifth','sixth'];
    const labelNames=['Room 1','Room 2','Room 3','Room 4','Room 5','Room 6'];
    for(let i=0;i<6;i++){if(p.images[i]&&p.images[i].trim())allImages.push({url:p.images[i],label:labels[labelKeys[i]]||labelNames[i],num:i+1});}
    if(allImages.length===0){showToast('No images found!');return;}
    async function loadImg(url){return new Promise(resolve=>{const img=new Image();img.crossOrigin='anonymous';img.onload=()=>{const c=document.createElement('canvas');c.width=img.naturalWidth||800;c.height=img.naturalHeight||600;c.getContext('2d').drawImage(img,0,0);resolve(c.toDataURL('image/jpeg',0.92));};img.onerror=()=>resolve(null);img.src=url;setTimeout(()=>resolve(null),8000);});}
    let pageNum=0,imgIndex=0;
    while(imgIndex<allImages.length){
        if(pageNum>0)doc.addPage();pageNum++;
        for(let slot=0;slot<2;slot++){
            if(imgIndex>=allImages.length)break;
            const item=allImages[imgIndex];const x=margin,y=margin+slot*(imgH+margin);
            doc.setFillColor(230,230,230);doc.roundedRect(x,y,contentW,imgH,2,2,'F');
            const dataUrl=await loadImg(item.url);
            if(dataUrl)doc.addImage(dataUrl,'JPEG',x,y,contentW,imgH,undefined,'FAST');
            if(item.label&&item.label.trim()){const fs=9;doc.setFontSize(fs);const tw=doc.getStringUnitWidth(item.label)*fs*0.352+8;doc.setFillColor(255,255,255);doc.roundedRect(x+4,y+imgH-9,tw,6.5,2,2,'F');doc.setTextColor(20,20,20);doc.setFont('helvetica','bold');doc.text(item.label,x+8,y+imgH-4);}
            doc.setFillColor(26,42,69);doc.roundedRect(x+contentW-18,y+3,15,6.5,2,2,'F');doc.setFontSize(6.5);doc.setTextColor(255,255,255);doc.setFont('helvetica','normal');doc.text(item.num+'/'+allImages.length,x+contentW-10.5,y+7.5,{align:'center'});
            imgIndex++;
        }
    }
    doc.save(((p.title||'Property').replace(/[^a-zA-Z0-9 ]/g,'_'))+'_photos.pdf');
    showToast('PDF ready! '+allImages.length+' images downloaded!');
}
async function buildSharePdf(p){
    if(!window.jspdf)return null;
    try{
        const{jsPDF}=window.jspdf;const doc=new jsPDF('p','mm','a4');
        const margin=10,contentW=190,imgH=(297-margin*3)/2;
        const allImages=[];const labels=p.imageLabels||{};const labelKeys=['main','second','third','fourth','fifth','sixth'];
        for(let i=0;i<6;i++){if(p.images[i]&&p.images[i].trim())allImages.push({url:p.images[i],label:labels[labelKeys[i]]||('Room '+(i+1)),num:i+1});}
        if(allImages.length===0)return null;
        async function loadImg(url){return new Promise(resolve=>{const img=new Image();img.crossOrigin='anonymous';img.onload=()=>{const c=document.createElement('canvas');c.width=img.naturalWidth||800;c.height=img.naturalHeight||600;c.getContext('2d').drawImage(img,0,0);resolve(c.toDataURL('image/jpeg',0.88));};img.onerror=()=>resolve(null);img.src=url;setTimeout(()=>resolve(null),8000);});}
        let imgIndex=0,pageNum=0;
        while(imgIndex<allImages.length){
            if(pageNum>0)doc.addPage();pageNum++;
            for(let slot=0;slot<2;slot++){
                if(imgIndex>=allImages.length)break;
                const item=allImages[imgIndex];const x=margin,y=margin+slot*(imgH+margin);
                doc.setFillColor(230,230,230);doc.roundedRect(x,y,contentW,imgH,2,2,'F');
                const dataUrl=await loadImg(item.url);if(dataUrl)doc.addImage(dataUrl,'JPEG',x,y,contentW,imgH,undefined,'FAST');
                if(item.label){const fs=9;const tw=doc.getStringUnitWidth(item.label)*fs*0.352+8;doc.setFontSize(fs);doc.setFillColor(255,255,255);doc.roundedRect(x+4,y+imgH-8,tw,6.5,2,2,'F');doc.setTextColor(20,20,20);doc.setFont('helvetica','bold');doc.text(item.label,x+8,y+imgH-3.2);}
                doc.setFillColor(26,42,69);doc.roundedRect(x+contentW-18,y+3,15,6.5,2,2,'F');doc.setFontSize(6.5);doc.setTextColor(255,255,255);doc.setFont('helvetica','normal');doc.text(item.num+'/'+allImages.length,x+contentW-10.5,y+7.5,{align:'center'});
                imgIndex++;
            }
        }
        return doc.output('blob');
    }catch(e){return null;}
}

// ===== SHARE =====
let _sharePropertyId=null,_shareText='',_sharePdfBlob=null,_sharePlatforms=[];
function buildShareText(p){
    const statusMap={rent:'For Rent',sale:'For Sale','under-construction':'Under Construction','sold-out':'Sold Out'};
    const rentalMap={hourly:'Per Hour',daily:'Per Day',monthly:'Monthly',yearly:'Yearly',sale:'For Sale'};
    const amenList=[];
    if(p.amenities?.balcony==='yes')amenList.push('Balcony');
    if(p.amenities?.attachedWashroom==='yes')amenList.push('Attached Washroom');
    if(p.amenities?.window==='yes')amenList.push('Window');
    if(p.amenities?.commonWashroom==='yes')amenList.push('Common Washroom');
    if(p.amenities?.fullClosed==='yes')amenList.push('Full Closed');
    // Add nearest places to share text
    let nearestText = '';
    if(p.nearestPlaces && p.nearestPlaces.length > 0){
        nearestText = '\n\n📍 Nearby:\n' + p.nearestPlaces.map(pl => `  • ${pl.name} (${placeCategories.find(c=>c.value===pl.category)?.label || pl.category})`).join('\n');
    }
    return['🏢 *USERS PROPERTIES UAE*','📌 Code: '+(p.profileCode||'—'),'','🏠 *'+(p.title||'')+'*','📍 '+(p.subArea?p.subArea+', ':'')+p.area+', '+p.city,'💰 AED '+(p.price||0).toLocaleString()+(p.rentalType&&p.rentalType!=='sale'?' / '+(rentalMap[p.rentalType]||p.rentalType):''),'🏷️ '+(statusMap[p.propertyStatus]||''),'','📐 '+(p.type||'')+' | '+(p.areaSize||'')+' Sq Ft'+(p.bedrooms>0?' | '+p.bedrooms+' Bed':'')+' | '+(p.bathrooms||'')+' Bath',amenList.length>0?'✨ '+amenList.join(', '):'',p.availableIn?'⏰ Available In: '+p.availableIn:'',nearestText,'',p.description?'📝 '+p.description:'','','📞 WA: '+(p.contact?.whatsapp||'—'),'📞 Ph: '+(p.contact?.phone||'—'),'','━━━━━━━━━━━━━━━━━━━━','🌐 UAE Properties Portal'].filter(l=>l!==null&&l!==undefined&&l!=='').join('\n');
}
async function shareProperty(id){
    const p=properties.find(pr=>pr.id===id);if(!p)return;
    _sharePropertyId=id;_shareText=buildShareText(p);_sharePdfBlob=null;
    const enc=encodeURIComponent(_shareText);const subj=encodeURIComponent('Property: '+(p.title||''));
    _sharePlatforms=[
        {name:'WhatsApp',cls:'whatsapp',icon:'fab fa-whatsapp',mobile:'whatsapp://send?text='+enc,web:'https://wa.me/?text='+enc},
        {name:'Facebook',cls:'facebook',icon:'fab fa-facebook-f',web:'https://www.facebook.com/sharer/sharer.php?quote='+enc},
        {name:'Instagram',cls:'instagram',icon:'fab fa-instagram',copyOpen:true,appScheme:'instagram://app',copyMsg:'Copied for Instagram!'},
        {name:'TikTok',cls:'tiktok',icon:'fab fa-tiktok',copyOpen:true,appScheme:'tiktok://',copyMsg:'Copied for TikTok!'},
        {name:'Snapchat',cls:'snapchat',icon:'fab fa-snapchat-ghost',copyOpen:true,appScheme:'snapchat://',copyMsg:'Copied for Snapchat!'},
        {name:'Twitter/X',cls:'twitter',icon:'fab fa-twitter',web:'https://twitter.com/intent/tweet?text='+enc},
        {name:'Telegram',cls:'telegram',icon:'fab fa-telegram-plane',web:'https://t.me/share/url?text='+enc},
        {name:'LinkedIn',cls:'linkedin',icon:'fab fa-linkedin-in',web:'https://www.linkedin.com/sharing/share-offsite/?url=https://uaeproperties.com'},
        {name:'Email',cls:'email',icon:'fas fa-envelope',isEmail:true,subj:subj,body:enc},
        {name:'SMS',cls:'sms',icon:'fas fa-sms',isSms:true,body:enc},
        {name:'Copy',cls:'copy',icon:'fas fa-copy',onlyCopy:true,copyMsg:'Details copied!'},
    ];
    document.getElementById('sharePropName').textContent=p.title||'Property';
    document.getElementById('sharePdfStatus').textContent='Generating PDF...';
    document.getElementById('sharePdfBtn').disabled=true;
    document.getElementById('sharePdfBtn').innerHTML='<i class="fas fa-spinner fa-spin"></i> Wait...';
    document.getElementById('shareGrid').innerHTML=_sharePlatforms.map((pl,i)=>`<button class="share-item" onclick="doShare(${i})"><div class="share-icon ${pl.cls}"><i class="${pl.icon}"></i></div><span class="share-label">${pl.name}</span></button>`).join('');
    document.getElementById('shareModal').classList.add('active');
    buildSharePdf(p).then(blob=>{
        _sharePdfBlob=blob;
        const cnt=p.images.filter(x=>x&&x.trim()).length;
        document.getElementById('sharePdfStatus').textContent=blob?cnt+' images ready':'No images found';
        document.getElementById('sharePdfBtn').disabled=false;
        document.getElementById('sharePdfBtn').innerHTML='<i class="fas fa-download"></i> Download PDF';
    });
}
function doShare(idx){
    const pl=_sharePlatforms[idx];if(!pl)return;
    if(pl.copyOpen){fallbackCopy(_shareText,pl.copyMsg);setTimeout(()=>tryOpenApp(pl.appScheme),600);return;}
    if(pl.onlyCopy){fallbackCopy(_shareText,pl.copyMsg||'Copied!');return;}
    if(pl.isEmail){window.location.href='mailto:?subject='+pl.subj+'&body='+pl.body;return;}
    if(pl.isSms){window.location.href=(/iphone|ipad|ipod/i.test(navigator.userAgent)?'sms:&body=':'sms:?body=')+pl.body;return;}
    const isMobile=/android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    if(isMobile&&pl.mobile){const t=setTimeout(()=>window.open(pl.web,'_blank'),1500);window.addEventListener('blur',()=>clearTimeout(t),{once:true});window.location.href=pl.mobile;}
    else window.open(pl.web,'_blank');
}
function tryOpenApp(scheme){const i=document.createElement('iframe');i.style.cssText='display:none;width:0;height:0;border:0';i.src=scheme;document.body.appendChild(i);setTimeout(()=>{if(document.body.contains(i))document.body.removeChild(i);},2000);}
function fallbackCopy(text,msg){
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(()=>showToast(msg||'Copied!')).catch(()=>legacyCopy(text,msg));}
    else legacyCopy(text,msg);
}
function legacyCopy(text,msg){const ta=document.createElement('textarea');ta.value=text;ta.style.cssText='position:fixed;left:-9999px;top:-9999px;opacity:0';document.body.appendChild(ta);ta.focus();ta.select();try{document.execCommand('copy');showToast(msg||'Copied!');}catch(e){showToast('Could not copy');}document.body.removeChild(ta);}
function shareDownloadPDF(){
    const p=properties.find(pr=>pr.id===_sharePropertyId);
    const fname=((p&&p.title||'Property').replace(/[^a-z0-9]/gi,'_'))+'_photos.pdf';
    if(!_sharePdfBlob){if(_sharePropertyId)downloadPropertyPDF(_sharePropertyId);return;}
    triggerPdfDownload(fname);
}
function triggerPdfDownload(fname){const url=URL.createObjectURL(_sharePdfBlob);const a=document.createElement('a');a.href=url;a.download=fname||'property_photos.pdf';document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(url),1000);showToast('PDF downloaded!');}
function closeShareModal(){document.getElementById('shareModal').classList.remove('active');}

// ===== VIDEO MODAL =====
let currentVideoPropertyId=null;
function openVideoModal(id,e){
    if(e)e.stopPropagation();
    const p=properties.find(p=>p.id===id);if(!p)return;
    currentVideoPropertyId=id;
    const wrapper=document.getElementById('videoWrapper');
    const url=p.videoUrl||'';wrapper.innerHTML='';
    if(!url){wrapper.innerHTML='<p style="color:#333;text-align:center;padding:40px;">No video available</p>';}
    else{
        const embedUrl=getYouTubeEmbedUrl(url);
        if(embedUrl)wrapper.innerHTML=`<iframe src="${embedUrl}" allowfullscreen frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
        else if(url.startsWith('data:video')||/\.(mp4|webm|ogg|mov)$/i.test(url))wrapper.innerHTML=`<video src="${url}" controls style="width:100%;height:100%;"></video>`;
        else wrapper.innerHTML='<p style="color:#333;text-align:center;padding:40px;">Invalid video URL</p>';
    }
    const urlInput=document.getElementById('videoUrlInput');if(urlInput)urlInput.value=p.videoUrl||'';
    document.getElementById('videoModal').classList.add('active');
}
function closeVideoModal(){document.getElementById('videoModal').classList.remove('active');document.getElementById('videoWrapper').innerHTML='';}
function updateVideo(){
    const newUrl=document.getElementById('videoUrlInput')?.value.trim();
    if(!currentVideoPropertyId)return;
    properties=properties.map(p=>{if(p.id===currentVideoPropertyId){p.videoUrl=newUrl;p.timerUpdatedAt=new Date().toISOString();}return p;});
    localStorage.setItem('properties',JSON.stringify(properties));
    const wrapper=document.getElementById('videoWrapper');wrapper.innerHTML='';
    if(!newUrl){wrapper.innerHTML='<p style="color:#333;text-align:center;padding:40px;">No video</p>';}
    else{const embedUrl=getYouTubeEmbedUrl(newUrl);if(embedUrl)wrapper.innerHTML=`<iframe src="${embedUrl}" allowfullscreen frameborder="0"></iframe>`;else wrapper.innerHTML=`<video src="${newUrl}" controls style="width:100%;height:100%;"></video>`;}
    showToast('Video updated!');if(typeof applyFilters==='function')applyFilters();
}

// ===== SAVE STORAGE =====
const _origSetItem=localStorage.setItem.bind(localStorage);
localStorage.setItem=function(key,val){
    if(key==='properties'){
        try{_origSetItem(key,val);}catch(e){const data=JSON.parse(val);const sorted=[...data].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));const trimmed=sorted.slice(Math.floor(sorted.length*0.1));try{_origSetItem(key,JSON.stringify(trimmed));}catch(e2){console.warn('Storage full');}}
        return;
    }
    try{_origSetItem(key,val);}catch(e){}
};

// ===== NOTIFICATION SYSTEM (FIXED) =====
let _notifList = [];
let _lastNotifCheck = null;

function checkAvailabilityNotifications(){
    const now = new Date();
    const NOTIF_KEY = '_shownNotifs_v2';
    let shownNotifs = JSON.parse(sessionStorage.getItem(NOTIF_KEY) || '[]');
    _notifList = [];
    
    properties.forEach(p => {
        if(p.status !== 'approved') return;
        
        // Check if property becomes available (availableFrom date is today or in future but within 7 days)
        if(p.availableFrom) {
            const availDate = new Date(p.availableFrom);
            const daysUntilAvail = Math.ceil((availDate - now) / (1000 * 60 * 60 * 24));
            const isRecentlyAvailable = daysUntilAvail <= 7 && daysUntilAvail >= 0;
            const notifKey = `avail_${p.id}_${Math.floor(availDate.getTime() / (24*60*60*1000))}`;
            
            if(isRecentlyAvailable && !shownNotifs.includes(notifKey)) {
                _notifList.push({
                    ...p,
                    _notifKey: notifKey,
                    _notifType: 'availability',
                    _message: `📢 ${p.title} will be available in ${daysUntilAvail === 0 ? 'today' : daysUntilAvail + ' days'}!`
                });
            }
        }
        
        // Check for recently updated/timer properties (last 24 hours)
        if(p.timerUpdatedAt) {
            const updatedDate = new Date(p.timerUpdatedAt);
            const hoursSinceUpdate = (now - updatedDate) / (1000 * 60 * 60);
            const notifKey = `update_${p.id}_${Math.floor(updatedDate.getTime() / (24*60*60*1000))}`;
            
            if(hoursSinceUpdate <= 24 && hoursSinceUpdate > 0 && !shownNotifs.includes(notifKey)) {
                _notifList.push({
                    ...p,
                    _notifKey: notifKey,
                    _notifType: 'update',
                    _message: `🔄 ${p.title} has been updated! New ${p.propertyStatus === 'rent' ? 'rental' : 'sale'} details available.`
                });
            }
        }
    });
    
    // Sort notifications by date (newest first)
    _notifList.sort((a, b) => new Date(b.timerUpdatedAt || b.createdAt) - new Date(a.timerUpdatedAt || a.createdAt));
    
    // Add new notifications to session storage
    const newNotifs = _notifList.filter(n => !shownNotifs.includes(n._notifKey));
    if(newNotifs.length > 0) {
        updateNotifBadge(newNotifs.length);
        const newKeys = newNotifs.map(n => n._notifKey);
        sessionStorage.setItem(NOTIF_KEY, JSON.stringify([...shownNotifs, ...newKeys]));
        
        // Show toast for each new notification (limit to 3)
        newNotifs.slice(0, 3).forEach((n, i) => {
            setTimeout(() => showNotifToast(n), 1500 + (i * 3000));
        });
    }
    
    renderNotifBar(_notifList);
}

function renderNotifBar(list){
    const strip = document.getElementById('subNotifItems');
    if(!strip) return;
    const countEl = document.getElementById('subNotifCount');
    
    if(!list || list.length === 0){
        strip.innerHTML = '<span class="sub-notif-empty"><i class="fas fa-bell-slash"></i> No notifications</span>';
        if(countEl) countEl.style.display = 'none';
        return;
    }
    
    // Display notifications in card format
    strip.innerHTML = list.map(n => `
        <div class="sub-notif-card unread" onclick="scrollToTopProperty(${n.id})">
            <div class="notif-card-icon ${n._notifType === 'availability' ? 'avail' : 'update'}">
                <i class="fas ${n._notifType === 'availability' ? 'fa-calendar-check' : 'fa-sync-alt'}"></i>
            </div>
            <div class="notif-card-content">
                <div class="notif-card-title">${n.title || 'Property'}</div>
                <div class="notif-card-message">${n._message || (n._notifType === 'availability' ? 'Now available!' : 'Property updated')}</div>
                <div class="notif-card-location"><i class="fas fa-map-marker-alt"></i> ${n.area}, ${n.city}</div>
                <div class="notif-card-price">AED ${(n.price || 0).toLocaleString()}</div>
            </div>
            <div class="notif-card-time">${formatNotificationTime(n.timerUpdatedAt || n.createdAt)}</div>
        </div>
    `).join('');
    
    if(countEl){
        countEl.textContent = list.length;
        countEl.style.display = 'inline';
    }
}

function formatNotificationTime(dateStr){
    if(!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if(diffMins < 1) return 'Just now';
    if(diffMins < 60) return `${diffMins} min ago`;
    if(diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function scrollToTopProperty(id){
    // Find property and scroll to it
    if(typeof showSection === 'function') showSection('properties', document.querySelector('.nav-link'));
    setTimeout(() => {
        // Try to scroll to property card
        const cards = document.querySelectorAll('.property-card');
        for(let card of cards){
            if(card.innerHTML.includes(`"${id}"`) || card.querySelector(`[onclick*="${id}"]`)){
                card.scrollIntoView({behavior: 'smooth', block: 'center'});
                card.style.border = '3px solid var(--primary)';
                setTimeout(() => {
                    card.style.border = '';
                }, 3000);
                break;
            }
        }
        showToast('Property found!');
    }, 300);
}

function updateNotifBadge(count){
    const countEl = document.getElementById('subNotifCount');
    if(countEl){
        countEl.textContent = count;
        countEl.style.display = count > 0 ? 'inline' : 'none';
    }
    // Animate bell icon
    const bellIcon = document.querySelector('.sub-notif-label i');
    if(bellIcon && count > 0){
        bellIcon.classList.add('bell-shake');
        setTimeout(() => bellIcon.classList.remove('bell-shake'), 600);
    }
}

function toggleNotifBar(){}
function closeNotifBar(){}
function markAllRead(){
    document.querySelectorAll('.sub-notif-card.unread').forEach(el => el.classList.remove('unread'));
    const countEl = document.getElementById('subNotifCount');
    if(countEl) countEl.style.display = 'none';
    showToast('All notifications marked as read');
}

function showNotifToast(notification){
    const existing = document.getElementById('availNotifToast');
    if(existing) existing.remove();
    
    const div = document.createElement('div');
    div.id = 'availNotifToast';
    div.style.cssText = 'position:fixed;top:90px;left:50%;transform:translateX(-50%);z-index:99999;background:#fff;border-radius:16px;padding:14px 20px;box-shadow:0 8px 32px rgba(0,0,0,0.25);border-left:5px solid var(--primary);display:flex;align-items:center;gap:14px;max-width:400px;width:90%;animation:slideDown .4s ease';
    div.innerHTML = `
        <div style="background:linear-gradient(135deg,#c9a227,#fbbf24);width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.2rem;">
            ${notification._notifType === 'availability' ? '🔔' : '🔄'}
        </div>
        <div style="flex:1;min-width:0;">
            <div style="font-weight:700;color:#1a2a45;font-size:13px;">${notification._notifType === 'availability' ? 'Property Available Soon!' : 'Property Updated!'}</div>
            <div style="color:#555;font-size:12px;margin-top:2px;">${notification.title} — ${notification.city}</div>
            <div style="color:#c9a227;font-size:11px;margin-top:2px;">AED ${(notification.price || 0).toLocaleString()}</div>
        </div>
        <button onclick="document.getElementById('availNotifToast').remove()" style="background:none;border:none;font-size:18px;color:#999;cursor:pointer;padding:0;flex-shrink:0;">✕</button>
    `;
    
    if(!document.getElementById('notifAnimStyle')){
        const s = document.createElement('style');
        s.id = 'notifAnimStyle';
        s.textContent = '@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
        document.head.appendChild(s);
    }
    
    document.body.appendChild(div);
    setTimeout(() => {
        if(document.getElementById('availNotifToast')) document.getElementById('availNotifToast').remove();
    }, 8000);
}

// Run notification check every 30 seconds
let notifInterval = null;
function startNotificationChecker(){
    if(notifInterval) clearInterval(notifInterval);
    notifInterval = setInterval(() => {
        checkAvailabilityNotifications();
    }, 30000);
}

// ===== NAVBAR SEARCH =====
let _searchDebounce=null;
function initNavbarSearch(){
    const inp=document.getElementById('navSearchInput');
    if(!inp)return;
    inp.addEventListener('input',function(){
        clearTimeout(_searchDebounce);
        const q=this.value.trim();
        const dropdown=document.getElementById('searchDropdown');
        if(!q){dropdown.classList.remove('show');return;}
        _searchDebounce=setTimeout(()=>showSearchResults(q),250);
    });
    inp.addEventListener('keyup',function(e){if(e.key==='Escape'){clearSearch();}if(e.key==='Enter'){const q=this.value.trim();if(q&&typeof applyFilters==='function'){applyFilters(q);clearSearchDropdown();}}});
    document.addEventListener('click',function(e){
        const wrap=document.getElementById('navSearchWrap');
        if(wrap&&!wrap.contains(e.target))clearSearchDropdown();
    });
}
function showSearchResults(q){
    const dropdown=document.getElementById('searchDropdown');if(!dropdown)return;
    const ql=q.toLowerCase();
    let filtered=properties.filter(p=>p.status==='approved');
    filtered=filtered.filter(p=>(p.title||'').toLowerCase().includes(ql)||(p.area||'').toLowerCase().includes(ql)||(p.subArea||'').toLowerCase().includes(ql)||(p.city||'').toLowerCase().includes(ql)||(p.profileCode||'').toLowerCase().includes(ql)||(p.type||'').toLowerCase().includes(ql)||formatCardDate(p.createdAt).toLowerCase().includes(ql)||formatCardDate(p.availableFrom).toLowerCase().includes(ql));
    // Sort by date (newest first)
    filtered.sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));
    const fallback=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='36'%3E%3Crect width='48' height='36' fill='%23eee'/%3E%3C/svg%3E`;
    if(filtered.length===0){dropdown.innerHTML=`<div class="search-no-results"><i class="fas fa-search"></i>No results found</div>`;dropdown.classList.add('show');return;}
    dropdown.innerHTML=filtered.slice(0,8).map(p=>`
        <div class="search-result-item" onclick="selectSearchResult(${p.id})">
            <img class="sri-thumb" src="${p.images?.[0]||fallback}" onerror="this.src='${fallback}'" loading="lazy">
            <div class="sri-info">
                <div class="sri-title">${p.title||''}</div>
                <div class="sri-sub">${p.area}${p.subArea?', '+p.subArea:''}, ${p.city} • ${p.type}</div>
            </div>
            <div class="sri-price">AED ${(p.price||0).toLocaleString()}</div>
        </div>`).join('');
    dropdown.classList.add('show');
}
function selectSearchResult(id){
    clearSearchDropdown();
    openLightbox(id);
}
function clearSearch(){const inp=document.getElementById('navSearchInput');if(inp)inp.value='';clearSearchDropdown();}
function clearSearchDropdown(){const d=document.getElementById('searchDropdown');if(d)d.classList.remove('show');}

// Pagination
const PAGE_SIZE=20;
let _currentList=[],_currentPage=0,_loadingMore=false;
function sortProperties(list){
    return list.sort((a,b)=>{
        const cA=new Date(a.createdAt||0).getTime();
        const cB=new Date(b.createdAt||0).getTime();
        if(cB!==cA)return cB-cA;
        return new Date(b.timerUpdatedAt||0).getTime()-new Date(a.timerUpdatedAt||0).getTime();
    });
}
function displayProperties(list){
    const grid=document.getElementById('propertiesGrid');if(!grid)return;
    if(list.length===0){grid.innerHTML=`<div class="no-results"><i class="fas fa-search"></i><h3>No properties found</h3><p>Try adjusting your filters</p></div>`;_currentList=[];_currentPage=0;removeLoadMoreBtn();return;}
    _currentList=sortProperties(list);_currentPage=0;grid.innerHTML='';renderNextPage();setupInfiniteScroll();
}
function renderNextPage(){
    if(_loadingMore)return;
    const grid=document.getElementById('propertiesGrid');if(!grid)return;
    const start=_currentPage*PAGE_SIZE;const end=Math.min(start+PAGE_SIZE,_currentList.length);
    if(start>=_currentList.length){removeLoadMoreBtn();return;}
    _loadingMore=true;
    const slice=_currentList.slice(start,end);
    const fragment=document.createDocumentFragment();
    slice.forEach(p=>{const div=document.createElement('div');div.innerHTML=buildPropertyCardHTML(p);fragment.appendChild(div.firstElementChild);});
    grid.appendChild(fragment);_currentPage++;_loadingMore=false;updateLoadMoreBtn();
}
function updateLoadMoreBtn(){
    removeLoadMoreBtn();
    const remaining=_currentList.length-(_currentPage*PAGE_SIZE);if(remaining<=0)return;
    const grid=document.getElementById('propertiesGrid');
    const btn=document.createElement('div');btn.id='loadMoreBtn';btn.style.cssText='grid-column:1/-1;text-align:center;padding:20px';
    btn.innerHTML=`<button onclick="renderNextPage()" style="padding:12px 32px;background:var(--primary);border:none;border-radius:30px;font-weight:700;cursor:pointer;font-size:14px;font-family:'Poppins',sans-serif">Load More (${remaining} remaining)</button>`;
    grid.appendChild(btn);
}
function removeLoadMoreBtn(){const btn=document.getElementById('loadMoreBtn');if(btn)btn.remove();}
let _scrollObserver=null;
function setupInfiniteScroll(){
    if(_scrollObserver)_scrollObserver.disconnect();
    _scrollObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting)renderNextPage();},{threshold:0.1});
    setTimeout(()=>{const btn=document.getElementById('loadMoreBtn');if(btn)_scrollObserver.observe(btn);},100);
}

// Start notification checker on page load
if(typeof window !== 'undefined'){
    startNotificationChecker();
}