import App from './app';
import defaultTheme from './theme';

export type Link = {
  name: string,
  url: string,
  icon?: string
}

export default {
  theme: defaultTheme,
  routes: [
    { path: '/', component: App, name: 'Home',
      subs: [
        { path: '/list/:id', component: App, name: 'App' },
        { path: '/maps', component: App, name: 'App' }
      ]
    }
  ],
  links: <Link[]>[
    { name: 'about', url: '/' },
    { name: 'contact', url: '/contact' },
    { name: 'blog', url: '/blog' },
    { name: 'interview', url: 'https://vokal.cc/tulburg' }
  ],
  footerLinks: <Link[]>[
    { name: 'twitter', url: 'https://twitter.com/tulburg', icon: 'icon-twitter' },
    { name: 'github', url: 'https://github.com/tulburg', icon: 'icon-github' },
    { name: 'linkedin', url: 'https://linkedin.com/in/tulburg', icon: 'icon-linkedin' },
    { name: 'spotify', url: 'https://open.spotify.com/user/tulburg', icon: 'icon-spotify' },
    { name: 'grouse.vibrant.0t@icloud.com', url: 'mailto:grouse.vibrant.0t@icloud.com', icon: 'icon-github' }
  ],
  slides: <string[]> [
    'Serving as the tech backbone of startups in Nigeria, UK & Europe since 2012',
    'He’s what you get when an individual has eyes for beauty, both in code and in design',
    'Code? Yes! Design? Yes! Product scaling & design? Yes. Team vision & leadership? An affirmative YES!',
    'Its like an instinct. Seems to understand how things work and in most cases, how they should work. Just who he is.'
  ],
  copyrightText: 'Copyright protected @ All Rights Reserved. 2022',
  statusText: 'Currently engaged. Unavailable til Aug. 2022'
}
