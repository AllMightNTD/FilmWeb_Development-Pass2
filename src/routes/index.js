import Home from '../Page/Home/home';
import Employee from '../Page/Employee/Employee';
import CreatEmployee from '../Page/CreatEmployee/CreatEmployee';
import ListEmployee from '../Page/ListEmployee/ListEmployee';
import UpdateFilm from '../Page/UpdateFilm/UpdateFilm';
import MovieDetail from '../Page/MovieDetail/MovieDetail';
import TrashEmployee from '../Page/TrashEmployee/TrashEmployee';
import EmployeeCategory from '../Page/EmployeeCategory/EmployeeCategory';
import WatchMovie from '../Page/WatchMovie';
import SignIn from '../Page/SingUpAndLogin/SignIn';
import SignUp from '../Page/SingUpAndLogin/SignUp';
import ForgotPass from '../Page/SingUpAndLogin/ForgotPass';
import UserAdminCheck from '../Page/UserManagement';
import ListUser from '../Page/ListUser/ListUser';
const publicRoutes = [
    { path: '/', component: Employee },
    { path: '/Employee', component: Employee },
    { path: '/create', component: CreatEmployee },
    { path: '/listEmployee', component: ListEmployee },
    { path: '/EditFilm/:id', component: UpdateFilm },
    { path: '/MovieDetail/:slug', component: MovieDetail },
    { path: 'watch-movie/:slug', component: WatchMovie },
    { path: '/the-loai/:category', component: EmployeeCategory },
    { path: '/register', component: SignUp },
    { path: '/login', component: SignIn },
    { path: '/forgotPass', component: ForgotPass },
    { path: '/checkAdmin', component: UserAdminCheck },
    { path: '/trash', component: TrashEmployee },
    { path: '/listUser', component: ListUser },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
