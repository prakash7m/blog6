export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Users',
    url: '/admin/users',
    icon: 'icon-user'
  },
  {
    name: 'Gallery',
    url: '/admin/gallery',
    icon: 'icon-camera'
  },
  {
    name: 'Category',
    url: '/admin/category',
    icon: 'icon-layers'
  },
  {
    name: 'Posts',
    url: '/admin/posts',
    icon: 'icon-puzzle'
  },
  {
    name: 'Posts',
    url: '/admin/posts',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Category',
        url: '/admin/posts/category',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tags',
        url: '/admin/posts/tags',
        icon: 'icon-puzzle'
      },
      {
        name: 'Gallary',
        url: '/admin/posts/gallary',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success'
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger'
  }
];
