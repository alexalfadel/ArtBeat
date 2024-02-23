import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import showsReducer from "./shows";
import artistsReducer from "./artists";
import PreviewImageReducer from "./ShowImages";
import rsvpReducer from "./rsvp";
import mapsReducer from "./maps";


const rootReducer = combineReducers({
  session: sessionReducer,
  shows: showsReducer,
  artists: artistsReducer,
  previewImage: PreviewImageReducer,
  rsvps: rsvpReducer,
  maps: mapsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
