function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function getAspectRatio(w, h) {
    const divisor = gcd(w, h);
    return `${w / divisor}:${h / divisor}`;
}

function updateAspectRatio() {
    const w = parseInt(document.getElementById('width').value) || 0;
    const h = parseInt(document.getElementById('height').value) || 0;
    document.getElementById('aspectRatio').textContent = w && h ? getAspectRatio(w, h) : '--';
}

function toggleDropdown(id) {
    const content = document.getElementById(`dropdown-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);
    content.classList.toggle('active');
    arrow.classList.toggle('open');
}

function loadResolution(w, h) {
    document.getElementById('width').value = w;
    document.getElementById('height').value = h;
    updateAspectRatio();
    calculate();
}

function loadStandardPreset() {
    const select = document.getElementById('standardPreset');
    if (select.value) {
        const [w, h] = select.value.split(',').map(Number);
        loadResolution(w, h);
    }
}

function loadPhonePreset() {
    const select = document.getElementById('phonePreset');
    if (select.value) {
        const [w, h] = select.value.split(',').map(Number);
        loadResolution(w, h);
    }
}

function loadTabletPreset() {
    const select = document.getElementById('tabletPreset');
    if (select.value) {
        const [w, h] = select.value.split(',').map(Number);
        loadResolution(w, h);
    }
}

function loadLaptopPreset() {
    const select = document.getElementById('laptopPreset');
    if (select.value) {
        const [w, h] = select.value.split(',').map(Number);
        loadResolution(w, h);
    }
}

function loadMonitorPreset() {
    const select = document.getElementById('monitorPreset');
    if (select.value) {
        const [w, h] = select.value.split(',').map(Number);
        loadResolution(w, h);
    }
}

function loadCustomDevice() {
    const w = parseInt(document.getElementById('customWidth').value);
    const h = parseInt(document.getElementById('customHeight').value);
    if (w && h) {
        loadResolution(w, h);
    } else {
        alert('Please enter valid width and height for custom device');
    }
}

function calculate() {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);

    if (!width || !height) {
        alert('Please enter valid width and height');
        return;
    }

    const results = document.getElementById('results');
    const aspectRatio = width / height;

    const calculations = [
        { name: '75% Smaller', percent: -75 },
        { name: '50% Smaller', percent: -50 },
        { name: '25% Smaller', percent: -25 },
        { name: 'Current', percent: 0 },
        { name: '25% Larger', percent: 25 },
        { name: '50% Larger', percent: 50 },
        { name: '100% Larger', percent: 100 },
        { name: '200% Larger', percent: 200 }
    ];

    results.innerHTML = calculations.map(calc => {
        const newWidth = Math.round(width * (1 + calc.percent / 100));
        const newHeight = Math.round(newWidth / aspectRatio);
        const megapixels = ((newWidth * newHeight) / 1000000).toFixed(2);

        return `
            <div class="result-card">
                <div class="result-title">${calc.name}</div>
                <div class="result-res">${newWidth} × ${newHeight}</div>
                <div class="result-details">
                    ${calc.percent !== 0 ? (calc.percent > 0 ? '+' : '') + calc.percent + '%' : 'Original'}<br>
                    ${megapixels} MP | ${getAspectRatio(newWidth, newHeight)}
                </div>
            </div>
        `;
    }).join('');
}

function applyPercentage(add) {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    const percent = parseFloat(document.getElementById('customPercent').value);

    if (!width || !height || isNaN(percent)) {
        alert('Please enter valid values');
        return;
    }

    const multiplier = add ? (1 + percent / 100) : (1 - percent / 100);
    const newWidth = Math.round(width * multiplier);
    const newHeight = Math.round(height * multiplier);

    const result = document.getElementById('percentResult');
    result.className = 'info-box';
    result.innerHTML = `
        <strong>${add ? 'Added' : 'Subtracted'} ${percent}%</strong><br>
        New Resolution: ${newWidth} × ${newHeight}<br>
        Aspect Ratio: ${getAspectRatio(newWidth, newHeight)}
    `;
}

function reverseCalculate() {
    const origWidth = parseInt(document.getElementById('width').value);
    const origHeight = parseInt(document.getElementById('height').value);
    const newWidth = parseInt(document.getElementById('reverseWidth').value);
    const newHeight = parseInt(document.getElementById('reverseHeight').value);

    if (!origWidth || !origHeight || !newWidth || !newHeight) {
        alert('Please enter valid values in all fields');
        return;
    }

    const widthPercent = ((newWidth - origWidth) / origWidth * 100).toFixed(2);
    const heightPercent = ((newHeight - origHeight) / origHeight * 100).toFixed(2);
    const diff = Math.abs(parseFloat(widthPercent) - parseFloat(heightPercent));

    const result = document.getElementById('reverseResult');
    result.className = diff < 0.1 ? 'info-box' : 'warning-box';
    result.innerHTML = `
        <strong>Percentage Change:</strong><br>
        Width: ${widthPercent > 0 ? '+' : ''}${widthPercent}%<br>
        Height: ${heightPercent > 0 ? '+' : ''}${heightPercent}%<br>
        ${diff < 0.1 ? 
            '<br>✓ Proportional scaling maintained!' : 
            '<br>⚠ Warning: Aspect ratio changed!'}
    `;
}

document.getElementById('width').addEventListener('input', updateAspectRatio);
document.getElementById('height').addEventListener('input', updateAspectRatio);

updateAspectRatio();
calculate();