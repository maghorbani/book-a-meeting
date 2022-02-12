import logo from "./logo.svg";
import "./App.css";
import RootComponent from "./components/RootComponent";
import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <div className="App flex flex-col justify-center items-center bg-gray-50">
                <RootComponent />
            </div>
        </Provider>
    );
}

export default App;
