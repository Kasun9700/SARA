<template>
  <div id="app">
    <NuxtPage />
    <footer class="site-footer">
      <img src="/assets/logo/logo_black.png" alt="Home Design Logo" class="footer-logo" />
      <div class="container">© 2025 Home Design — All Right Reserved</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const waitlistOpen = ref(false)
const applyOpen = ref(false)
const bookOpen = ref(false)

function openWaitlist() { waitlistOpen.value = true }
function openApply() { applyOpen.value = true }
function openBook() { bookOpen.value = true }
</script>
