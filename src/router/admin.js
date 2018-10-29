
const App = () => import('@/App')
const AddBannerAll = () => import('@/components/admin/bannerlist/addBannerAll')
const BannerListAll = () => import('@/components/admin/bannerlist/bannerListAll')
const AddLanmuAll = () => import('@/components/admin/lanmulist/addLanmuAll')
const LanmuListAll = () => import('@/components/admin/lanmulist/lanmuListAll')
const AddConsultAll = () => import('@/components/admin/consultlist/addConsultAll')
const ConsultListAll = () => import('@/components/admin/consultlist/consultListAll')
const AddAgentAll = () => import('@/components/admin/agentlist/addAgentAll')
const AgentListAll = () => import('@/components/admin/agentlist/agentListAll')
const SingleClassAll = () => import('@/components/admin/multiclass/singleClassAll')
const MultiClassAll = () => import('@/components/admin/multiclass/multiClassAll')
const AddCourse = () => import('@/components/admin/multiclass/addCourse')
const AddAdAll = () => import('@/components/admin/advertisement/addAdAll')
const AdListAll = () => import('@/components/admin/advertisement/adListAll')
const AddPictureAll = () => import('@/components/admin/advertisement/addPictureAll')
const PictureListAll = () => import('@/components/admin/advertisement/pictureListAll')
const Alogin = () => import('@/components/admin/alogin')


const admin = {
  path: '/admin',
  component: App,
  children: [
    // 添加banner
    {
      path: 'addBannerAll',
      component: AddBannerAll
    },
    // banner列表
    {
      path: 'bannerListAll',
      component: BannerListAll
    },
    // 添加栏目
    {
      path: 'addLanmuAll',
      component: AddLanmuAll
    },
    // 栏目列表
    {
      path: 'lanmuListAll',
      component: LanmuListAll
    },
    // 添加资讯
    {
      path: 'addConsultAll',
      component: AddConsultAll
    },
    // 资讯列表
    {
      path: 'consultListAll',
      component: ConsultListAll
    },
    // 添加代理商
    {
      path: 'addAgentAll',
      component: AddAgentAll
    },
    // 代理商列表
    {
      path: 'agentListAll',
      component: AgentListAll
    },
    // (单个)班级列表
    {
      path: 'singleClassAll',
      component: SingleClassAll
    },
    // (组合)班级列表
    {
      path: 'multiClassAll',
      component: MultiClassAll
    },
    // 创建课程列表广告
    {
      path: 'addCourse',
      component: AddCourse
    },
    // 添加文字广告
    {
      path: 'addAdAll',
      component: AddAdAll
    },
    // 文字广告列表
    {
      path: 'adListAll',
      component: AdListAll
    },
    // 添加图片广告
    {
      path: 'pictureListAll',
      component: PictureListAll
    },
    // 图片广告列表
    {
      path: 'addPictureAll',
      component: AddPictureAll
    },
    // 登录
    {
      path: 'login',
      component: Alogin
    },
  ],

}

export default admin
