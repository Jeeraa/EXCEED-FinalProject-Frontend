import React, { useState, useEffect } from 'react'
import ElementDashboard from './ElementDashboard'
import axios from 'axios'
import './Dashboard.css'

function Dashboard(props) {
	const { Cases, pics } = props
	const [Tiger1, setTiger1] = useState()

	const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };



	useEffect(() => {
		const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token')); 
		const interval = setInterval(() => {
			axios
				.get('https://ecourse.cpe.ku.ac.th/exceed13/api/tiger/1',{ headers: { Authorization: AuthStr } }) //DataBase Link By Backend
				.then(function (response) {
					setTiger1(response.data)
					// console.log(response.data)
				})
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="App">
			<header className="App-header">
				<div className="pic">
					<img
						src="https://cdn-icons-png.flaticon.com/512/6815/6815898.png"
						alt="logo"
						className="icon"
					/>
				</div>
				<h1>Tiger's friends</h1>
				<h1>เพื่อนเสือ</h1>
				<div className="pos">
					{/* <ElementDashboard tiger={Cases[0]} picture={pics[0]} /> */}
					{Tiger1 && <ElementDashboard tiger={Tiger1} picture={pics[0]} />}
					<ElementDashboard tiger={Cases[1]} picture={pics[1]} />
					<ElementDashboard tiger={Cases[2]} picture={pics[2]} />
				</div>
				<div className="pos">
					<ElementDashboard tiger={Cases[3]} picture={pics[3]} />
					<ElementDashboard tiger={Cases[4]} picture={pics[4]} />
					<ElementDashboard tiger={Cases[5]} picture={pics[5]} />
				</div>
				<br></br>
			
				<div className="botton"><button className="button-55" onClick={handleLogout} >ออกจากระบบ</button></div>
		
		</header>
		</div>
	)
}

export default Dashboard
