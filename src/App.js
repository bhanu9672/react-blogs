import React from 'react';
import {
	ChakraProvider,
	theme,
} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Create from './pages/Create';
import NotFound from './pages/NotFound';
import SingleBlog from './pages/SingleBlog';
import Footer from './components/Footer';
import Contect from './pages/Contect';
import Category from './pages/Category';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<UserAuthContextProvider>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/blogs"
						element={<Blogs />}
					/>
					<Route
						path="/single-blog/:id"
						element={<SingleBlog />}
					/>
					<Route
						path="/create"
						element={
							<ProtectedRoute>
								<Create />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/contact"
						element={<Contect />}
					/>
					<Route
						path="/category/:id"
						element={<Category />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/signup"
						element={<SignUp />}
					/>
				</Routes>
				<Footer />
			</UserAuthContextProvider>
		</ChakraProvider>
	);
}

export default App;
