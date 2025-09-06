<script setup lang="ts">
import Navbar from '@/components/navbar/Index.vue'
import Footer from '@/components/footer/Index.vue'
</script>
<template>
  <Navbar />

  <!-- Transition wrapper -->
  <div class="max-w-7xl mx-auto">
    <router-view v-slot="{ Component }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <Footer />
</template>

<style scoped>
/* Fade + slide animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
