import Home from '../Page/Home/home';
import Employee from '../Page/Employee/Employee';
import CreatEmployee from '../Page/CreatEmployee/CreatEmployee';
import ListEmployee from '../Page/ListEmployee/ListEmployee';
import UpdateFilm from '../Page/UpdateFilm/UpdateFilm';
import MovieDetail from '../Page/MovieDetail/MovieDetail';
import TrashEmployee from '../Page/TrashEmployee/TrashEmployee';
import EmployeeCategory from '../Page/EmployeeCategory/EmployeeCategory';
import WatchMovie from '../Page/WatchMovie';
import SingUpAndLogin from '../Page/SingUpAndLogin/SingUpAndLogin';
const publicRoutes = [
    { path: '/', component: Employee },
    { path: '/Employee', component: Employee },
    { path: '/create', component: CreatEmployee },
    { path: '/listEmployee', component: ListEmployee },
    { path: '/EditFilm/:id', component: UpdateFilm },
    { path: '/MovieDetail/:slug', component: MovieDetail },
    { path: 'watch-movie/:slug', component: WatchMovie },
    { path: '/the-loai/:category', component: EmployeeCategory },
    { path: '/trash', component: TrashEmployee },
    { path: '/signUp-Login', component: SingUpAndLogin, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
