import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationComponent = ({ user }) => {
	const [notifs, setNotifs] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchNotifs = async () => {
			if (user.role === "Student") {
				const res = await axios.get(`/api/notifications/${user.username}`);
				setNotifs(res.data);
			} else {
				const res = await axios.get(`/api/notifications/user/${user.role}`);
				setNotifs(res.data);
			}
		};
		fetchNotifs();
	}, [user]);

	const deleteNotification = async (index) => {
		await axios.delete(`/api/notifications/${notifs[index]._id}`);
		setNotifs((prev) => prev.filter((notif) => notif._id !== notifs[index]._id));
	};

	return (
		<div className="relative">
			<div
				className="indicator"
				onClick={() => setOpen(!open)}
				style={{ cursor: "pointer" }}
			>
				<span className="indicator-item badge badge-primary">{notifs.length}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			</div>
			{open && (
				<div className="absolute top-12 right-0 z-10 w-64 bg-white shadow-lg rounded-lg p-4">
					{notifs.map((notif, index) => (
						<div
							key={index}
							className="alert alert-info mb-2"
						>
							<div>
								<span>{notif.message}</span>
								<button
									className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
									onClick={() => deleteNotification(index)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default NotificationComponent;