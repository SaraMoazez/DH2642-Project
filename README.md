# Travel Footprint
### Short description
Travel Footprint is an application in which users input starting points and destinations and get the calculated carbon footprints of their trips. The application shows the carbon footprint for four different vehicle options (car, airplane, motorbike, and public transit). Users can log in and save their trips; through their profiles users can view the total carbon footprint for their saved travel history.

The latest deployed version of Travel Footprint is accessible here: [link](https://travelfootprint-9c7b7.web.app/)

A dummy account that can be used to test the app is (do not use your real email and password since the database is still public):
* Email: 1234@test.se
* Password: 1234567890

### What we have done

* We have created the full code and layout of the application, with a home page, navigation bar, login page, account creation page and profile page. The app is functional in that it can calculate the footprint between two given locations for different modes of travel.
* We have implemented a set of [Tailwind](https://tailwindui.com/components/) components (for instance for the navigation bar, profile and the login screen).
* We have implemented navigation; it is possible to fully navigate the app as intended.
* We have deployed the app using Firebase.
* We have made API calls to [CarbonFootprint](https://rapidapi.com/carbonandmore-carbonandmore-default/api/carbonfootprint1) (for carbon footprint calculations) and [Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview) (for distance calculations for different vehicles)

### Project file structure
Travel Footprint employs a MVP structure, based on the Dinner Planer tutorials. The following files are used (all in the "src" folder):

* *App.js*: the main application file, calls the different presenters and uses React Router to navigate between them.
* *createAccountPresenter.js*, *headerPresenter.js*, *profilePresenter.js*, *navbarPresenter.js* and *signInPresenter.js*: presenters for the different views. Returns the different views and in some cases sets parameters in them.
* *TripModel.js*: the model, includes functions for adding/removing/notifying observers and creating/comparing/setting/saving/removing trips.
* *tripSource.js*: functions for making API calls.
* *App.css* and *index.css*: CSS style sheets
* *firebaseModel.js*: functions for firebase implementation (incl. all firebase authentication).

#### In folder "views"

* *signInView.js* and *createAccountView.js*: views for the login and account creation pages. SignInView.js is modified from an original component from Tailwind and createAccountView.js is modified from signInView.js.
* *headerView.js*: old placeholder for the navigation bar, no longer used.
* *navbarView.js*: view to display the navigation bar, uses a boolean ("loggedIn") to decide whether to display navbar.js (logged in version) or navbarLoggedOut.js (logged out version).
* *SearchbarView.js*: view to display the search bar on the home page (input for starting point and destination + associated buttons); returns a div with a set of components.
* *titleView.js*: view to display the Travel Footprint logo.
* *ResultView.js*: view to display the results from the API calls.
* *profileView.js*: view to display the profile (incl. travel history).

#### In folder "components"

* *navbar.js* and *navbarLoggedOut.js*: navigation bar component, modified from [original component from Tailwind](https://tailwindui.com/components/application-ui/navigation/navbars). NavbarLoggedOut.js is a modified version where the "profile" section is replaced with a "login" button
* *SearchbarPresenter.js*: presenter for the SearchbarView
* *logo.png* and *face.png*: the logo and default "profile picture" images, respectively.
