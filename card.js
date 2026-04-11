/* ===== PROPERTY CARD BUILDER (shared) ===== */
/* UPDATED: Labels Removed */

function buildPropertyCardHTML(p){
    const fallback=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23aaa' font-family='Arial' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E`;
    
    const imgs=p.images||[];
    const lbl=p.imageLabels||{};
    
    const roomIcons={
        'Balcony':'🌇','Living Room':'🛋️','Master Bedroom':'🛏️',
        'Kitchen':'🍳','Bathroom':'🚿','View':'🌆','Pool':'🏊','Garden':'🌿'
    };

    const imgTag=(i,label)=>`
        <div class="img" onclick="event.stopPropagation();openLightbox(${p.id},${i})">
            <img src="${imgs[i]||fallback}" loading="lazy" onerror="this.src='${fallback}'">
            ${imgs[i]&&imgs[i].trim()?`
                <button class="img-dl-btn" onclick="event.stopPropagation();downloadSingleImage('${imgs[i]}','${(label||'image').replace(/[^a-z0-9]/gi,'_')}')">
                    <i class="fas fa-download"></i> Save
                </button>`:''}
            <div class="label">${roomIcons[label]||'📷'} ${label||'Room'}</div>
        </div>`;

    const priceDisplay=`AED ${p.price.toLocaleString()}`;

    const subAreaMapLink = customSubAreaLinks[p.subArea] || subAreaMapsLinks[p.subArea] || '';
    
    const subAreaHTML = p.subArea
        ? `<div class="location-item">
            <i class="fas fa-map-pin"></i>
            <span><strong>Sub Area:</strong> 
                <span class="subarea-link" onclick="event.stopPropagation();openMapModal('${p.subArea.replace(/'/g,"\\'")}','${(p.locationLink||subAreaMapLink).replace(/'/g,"\\'")}')">
                    ${p.subArea} <i class="fas fa-map-marker-alt" style="font-size:10px"></i>
                </span>
            </span>
        </div>`
        : '';

    const whatsappLink=p.contact?.whatsapp?`https://wa.me/${p.contact.whatsapp.replace(/\D/g,'')}`:'#';
    const phoneLink=p.contact?.phone?`tel:${p.contact.phone.replace(/\D/g,'')}`:'#';

    const timerEditBtn=typeof currentUser!=='undefined'&&currentUser?.type==='admin'
        ?`<button class="status-btn" onclick="event.stopPropagation();openTimerModal(${p.id},event)" title="Edit Timer">
            <i class="fas fa-clock"></i> Timer
        </button>`:'';

    return`
    <div class="property-card">
        
        <div class="card-header">
            <h1>Users Properties UAE</h1>
            <p>Profile Code: ${p.profileCode||'—'}</p>
        </div>

        <!-- ❌ STATUS LABEL REMOVED -->

        <div class="img-grid">
            ${imgTag(0,lbl.main||'Balcony')}
            ${imgTag(1,lbl.second||'Master Bedroom')}
            ${imgTag(2,lbl.third||'Kitchen')}
            ${imgTag(3,lbl.fourth||'Living Room')}
            ${imgTag(4,lbl.fifth||'Bathroom')}
            ${imgTag(5,lbl.sixth||'View')}
        </div>

        <div class="price-row">
            <div class="price">${priceDisplay}</div>
            <div class="title">${p.title||''}</div>
        </div>

        <div class="location-info">
            <div class="location-item">
                <i class="fas fa-city"></i>
                <span><strong>City:</strong> ${p.city}</span>
            </div>
            <div class="location-item">
                <i class="fas fa-map-marker-alt"></i>
                <span><strong>Area:</strong> ${p.area}</span>
            </div>
            ${subAreaHTML}
        </div>

        <div class="info-grid">
            <div class="info-box"><b>Size</b>${p.areaSize} Sq Ft</div>
            <div class="info-box"><b>Profile</b>${p.profileCode||'—'}</div>
        </div>

        <div class="features">
            ${p.amenities?.balcony==='yes'?'<div class="feature"><i class="fa fa-building"></i> Balcony</div>':''}
            ${p.amenities?.window==='yes'?'<div class="feature"><i class="fa fa-window-maximize"></i> Window</div>':''}
            ${p.bedrooms>0?`<div class="feature"><i class="fa fa-bed"></i> ${p.bedrooms} Bed</div>`:''}
            <div class="feature"><i class="fa fa-bath"></i> ${p.bathrooms} Bath</div>
        </div>

        <div class="contact">
            <div class="numbers">
                <div onclick="event.stopPropagation();window.open('${whatsappLink}','_blank')">
                    <i class="fab fa-whatsapp"></i> ${p.contact?.whatsapp||'—'}
                </div>
                <div onclick="event.stopPropagation();window.location.href='${phoneLink}'">
                    <i class="fas fa-phone"></i> ${p.contact?.phone||'—'}
                </div>
            </div>

            <div class="btns">
                <button class="btn video-btn" onclick="event.stopPropagation();openVideoModal(${p.id},event)">
                    <i class="fas fa-video"></i> Video
                </button>
                <button class="btn download-btn" onclick="event.stopPropagation();downloadPropertyPDF(${p.id})">
                    <i class="fas fa-download"></i> PDF
                </button>
                ${typeof currentUser!=='undefined'&&currentUser?.type==='admin'?`
                <button class="btn edit-btn" onclick="event.stopPropagation();openEditModal(${p.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>`:''}
            </div>

            ${typeof currentUser!=='undefined'&&currentUser?.type==='admin'?`
            <div class="admin-actions">
                ${p.status==='pending'?`
                <button class="approve-btn" onclick="event.stopPropagation();approveProperty(${p.id})">
                    <i class="fas fa-check"></i> Approve
                </button>`:''}
                ${timerEditBtn}
                <button class="status-btn" onclick="event.stopPropagation();changePropertyStatus(${p.id})">
                    <i class="fas fa-sync-alt"></i> Status
                </button>
                <button class="delete-btn" onclick="event.stopPropagation();deleteProperty(${p.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>`:''}

        </div>
    </div>`;
}