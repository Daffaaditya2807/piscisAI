<script setup lang="ts">
import FloatingNav from '@/ui/components/FloatingNav.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturesGrid from '../components/FeaturesGrid.vue'
import AiChecker from '../components/AiChecker.vue'
import AboutSection from '../components/AboutSection.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col overflow-y-auto">
    <FloatingNav />
    <main>
      <HeroSection id="beranda" />
      <FeaturesGrid id="fitur" />
      <AiChecker id="ai-checker" />
      <AboutSection id="tentang" />
    </main>
    <FooterSection />
  </div>
</template>
