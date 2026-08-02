<template>
  <div
    class="outer-div pa-1"
    style="display: inline-block"
  >
    <v-chip
      size="small"
      href="https://app.vyhub.net/dashboard"
      target="_blank"
      style="background-color: rgba(255,83,0,0); font-size: large"
    >
      <span class="text-white">
        {{ addonTitle }} {{ $t('add-on') }}
      </span>
      <v-icon
        color="white"
        end
      >
        mdi-star
      </v-icon>
    </v-chip>
  </div>
</template>

<script setup>
const props = defineProps({ addonTitle: { type: String, default: '' } });
</script>

<style lang="scss" scoped>
.outer-div {
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: linear-gradient(to right,
    hsl(224, 85%, 66%),
    hsl(269, 85%, 66%),
    hsl(314, 85%, 66%),
    hsl(359, 85%, 66%),
    hsl(44, 85%, 66%),
    hsl(359, 85%, 66%),
    hsl(314, 85%, 66%),
    hsl(269, 85%, 66%),
    hsl(224, 85%, 66%)
  );
  background-size: 1800% 200%;
  animation: moveGradient 6s linear infinite;
}

@keyframes moveGradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

</style>
