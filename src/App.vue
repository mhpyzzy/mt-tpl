<script setup>
  import {onMounted,getCurrentInstance} from "vue";
  import { RouterLink, RouterView } from 'vue-router'
  import { useDark, useToggle } from '@vueuse/core'
  const {proxy} = getCurrentInstance();
  const isDark = useDark()
  const toggleDark = useToggle(isDark)


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <div class="self">wrapper name</div>
      <el-button @click="switchOrAddChain('42161')" >switchOrAddChain</el-button>
      <el-button @click="switchAccounts" >switchAccounts</el-button>
      <div>{{isMobile?'H5':'PC'}}</div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="dark:bg-black dark:text-white"/>
</template>

<style scoped>
:root {
  --thme-color: red;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
.wrapper {
  .self {
    font-size: 40px;
    color: var(--thme-color);
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
