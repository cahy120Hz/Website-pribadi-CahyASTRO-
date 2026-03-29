document.addEventListener("DOMContentLoaded", function () {
    // ==================== LOADING SCREEN ====================
    let progress = 0;
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const loadingScreen = document.getElementById("loading-screen");
    const app = document.getElementById("app");
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += Math.floor(Math.random() * 15) + 1;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + "%";
            progressText.innerText = progress + "%";
        } else {
            clearInterval(interval);
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                loadingScreen.style.display = "none";
                app.style.display = "flex";
                app.style.flexDirection = "column";
                initHomeFeatures();
            }, 800);
        }
    }, 80);

    // ==================== NAVIGASI SPA ====================
    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    function activatePage(pageId) {
        pages.forEach(page => page.classList.remove("active-page"));
        const activePage = document.getElementById(pageId + "-page");
        if (activePage) activePage.classList.add("active-page");
        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("data-page") === pageId) item.classList.add("active");
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("data-page");
            activatePage(page);
            const mobileNav = document.querySelector(".nav-menu");
            if (mobileNav.classList.contains("active")) mobileNav.classList.remove("active");
        });
    });
    activatePage("home");

    // Mobile menu
    const mobileToggle = document.getElementById("mobile-menu");
    const navMenu = document.getElementById("nav-menu");
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
    }

    // ==================== FUNGSI TOAST ====================
    function showToast(message) {
        const toast = document.createElement("div");
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#0f172ad9";
        toast.style.backdropFilter = "blur(10px)";
        toast.style.color = "#0ff";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "50px";
        toast.style.border = "1px solid cyan";
        toast.style.zIndex = "9999";
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 500); }, 2000);
    }

    // ==================== FITUR HOME ====================
    function initHomeFeatures() {
        // 1. Fakta Hari Ini + Gambar
        const facts = [
            { text: "Satu tahun di Venus lebih pendek dari satu hari di Venus.", icon: "🪐" },
            { text: "Bintang neutron memiliki kepadatan setara satu sendok teh seberat 10 juta ton.", icon: "⭐" },
            { text: "Lubang hitam dapat membengkokkan ruang dan waktu.", icon: "🌀" },
            { text: "Galaksi Andromeda bergerak menuju Bima Sakti dengan kecepatan 110 km/detik.", icon: "🌌" },
            { text: "Ada lebih banyak bintang di alam semesta daripada butiran pasir di seluruh Bumi.", icon: "✨" },
            { text: "Matahari menyusut sekitar 5 meter per detik karena fusi nuklir.", icon: "☀️" },
            { text: "Titik terdingin di alam semesta ada di Nebula Boomerang: -272°C.", icon: "❄️" },
            { text: "Jupiter memiliki 79 bulan yang diketahui.", icon: "🪐" },
            { text: "Satu hari di Mars hampir sama dengan di Bumi: 24 jam 37 menit.", icon: "🔴" }
        ];
        const factEl = document.getElementById("daily-fact");
        const factImage = document.getElementById("fact-image");
        const refreshFactBtn = document.getElementById("refreshFact");
        function updateFact() {
            const random = facts[Math.floor(Math.random() * facts.length)];
            factEl.innerText = random.text;
            factImage.innerHTML = random.icon;
        }
        updateFact();
        refreshFactBtn.addEventListener("click", updateFact);

        // 2. Cuaca Antariksa (simulasi)
        function updateSpaceWeather() {
            document.getElementById("aurora").innerHTML = Math.random() > 0.5 ? '<i class="fas fa-charging-station"></i> Aktif' : '<i class="fas fa-cloud-moon"></i> Tenang';
            document.getElementById("solar-wind").innerText = (350 + Math.random() * 150).toFixed(0);
            document.getElementById("sunspots").innerText = Math.floor(Math.random() * 150);
        }
        updateSpaceWeather();
        setInterval(updateSpaceWeather, 10000);

        // 3. Kuis Astronomi (15 soal)
        const quizBank = [
            { q: "Planet terbesar di tata surya?", options: ["Mars", "Jupiter", "Saturnus", "Neptunus"], correct: 1 },
            { q: "Berapa jumlah planet dalam tata surya kita?", options: ["7", "8", "9", "10"], correct: 1 },
            { q: "Apa nama galaksi kita?", options: ["Andromeda", "Bima Sakti", "Triangulum", "Sombrero"], correct: 1 },
            { q: "Siapa yang pertama kali mengamati bulan Jupiter?", options: ["Newton", "Galileo Galilei", "Kepler", "Copernicus"], correct: 1 },
            { q: "Planet mana yang dikenal sebagai 'Planet Merah'?", options: ["Venus", "Mars", "Jupiter", "Saturnus"], correct: 1 },
            { q: "Apa nama satelit alami Bumi?", options: ["Titan", "Europa", "Bulan", "Phobos"], correct: 2 },
            { q: "Berapa lama waktu yang dibutuhkan Bumi untuk mengorbit Matahari?", options: ["365 hari", "366 hari", "364 hari", "360 hari"], correct: 0 },
            { q: "Apa nama bintang terdekat dengan Bumi setelah Matahari?", options: ["Sirius", "Proxima Centauri", "Alpha Centauri", "Betelgeuse"], correct: 1 },
            { q: "Planet mana yang memiliki cincin paling menonjol?", options: ["Jupiter", "Uranus", "Neptunus", "Saturnus"], correct: 3 },
            { q: "Apa nama fenomena ketika Bulan berada di antara Bumi dan Matahari?", options: ["Gerhana Bulan", "Gerhana Matahari", "Supernova", "Aurora"], correct: 1 },
            { q: "Siapa astronot pertama yang berjalan di Bulan?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], correct: 2 },
            { q: "Apa nama asteroid terbesar di sabuk asteroid?", options: ["Vesta", "Ceres", "Pallas", "Hygiea"], correct: 1 },
            { q: "Planet manakah yang memiliki suhu permukaan tertinggi?", options: ["Merkurius", "Venus", "Bumi", "Mars"], correct: 1 },
            { q: "Apa nama galaksi terdekat dengan Bima Sakti?", options: ["Andromeda", "Segitiga", "Awan Magellan", "Sombrero"], correct: 0 },
            { q: "Berapa kecepatan cahaya dalam ruang hampa (km/detik)?", options: ["300.000", "150.000", "450.000", "100.000"], correct: 0 }
        ];
        let currentQuizIndex = 0;
        let quizScore = 0;
        const quizQuestion = document.getElementById("quiz-question");
        const quizOptionsDiv = document.getElementById("quiz-options");
        const quizScoreDiv = document.getElementById("quiz-score");
        const quizFeedback = document.getElementById("quiz-feedback");
        function loadQuiz() {
            const q = quizBank[currentQuizIndex];
            quizQuestion.innerText = q.q;
            quizOptionsDiv.innerHTML = "";
            q.options.forEach((opt, idx) => {
                const btn = document.createElement("button");
                btn.innerText = opt;
                btn.onclick = () => {
                    if (idx === q.correct) {
                        quizScore++;
                        quizFeedback.innerText = "✅ Benar! +1 poin";
                        quizFeedback.style.color = "lightgreen";
                    } else {
                        quizFeedback.innerText = `❌ Salah. Jawaban benar: ${q.options[q.correct]}`;
                        quizFeedback.style.color = "orange";
                    }
                    quizScoreDiv.innerText = `Skor: ${quizScore} / 15`;
                    setTimeout(() => {
                        currentQuizIndex = (currentQuizIndex + 1) % quizBank.length;
                        loadQuiz();
                        quizFeedback.innerText = "";
                    }, 1500);
                };
                quizOptionsDiv.appendChild(btn);
            });
        }
        loadQuiz();
        document.getElementById("nextQuiz").addEventListener("click", () => {
            currentQuizIndex = (currentQuizIndex + 1) % quizBank.length;
            loadQuiz();
            quizFeedback.innerText = "";
        });

        // 4. NASA APOD
        async function fetchAPOD() {
            try {
                const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
                const data = await res.json();
                document.getElementById("apod-img").src = data.url;
                document.getElementById("apod-title").innerText = data.title;
                document.getElementById("apod-link").href = data.hdurl || data.url;
            } catch {
                document.getElementById("apod-img").src = "https://via.placeholder.com/400x200?text=Gagal+memuat+APOD";
                document.getElementById("apod-title").innerText = "Gunakan API key pribadi untuk gambar nyata";
            }
        }
        fetchAPOD();

        // 5. Countdown Gerhana Bulan
        function updateCountdown() {
            const target = new Date("September 7, 2026 00:00:00").getTime();
            const now = new Date().getTime();
            const diff = target - now;
            if (diff <= 0) document.getElementById("countdown").innerHTML = "Gerhana telah terjadi!";
            else {
                const days = Math.floor(diff / (1000*60*60*24));
                const hours = Math.floor((diff % (86400000)) / 3600000);
                const minutes = Math.floor((diff % 3600000) / 60000);
                const secs = Math.floor((diff % 60000) / 1000);
                document.getElementById("countdown").innerHTML = `${days} hari ${hours} jam ${minutes} menit ${secs} detik`;
            }
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);

        // 6. Quote Astronomi
        const quotes = [
            "Kita terbuat dari debu bintang. - Carl Sagan",
            "Langit bukan batasnya, hanya awal. - Neil Armstrong",
            "Ada satu kebenaran: Bumi itu bulat. - Buzz Aldrin",
            "Alam semesta makin besar setiap detik. - Edwin Hubble",
            "Bumi adalah panggung kecil di kosmos. - Carl Sagan",
            "Kita adalah cara alam semesta untuk mengenali dirinya sendiri. - Carl Sagan"
        ];
        const quoteEl = document.getElementById("astro-quote");
        document.getElementById("newQuote").addEventListener("click", () => {
            quoteEl.innerText = quotes[Math.floor(Math.random() * quotes.length)];
        });

        // 7. Fase Bulan (simulasi)
        function updateMoonPhase() {
            const phases = ["Bulan Baru", "Sabit Muda", "Kuartal Pertama", "Cembung Awal", "Purnama", "Cembung Akhir", "Kuartal Ketiga", "Sabit Tua"];
            const idx = Math.floor(Math.random() * phases.length);
            document.getElementById("moon-phase-name").innerText = phases[idx];
            const illumination = Math.floor(Math.random() * 100);
            document.getElementById("moon-illumination").innerHTML = `Illumination: ${illumination}%`;
            // change icon based on phase
            const icon = document.getElementById("moon-icon");
            if (idx === 4) icon.className = "fas fa-moon fa-3x";
            else if (idx < 2) icon.className = "fas fa-moon";
            else icon.className = "fas fa-moon";
        }
        updateMoonPhase();
        setInterval(updateMoonPhase, 30000);

        // 8. Lokasi ISS (simulasi, tapi bisa juga dengan API nyata)
        async function fetchISS() {
            try {
                const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
                const data = await res.json();
                document.getElementById("iss-lat").innerText = data.latitude.toFixed(2);
                document.getElementById("iss-lon").innerText = data.longitude.toFixed(2);
                document.getElementById("iss-alt").innerText = data.altitude.toFixed(0);
            } catch {
                // fallback simulasi
                document.getElementById("iss-lat").innerText = (Math.random() * 180 - 90).toFixed(2);
                document.getElementById("iss-lon").innerText = (Math.random() * 360 - 180).toFixed(2);
                document.getElementById("iss-alt").innerText = Math.floor(400 + Math.random() * 50);
            }
        }
        fetchISS();
        document.getElementById("refreshISS").addEventListener("click", fetchISS);
        setInterval(fetchISS, 30000);

        // 9. Star Map Canvas
        const canvas = document.getElementById("starCanvas");
        const ctx = canvas.getContext("2d");
        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < 300; i++) {
                ctx.fillStyle = `rgb(255,255,${150+Math.random()*105})`;
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, Math.PI*2);
                ctx.fill();
            }
        }
        drawStars();
        canvas.addEventListener("click", (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
            ctx.fillStyle = "cyan";
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI*2);
            ctx.fill();
            showToast(`Bintang baru lahir di koordinat ${Math.floor(x)},${Math.floor(y)}`);
        });

        // 10. AI Chatbot (rule-based)
        const chatLog = document.getElementById("chat-log");
        const chatInput = document.getElementById("chat-input");
        const sendBtn = document.getElementById("send-chat");
        function botResponse(userMsg) {
            const msg = userMsg.toLowerCase();
            if (msg.includes("planet")) return "Planet ada 8: Merkurius hingga Neptunus. Pluto dianggap planet kerdil.";
            if (msg.includes("bintang")) return "Bintang adalah bola gas panas yang memancarkan cahaya. Matahari adalah bintang terdekat.";
            if (msg.includes("lubang hitam")) return "Lubang hitam adalah wilayah dengan gravitasi sangat kuat, bahkan cahaya tak bisa lepas.";
            if (msg.includes("galaksi")) return "Galaksi adalah kumpulan miliaran bintang. Bima Sakti adalah galaksi kita.";
            if (msg.includes("bulan")) return "Bulan adalah satelit alami Bumi, berjarak ~384.400 km.";
            if (msg.includes("matahari")) return "Matahari adalah bintang di pusat tata surya, suhu permukaan ~5500°C.";
            if (msg.includes("asteroid")) return "Asteroid adalah batuan kecil mengorbit matahari, banyak di sabuk antara Mars dan Jupiter.";
            if (msg.includes("roket")) return "Roket menggunakan prinsip aksi-reaksi untuk meluncur ke luar angkasa.";
            if (msg.includes("astronot")) return "Astronot adalah orang yang terlatih untuk melakukan perjalanan luar angkasa.";
            if (msg.includes("teleskop")) return "Teleskop digunakan untuk melihat benda langit. Hubble adalah teleskop luar angkasa terkenal.";
            return "Maaf, aku masih belajar astronomi. Coba tanya tentang planet, bintang, lubang hitam, atau galaksi!";
        }
        function addMessage(text, isUser) {
            const div = document.createElement("div");
            div.className = isUser ? "user-message" : "bot-message";
            div.innerText = text;
            chatLog.appendChild(div);
            chatLog.scrollTop = chatLog.scrollHeight;
        }
        sendBtn.addEventListener("click", () => {
            const msg = chatInput.value.trim();
            if (!msg) return;
            addMessage(msg, true);
            const reply = botResponse(msg);
            setTimeout(() => addMessage(reply, false), 300);
            chatInput.value = "";
        });
        chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendBtn.click(); });

        // 11. Copy email di home
        const homeCopyBtn = document.getElementById("homeCopyEmail");
        if (homeCopyBtn) {
            homeCopyBtn.addEventListener("click", () => {
                navigator.clipboard.writeText("cahyonocahyxz@gmail.com");
                showToast("Email disalin!");
            });
        }

        // 12. Status dinamis
        const statuses = ["Mengamati Nebula Orion", "Menghitung Jarak Antar Galaksi", "Mempelajari Lubang Hitam", "Menjelajah Exoplanet", "Memantau Bintik Matahari", "Menganalisis Spektrum Bintang"];
        const statusSpan = document.getElementById("live-status");
        setInterval(() => {
            statusSpan.innerText = statuses[Math.floor(Math.random() * statuses.length)];
        }, 10000);
    }

    // ==================== FUNGSI LAIN (copy email & wallet) ====================
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
            navigator.clipboard.writeText("cahyonocahyxz@gmail.com");
            showToast("Email tersalin!");
        });
    }
    const copyWallet = document.getElementById("copyWalletBtn");
    if (copyWallet) {
        copyWallet.addEventListener("click", () => {
            navigator.clipboard.writeText("081262131455");
            showToast("Nomor e-wallet tersalin!");
        });
    }
    const ovoBtn = document.getElementById("ovoAlertBtn");
    if (ovoBtn) {
        ovoBtn.addEventListener("click", () => alert("Nomor OVO: 081262131455"));
    }
});