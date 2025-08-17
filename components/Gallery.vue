<template>
  <div class="gallery">
    <div class="grid">
      <div v-for="(item, idx) in projectsFiltered" :key="item.id" class="card">
        <button class="thumb" @click="open(idx)">
          <img :src="item.src" :alt="item.title" loading="lazy"/>
        </button>
        <div class="card-info">
          <h3>{{item.title}}</h3>
          <p>{{item.categories.join(', ')}}</p>
        </div>
      </div>
    </div>

    <div v-if="visible" class="lightbox" @click.self="close">
      <button class="lb-close" @click="close">✕</button>
      <button class="lb-prev" @click.stop="prev">‹</button>
      <div class="lb-content">
        <img :src="current.src" :alt="current.title" />
        <div class="lb-caption">{{current.title}}</div>
      </div>
      <button class="lb-next" @click.stop="next">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '#app'

const props = defineProps({ filter: { type: String, default: 'All' } })
const { data: projects } = await useFetch('/projects.json')
const projectsFiltered = computed(() => {
  if (!projects.value) return []
  if (props.filter === 'All' || !props.filter) return projects.value
  return projects.value.filter(p => p.categories.includes(props.filter))
})

const visible = ref(false)
const index = ref(0)

const current = computed(() => projectsFiltered.value[index.value] || { src: '', title: '' })

function open(i){ index.value = i; visible.value = true }
function close(){ visible.value = false }
function prev(){ index.value = (index.value - 1 + projectsFiltered.value.length) % projectsFiltered.value.length }
function next(){ index.value = (index.value + 1) % projectsFiltered.value.length }

onMounted(() => {
  function onKey(e){
    if (!visible.value) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }
  window.addEventListener('keydown', onKey)
  return () => window.removeEventListener('keydown', onKey)
})

// prevent body scroll while lightbox is open
watch(visible, (v) => {
  if (v) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
})
</script>
