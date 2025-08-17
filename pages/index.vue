<template>
    <main>
        <Header />
        <!-- Home Section (Hero) -->
    <section id="home" class="site-hero" :style="{ backgroundImage: `url(${responsiveHeroImage})` }" aria-hidden="false">
            <div class="hero-shape"></div>
            <div class="hero-overlay"></div>
            <div class="hero-inner container">
                <div class="hero-content" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; position: relative;">
                    <img class="hero-title-img" src="/assets/logo/PNG1.png" alt="Carefully crafted studios logo"
                        style="max-width: 340px; width: 60vw; height: auto; display: block; margin: 0 auto; z-index: 2; position: relative; box-shadow: 0 8px 32px rgba(0,0,0,0.18); background: rgba(255,255,255,0.05); border-radius: 18px; padding: 1.2rem 2.2rem;" />
                    <div class="hero-ctas" style="margin-top: 2.5rem; z-index: 2;">
                        <button class="btn primary">JOIN WAITLIST</button>
                        <button class="btn">BOOK NOW</button>
                    </div>
                </div>
            </div>
        </section>
        <section id="about" class="about section--padded">
            <div class="container about-grid">
                <div>
                    <div class="section-header">
                        <h3>About</h3>
                        <p class="section-sub">Simplicity, warmth, and thoughtful design.</p>
                    </div>
                    <p>Our minimalist designs where simplicity and warmth reach a balance in living. We craft spaces
                        that feel timeless, functional, and personal.</p>
                    <p class="muted">Intentional sourcing, clear timelines & detailed execution are part of our process.
                    </p>
                </div>
                <div>
                    <div class="about-card">
                        <img src="https://images.unsplash.com/photo-1505692794403-5c6f6f3c6f8f?w=1200&q=80&auto=format&fit=crop"
                            alt="living room" />
                    </div>
                </div>
            </div>
        </section>

        <section id="categories" class="categories section--padded">
            <div class="container">
                <div class="section-header">
                    <h3>Categories</h3>
                    <p class="section-sub">Explore projects by room and style</p>
                </div>

                <div class="filter-row">
                    <button class="filter-btn" :class="{ active: filter === 'All' }"
                        @click="setFilter('All')">All</button>
                    <button class="filter-btn" v-for="cat in categories" :key="cat" :class="{ active: filter === cat }"
                        @click="setFilter(cat)">{{ cat }}</button>
                </div>

                <div class="categories-grid" aria-live="polite">
                    <div class="cat-card" v-for="cat in categories" :key="cat" @click="setFilter(cat)" role="button"
                        tabindex="0">
                        <img :src="categoryImage(cat)" :alt="cat" />
                        <p>{{ cat }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="gallery" class="gallery section--padded">
            <div class="container">
                <div class="section-header">
                    <h3>Gallery</h3>
                    <p class="section-sub">A selection of recent work</p>
                </div>

                <div class="gallery-grid">
                    <div class="project-card">
                        <img src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1200&q=80&auto=format&fit=crop"
                            alt="modern living" />
                        <h4>Modern Living Room</h4>
                    </div>
                    <div class="project-card">
                        <img src="https://images.unsplash.com/photo-1505691723518-36a5b8f6a06c?w=1200&q=80&auto=format&fit=crop"
                            alt="contemporary home" />
                        <h4>Contemporary Home</h4>
                    </div>
                </div>
            </div>
        </section>

        <section id="process" class="process section--padded">
            <div class="container">
                <div class="section-header">
                    <h3>Process</h3>
                    <p class="section-sub">From concept to delivery</p>
                </div>

                <div class="process-row">
                    <div class="step">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path
                                d="M21 16.5V19a2 2 0 0 1-2 2c-9.941 0-18-8.059-18-18A2 2 0 0 1 3 1h2.5a1 1 0 0 1 1 .75L7.5 6a1 1 0 0 1-.25 1L5.5 9.5a12.5 12.5 0 0 0 6 6l1.75-1.75a1 1 0 0 1 1-.25l4.25 1.5A1 1 0 0 1 21 16.5z"
                                stroke="#10212B" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div>Consult</div>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path
                                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                fill="#10212B" />
                        </svg>
                        <div>Design</div>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M2 7h20M6 11v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6" stroke="#10212B"
                                stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M9 7v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="#10212B" stroke-width="1.2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div>Build</div>
                    </div>
                    <div class="arrow">→</div>
                    <div class="step">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <rect x="3" y="7" width="18" height="13" rx="2" stroke="#10212B" stroke-width="1.2" />
                            <path d="M16 3H8v4h8V3z" stroke="#10212B" stroke-width="1.2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <div>Deliver</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Connect Section (after products/featured) -->
        <section id="connect" class="section--padded contact-section">
            <div class="container">
                <div class="section-header">
                    <h3>Connect</h3>
                    <p class="section-sub">We'd love to hear from you! Fill out the form below and our team will get in
                        touch.</p>
                </div>
                <form class="contact-form" @submit.prevent="submit">
                    <input class="input" placeholder="Name" v-model="name" required />
                    <input class="input" placeholder="Email" v-model="email" type="email" required />
                    <textarea class="input" placeholder="Your message" v-model="message" rows="4"></textarea>
                    <div class="form-actions">
                        <button class="btn primary" type="submit">Send</button>
                        <span class="muted">We usually respond within 2 business days.</span>
                    </div>
                </form>
                <div v-if="submitted" class="contact-notice">Thanks {{ name || 'there' }} — we received your message.
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Header from '~/components/Header.vue'
// Responsive hero background: web.jpeg for desktop, mobile.jpeg for mobile
const isMobile = ref(false)
let mql = null
const updateIsMobile = () => {
    isMobile.value = window.matchMedia('(max-width: 767px)').matches
}
onMounted(() => {
    mql = window.matchMedia('(max-width: 767px)')
    updateIsMobile()
    mql.addEventListener('change', updateIsMobile)
})
onBeforeUnmount(() => {
    if (mql) mql.removeEventListener('change', updateIsMobile)
})
const responsiveHeroImage = computed(() => isMobile.value ? '/images/mobile.jpeg' : '/images/web.jpeg')

const categories = ['Living Room', 'Bedroom', 'Kitchen', 'Exteriors']
const filter = ref('All')
const name = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

function categoryImage(cat) {
    const map = {
        'Living Room': 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1200&q=80&auto=format&fit=crop',
        'Bedroom': 'https://images.unsplash.com/photo-1505691723518-36a5b8f6a06c?w=1200&q=80&auto=format&fit=crop',
        'Kitchen': 'https://images.unsplash.com/photo-1505692794403-5c6f6f3c6f8f?w=1200&q=80&auto=format&fit=crop',
        'Exteriors': 'https://images.unsplash.com/photo-1505691723518-36a5b8f6a06c?w=1200&q=80&auto=format&fit=crop'
    }
    return map[cat] || map['Living Room']
}

function setFilter(cat) {
    filter.value = cat
}
function submit() {
    submitted.value = true
    // clear form but keep name for friendly note
    email.value = message.value = ''
    window.setTimeout(() => (submitted.value = false), 3500)
}
</script>
