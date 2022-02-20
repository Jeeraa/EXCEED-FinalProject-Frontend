import React from 'react'
import './TigerInfo.css'
import Modal from 'react-modal'
import axios from 'axios'
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: '90px',
		margin: '20px',
	},
}

function Tigerinfo(props) {
	const { tiger, picture } = props
	let subtitle
	const [modalIsOpen, setIsOpen] = React.useState(false)

	function openModal() {
		setIsOpen(true)
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00'
	}

	function closeModal() {
		setIsOpen(false)
	}

	function onSubmit(e) {
		e.preventDefault()
	}

	function closeCage() {
		const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token')); 
		if (tiger.status === 1) {
			axios.put('https://ecourse.cpe.ku.ac.th/exceed13/api/open-close-door/1/0',{},{ headers: { Authorization: AuthStr } }).then(response => {
				if (response.status === 200) {
					swal("Success", "ปิดกรงสำเร็จ !!", "success");
				}
			}).catch(function (error) {
				if (error.response) {
				  swal("Error", "Error " + error.response.status + " !!", "error");
				}
			  })
			  swal("Success", "ปิดกรงสำเร็จ !!", "success");
		}

	}
	
		function openCage() {
			const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token')); 
			console.log(AuthStr);
		if (tiger.status === 0) {
			axios.put('https://ecourse.cpe.ku.ac.th/exceed13/api/open-close-door/1/1',{},{ headers: { Authorization: AuthStr } }).then(response => {
				if (response.status === 200) {
					swal("Success", "เปิดกรงสำเร็จ !!", "success");
				}
			}).catch(function (error) {
			if (error.response) {
			  swal("Error", "Error " + error.response.status + " !!", "error");
			}
		  })
		}
		
		closeModal();
	}

	function food() {
		const AuthStr = 'Bearer '.concat(localStorage.getItem('access_token')); 
		axios.put('https://ecourse.cpe.ku.ac.th/exceed13/api/food-door', {
			room: 1,
			status: 1,
		},{ headers: { Authorization: AuthStr } }).then(response => {
			if (response.status === 200) {
				swal("Success", "ให้อาหารสำเร็จ !!", "success");
			}
		}).catch(function (error) {
			if (error.response) {
			  swal("Error", "Error " + error.response.status + " !!", "error");
			}
		  })
		  
	}

	return (
		<div className="nav-background">
			<div className="back-home">

<Link to="/dashboard">
<img src="https://freepikpsd.com/file/2019/10/house-icon-white-png-Transparent-Images.png" width="70px" height="auto" alt="dd" />
         
     
 </Link>
			</div>
		
		<div className="make-me-center set-font">
 <br></br>

			
			<div className="container-tiger">
				<div className="image-cropper-pro">
					<img src={picture} alt="Tiger" className="tiger" />
				</div>
				<div className="mt-3">
					<h2 className="status">สถานะ</h2>
					<p>กรง : {tiger.room}</p>
					<p>อุณหภูมิ : {tiger.temperature} ํC</p>
					<p>สถานะการสั่นสะเทือน : {!tiger.vibrate ? 'ปกติ' : 'สั่นแรง'}</p>
					<p>สถานะกรง : {!tiger.status ? 'ปิด' : 'เปิด'}</p>
					<p>สถานะการหิว : {!tiger.hungry ? 'ไม่หิว' : 'น้องเสือหิวแล้ว'}</p>
					<p>ระยะปลอดภัย : {!tiger.danger ? 'อยู่ในระยะที่ปลอดภัย' : 'อยู่ใกล้ไปแล้ว'}</p>
				</div>
				<div className="botton">
						<button className="button-55" onClick={food}>
							ให้อาหาร
						</button>

					{tiger.status === 1 ? (
						<button className="button-55" onClick={closeCage}>
							ปิดกรง
						</button>
					) : (
						<button
							className="button-55"
							onClick={() => {
								if (!tiger.status) {
									openModal()
								}
							}}
						>
							เปิดกรง
						</button>
					)}
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h2 className='ent-pass'>คุณแน่ใจไหมที่จะเปิดกรงเสือ !!</h2>
				<form onSubmit={onSubmit}>
					<div className='button-modal'>
						<button type="submit" onClick={openCage} className='button-submit'>
							แน่ใจ
						</button>

						<button onClick={closeModal}>ปิด</button>
					</div>
				</form>
			</Modal>
		</div>
		</div>
	)
}

export default Tigerinfo
