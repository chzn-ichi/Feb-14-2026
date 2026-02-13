// ===== Grab elements =====
const btnNo = document.getElementById('btnNo');
const btnYes = document.getElementById('btnYes');
const confirmModal = document.getElementById('confirmationModal');
const fullscreenNotice = document.getElementById('fullscreenNotice');
const bsod = document.getElementById('bsod');
const successModal = document.getElementById('successModal');
const video = document.getElementById('valentineVideo');
const audio = document.getElementById('valentineAudio');

// ===== Helper to check fullscreen =====
function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || 
              document.mozFullScreenElement || document.msFullscreenElement);
}

// ===== "No" triggers the scary warning =====
btnNo.onclick = () => {
    confirmModal.classList.add('show');
};

// ===== Cancel the warning =====
document.getElementById('confirmCancel').onclick = () => {
    confirmModal.classList.remove('show');
};

// ===== Confirming "Yes" to the threat =====
document.getElementById('confirmYes').onclick = async () => {
    confirmModal.classList.remove('show');

    try {
        // Attempt to force fullscreen immediately
        if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            await document.documentElement.webkitRequestFullscreen();
        }
        
        // If successful, show BSOD immediately
        bsod.classList.add('show');
    } catch (err) {
        // If the browser blocks the automatic fullscreen, show the F11 notice
        fullscreenNotice.classList.add('show');
    }
};

// ===== Backup: Listen for F11 / manual fullscreen via resize =====
window.addEventListener('resize', () => {
    const isFull = window.innerHeight === window.screen.height;
    if (fullscreenNotice.classList.contains('show') && isFull) {
        fullscreenNotice.classList.remove('show');
        bsod.classList.add('show');
    }
});

// ===== Undo choice (Return to main screen) =====
document.getElementById('undoChoice').onclick = () => {
    bsod.classList.remove('show');
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
};

// ===== Show success modal =====
btnYes.addEventListener('click', () => {
    successModal.classList.add('show');

    // Reset video and audio to start
    video.currentTime = 0;
    video.play();

    audio.currentTime = 0;
    audio.muted = false; // ensure unmuted
    audio.play().catch(err => {
        console.log("Audio play blocked:", err);
    });
});

// ===== Close success modal =====
document.getElementById('closeSuccess').onclick = () => {
    successModal.classList.remove('show');

    // Pause and reset video and audio
    video.pause();
    video.currentTime = 0;

    audio.pause();
    audio.currentTime = 0;
};
