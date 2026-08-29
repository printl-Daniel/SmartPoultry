<script setup>
import { defineProps, useAttrs } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  to: String,
  icon: String,
  label: String,
  isActive: Boolean,
  index: Number,
  total: Number,
  isExpanded: Boolean,
  onClick: Function,
});

const router = useRouter();
const attrs = useAttrs();

const getPositionStyle = (index, total) => {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = 120;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  return {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    transition: "transform 0.3s ease",
    zIndex: 60,
  };
};

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  } else if (props.to) {
    router.push(props.to);
  }
};
</script>

<template>
  <!-- Radial Menu Button (Mobile) -->
  <button
    v-if="isExpanded"
    @click="handleClick"
    :style="getPositionStyle(index, total)"
    class="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-md text-gray-700 hover:bg-blue-100 lg:hidden"
    :class="{ 'bg-blue-100 text-blue-700 font-semibold': isActive }"
    v-bind="attrs"
  >
    <i
      :class="[icon, 'text-xl', isActive ? 'text-blue-700' : 'text-blue-500']"
    />
  </button>

  <!-- Sidebar Item (Desktop) -->
  <a
    v-else
    href="#"
    class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg transition w-full select-none cursor-pointer"
    :class="{ 'bg-blue-100 text-blue-700 font-semibold': isActive }"
    v-bind="attrs"
    @click.prevent="handleClick"
  >
    <i
      :class="[
        icon,
        'w-6 h-6 mr-3',
        isActive ? 'text-blue-700' : 'text-blue-500',
      ]"
    />
    <span class="font-medium">{{ label }}</span>
  </a>
</template>
