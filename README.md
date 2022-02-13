# Book a meeting

This web application is built with React.js and Express.js. The Express back-end is simply a static server for the React.js front-end and *more importantly* a single route to manage connections with some third party applications; It's essential not to doing this calls to third party application in the front-end, because any interaction with a third party, needs an API-KEY and can be leaked through  inspecting the front-end, by anyone.



## Introduction

#### The front-end system

There front-end uses React.js - Redux - material UI - tailwindcss 

there is a stepper ([StepperLayout](./src/components/StepperLayout.js)) with three steps:

- First: is a form ([EmailForm](./src/components/EmailForm.js)) with just a single text input, validates to be a real email address using [validator](https://www.npmjs.com/package/validator). A wrapper function will pass to this by the parent stepper to make the StepperLayout aware of email validity. using the setEmail action (defined in [emailActions](./src/actions/emailActions.js)), this form will set the valid email in global state.
- Second: is a simple component with an Embedded YouTube video and a count-down. the Continue button to the next step will not be enabled until the count-down ends. the waiting time can be set by a property value by the parent component.
- Third: an embedded form from [OnceHub](https://www.oncehub.com/) is here so the user can book a meeting.

After user clicks the Finish button, a request containing the email address will be sent to back-end

```json
{
    method: "POST",
    url: "/api/sendEmail",
    body: {
    	email: "example@sw.com"    
    }
}
```

And the front-end ignores the response as it's not a concern for the front-end

#### back-end system

Since [ActiveCampaign](https://www.activecampaign.com/) supports scheduling emails, there is no database or a convenient message broker data structure to schedule sending emails. Two automations for Email #1 and Email #2 is created in ActiveCompaign and the back-end will allocate contacts to that based on if the visitor booked a meeting or not.

Then the information of user will be added to a new Row in a google sheet ([Link](https://docs.google.com/spreadsheets/d/1mUWQ3zWHDbOHrV308sheHdU6T__S_mpGvUzdvDpKeC8))

## Preparing and Starting the app

using git you can clone a copy of source code in your machine/server:

```bash
git clone https://github.com/maghorbani/book-a-meeting
```

before any step, a `.env` file with the structure defined in `.env.sample` should be created 

```bash
cp .env.sample .env
```

and you can change the variables based on your setup

you will also need a `.json` file that contains credentials for GoogleAPI and google api consule will generate this file. please leave a copy of this file in `.config` directory

using [npm](https://github.com/npm/npm) or [yarn](https://github.com/yarnpkg/yarn) you can collect the dependencies 

```bash
cd book-a-meeting

#npm
npm i

#yarn
yarn install
```

  #### Building front-end

The first step would be generating the CSS file of used components from [tailwindcss](https://github.com/tailwindlabs/tailwindcss) 

```bash
npm run build_css
```

Now you can prepare a production build of front-end

```bash
npm build
```

running the command above, a directory `build` will be shown up under project root directory that contains the optimum production build

#### Running server

simply running node can serve a local server

```bash
node server.js
```

in case of production uses, there might be various solutions, [pm2](https://github.com/Unitech/pm2) is a good choice.

```bash
sudo npm i -g pm2
pm2 start server.js
```

#### Running for Development

Development server for back-end

```bash
sudo npm i -g nodemon
nodemon server.js
```

and for front-end

```bash
npm start
```

**note** to set a base URL  (like `http://localhost:9000`) to the back-end, in the `.env` file so the front-end know where to send the web requests.

There might be other solutions with [webpack](https://github.com/webpack/webpack) that can make this step easier.

