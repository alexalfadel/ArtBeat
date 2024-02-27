import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllShows from "./components/AllShows";
import ShowDetails from "./components/ShowDetailsPage";
import ArtistProfile from "./components/ArtistProfile";
import AddShowForm from "./components/AddShowForm";
import UpdateShowForm from "./components/UpdateShowForm";
import DoesNotExist from "./components/404";
import HomePage from "./components/HomePage";
import UpdateImages from "./components/UpdateImages";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && 
      <Switch>
        <Route exact path='/shows'>
          <AllShows />
        </Route>
        <Route exact path ='/shows/new'>
          {user && <AddShowForm />}
          {!user && <HomePage />}
        </Route>
        <Route path='/shows/:showId/images'>
          {user && <UpdateImages/>}
        </Route>
        <Route path='/shows/:showId/update'>
          {user && <UpdateShowForm />}
          {!user && <HomePage />}
        </Route>
        <Route path='/shows/:showId'>
          {user && <ShowDetails />}
          {!user && <HomePage />}
        </Route>
        <Route path='/artists/:artistId'>
        {user && <ArtistProfile />}
          {!user && <HomePage />}
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route>
          <DoesNotExist />
        </Route>
        </Switch>}
    </>
  );
}

export default App;