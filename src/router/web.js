const App = () => import('@/App')
const Windex = () => import('@/components/web/index/windex')
const Login = () => import('@/components/web/login')
const Register = () => import('@/components/web/register')
const FindPwd = () => import('@/components/web/findPwd/findPwd')
const CooperAd = () => import('@/components/web/adverts/cooperAd')
const HelpCenter = () => import('@/components/web/helpCenter/helpCenter')
const UserCenter = () => import('@/components/web/userCenter/userCenter')
const pictheme = () => import('@/components/web/template/pictheme')
const classtheme = () => import('@/components/web/template/classtheme')
const classlisttheme = () => import('@/components/web/template/classlisttheme')

const web = {
  path: '/web',
  component: App,
  children: [
    {
      //首页
      path: '/',
      component: Windex
    },
    {
      //登录
      path: 'login',
      component: Login
    },
    {
      //注册
      path: 'register',
      component: Register
    },
    {
      //忘记密码
      path: 'findPwd',
      component: FindPwd
    },
    {
      //文字广告
      path: 'cooperAd',
      component: CooperAd
    },
    {
      //帮助中心
      path: 'helpCenter',
      component: HelpCenter
    },
    {
      //用户中心
      path: 'userCenter',
      component: UserCenter
    },
    {
      //图片广告模板
      path: 'pictheme',
      component: pictheme
    },
    {
      //课程广告模板
      path: 'classtheme',
      component: classtheme
    },
    {
      //课程广告列表模板
      path: 'classlisttheme',
      component: classlisttheme
    },

	]
}

export default web
