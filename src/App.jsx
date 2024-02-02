import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate, } from 'react-router-dom';
import CoreRoutes from './Features/Core/CoreRoutes';
import AuthRoutes from './Features/Auth/AuthRoutes';
import NotFoundPage from './Features/Core/404/NotFoundPage';
import Footer from './GeneralComponents/Footer/Footer';
import AdminRoutes from './Features/Admin/AdminRoutes';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Spinner from './GeneralElements/Spinner/Spinner';
import SorryDiv from './GeneralComponents/SorryDiv/SorryDiv';
import { userAxios } from './Utils/UserAxios';
import { useDispatch } from 'react-redux';
import { logOutUser, setUser } from './hooks/UserRedux/UserModelSlice';
import UserProvider from './hooks/UserRedux/UserProvider';
import userModel from './Models/UserModel';
import NavBar from './GeneralComponents/NavBar/NavBar';
import { userStore } from './hooks/UserRedux/UserStore';
import ConfiguringWebsiteComponent from './GeneralComponents/ConfiguringWebsite/ConfiguringWebsiteComponent';

const protectedRoutes = [
  '/settings',
  "/verify-email",
]
function MainRoute() {

  const path = window.location.pathname;
  const disp = useDispatch();
  const nav = useNavigate();


  const { isLoading: loadingConfigs, error: errConfigs, data: configs, refetch: refetchConfigs } = useQuery(
    "get-client",
    () => userAxios.get('/configs/website-configs'),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );
  const { isLoading, error, data, refetch } = useQuery(
    "get-client",
    () => userAxios.post('login/token').then((d) => {
      const user = userModel.parse(d.data.user);
      if (user != null) {
        disp(setUser(d.data.user));
      }
      return user;
    }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: localStorage.getItem('token') != null && configs?.status == 200,
    }
  );
  if (isLoading || loadingConfigs) {
    return <div className='w-screen h-screen'>
      <Spinner className=' text-xl' />
    </div>;
  }
  if (errConfigs?.response?.status == 400) {
    return <div className='w-screen h-screen flex flex-col text-center px-4 justify-center items-center'>
      <SorryDiv message={errConfigs.response.data.message} />
    </div>;
  }

  if (!configs.companyConfigs) {
    //return <ConfiguringWebsiteComponent />;
  }
  if (error != null && error.response != null && error.response.status == 403) {
    disp(logOutUser());
    window.location.href = '/';
    return
  }
  if (data != null && localStorage.getItem('token') != null) {
    if (data.verifiedEmail && path == "/verify-email") {
      return <Navigate to={"/"} replace={true} />;
    }
    if (path == "/login" || path == "/register") {
      return <Navigate to={"/"} replace={true} />;
    }
  } else {
    if (protectedRoutes.includes(path)) {
      return <Navigate to={"/"} replace={true} />;
    }
  }
  if ((error != null) && error.response != null && error.response.status == 401) {
    disp(logOutUser());
    nav(0);
    return;
  }
  if (userStore.getState().user.user == null && localStorage.getItem('token') != null) {
    return <p> loading ...</p>
  }

  return (
    <div className="screen-padding">

      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

const queryClient = new QueryClient();
function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainRoute />}>
              {CoreRoutes}
              {AuthRoutes}
            </Route>
            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  )
}

export default App
