<template>
  <div>
    <page-header/>
    <nuxt/>
    <page-footer/>
  </div>
</template>

<script>
import pageHeader from './header';
import pageFooter from './footer';
export default {
  components: { pageHeader, pageFooter }
};
</script>
