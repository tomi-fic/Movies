import SearchView from "../views/SearchView.jsx";
import DetailView from "../views/DetailView.jsx";
import FavouriteView from "../views/FavouriteView.jsx";

import SearchIcon from '@material-ui/icons/Search';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import StarsIcon from '@material-ui/icons/Stars';

export const Routes = [
    {
        path: "/search",
        name: "Search",
        icon: SearchIcon,
        component: SearchView,
        layout: "/movies"
    },
    {
        path: "/detail",
        name: "Detail",
        icon: LocalMoviesIcon,
        component: DetailView,
        layout: "/movies"
    },
    {
        path: "/favourite",
        name: "Favourite",
        icon: StarsIcon,
        component: FavouriteView,
        layout: "/movies"
    }
];

// export default Routes;
