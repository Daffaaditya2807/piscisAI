<style scoped>
/* Tidak perlu style kustom untuk layout ini */
</style>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

// === Impor Aset ===
import logo from '@/assets/logo.png'

// === Daftar Link ===
const navLinks = [
  { id: 'beranda', text: 'Beranda', href: '#beranda' },
  { id: 'fitur', text: 'Fitur', href: '#fitur' },
  { id: 'ai-checker', text: 'AI', href: '#ai-checker' },
  { id: 'tentang', text: 'Tentang', href: '#tentang' },
  { id: 'kontak', text: 'Kontak', href: '#kontak' },
]

// === State ===
const isMobileMenuOpen = ref(false)
const activePage = ref('beranda')

// === Scroll Spy Logic ===
const handleScroll = () => {
  const sections = navLinks.map(link => ({
    id: link.id,
    element: document.getElementById(link.id)
  })).filter(section => section.element)

  const scrollPosition = window.scrollY + 100

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section.element && section.element.offsetTop <= scrollPosition) {
      activePage.value = section.id
      break
    }
  }
}

// === Smooth Scroll ===
const handleNavClick = (e: Event, href: string) => {
  e.preventDefault()
  isMobileMenuOpen.value = false
  
  const targetId = href.replace('#', '')
  const targetElement = document.getElementById(targetId)
  
  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 md:top-6 left-0 right-0 z-50 h-16 px-4 sm:px-10 backdrop-blur-md bg-white/75 md:backdrop-blur-none md:bg-transparent"
  >
    <div class="relative mx-auto h-full max-w-7xl">
      <a href="#" class="absolute left-0 top-1/2 -translate-y-1/2">
        <img :src="logo" alt="PiscisAI Logo" class="h-7 lg:h-10 w-auto" />
      </a>

      <nav
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-4 shadow-lg ring-1 ring-black ring-opacity-5 hidden md:block"
      >
        <ul class="flex items-center gap-x-2 px-0 lg:gap-x-6 md:px-4">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="link.href"
              @click="handleNavClick($event, link.href)"
              class="text-sm font-jakarta px-2 lg:px-4 font-semibold transition-colors duration-200"
              :class="{
                'text-orange-500': activePage === link.id,
                'text-neutral-900 hover:text-orange-500': activePage !== link.id,
              }"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
      </nav>

      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="absolute right-0 top-1/2 -translate-y-1/2 rounded-md p-2 text-neutral-900 md:hidden"
        aria-label="Toggle navigation"
      >
        <svg
          v-if="!isMobileMenuOpen"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        v-if="isMobileMenuOpen"
        class="absolute top-full mt-2 w-full rounded-xl bg-white p-5 shadow-lg ring-1 ring-black ring-opacity-5 md:hidden"
      >
        <ul class="flex flex-col gap-y-4">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="link.href"
              @click="handleNavClick($event, link.href)"
              class="block w-full rounded-lg px-4 py-2 text-base font-jakarta font-semibold transition-colors duration-200"
              :class="{
                'bg-orange-50 text-orange-600': activePage === link.id,
                'text-neutral-900 hover:bg-neutral-100': activePage !== link.id,
              }"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
