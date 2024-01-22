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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

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
        <AddShowForm />
        </Route>
        <Route path='/shows/:showId/update'>
          <UpdateShowForm />
        </Route>
        <Route path='/shows/:showId'>
          <ShowDetails />
        </Route>
        <Route path='/artists/:artistId'>
          <ArtistProfile />
        </Route>
        </Switch>}
    </>
  );
}

export default App;