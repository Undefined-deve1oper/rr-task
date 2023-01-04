import React from "react";
import {
    Navigate,
    NavLink,
    Outlet,
    useParams,
    useRoutes
} from "react-router-dom";

const App = () => {
    const routes = useRoutes([
        { path: "/", element: <MainPage /> },
        {
            path: "users",
            element: <UsersLayout />,
            children: [
                { index: true, element: <UserListPage /> },
                {
                    path: ":userId",
                    element: <Outlet />,
                    children: [
                        { path: "profile", element: <UserProfilePage /> },
                        { path: "edit", element: <UserEditPage /> },
                        { index: true, element: <Navigate to="./profile" /> },
                        { path: "*", element: <Navigate to="../profile" /> }
                    ]
                }
            ]
        },
        { path: "*", element: <Navigate to="/" /> }
    ]);

    return (
        <div>
            <h1>App</h1>
            {routes}
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
    return (
        <div>
            <h1>Users Layout</h1>
            <NavLink to={`/`}>Main Page</NavLink>
            <Outlet />
        </div>
    );
};

const UserListPage = () => {
    return (
        <div>
            <h1>User List Page</h1>
            <ul>
                {new Array(5).fill("").map((_, index) => (
                    <li key={"user_" + index}>
                        <NavLink to={index + "/profile"}>user {index}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
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
