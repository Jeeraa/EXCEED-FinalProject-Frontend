import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Dashboard from './Dashboard'
import Tigerinfo from './TigerInfo'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';
import Signin from './Signin';
// import swal from 'sweetalert';

// const ROLES = {
//   'User': 2001
// }

const pics = [
	'https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg',
	'https://static.bangkokpost.com/media/content/20200219/c1_1860789_200219162635.jpg',
	'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1199,h_800/w_74,x_13,y_13,g_south_west,l_klook_water/activities/dtxxval61hyxkeqlqaou/TigerKingdomTicketinPhuketforThaiResidents.jpg',
	'https://i.natgeofe.com/k/1bf26ec6-00ec-4054-ac87-160bed47ff4f/tiger2_3x2.png',
	'https://media.istockphoto.com/photos/smirking-tiger-picture-id157506528?k=20&m=157506528&s=612x612&w=0&h=p1jSOLLlFobf0iE2sThO3EcSPP7As4nQ41ndeQQJ60s=',
	'https://i.natgeofe.com/n/3ccdfcd5-3e4d-4821-bd80-fc896a9c3599/2944046_4x3.jpg',
]

const Cases = [
	{
		room: 1,
		temperature: 30.4,
		status: 0, //(0,1)สถานะผิดปกติคือ 1
		vibrate: 0, //(0,1)
		hungry: 1, //(0,1)
		danger: 0,
	},
	{
		room: 2,
		temperature: 20.34,
		status: 0, //(0,1)open closed
		vibrate: 0, //(0,1) vibrate not vibrate
		hungry: 0, //(0,1) hungry
		danger: 0,
	},
	{
		room: 3,
		temperature: 30.4,
		status: 0, //(0,1)
		vibrate: 0, //(0,1)
		hungry: 0, //(0,1)
		danger: 0,
	},
	{
		room: 4,
		temperature: 20.34,
		status: 0, //(0,1)open closed
		vibrate: 0, //(0,1) vibrate not vibrate
		hungry: 0, //(0,1) hungry
		danger: 0,
	},

	{
		room: 5,
		temperature: 30.4,
		status: 0, //(0,1)
		vibrate: 0, //(0,1)
		hungry: 0, //(0,1)
		danger: 0,
	},
	{
		room: 6,
		temperature: 20.34,
		status: 0, //(0,1)open closed
		vibrate: 0, //(0,1) vibrate not vibrate
		hungry: 0, //(0,1) hungry
		danger: 0,
	},
]


function App() {
	const [Tiger1, setTiger1] = useState()

	useEffect(() => {

		const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token')); 
		const interval = setInterval(() => {
			const token = localStorage.getItem('access_token');

			if((token)) {
			axios
				.get('https://ecourse.cpe.ku.ac.th/exceed13/api/tiger/1',{ headers: { Authorization: AuthStr } }) //DataBase Link By Backend
				.catch(function (error) {
					if (error.response.data.detail === "Could not validate credentials") {
						localStorage.removeItem("access_token");
						window.location.href = "/";
					  //swal("Error", "Error " + error.response.status + " !!", "error");
					}
				  }).then(function (response) {
					setTiger1(response.data)
					// console.log(response.data)
				})
			}
		}, 1000)


		return () => clearInterval(interval)
	}, [])


  const token = localStorage.getItem('access_token');
  if(!(token)) {
    return <Signin />
  }
  
	return (
 <Routes>
   
	  <Route path="/" element={<Signin />} />
			
        {/* public routes */}
	   
	   <Route path="/dashboard/" element={<Dashboard Cases={Cases} pics={pics} />} />
	   

	<Route path="/dashboard/" element={<Dashboard Cases={Cases} pics={pics} />} />
	<Route path="/dashboard/1" element={Tiger1 && <Tigerinfo tiger={Tiger1} picture={pics[0]} />} />
	<Route path="/dashboard/2" element={<Tigerinfo tiger={Cases[1]} picture={pics[1]} />} />
	<Route path="/dashboard/3" element={<Tigerinfo tiger={Cases[2]} picture={pics[2]} />} />
	<Route path="/dashboard/4" element={<Tigerinfo tiger={Cases[3]} picture={pics[3]} />} />
	<Route path="/dashboard/5" element={<Tigerinfo tiger={Cases[4]} picture={pics[4]} />} />
	<Route path="/dashboard/6" element={<Tigerinfo tiger={Cases[5]} picture={pics[5]} />} />

			

    </Routes>

	
	)
}

export default App
