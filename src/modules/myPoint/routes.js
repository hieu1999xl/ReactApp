import MyPoint from './pages/MyPoint'
import MainLayout from '../../components/layouts/main'
import paths from '../../helper/pathRoutes'
import FAQ from './pages/FAQ'
import Environment from './pages/Environment'
import Terms from './pages/Terms'
import Point from './pages/Point'
import PointAcquisition from './pages/PointAcquisition'
import SuccessQuestion from './pages/SuccessQuestion'
import VerifyQuestion from './pages/VerifyQuestion'
import MakeQuestion from './pages/MakeQuestion'
import PointExchangeList from './pages/PointExchangeList'
import PointExchangeItem from './pages/PointExchangeItem'
import PointExchange from './pages/PointExchange'
import ExchangeVerify from './pages/ExchangeVerify'
import PointExchangeComplete from './pages/PointExchangeComplete'
import DonateComplete from './pages/DonateComplete'

const routes = [
  {
    path: paths.myPoint,
    page: MyPoint,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.faq,
    page: FAQ,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.environment,
    page: Environment,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.terms,
    page: Terms,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.point,
    page: Point,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.pointAcquisition,
    page: PointAcquisition,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.pointExchangeItem,
    page: PointExchangeList,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.itemExchangeDetail,
    page: PointExchangeItem,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.inquiry,
    page: MakeQuestion,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.verifyInquiry,
    page: VerifyQuestion,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.successInquiry,
    page: SuccessQuestion,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.exchangeDetail,
    page: PointExchange,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.exchangeVerify,
    page: ExchangeVerify,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.exchangeComplete,
    page: PointExchangeComplete,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.donateComplete,
    page: DonateComplete,
    exact: true,
    layout: MainLayout,
    private: true
  }
]

export default routes
