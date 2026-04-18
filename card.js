/* ===== PROPERTY CARD BUILDER (FIXED) ===== */

function buildPropertyCardHTML(p){
    const fallback=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23aaa' font-family='Arial' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E`;

    const imgs=p.images||[];
    const lbl=p.imageLabels||{};

    const roomIcons={
        'Balcony':'🌇','Living Room':'🛋️','Master Bedroom':'🛏️','Bedroom':'🛏️',
        'Kitchen':'🍳','Bathroom':'🚿','View':'🌆','Pool':'🏊','Garden':'🌿',
        'Area View':'🏙️','Hall':'🏠','Dining':'🍽️','Study Room':'📚'
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

    const subAreaMapLink = (typeof customSubAreaLinks !== 'undefined' && customSubAreaLinks[p.subArea]) || (typeof subAreaMapsLinks !== 'undefined' && subAreaMapsLinks[p.subArea]) || '';

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

    // Nearest Places HTML
    let nearestPlacesHTML = '';
    if(p.nearestPlaces && p.nearestPlaces.length > 0){
        const categoryIcons = {
            'school': 'fa-school',
            'hospital': 'fa-hospital',
            'mosque': 'fa-mosque',
            'market': 'fa-store',
            'park': 'fa-tree',
            'restaurant': 'fa-utensils',
            'metro': 'fa-subway',
            'bus': 'fa-bus',
            'mall': 'fa-shopping-bag',
            'pharmacy': 'fa-capsules',
            'gym': 'fa-dumbbell',
            'bank': 'fa-landmark'
        };
        nearestPlacesHTML = `
            <div class="nearest-places-section">
                <div class="nearest-places-title"><i class="fas fa-location-dot"></i> Nearby Places</div>
                <div class="nearest-places-list">
                    ${p.nearestPlaces.map(place => `
                        <div class="nearest-place-chip" onclick="event.stopPropagation();window.open('${place.mapLink || `https://maps.google.com/?q=${encodeURIComponent(place.name)}`}', '_blank')">
                            <i class="fas ${categoryIcons[place.category] || 'fa-map-marker-alt'}"></i>
                            <span>${place.name}</span>
                            <small>${place.category ? place.category.charAt(0).toUpperCase() + place.category.slice(1) : ''}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    const whatsappLink=p.contact?.whatsapp?`https://wa.me/${p.contact.whatsapp.replace(/\D/g,'')}`:'#';
    const phoneLink=p.contact?.phone?`tel:${p.contact.phone.replace(/\D/g,'')}`:'#';

    const isAdmin = (typeof window.currentUserType !== 'undefined' && window.currentUserType === 'admin') ||
                    (typeof currentUser !== 'undefined' && currentUser && currentUser.type === 'admin');

    const timerEditBtn = isAdmin
        ?`<button class="status-btn" onclick="event.stopPropagation();openTimerModal(${p.id},event)" title="Edit Timer">
            <i class="fas fa-clock"></i> Timer
        </button>`:'';

    return`
    <div class="property-card">

        <!-- Card Header: title + property code + available date -->
        <div class="card-header">
            <h1>Users Properties UAE</h1>
            <p style="margin:2px 0"><strong>Property Code: 563</strong></p>
            <p style="margin:2px 0"><i class="fas fa-calendar-check" style="margin-right:4px"></i> Available: ${p.availableFrom?new Date(p.availableFrom).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}):'—'}</p>
        </div>

        <div class="img-grid">
            ${imgTag(0,lbl.main||'Balcony')}
            ${imgTag(1,lbl.second||'Bedroom')}
            ${imgTag(2,lbl.third||'Kitchen')}
            ${imgTag(3,lbl.fourth||'Living Room')}
            ${imgTag(4,lbl.fifth||'Bathroom')}
            ${imgTag(5,lbl.sixth||'Area View')}
        </div>

        <div class="price-row" style="display:flex;justify-content:space-between;align-items:center;gap:8px">
            <div class="title" style="flex:1;text-align:left">${p.title||''}</div>
            <div class="price" style="text-align:right;white-space:nowrap">${priceDisplay}</div>
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

        <!-- Nearby Places — right after location -->
        ${nearestPlacesHTML}

        <!-- Property Features: size · beds · baths · type -->
        <div class="property-features">
            <div class="feature-item">
                <i class="fas fa-arrows-alt"></i>
                <span>${p.areaSize || 0} Sq Ft</span>
            </div>
            ${p.bedrooms > 0 ? `
            <div class="feature-item">
                <i class="fas fa-bed"></i>
                <span>${p.bedrooms} Bedroom${p.bedrooms > 1 ? 's' : ''}</span>
            </div>` : ''}
            <div class="feature-item">
                <i class="fas fa-bath"></i>
                <span>${p.bathrooms || 1} Bathroom${p.bathrooms > 1 ? 's' : ''}</span>
            </div>
            <div class="feature-item">
                <i class="fas fa-home"></i>
                <span>${p.type || 'Property'}</span>
            </div>
        </div>

        <div class="features">
            ${p.amenities?.balcony==='yes'?'<div class="feature"><i class="fa fa-building"></i> Balcony</div>':''}
            ${p.amenities?.window==='yes'?'<div class="feature"><i class="fa fa-window-maximize"></i> Window</div>':''}
            ${p.amenities?.attachedWashroom==='yes'?'<div class="feature"><i class="fa fa-toilet"></i> Attached Washroom</div>':''}
            ${p.amenities?.commonWashroom==='yes'?'<div class="feature"><i class="fa fa-restroom"></i> Common Washroom</div>':''}
            ${p.amenities?.fullClosed==='yes'?'<div class="feature"><i class="fa fa-door-closed"></i> Full Closed</div>':''}
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
                <button class="btn share-btn" onclick="event.stopPropagation();shareProperty(${p.id})">
                    <i class="fas fa-share-alt"></i> Share
                </button>
                ${isAdmin ? `
                <button class="btn edit-btn" onclick="event.stopPropagation();openEditModal(${p.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>`:''}
            </div>

            ${isAdmin ? `
            <div class="admin-actions">
                ${p.status==='pending'?`
                <button class="approve-btn" onclick="event.stopPropagation();approveProperty(${p.id})">
                    <i class="fas fa-check"></i> Approve
                </button>`:''}
                ${timerEditBtn}
                <button class="delete-btn" onclick="event.stopPropagation();deleteProperty(${p.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>`:''}

        </div>
    </div>`;



}