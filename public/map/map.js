document.addEventListener('DOMContentLoaded', function() {
    const map = document.querySelector('#Saudi_Arabia');
    const container = document.querySelector('.map-container');
    const stateLabel = document.querySelector('.state-label');
    
    // State data mapping ID to title and statistics
    const stateData = {
        'SA-01': {
            name: 'Eastern Province',
            universities: 7,
            graduates: 30000,
            employment_rate: 59
        },
        'SA-02': {
            name: 'Northern Borders',
            universities: 1,
            graduates: 2000,
            employment_rate: 50
        },
        'SA-03': {
            name: 'Al-Jawf',
            universities: 1,
            graduates: 2000,
            employment_rate: 50
        },
        'SA-04': {
            name: 'Najran',
            universities: 1,
            graduates: 3000,
            employment_rate: 53
        },
        'SA-05': {
            name: 'Asir',
            universities: 1,
            graduates: 7000,
            employment_rate: 53
        },
        'SA-06': {
            name: 'Jazan',
            universities: 1,
            graduates: 5000,
            employment_rate: 53
        },
        'SA-07': {
            name: 'Tabuk',
            universities: 1,
            graduates: 3000,
            employment_rate: 50
        },
        'SA-08': {
            name: 'Madinah',
            universities: 2,
            graduates: 8000,
            employment_rate: 55
        },
        'SA-09': {
            name: 'Mecca',
            universities: 2,
            graduates: 21500,
            employment_rate: 54
        },
        'SA-10': {
            name: 'Riyadh',
            universities: 3,
            graduates: 40000,
            employment_rate: 60
        },
        'SA-11': {
            name: 'Al-Qassim',
            universities: 1,
            graduates: 5000,
            employment_rate: 55
        },
        'SA-12': {
            name: "Ḥa'il",
            universities: 1,
            graduates: 2000,
            employment_rate: 50
        },
        'SA-14': {
            name: 'Al-Bahah',
            universities: 1,
            graduates: 2000,
            employment_rate: 50
        }
    };

    // Add 3D perspective effect
    container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const rotateY = -((e.clientX - centerX) / rect.width * 15);
        const rotateX = (e.clientY - centerY) / rect.height * 15;
        
        map.style.transform = `
            perspective(2000px)
            rotateX(${20 + rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(50px)
        `;
    });

    // Reset position when mouse leaves
    container.addEventListener('mouseleave', function() {
        map.style.transform = `
            perspective(2000px)
            rotateX(20deg)
            rotateY(0deg)
            translateZ(50px)
        `;
        stateLabel.style.display = 'none';
    });

    // Handle state hover effects
    const states = document.querySelectorAll('.st0');
    states.forEach(state => {
        state.addEventListener('mouseenter', function(e) {
            const stateId = this.id;
            const data = stateData[stateId];
            if (data) {
                stateLabel.innerHTML = `
                    <div class="font-bold mb-2">${data.name}</div>
                    universities: ${data.universities}
                    <br>
                    graduates: ${data.graduates.toLocaleString()}
                    <br>
                    employment: ${data.employment_rate}%
                `;
                stateLabel.style.display = 'block';
                updateLabelPosition(e);
            }
        });

        state.addEventListener('mousemove', updateLabelPosition);
        
        state.addEventListener('mouseleave', function() {
            stateLabel.style.display = 'none';
        });
    });

    // Add click event listener to states
    states.forEach(state => {
        state.addEventListener('click', function(event) {
            event.preventDefault();
            const stateInfo = stateData[this.id];
            if (stateInfo) {
                console.log('State clicked:', stateInfo.name);
                // Send message to parent React component
                window.parent.postMessage({
                    type: 'stateClick',
                    stateName: stateInfo.name
                }, '*');
            }
        });
    });

    // Update label position
    function updateLabelPosition(e) {
        const x = e.clientX + 15;
        const y = e.clientY + 15;
        stateLabel.style.left = x + 'px';
        stateLabel.style.top = y + 'px';
    }
});
