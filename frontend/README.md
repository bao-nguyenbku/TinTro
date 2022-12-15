# TinTro React Native App

## Folder Structure

<pre>
`src`
   | `assets`              // static materials
   | `components`          // share components
      | header
          | index.js
      | loading
          | index.js
   | `screens`             // every screen in the interface
      | explore
          | index.js
      | message
          | index.js
   | `store`
      | `reducer`          // implement your redux logic here
      | `index.js`         // import exported reducer from reducer folder to there
   | `services`            // all method to call API from BE should define here
      | accommodation.js
   | `utils `              // utilities function should define here
`package.json`
`App.js`
</pre>

## How to use environment variables?

1. Create `.env` file in root folder
2. Write your `key=value` in `.env` file. Ex: `API_BASE_URL=https://www.example.com/api`
3. Import from your js file. Ex:

```javascript
import { API_BASE_URL } from '@env';
```

## Handling Error

Use `rejectWithValue` method from thunkAPI. Error format:

```javascript
{
  statusCode: 400;
  message: 'Can not found your resources';
}
```

## DEMO
Link: [Expo TinTro](https://expo.dev/@baonguyen.bku/TinTro?serviceType=classic&distribution=expo-go)

// "projectId": "e93ac21f-03ab-409b-a0d1-06ccb114bb11"