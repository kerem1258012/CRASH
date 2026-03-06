/**
 * CRASH BOXPVP - KAPSAMLI CORE SCRIPT v3.1
 * Geliştirici: CrashBox Team
 * Bu dosya; istatistikleri, profil sistemini ve UI bileşenlerini yönetir.
 */

// 1. Sayfa Yükleme Kontrolü ve Başlatıcılar
document.addEventListener('DOMContentLoaded', () => {
    console.log("CrashBoxPvP Arabirimi Yüklendi...");
    
    // AOS (Animate on Scroll) Başlatma
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Parçacık Sistemi Başlatma
    startParticleEngine();

    // İstatistik Sayacı Başlatma
    initCounterObservers();

    // Navbar Scroll Efekti
    handleNavbarScroll();
});

/**
 * MADDE 1: İstatistik Sistemi
 * Sayıların sıfırdan hedefe akıcı şekilde artmasını sağlar.
 */
function initCounterObservers() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const inc = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + inc);
            setTimeout(() => startCounter(el), 1);
        } else {
            el.innerText = target;
        }
    };

    // Intersection Observer ile ekrana girince başlat
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/**
 * MADDE 3: Profil & Skin Sistemi
 * Kullanıcı adından anlık skin çeker ve simülasyon başlatır.
 */
function handleSkinUpdate() {
    const input = document.getElementById('user-input');
    const skinImg = document.getElementById('skin-img');
    const user = input.value.trim();

    if (user.length >= 3) {
        // Minotar API üzerinden skin çekme
        skinImg.src = `https://minotar.net/armor/body/${user}/100.png`;
        skinImg.style.transform = "scale(1.1) rotate(5deg)";
    } else {
        skinImg.src = "https://minotar.net/armor/body/Steve/100.png";
        skinImg.style.transform = "scale(1) rotate(0deg)";
    }
}

/**
 * Veri Senkronizasyon Simülasyonu
 */
function startDataSimulation() {
    const user = document.getElementById('user-input').value;
    const btn = document.querySelector('.btn-profile-fetch');
    
    if(!user) {
        showGlobalAlert("Lütfen geçerli bir kullanıcı adı girin!", "error");
        return;
    }

    // Buton Durumu Değiştirme
    btn.innerHTML = '<i class="fas fa-sync fa-spin"></i> BAĞLANIYOR...';
    btn.style.opacity = "0.7";
    btn.disabled = true;

    // Simüle edilmiş gecikme (Veritabanı sorgusu gibi)
    setTimeout(() => {
        const randomKills = Math.floor(Math.random() * 500);
        const randomMoney = (Math.random() * 1000).toFixed(2);
        
        // Verileri Arayüze Yazma
        document.getElementById('stat-kills').innerText = randomKills;
        document.getElementById('stat-money').innerText = randomMoney + " ₺";
        document.getElementById('stat-deaths').innerText = Math.floor(randomKills / 1.5);
        
        // Rütbe Belirleme
        const rankTag = document.querySelector('.tag.rank');
        rankTag.innerText = randomKills > 200 ? "RÜTBE: ELITE" : "RÜTBE: SAVAŞÇI";
        rankTag.style.background = "#00f2ff";
        rankTag.style.color = "#000";

        // İşlem Bitişi
        btn.innerHTML = 'VERİLER GÜNCEL';
        btn.style.background = "#00ff88";
        btn.style.opacity = "1";

        showGlobalAlert("Veritabanı bağlantısı başarılı. Verileriniz aktarıldı!", "success");

        setTimeout(() => {
            btn.innerHTML = '<span class="text">VERİLERİ SENKRONİZE ET</span>';
            btn.style.background = "#00f2ff";
            btn.disabled = false;
        }, 3000);

    }, 2000);
}

/**
 * IP Kopyalama ve Bildirim Mantığı
 */
function copyServerIP() {
    const serverIP = "CrashBoxpvp.aternos.me:60647";
    
    navigator.clipboard.writeText(serverIP).then(() => {
        const ipText = document.getElementById('ip-text');
        const original = ipText.innerText;
        
        ipText.innerText = "IP BAŞARIYLA KOPYALANDI!";
        ipText.style.color = "#00ff88";
        
        setTimeout(() => {
            ipText.innerText = original;
            ipText.style.color = "#fff";
        }, 2500);

        showGlobalAlert("Sunucu adresi panoya kopyalandı. Oyuna bekleniyorsunuz!", "info");
    });
}

/**
 * Özel Bildirim Sistemi (Toast)
 */
function showGlobalAlert(msg, type) {
    const toast = document.createElement('div');
    toast.className = `custom-alert ${type}`;
    toast.innerHTML = `<i class="fas fa-terminal"></i> <span>SYSTEM: ${msg}</span>`;
    
    // Stil Ataması
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '15px 30px',
        background: '#0d0d16',
        borderLeft: `5px solid ${type === 'success' ? '#00ff88' : '#00f2ff'}`,
        color: 'white',
        zIndex: '10000',
        fontFamily: 'JetBrains Mono',
        fontSize: '14px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        animation: 'slideIn 0.5s forwards'
    });

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

/**
 * Parçacık Motoru Yapılandırması
 */
function startParticleEngine() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00f2ff" },
            "opacity": { "value": 0.2, "random": true },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00f2ff", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" }
        },
        "interactivity": {
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
        }
    });
}

// 400 Satır için devam eden ekleme kodları...
function handleNavbarScroll() {
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('master-nav');
        if(window.scrollY > 100) {
            nav.style.padding = "10px 0";
            nav.style.background = "rgba(5, 5, 8, 0.95)";
        } else {
            nav.style.padding = "20px 0";
            nav.style.background = "rgba(5, 5, 8, 0.8)";
        }
    });
}

// Ek Fonksiyonlar...
function shopRedirect() {
    showGlobalAlert("Mağaza sistemi şimdilik Discord üzerinden çalışmaktadır.", "info");
}
