import React from "react";
import {
    Link,
    NavLink,
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch
} from "react-router-dom";

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/users" component={UsersLayout} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};
const MainPage = () => {
    return (
        <div>
            <h1>MainPage</h1>
        </div>
    );
};
const UsersLayout = () => {
    const { path } = useRouteMatch();
    return (
        <div>
            <h1>Users Layout</h1>
            <Switch>
                <Route path={path} exact component={UserListPage} />
                <Route
                    path={path + "/:userId/profile"}
                    component={UserProfilePage}
                />
                <Route path={path + "/:userId/edit"} component={UserEditPage} />
                <Redirect
                    from={path + "/:userId"}
                    to={path + "/:userId/profile"}
                />
            </Switch>
        </div>
    );
};

const UserListPage = () => {
    const { path } = useRouteMatch();

    return (
        <ul>
            {new Array(5).fill("").map((_, index) => (
                <NavLink to={`${path}/${index}`} key={"user_" + index}>
                    user {index}
                </NavLink>
            ))}
        </ul>
    );
};

const UserProfilePage = () => {
    const { userId } = useParams();

    return (
        <div>
            <h1>UserPage</h1>
            <p>userId: {userId}</p>
        </div>
    );
};

const UserEditPage = () => {
    return (
        <div>
            <h1>UserEditPage</h1>
        </div>
    );
};

export default App;
