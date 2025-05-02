
document.addEventListener('DOMContentLoaded', function() {
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
          
          
          
          const originalContent = this.innerHTML;
          
          
          this.innerHTML = '<p class="success-message">Thanks for subscribing! We\'ll keep you updated about upcoming blood drives and donor opportunities.</p>';
          
          
          setTimeout(() => {
            this.innerHTML = originalContent;
            this.querySelector('input[type="email"]').value = '';
          }, 5000);
        }
      });
    }
    
    /
    const copyrightYear = document.querySelector('.footer-legal p');
    if (copyrightYear) {
      const yearString = copyrightYear.innerHTML;
      const currentYear = new Date().getFullYear();
      copyrightYear.innerHTML = yearString.replace('2025', currentYear);
    }
    
    
    function setupMobileFooter() {
      if (window.innerWidth < 768) {
        const footerHeadings = document.querySelectorAll('.footer-col h4');
        
        footerHeadings.forEach(heading => {
          
          heading.removeEventListener('click', toggleFooterColumn);
          
          
          heading.addEventListener('click', toggleFooterColumn);
          
          
          if (!heading.querySelector('.toggle-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'toggle-indicator';
            indicator.innerHTML = ' &#9662;';
            heading.appendChild(indicator);
          }
          
          
          const list = heading.nextElementSibling;
          if (list && list.tagName === 'UL') {
            list.style.display = 'none';
          }
        });
      } else {
        
        const footerLists = document.querySelectorAll('.footer-col ul');
        footerLists.forEach(list => {
          list.style.display = 'block';
        });
        
        
        const indicators = document.querySelectorAll('.toggle-indicator');
        indicators.forEach(indicator => {
          indicator.remove();
        });
      }
    }
    
    function toggleFooterColumn(e) {
      const heading = e.currentTarget;
      const list = heading.nextElementSibling;
      const indicator = heading.querySelector('.toggle-indicator');
      
      if (list && list.tagName === 'UL') {
        if (list.style.display === 'none') {
          list.style.display = 'block';
          if (indicator) indicator.innerHTML = ' &#9652;';
        } else {
          list.style.display = 'none';
          if (indicator) indicator.innerHTML = ' &#9662;';
        }
      }
    }
    
    
    setupMobileFooter();
    window.addEventListener('resize', setupMobileFooter);
  });