# bike-philadelphia-frontend

*Indego* is the name of the bike share system in Philadelphia. Like many other bike share companies, *Indego* publishes the current status of all their bike share stations in a real-time JSON endpoint at: https://www.rideindego.com/stations/.

This app takes that data and places it on a map to simply and quickly display how many bikes (for someone leaving) and empty spots (for someone arriving) are available at each of the 100+ stations in Philadelphia. Additionally, there is a search bar so that a user can find the closest stations to a given location.

This web app is unaffiliated with Indego and was built in summer 2019 as an exercise for me to learn React and Redux.

Corresponding backend can be found at: https://github.com/egfrank/bike-philadelphia-backend

This app takes its inspiration from the [frontend](https://github.com/punkave/frontend-challenge) challenge posted by Punk Ave, a web dev shop based in South Philly.  I implemented the app fully in React and Redux in order to learn those technologies (in contrast to the original challenge, which requests that applicants use vanilla JS or JQuery.)

Some points of interest and challenges of implementing this application:

- The map is implemented using Leaflet, a super simple Javascript library for displaying maps, as well as React-Leaflet, which essentially translates Leaflet into components.

- The search, along with autocomplete, was implemented in React using data from Mapbox's Search API.

- Once a user selects a location to search, the application finds the 5 closest stations. To do this, first the application roughly estimates the distance between the searched location and each of the 117 stations using the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula), in order to find the 10 probable closest stations. Then, it submits the location of the search and those 10 stations to the Mapbox Distance Matrix API to find the actual walking distance to the nearest stations, and finally highlights the closest 5 stations on the map.

- This application makes use of several APIs (my own backend, the Mapbox [search/geocoding API](https://docs.mapbox.com/api/search/), and the Mapbox [distance matrix API](https://docs.mapbox.com/api/navigation/#matrix)), so it uses Redux-Thunk middleware to manage those asynchronous requests. 



<details><summary>All the Create React App stuff:</summary>
<p>


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


</p>
</details>
