<template>
  <IconComponent />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { IconsSize } from "../types/IconSize";

const props = defineProps<{
  size?: IconsSize;
  title?: string;
  clickable?: boolean;
}>();

const className = computed(() => [
  "ui-kit-icon",
  props.size,
  {
    "is-clickable": props.clickable,
  },
]);
</script>
<style lang="scss" src="../scss/_main.scss" />
