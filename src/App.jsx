import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Home } from './components/Home';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { Services } from './components/Services';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
// import { Login } from './pages/Login';
import Login from "./pages/Login";
import { Register } from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import {JobSeekerDashboard} from './pages/jobseeker/JobSeekerDashboard';
import {EmployerDashboard} from './pages/employer/EmployerDashboard';
// import { ProtectedRoute } from "./components/ProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastProvider from "./components/ToastProvider";
import { Postjobs } from './pages/employer/PostJob';
import { ManageJobs } from './pages/employer/ManageJobs';
import { EditJob } from './pages/employer/EditJob';
import { ViewApplicants } from './pages/employer/ViewApplicants';
import { Profile } from './pages/employer/Profile';
import { UpdateProfile } from './pages/employer/UpdateProfile';
import { ViewJobs } from './pages/jobseeker/ViewJobs';
import { JobCard } from './pages/jobseeker/JobCard';
import { Applications } from './pages/jobseeker/Applications';
import { Profile as JobSeekerProfile } from './pages/jobseeker/Profile';
import { UpdateProfile as UpdateJobseeker } from './pages/jobseeker/UpdateProfile';
import {  ResumeUpload } from './pages/jobseeker/ResumeUpload';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// import { ResumeUpload } from './pages/jobseeker/ResumeUpload';

const pageVariants = {
  slideLeft: {
    initial: { opacity: 0, x: 80, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -80, scale: 1.05 }
  },
  slideRight: {
    initial: { opacity: 0, x: -80, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 80, scale: 1.05 }
  },
  slideUp: {
    initial: { opacity: 0, y: 50, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 1.02 }
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 }
  }
};

const transitionConfig = {
  type: 'tween',
  ease: [0.15, 0.36, 0.35, 0.84],
  duration: 0.3
};

const getPageVariant = (currentPath, previousPath) => {
  const routes = ['/', '/about', '/services', '/features', '/faq', '/contact', '/login', '/register','/forgotpass','/resetPass'];
  const currentIndex = routes.indexOf(currentPath);
  const previousIndex = routes.indexOf(previousPath);

  if (currentPath === '/login' || currentPath === '/register') return pageVariants.fadeScale;
  if (previousPath === '/login' || previousPath === '/register') return pageVariants.fadeScale;

  if (currentIndex > previousIndex) return pageVariants.slideLeft;
  if (currentIndex < previousIndex) return pageVariants.slideRight;

  return pageVariants.slideUp;
};


function AnimatedPage({ children }) {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);

  
  const previousPath = previousPathRef.current;
  useEffect(() => {
    previousPathRef.current = location.pathname;
  }, [location.pathname]);

  const currentVariant = getPageVariant(location.pathname, previousPath);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={currentVariant}
      transition={transitionConfig}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black', 
        overflowX: 'hidden',
        zIndex: 1
      }}
    >
      {children}
    </motion.div>
  );
}


function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (location.pathname === '/home') {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        backgroundColor: 'black',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/home" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/services" element={<AnimatedPage><Services /></AnimatedPage>} />
          <Route path="/features" element={<AnimatedPage><Features /></AnimatedPage>} />
          <Route path="/faq" element={<AnimatedPage><FAQ /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
          <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
          <Route path="/forgotPass" element={<AnimatedPage><ForgotPassword /></AnimatedPage>}/>
          <Route path="/reset-pass" element={<AnimatedPage><ResetPassword/></AnimatedPage>}/>


          <Route
            path="/jobseeker-dashboard"
            element={
              <ProtectedRoute allowedRoles={["job_seeker"]}>
                <AnimatedPage>
                  <JobSeekerDashboard />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />

          <Route
          
            path='/view-jobs'
            element={
              <ProtectedRoute allowedRoles={["job_seeker"]}>
                <AnimatedPage>
                  <ViewJobs />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />  
          <Route
            path="/job-card/:id"
            element={
              <ProtectedRoute allowedRoles={["job_seeker"]}>
                <AnimatedPage>
                  <JobCard />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />  

          <Route
            path='/applications'
            element={
              <ProtectedRoute allowedRoles={["job_seeker"]}>
                <AnimatedPage>
                  <Applications/>
                </AnimatedPage>
              </ProtectedRoute>
            }
          />

            <Route
            path='/job-profile'
            element={
              <ProtectedRoute allowedRoles={["job_seeker"]}>
                <AnimatedPage>
                  <JobSeekerProfile/>
                </AnimatedPage>
              </ProtectedRoute>
            }
            />          
              <Route
            path='/job-profile/edit'
            element={
              <ProtectedRoute allowedRoles={["job_seeker"]}>
                <AnimatedPage>
                  <UpdateJobseeker/>
                </AnimatedPage>
              </ProtectedRoute>
            }
            />
            <Route
            path='/resume'
            element={
              <ProtectedRoute allowedRoles={["job_seeker"]}>
                <AnimatedPage>
                  <ResumeUpload/>
                </AnimatedPage>
              </ProtectedRoute>
            }
            />
  
          <Route
            path="/employer-dashboard"
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <AnimatedPage>
                  <EmployerDashboard />
                </AnimatedPage>
              </ProtectedRoute>
            }
          />
          <Route
              path="/post-job"
              element={
                <ProtectedRoute allowedRoles={["employer"]}>
                  <AnimatedPage>
                    <Postjobs />
                  </AnimatedPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-jobs"
              element={
                <ProtectedRoute allowedRoles={["employer"]}>
                  <AnimatedPage>
                    <ManageJobs />
                  </AnimatedPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-job"
              element={
                <ProtectedRoute allowedRoles={["employer"]}>
                  <AnimatedPage>
                    <EditJob />
                  </AnimatedPage>
                </ProtectedRoute>
              }
            />
            <Route
              path='/view-applicants'
              element={
                <ProtectedRoute allowedRoles={["employer"]}>
                  <AnimatedPage>
                    <ViewApplicants />
                  </AnimatedPage>
                </ProtectedRoute>
              }
            />
            <Route
            path='/profile'
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <AnimatedPage>
                  <Profile/>
                </AnimatedPage>
              </ProtectedRoute>
            }
            />
                        <Route
            path='/profile/edit'
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <AnimatedPage>
                  <UpdateProfile/>
                </AnimatedPage>
              </ProtectedRoute>
            }
            />
        </Routes>
      </AnimatePresence>
    </div>
  );
}


const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      style={{
        width: 40,
        height: 40,
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #007bff',
        borderRadius: '50%'
      }}
    />
  </motion.div>
);

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      <AnimatePresence>{isLoading && <LoadingSpinner />}</AnimatePresence>
       <ToastProvider />
    </Router>
  );
}

export default App;
