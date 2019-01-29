<template>
  <div>
    <div>
      <img :src="user.avatar_url" width="100">
      <span>
        {{user.name}}
      </span>
    </div>
    <a :href="user.html_url">
      {{user.html_url}}
    </a>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'user',
    async fetch({ app, params, store }) {
      const user = await app.$axios.$get(
        `https://api.github.com/users/${params.user}`
      )
      store.commit('setUser', user);
    },
    computed: {
      ...mapState({
        user: 'user',
      })
    }
    // asyncDataでapiをたたく場合
    // async asyncData({ app, params }) {
    //   if (process.server) {
    //     console.log('server')
    //   }
    //   if (process.client) {
    //     console.log('client')
    //   }
    //   const data = await app.$axios.$get(`https://api.github.com/users/${params.user}`)
    //   return data;
    // }
  }
</script>
