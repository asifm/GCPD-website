<template>
  <div>
    <the-header/>
    <nuxt/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
export default {
  components: { TheHeader, TheFooter },
};
</script>
