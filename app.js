// Data for motivational quotes + photos
const motivators = [
    {
      name: "David Goggins",
      photo: "https://i.imgur.com/GPJYcKu.jpg",
      quotes: [
        "Stay hard!",
        "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.",
        "Motivation is crap. Motivation comes and goes. When you're driven, whatever is in front of you will get destroyed."
      ]
    },
    {
      name: "Cristiano Ronaldo",
      photo: "https://i.imgur.com/X6t1FZQ.jpg",
      quotes: [
        "Dreams are not what you see in sleep, dreams are things which do not let you sleep.",
        "Talent without working hard is nothing.",
        "Your love makes me strong, your hate makes me unstoppable."
      ]
    },
    {
      name: "Virat Kohli",
      photo: "https://i.imgur.com/5U9ksgB.jpg",
      quotes: [
        "Self-belief and hard work will always earn you success.",
        "No cricket team in the world depends on one or two players.",
        "Take pride in how far you've come and have faith in how far you can go."
      ]
    },
    {
      name: "Michael Jordan",
      photo: "https://i.imgur.com/T6M3x0O.jpg",
      quotes: [
        "I’ve failed over and over and over again in my life. And that is why I succeed.",
        "Some people want it to happen, some wish it would happen, others make it happen.",
        "You must expect great things of yourself before you can do them."
      ]
    },
    {
      name: "Muhammad Ali",
      photo: "https://i.imgur.com/RuJTZtg.jpg",
      quotes: [
        "Don't count the days, make the days count.",
        "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
        "It isn't the mountains ahead to climb that wear you out; it's the pebble in your shoe."
      ]
    }
  ];
  
  // Dark mode toggle
  const toggleDarkBtn = document.getElementById('toggle-dark');
  toggleDarkBtn.addEventListener('click', () => {
    const html = document.documentElement;
    if(html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Load saved theme on start
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  
  // Counter and settings logic
  const countYouTubeDisplay = document.getElementById('count-youtube-display');
  const countInstagramDisplay = document.getElementById('count-instagram-display');
  const countFacebookDisplay = document.getElementById('count-facebook-display');
  const totalCountDisplay = document.getElementById('total-count');
  const reminderDiv = document.getElementById('reminder');
  const resetBtn = document.getElementById('reset-count');
  
  const maxCountInput = document.getElementById('max-count');
  const countYTCheckbox = document.getElementById('count-youtube');
  const countInstaCheckbox = document.getElementById('count-instagram');
  const countFBCheckbox = document.getElementById('count-facebook');
  
  const STORAGE_KEY = 'shortsCounterData';
  
  // Data structure in localStorage
  // { date: 'yyyy-mm-dd', counts: { youtube: 0, instagram: 0, facebook: 0 }, maxCount: 100, settings... }
  
  function getTodayDate() {
    return new Date().toISOString().slice(0, 10);
  }
  
  function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    if(!data) return null;
    const parsed = JSON.parse(data);
    if(parsed.date !== getTodayDate()) {
      // Reset counts if date changed
      return {
        date: getTodayDate(),
        counts: { youtube: 0, instagram: 0, facebook: 0 },
        maxCount: 100,
        settings: {
          countYouTube: true,
          countInstagram: true,
          countFacebook: true
        }
      };
    }
    return parsed;
  }
  
  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  
  let appData = loadData() || {
    date: getTodayDate(),
    counts: { youtube: 0, instagram: 0, facebook: 0 },
    maxCount: 100,
    settings: {
      countYouTube: true,
      countInstagram: true,
      countFacebook: true
    }
  };
  
  function updateUI() {
    countYouTubeDisplay.textContent = appData.counts.youtube;
    countInstagramDisplay.textContent = appData.counts.instagram;
    countFacebookDisplay.textContent = appData.counts.facebook;
    const total = appData.counts.youtube + appData.counts.instagram + appData.counts.facebook;
    totalCountDisplay.textContent = total;
  
    if(total >= appData.maxCount) {
      reminderDiv.textContent = "⚠️ You've reached your daily limit!";
    } else if (total >= appData.maxCount * 0.8) {
      reminderDiv.textContent = "⚠️ Almost at your daily limit!";
    } else {
      reminderDiv.textContent = "";
    }
  }
  
  function incrementCount(app) {
    if(!appData.settings[`count${capitalize(app)}`]) return;
    appData.counts[app]++;
    saveData(appData);
    updateUI();
  
    if(appData.counts[app] > appData.maxCount) {
      alert(`Reminder: You have exceeded your daily limit on ${capitalize(app)}!`);
    }
  }
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  maxCountInput.value = appData.maxCount;
  countYTCheckbox.checked = appData.settings.countYouTube;
  countInstaCheckbox.checked = appData.settings.countInstagram;
  countFBCheckbox.checked = appData.settings.countFacebook;
  
  maxCountInput.addEventListener('change', () => {
    appData.maxCount = Number(maxCountInput.value);
    saveData(appData);
    updateUI();
  });
  countYTCheckbox.addEventListener('change', () => {
    appData.settings.countYouTube = countYTCheckbox.checked;
    saveData(appData);
  });
  countInstaCheckbox.addEventListener('change', () => {
    appData.settings.countInstagram = countInstaCheckbox.checked;
    saveData(appData);
  });
  countFBCheckbox.addEventListener('change', () => {
    appData.settings.countFacebook = countFBCheckbox.checked;
    saveData(appData);
  });
  
  resetBtn.addEventListener('click', () => {
    appData.counts = { youtube: 0, instagram: 0, facebook: 0 };
    saveData(appData);
    updateUI();
  });
  
  // Motivational quotes section
  const motivPhoto = document.getElementById('motivator-photo');
  const motivQuote = document.getElementById('motivational-quote');
  const motivAuthor = document.getElementById('quote-author');
  const newQuoteBtn = document.getElementById('new-quote');
  
  function showRandomMotivation() {
    const motiv = motivators[Math.floor(Math.random() * motivators.length)];
    const quote = motiv.quotes[Math.floor(Math.random() * motiv.quotes.length)];
    motivPhoto.src = motiv.photo;
    motivQuote.textContent = `"${quote}"`;
    motivAuthor.textContent = `— ${motiv.name}`;
  }
  newQuoteBtn.addEventListener('click', showRandomMotivation);
  showRandomMotivation();
  
  // PWA install prompt handling
  let deferredPrompt;
  const installPromptDiv = document.getElementById('install-prompt');
  const installBtn = document.getElementById('install-btn');
  const dismissBtn = document.getElementById('dismiss-btn');
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPromptDiv.style.display = 'block';
  });
  
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
      installPromptDiv.style.display = 'none';
    }
  });
  
  dismissBtn.addEventListener('click', () => {
    installPromptDiv.style.display = 'none';
  });
  