import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'services/firebase';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigete = useNavigate();

	const signUp = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				console.log(userCredential);
				navigete('/auth/login');
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<Container
			sx={{
				width: '95%',
				background: 'white',
				height: '95vh',
				marginBottom: '20px',
				marginTop: '20px',
				padding: '24px',
				boxShadow: '0px 2px 6px 0px rgba(0,0,0,.16)',
				border: '1px solid transparent',
				borderRadius: '16px',
				minHeight: 'calc(100vh - 48px)'
			}}
			maxWidth="xl">
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '42px',
					fontWeight: 600,
					color: 'rgb(26, 29, 31)'
				}}>
				Admin
			</Box>

			<Box display="flex" justifyContent="center" alignItems="center">
				<form
					onSubmit={signUp}
					style={{
						width: '100%',
						marginTop: '30px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						gap: '20px'
					}}>
					<input
						placeholder="email kiriting..."
						type="email"
						style={{
							height: '48px',
							padding: '16px',
							background: '#fff',
							border: '1px solid #e3e5e6',
							borderRadius: '8px',
							outline: 'none',
							fontSize: '16px',
							lineHeight: '16px',
							width: '100%'
						}}
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
					<input
						placeholder="password"
						type="password"
						style={{
							height: '48px',
							padding: '16px',
							background: '#fff',
							border: '1px solid #e3e5e6',
							borderRadius: '8px',
							outline: 'none',
							fontSize: '16px',
							lineHeight: '16px',
							width: '100%'
						}}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<Button
						type="submit"
						sx={{
							fontSize: '14px',
							height: '68px',
							display: 'inline-flex',
							alignItems: 'center',
							borderRadius: '16px',
							justifyContent: 'center',
							position: 'relative',
							padding: '0px 26px !important',
							outline: 'none !important',
							backgroundColor: 'rgb(255, 207, 0)',
							width: '30%',
							color: '#fff'
						}}>
						Next
					</Button>
				</form>
			</Box>
		</Container>
	);
};

export default SignUp;
