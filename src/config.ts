import App from './app';
import { Style } from '@js-native/core/components';

export default {
  theme: {
    globals: {
      '*': {
        padding: 0,
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 12
      },
      body: {
        backgroundColor: '#1b1b1b'
      }
    },
    color: {
      background: '#f0f0f0',
      fontColorGreyLight: '#707070',
      fontColorGrey: '#404040'
    },
    styles: {
      roundButton: new Style({
        padding: [10, 20]
      })
    }
  },
  routes: [
    { path: '/', component: App, name: 'Home',
      subs: [
        { path: '/list/:id', component: App, name: 'App' },
        { path: '/maps', component: App, name: 'App' }
      ]
    }
  ]
}
