import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Containers/Layout";
import Page404 from "./Components/Page404";
import Faculties from "./Containers/Faculties";
import PathConstants from "./assets/pathConstants";
import MonthPage from "./Containers/MonthPage";
import CorpsPage from "./Containers/CorpsPage";

function App() {
  const router = createBrowserRouter([
    {
      // parent route component
      element: <Layout />,
      // child route components
      errorElement: <Page404 />,
      children: [
        {
          path: PathConstants.FACULTIES,
          element: <Faculties />,
        },
        {
          path: PathConstants.CORPS,
          element: <CorpsPage/>,
        },
        {
          path: PathConstants.MONTH,
          element: <MonthPage/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
