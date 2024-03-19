import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({  
    uri: 'https://seagull-baseball-cap.cyclic.app/',
    // uri: 'http://localhost:4000/',
  })

  const cache = new InMemoryCache()
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    cache: new InMemoryCache({
      addTypename: false
    })
  })

const app = createApp(App)
app.provide(DefaultApolloClient, apolloClient)
app.mount('#app')
