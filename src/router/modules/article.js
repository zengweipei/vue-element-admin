/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const articleRouter = {
  path: '/article',
  component: Layout,
  name: 'article',
  meta: {
    title: '文章',
    icon: 'documentation',
    roles: ['admin']
  },
  children: [
    {
      path: 'articleshow',
      name: 'articleshow',
      component: () => import('@/views/article/show/index'),
      meta: { title: '文章展示' }
    },
    {
      path: 'articleadd',
      name: 'articleadd',
      component: () => import('@/views/article/add/index'),
      meta: { title: '新增/修改' }
    }
  ]
}

export default articleRouter
