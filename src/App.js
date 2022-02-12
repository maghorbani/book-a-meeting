import logo from "./logo.svg";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <div className="App flex flex-col justify-center items-center">
                Landing Page
            </div>
        </Provider>
    );
}

export default App;
