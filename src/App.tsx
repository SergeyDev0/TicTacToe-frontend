import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/home/home.tsx';
import Game from "./pages/game/game.tsx";
import Layout from "./components/layout/Layout.tsx";

const App = () => {
  return (
    <Layout>
    	<BrowserRouter>
	      <Routes>
					<Route path="/" element={ <Home /> } />
					<Route path="/game/:id" element={ <Game /> } />
				</Routes>
	    </BrowserRouter>
    </Layout>
  )
}

export default App;
