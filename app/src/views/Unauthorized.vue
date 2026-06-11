<template>
  <div class="unauthorized-page">
    <h1>403 - Unauthorized</h1>
    <p>You do not have permission to view this page.</p>
    <router-link to="/login">Go to Login</router-link>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>

<style scoped>
.unauthorized-page {
  text-align: center;
  padding: 50px;
}
</style>
