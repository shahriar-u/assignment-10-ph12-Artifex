/** @format */

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";

import NotFound from "../Pages/Error Page/ErrorPage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddArtwork from "../Pages/Add Artwork/AddArtwork";
import MyGallery from "../Pages/My Gallery/MyGallery";
import MyFavorites from "../Pages/My Favorites.jsx/MyFavorites";
import ExploreArtworks from "../Pages/Explore Artworks/ExploreArtworks";
import ArtworkDetails from "../Pages/Artwork Details/ArtworkDetails";
import UpdateArtwork from "../Pages/Update Artwork/UpdateArtwork";
import ArtistDetails from "../Pages/ArtistDetails/ArtistDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore-artworks",
        element: <ExploreArtworks />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      // private route
      {
        path: "/add-artwork",
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-gallery",
        element: (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      {
        path: "/artwork-details/:id",
        element: (
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-artwork/:id",
        element: (
          <PrivateRoute>
            <UpdateArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "/artist-details/:email",
        element: (
          <PrivateRoute>
            <ArtistDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
