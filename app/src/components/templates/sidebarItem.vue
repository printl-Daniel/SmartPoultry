<script setup>
import { defineProps, useAttrs } from "vue";

defineProps({
  to: String,
  icon: String,
  label: String,
  isActive: Boolean,
});

const attrs = useAttrs();
</script>

<template>
  <a
    :href="to"
    class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition"
    :class="{ 'bg-blue-100 text-blue-700 font-semibold': isActive }"
    nv-bind="attrs"
  >
    <i
      :class="[
        icon,
        'w-6 h-6 mr-3',
        isActive ? 'text-blue-700' : 'text-blue-500',
      ]"
    ></i>
    <span class="font-medium">{{ label }}</span>
  </a>
</template>
