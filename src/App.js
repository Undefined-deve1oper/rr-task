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
            <NavLink to={`/users`}>Users List Page</NavLink>
        </div>
    );
};
const UsersLayout = () => {
    const { path } = useRouteMatch();
    return (
        <div>
            <h1>Users Layout</h1>
            <NavLink to={`/`}>Main Page</NavLink>
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
                <li key={"user_" + index}>
                    <NavLink to={`${path}/${index}`}>user {index}</NavLink>
                </li>
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
            <ul>
                <li>
                    <NavLink to={`/users/${userId}/edit`}>
                        Edit this User
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/users`}>Users List Page</NavLink>
                </li>
            </ul>
        </div>
    );
};

const UserEditPage = () => {
    const { userId } = useParams();

    return (
        <div>
            <h1>UserEditPage</h1>
            <ul>
                <li>
                    <NavLink to={`/users/${userId}`}>User Profile Page</NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${Number(userId) + 1}`}>
                        Another User
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/users`}>Users List Page</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default App;
