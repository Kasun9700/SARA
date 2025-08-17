<template>
  <div class="header-nav">

    <div class="pill floating-pill" :class="{ floating: open }"
      @mouseenter="onPillHover(true)" @mouseleave="onPillHover(false)">
      <div class="logo" role="button" tabindex="0" :aria-expanded="open" @click="toggle" @keydown.enter.prevent="toggle"
        @keydown.space.prevent="toggle">
        <transition name="pill-fade-top" mode="out-in">
          <span v-if="pillLabel === 'DREAM HOMES DESIGN'" key="default-label" class="pill-main-label">DREAM HOMES DESIGN</span>
        </transition>
        <transition name="pill-slide-bottom" mode="out-in">
          <span v-if="pillLabel !== 'DREAM HOMES DESIGN'" key="section-label" class="section-label">{{ pillLabel }}</span>
        </transition>
      </div>
      <!-- toggle button (dot inside the pill) -->
      <button class="nav-toggle" :aria-expanded="open" aria-label="Toggle navigation" @click="toggle">
        <span class="dot" aria-hidden="true"></span>
      </button>
    </div>

    <!-- main nav: hidden by default; opens on toggle. fullscreen on small screens -->
    <nav :class="['main-nav', { open }]" role="navigation" aria-label="Main navigation"
      @mouseenter="onNavHover(true)" @mouseleave="onNavHover(false)">
      <ul>
        <li v-for="(item, i) in menu" :key="item.id" :style="{ '--i': i }">
          <a :href="item.href" :class="{ active: active === item.id }" @click.prevent="navigate(item)">
            <span class="menu-dot" aria-hidden="true"></span>
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- backdrop for mobile menu - always rendered but conditionally visible -->
    <div :class="['nav-overlay', { visible: open }]" @click="close" aria-hidden="true"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const pillHover = ref(false)
const navHover = ref(false)
const active = ref('home')

const menu = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'categories', label: 'CATEGORIES', href: '#categories' },
  { id: 'gallery', label: 'GALLERY', href: '#gallery' },
  { id: 'process', label: 'PROCESS', href: '#process' },
  { id: 'connect', label: 'CONNECT', href: '#connect' },
]


function isMobile() {
  return window.innerWidth < 768;
}
function toggle() {
  if (!isMobile()) return;
  open.value = !open.value;
}
function close() {
  open.value = false
}

// --- Hover logic for desktop nav ---
function onPillHover(hovering) {
  pillHover.value = hovering;
  if (!isMobile()) {
    if (hovering || navHover.value) open.value = true;
    else open.value = false;
  }
}
function onNavHover(hovering) {
  navHover.value = hovering;
  if (!isMobile()) {
    if (hovering || pillHover.value) open.value = true;
    else open.value = false;
  }
}

function navigate(item) {
  // close menu and smooth-scroll to target if found
  close()
  const el = document.querySelector(item.href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else if (item.href === '#hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  // Reset hover state so nav closes on desktop
  pillHover.value = false;
  navHover.value = false;
}
/* Position the nav directly under the pill */



// pill label state
const pillLabel = ref('DREAM HOMES DESIGN')
let pillTimeout = null

// do NOT lock body scroll when open (allow scrolling)
function updateBodyLock() {
  document.documentElement.style.overflow = ''
}


// observe sections to set active link and handle pill label on scroll
let io
let lastSectionName = ''
let scrollHandler = null
onMounted(() => {
  // keep body locked state in sync
  watchOpen()

  const sections = menu.map(m => (m.href && m.href.startsWith('#') ? document.querySelector(m.href) : null)).filter(Boolean)
  if (sections.length) {
    io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const id = e.target.id || ''
        const found = menu.find(m => m.href === `#${id}`)
        if (found) {
          const rect = e.target.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const top50 = viewportHeight * 0.5;
          if (rect.top < top50 && rect.bottom > top50) {
            if (pillLabel.value !== found.label) {
              pillLabel.value = found.label;
              if (pillTimeout) clearTimeout(pillTimeout);
              pillTimeout = setTimeout(() => {
                pillLabel.value = 'DREAM HOMES DESIGN';
              }, 1000);
            }
            active.value = found.id;
          }
        }
      })
    }, { root: null, threshold: [0, 0.5, 1] })
    sections.forEach(s => io.observe(s))
  }

  // close on escape
  window.addEventListener('keydown', onKey)

  // handle pill label on scroll when navbar is open
  let hasScrolled = false
  scrollHandler = () => {
    // If navbar is open, close it on first scroll (desktop: also reset hover)
    if (open.value && !hasScrolled) {
      open.value = false
      hasScrolled = true
      pillHover.value = false;
      navHover.value = false;
      // pill label will reset by watcher
      // but still show section name for 1s below
    }
    if (!open.value) {
      hasScrolled = false
    }
    // Always show section name for 1s while scrolling
    let current = menu[0]
    for (let i = 0; i < menu.length; i++) {
      const m = menu[i]
      if (m.href && m.href.startsWith('#')) {
        const el = document.querySelector(m.href)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 80 && rect.bottom > 80) {
            current = m
            break
          }
        }
      }
    }
    // Only show section name for 1s, then revert, even if scrolling continues
    if (pillLabel.value === 'DREAM HOMES DESIGN' && current.label !== 'DREAM HOMES DESIGN') {
      pillLabel.value = current.label
      if (pillTimeout) clearTimeout(pillTimeout)
      pillTimeout = setTimeout(() => {
        pillLabel.value = 'DREAM HOMES DESIGN'
      }, 1000)
    }
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
})


onBeforeUnmount(() => {
  if (io) io.disconnect()
  window.removeEventListener('keydown', onKey)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
  if (pillTimeout) clearTimeout(pillTimeout)
})

function onKey(e) {
  if (e.key === 'Escape') close()
}

// simple watcher without importing watch to remain concise (poll open changes)
let prev = open.value
function watchOpen() {
  const t = setInterval(() => {
    if (open.value !== prev) {
      prev = open.value
      updateBodyLock()
      // reset pill label when navbar opens/closes
      pillLabel.value = 'DREAM HOMES DESIGN'
      lastSectionName = ''
      if (pillTimeout) clearTimeout(pillTimeout)
    }
  }, 80)
  // clear on unmount
  onBeforeUnmount(() => clearInterval(t))
}
</script>


<style scoped>
.pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 320px;
  width: auto;
  margin: 0 auto;
  gap: 1rem;
  padding: 0.7rem 1.4rem;
  box-sizing: border-box;
  background: #111;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(3, 6, 10, .4);
  min-width: 300px;
  transition: box-shadow 0.2s, position 0.2s, top 0.2s;
}

.floating-pill.floating {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  box-shadow: 0 8px 32px rgba(3, 6, 10, .5);
}

.pill .logo {
  font-weight: 700;
  text-align: center;
  font-size: 1.1rem;
  letter-spacing: 1px;
  flex: 1;
  font-family: inherit;
  position: relative;
  min-height: 1.3em;
}
.pill-main-label {
  display: inline-block;
}
.section-label {
  font-size: 0.85em;
  font-weight: 500;
  letter-spacing: 0.5px;
  display: inline-block;
}

.pill-fade-top-enter-active, .pill-fade-top-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}
.pill-fade-top-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.pill-fade-top-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.pill-fade-top-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.pill-fade-top-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Section name slides in from bottom and leaves to bottom */
.pill-slide-bottom-enter-active, .pill-slide-bottom-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}
.pill-slide-bottom-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.pill-slide-bottom-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.pill-slide-bottom-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.pill-slide-bottom-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.pill .logo .section-label {
  font-size: 0.85em;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.nav-toggle {
  margin-left: 0;
  flex-shrink: 0;
}

/* Decrease font size of menu items */
.main-nav ul li a {
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  font-family: inherit;
  transition: color 0.2s, font-weight 0.2s, background 0.2s;
  cursor: pointer;
}
.main-nav ul li a:hover:not(.active) {
  color: #fff;
  background: #333;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.main-nav ul li a.active {
  color: #222;
  font-weight: 700;
  background: #e0e0e0;
  border-radius: 14px;
  box-shadow: none;
  padding: 1.2em 1.6em;
  transition: background 0.2s, color 0.2s;
}


@media (min-width: 768px) {
  .main-nav ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2.8rem;
    padding: 0.5rem 0 0.5rem 0;
  }

  .main-nav ul li {
    margin: 0;
  }

  .main-nav ul li a {
    padding: 0.2rem 0.7rem;
    font-size: 1.rem;
    gap: 0.25em;
  }

  .pill {
    max-width: 300px;
    /* slightly wider on desktop */
    padding: 0.7rem 1.4rem;
    border-radius: 14px;
    /* slightly more rounded on desktop but still rectangular */
  }

  .main-nav {
    border-radius: 14px;
  }

  .pill .logo {
    font-size: 1.1rem;
    letter-spacing: 1.2px;
  }
}

.main-nav {
  position: fixed;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 320px;
  background: #111;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(3, 6, 10, .5);
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, top 0.2s;
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-nav.open {
  opacity: 1;
  pointer-events: auto;
}

@media (max-width: 767px) {
  .main-nav {
    position: fixed;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);
    width: 94vw;
    min-width: unset;
    border-radius: 12px;
    padding: 0.4rem 0.4rem 0.4rem 0.4rem;
    box-shadow: 0 8px 32px rgba(3, 6, 10, .5);
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-nav ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem 2.2rem;
    width: 100%;
    padding: 0.5rem 0;
    justify-items: center;
    align-items: center;
  }

  .main-nav ul li {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

/* nav overlay styles */
.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 30;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.nav-overlay.visible {
  opacity: 1;
  pointer-events: auto;
}

/* dot styling */
.nav-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}


/* Dot above each menu item */
.menu-dot {
  display: block;
  margin: 0 auto 0.3em auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cream, #f8f8d8);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.13);
}

/* Add a little space below the dot and above the label */
.main-nav ul li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.1em;
}

.nav-toggle .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--cream);
  box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
  transition: transform 0.2s ease;
}

.nav-toggle:hover .dot {
  transform: scale(1.1);
}
</style>
