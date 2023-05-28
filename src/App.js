import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home";
import Menu from "./components/Menu";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import { UserProvider } from "./context/UserContext";
import { SurveyProvider } from "./context/SurveyContext";
import Surveys from "./pages/Surveys";
import NewSurvey from "./pages/NewSurvey";
import Questions from "./pages/Questions";
import Users from "./pages/Users";




function App() {
  return (
    <UserProvider>
      <SurveyProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<PrivateRoute />} >
                <Route path="/" element={<Layout><Home /></Layout>} />
              </Route>
              <Route path="/surveys" element={<PrivateRoute />} >
                <Route path="/surveys" element={<Layout><Surveys /></Layout>} />
              </Route>
              <Route path="/newSurvey" element={<PrivateRoute />} >
                <Route path="/newSurvey" element={<Layout><NewSurvey /></Layout>} />
              </Route>
              <Route path="/questions" element={<PrivateRoute />} >
                <Route path="/questions" element={<Layout><Questions /></Layout>} />
              </Route>
              <Route path="/users" element={<PrivateRoute />} >
                <Route path="/users" element={<Layout><Users /></Layout>} />
              </Route>
              <Route path="/signIn" element={<SignIn />} />
            </Routes>
          </div>
        </Router>
      </SurveyProvider>

    </UserProvider>
  );
}

const Layout = ({ children }) => (
  <div className="app__inner">
    <Menu />
    {children}
  </div>
);



export default App;