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
import SearchValue from '../Page/SearchValue';
import FilmNation from '../Page/FilmNation/FilmNation';
import ReleaseYear from '../Page/ReleaseYear/ReleaseYear';
import OddMovie from '../Page/OddMovie/OddMovie';
import SeriesMovie from '../Page/SeriesMovie/SeriesMovie';
import Myprofile from '../Page/MyProfile';
import MovieLove from '../Page/YourListMovieLove/MovieLove';
const publicRoutes = [
    { path: '/', component: Employee },
    { path: '/Employee', component: Employee },
    { path: '/create', component: CreatEmployee },
    { path: '/listEmployee', component: ListEmployee },
    { path: '/EditFilm/:id', component: UpdateFilm },
    { path: '/MovieDetail/:slug', component: MovieDetail },
    { path: '/watch-movie/:slug', component: WatchMovie },
    { path: '/the-loai/:category', component: EmployeeCategory },
    { path: '/quoc-gia/:Nation', component: FilmNation },
    { path: '/nam-phat-hanh/:year', component: ReleaseYear },
    { path: '/phim-le/:statusMovie', component: OddMovie },
    { path: '/Myprofile', component: Myprofile },
    { path: '/phim-bo/:statusMovie', component: SeriesMovie },
    { path: '/register', component: SignUp },
    { path: '/login', component: SignIn },
    { path: '/forgotPass', component: ForgotPass },
    { path: '/checkAdmin', component: UserAdminCheck },
    { path: '/trash', component: TrashEmployee },
    { path: '/listUser', component: ListUser },
    { path: '/search-film/:searchValue', component: SearchValue },
    {path :'/yourLoveMovie' , component:MovieLove}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
