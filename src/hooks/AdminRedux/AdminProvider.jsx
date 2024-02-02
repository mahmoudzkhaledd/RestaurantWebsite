import { store } from "./AdminStore";
import { Provider } from "react-redux";

export default function AdminProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}