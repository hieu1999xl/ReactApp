import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import MainLayout from '../../components/layouts/main'
import paths from '../../helper/pathRoutes'
import PreRegister from './pages/PreRegister'
import ResetPassword from './pages/ResetPassword'
import VerifyRegister from './pages/VerifyRegister'
import SuccessRegister from './pages/SuccessRegister'
import ConfirmResetPassword from './pages/ConfirmResetPassword'
import RegisterEdit from './pages/RegisterEdit'
import Complete from './pages/Complete'
import CloseAccount from './pages/CloseAccount'
import VerifyResetPassword from './pages/VerifyResetPassword'
import SetNewPassword from './pages/SetNewPassword'
import SuccessResetPassword from './pages/SuccessResetPassword'
import SuccessPreRegister from './pages/SuccessPreRegister'
import Profile from './pages/Profile'
import EditProfileComplete from './pages/EditProfileComplete'
import EditProfileVerify from './pages/EditProfileVerify'
import ForgetId from './pages/ForgetId'
import ConfirmForgetId from './pages/ConfirmForgetId'
import VerifyForgetId from './pages/VerifyForgetId'
import SuccessForgetId from './pages/SuccessForgetId'
import NotFound from './pages/NotFound'
import PasswordExpired from './pages/PasswordExpired'
import UserExist from './pages/UserExist'
import Address from './pages/Address'

const routes = [
  {
    path: paths.login,
    page: Login,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.home,
    page: Home,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.provisionalEntry,
    page: PreRegister,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.entry,
    page: Register,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.resetPassword,
    page: ResetPassword,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.verifyRegister,
    page: VerifyRegister,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.successRegister,
    page: SuccessRegister,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.confirmResetPassword,
    page: ConfirmResetPassword,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.setNewPassword,
    page: SetNewPassword,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.entryEdit,
    page: RegisterEdit,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.complete,
    page: Complete,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.closeAccount,
    page: CloseAccount,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.verifyResetPassword,
    page: VerifyResetPassword,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.successResetPassword,
    page: SuccessResetPassword,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.provisionalEntrySuccess,
    page: SuccessPreRegister,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.forgetId,
    page: ForgetId,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.confirmForgetId,
    page: ConfirmForgetId,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.verifyForgetId,
    page: VerifyForgetId,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.successForgetId,
    page: SuccessForgetId,
    exact: true,
    layout: MainLayout,
    private: false
  },
  // {
  //   path: paths.SuccessForgetId,
  //   page: SuccessForgetId,
  //   exact: true,
  //   layout: MainLayout,
  //   private: false
  // },
  {
    path: paths.userProfile,
    page: Profile,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.editProfileComplete,
    page: EditProfileComplete,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.editProfileVerify,
    page: EditProfileVerify,
    exact: true,
    layout: MainLayout,
    private: true
  },
  {
    path: paths.notFound,
    page: NotFound,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.passwordExpired,
    page: PasswordExpired,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.userExist,
    page: UserExist,
    exact: true,
    layout: MainLayout,
    private: false
  },
  {
    path: paths.shippingAddress,
    page: Address,
    exact: true,
    layout: MainLayout,
    private: true
  }
]

export default routes
