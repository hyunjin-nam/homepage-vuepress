<template>
  <h1 v-if="text" class="title" v-="text" />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: center;
    font-size: calc(21px + (48 - 14) * ((100vw - 300px) / (1600 - 300)));
    font-weight: 300;
    line-height: 1.25;
    letter-spacing: 0.1rem;
    width: 800px;
    max-width: 100%;
    margin: 18vw auto 7vw auto;
  }

  @media screen and (max-width: 600px) {
    .title {
      margin: 25vw auto 7vw auto;
      font-size: calc(17px + (48 - 14) * ((100vw - 300px) / (1600 - 300)));
    }
  }

</style>

<style scoped>
h1{
    font-style: bold;
}
</style>


