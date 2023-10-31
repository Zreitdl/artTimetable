import Main from "../screens/Main";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: "",
    component: Main,
    name: "Main Screen",
    protected: true,
  },
];

export default routes;