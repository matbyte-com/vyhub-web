<template>
  <div class="outer-div pa-1" style="display: inline-block">
    <v-chip small href="https://vyhub.net/dashboard" target="_blank"
            style="background-color: rgba(255,83,0,0.1); font-size: large" text-color="white">
      {{ $t('add-on') }} <v-icon color="white" right>mdi-star</v-icon>
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'AddOnChip',
};
</script>

<style lang="scss" scoped>
.outer-div {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-size: 200% 300%;
  will-change: background-position;
  background-image: linear-gradient(
      60deg,
      hsl(224, 85%, 66%),
      hsl(269, 85%, 66%),
      hsl(314, 85%, 66%),
      hsl(359, 85%, 66%),
      hsl(44, 85%, 66%),
      hsl(89, 85%, 66%),
      hsl(134, 85%, 66%),
      hsl(179, 85%, 66%)
  );
  animation: moveGradient 4s alternate infinite;
}

@keyframes moveGradient {
  50% {
    background-position: 0% 50%;
  }
}

</style>
