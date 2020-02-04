# react-native-shop-app
Shop app that allows to add product to cart, review cart, show order history and add new product to shop.

App containt two forms - create and edit product form. Forms using basic form validation wrote from scratch, and also store inputs values in reducer created with useReducer react hook.

All data are stored in firebase realtime database.

At the beginning app require sign up, or log in if account is already created. Authentication is stored and controled also by firebase. After auth token expired, user will be auto logged out (Authentication doesn't support token refreshing yet) 
