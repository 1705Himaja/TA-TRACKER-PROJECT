import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = ({ user }) => {
	const [loading, setLoading] = useState(true);
	const [feedbacks, setFeedbacks] = useState([]);
	const [open, setOpen] = useState(-1);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const response = await axios.get(`/api/getFeedbacks/${user.username}`);
				setFeedbacks(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch feedbacks", error);
			}
		};

		fetchFeedbacks();
	}, [user]);

	if (loading) {
		return (
			<div className="mt-8 flex justify-center items-center">
				<progress className="progress w-56"></progress>
			</div>
		);
	}

	return (
		<div className="mx-4 px-6 my-6">
			{feedbacks?.map((feedback, index) => (
				<div key={index} className="card my-4 bg-white shadow-md">
					<div className="card-body">
						<div className="flex justify-between items-center">
							<div className="badge badge-info font-bold mr-4">
								{feedback.course}
							</div>
							<button
								className="btn btn-ghost btn-circle"
								onClick={() => {
									open === index ? setOpen(-1) : setOpen(index);
								}}
							>
								{open !== index ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 15l7-7 7 7"
										/>
									</svg>
								)}
							</button>
						</div>
						{open === index && (
							<>
								<h3 className="text-lg font-bold mt-4">Feedback:</h3>
								<div
									className="border mt-2 px-6 py-4"
									style={{ fontFamily: "Hedvig Letters Serif" }}
								>
									{feedback.feedback}
								</div>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default FeedbackList;