import axios from "axios";
import React, { useEffect, useState } from "react";

const FeedbackModal = ({ user, open, onClose }) => {
	const [feedback, setFeedback] = useState("");

	const handleClose = () => {
		onClose();
	};

	const handleSubmit = async () => {
		if (feedback === "") {
			alert("Feedback cannot be empty");
			return;
		}
		try {
			const response = await axios.post("/api/createFeedback", {
				username: user.username,
				name: user.name,
				email: user.email,
				course: user.course,
				feedback,
			});
			if (response.status === 201) {
				alert("Feedback created successfully");
			} else {
				console.error("Failed to create feedback");
				alert("Failed to create feedback");
			}
		} catch (e) {
			console.error("Error creating feedback:", e);
			alert("An error occurred while creating feedback");
		}
		handleClose();
	};

	return (
		<div className={`modal ${open ? 'modal-open' : ''}`}>
			<div className="modal-box max-w-3xl">
				<div className="flex flex-col items-center mt-8 p-6">
					<h3 className="text-lg font-bold mb-4">User Information</h3>
					<p className="text-base">Username: {user.username}</p>
					<p className="text-base">Name: {user.name}</p>
					<p className="text-base">Email: {user.email}</p>
					<p className="text-base">Course: {user.course}</p>
					<div className="form-control mt-4">
						<label className="label">
							<span className="label-text">Feedback</span>
						</label>
						<textarea
							className="textarea textarea-bordered h-24"
							placeholder="Enter your feedback"
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
						></textarea>
					</div>
					<button
						className="btn btn-primary mt-4"
						onClick={handleSubmit}
					>
						Submit Feedback
					</button>
				</div>
				<button
					className="btn btn-sm btn-circle absolute right-2 top-2"
					onClick={handleClose}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	);
};

const Feedback = () => {
	const [applicants, setApplicants] = useState([]);
	const [open, setOpen] = useState(false);
	const [curUser, setCurUser] = useState(null);

	const fillApplicants = (applics) => {
		const newApplicants = [];
		const applics2 = applics.map((appli) => {
			return {
				...appli,
				eligibleCourses: appli.eligibleCourses.split(","),
				status: appli.status.split(","),
			};
		});
		applics2.forEach((appli) => {
			appli.eligibleCourses.forEach((course, index) => {
				if (appli.status[index] === "Accepted") {
					newApplicants.push({
						username: appli.username,
						name: appli.name,
						email: appli.email,
						course,
					});
				}
			});
		});
		setApplicants(newApplicants);
	};

	useEffect(() => {
		const fetchAcceptedApplications = async () => {
			try {
				const response = await axios.get("/api/getAcceptedApplications");

				if (response.status === 200) {
					fillApplicants(response.data);
				} else {
					console.error("Failed to fetch accepted applications");
				}
			} catch (error) {
				console.error("Error fetching accepted applications:", error);
			}
		};

		fetchAcceptedApplications();
	}, []);

	const handleFeedbackClick = (user) => {
		setCurUser(user);
		setOpen(true);
	};

	return (
		<div className="container mx-auto">
			{applicants.length === 0 ? (
				<p className="mt-8 text-center">
					No TAs available yet to give feedback
				</p>
			) : (
				applicants.map((item, index) => (
					<div
						key={index}
						className="p-6 border shadow mb-6 rounded-lg bg-white"
					>
						<div className="mb-4">
							<p>
								<strong>Username:</strong> {item.username}
							</p>
							<p>
								<strong>Name:</strong> {item.name}
							</p>
							<p>
								<strong>Email:</strong> {item.email}
							</p>
							<p>
								<strong>Course:</strong> {item.course}
							</p>
						</div>
						<button
							className="btn btn-primary"
							onClick={() => handleFeedbackClick(item)}
						>
							Feedback
						</button>
					</div>
				))
			)}
			{open && (
				<FeedbackModal
					user={curUser}
					open={open}
					onClose={() => setOpen(false)}
				/>
			)}
		</div>
	);
};

export default Feedback;
