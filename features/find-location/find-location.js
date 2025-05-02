
document.addEventListener('DOMContentLoaded', function() {
    
    const donationCenters = [
      {
        id: 1,
        name: 'City Blood Center',
        address: '123 Main Street, Anytown, ST 12345',
        distance: 2.3,
        hours: '8:00 AM - 5:00 PM',
        appointmentStatus: 'Appointments available',
        coords: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: 2,
        name: 'Memorial Hospital Blood Bank',
        address: '456 Hospital Drive, Anytown, ST 12345',
        distance: 4.7,
        hours: '7:00 AM - 7:00 PM',
        appointmentStatus: 'Walk-ins welcome',
        coords: { lat: 40.7168, lng: -74.0120 }
      },
      {
        id: 3,
        name: 'Community Health Center',
        address: '789 Community Blvd, Anytown, ST 12345',
        distance: 6.2,
        hours: '9:00 AM - 6:00 PM',
        appointmentStatus: 'Appointments required',
        coords: { lat: 40.7200, lng: -74.0180 }
      },
      {
        id: 4,
        name: 'University Medical Center',
        address: '101 University Ave, Anytown, ST 12345',
        distance: 8.5,
        hours: '8:00 AM - 4:00 PM',
        appointmentStatus: 'Limited availability',
        coords: { lat: 40.7250, lng: -74.0220 }
      }
    ];
    
    const zipCodeInput = document.getElementById('zip-code');
    const searchBtn = document.querySelector('.search-btn');
    const currentLocationBtn = document.querySelector('.location-btn');
    const distanceFilter = document.getElementById('distance-filter');
    const centerList = document.querySelector('.center-list');
    const loadMoreBtn = document.querySelector('.btn-load');
    
    
    updateCenterList(donationCenters.slice(0, 2));
    
    
    if (searchBtn && zipCodeInput) {
      searchBtn.addEventListener('click', function() {
        const zip = zipCodeInput.value.trim();
        if (zip) {
          searchByZip(zip);
        }
      });
      
      zipCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const zip = zipCodeInput.value.trim();
          if (zip) {
            searchByZip(zip);
          }
        }
      });
    }
    
    
    if (currentLocationBtn) {
      currentLocationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
          currentLocationBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> Getting location...';
          
          navigator.geolocation.getCurrentPosition(
            function(position) {
              
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              
              
              setTimeout(() => {
                currentLocationBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg> Use my current location';
                updateCenterList(donationCenters);
              }, 1000);
            },
            function(error) {
              alert('Unable to retrieve your location. Please enter your ZIP code instead.');
              currentLocationBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg> Use my current location';
            }
          );
        } else {
          alert('Geolocation is not supported by your browser. Please enter your ZIP code instead.');
        }
      });
    }
    
    
    if (distanceFilter) {
      distanceFilter.addEventListener('change', function() {
        const maxDistance = parseInt(this.value);
        const filteredCenters = donationCenters.filter(center => center.distance <= maxDistance);
        updateCenterList(filteredCenters);
      });
    }
    
    
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
        
        
        updateCenterList(donationCenters);
        loadMoreBtn.style.display = 'none';
      });
    }
    
    function searchByZip(zip) {
      
    
      
      
      centerList.innerHTML = '<div class="loading-state"><p>Searching for donation centers near ' + zip + '...</p></div>';
      
      
      setTimeout(() => {
        updateCenterList(donationCenters.slice(0, 2));
      }, 1000);
    }
    
    function updateCenterList(centers) {
      if (!centerList) return;
      
      if (centers.length === 0) {
        centerList.innerHTML = '<div class="no-results"><p>No donation centers found in this area.</p></div>';
        return;
      }
      
      centerList.innerHTML = '';
      
      centers.forEach(center => {
        const centerCard = document.createElement('div');
        centerCard.className = 'center-card';
        
        centerCard.innerHTML = `
          <div class="center-info">
            <h4>${center.name}</h4>
            <p class="address">${center.address}</p>
            <p class="distance">${center.distance} miles away</p>
            <div class="center-details">
              <span class="availability">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Open today: ${center.hours}
              </span>
              <span class="appointment">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${center.appointmentStatus}
              </span>
            </div>
          </div>
          <div class="center-actions">
            <a href="https://maps.google.com/?q=${center.coords.lat},${center.coords.lng}" target="_blank" class="btn btn-outline">Get Directions</a>
            <a href="#" class="btn btn-primary">Schedule</a>
          </div>
        `;
        
        centerList.appendChild(centerCard);
      });
      
      
      if (loadMoreBtn) {
        if (centers.length < donationCenters.length) {
          loadMoreBtn.style.display = 'inline-block';
        } else {
          loadMoreBtn.style.display = 'none';
        }
      }
    }
  });