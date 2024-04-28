
import axios from "axios";
import React, { useEffect, useState } from "react";

const FeedbackList = () => {
	const [feedbacks, setFeedbacks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openIndex, setOpenIndex] = useState(-1);

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const response = await axios.get("/api/getAllFeedbacks");
				setFeedbacks(response.data);
				setLoading(false);
			} catch (e) {
				console.error("Error fetching feedbacks:", e);
				alert("An error occurred while fetching feedbacks");
			}
		};
		fetchFeedbacks();
	}, []);

	return (
		<div className="container mx-auto bg-white shadow rounded-lg">
			{loading ? (
				<div className="mt-8 text-center">
					<progress className="progress w-56"></progress>
				</div>
			) : feedbacks.length === 0 ? (
				<h2 className="p-8 mt-8 text-center text-2xl font-bold">
					No Feedbacks Yet!
				</h2>
			) : (
				<div className="container py-8">
					{feedbacks.map((item, index) => (
						<div key={index} className="card mb-4 shadow-md">
							<div className="card-body py-2 pb-4">
								<div className="flex items-center">
									<h3
										className="text-2xl me-8"
										style={{ fontFamily: "Dhurjati" }}
									>
										{item.username}
									</h3>
									<p
										className="text-xl me-8"
										style={{ fontFamily: "Hedvig Letters Serif" }}
									>
										Name: <strong>{item.name}</strong>
									</p>
									<p className="text-xl me-8">
										Email:{" "}
										<span className="text-2xl" style={{ fontFamily: "Dhurjati" }}>
											{item.email}
										</span>
									</p>
									<div
										className="text-xl my-4"
										style={{ fontFamily: "Hedvig Letters Serif" }}
									>
										<div
											className="badge badge-lg badge-neutral ml-4 text-lg font-bold"
											style={{ fontFamily: "Hedvig Letters Serif" }}
										>
											{item.course}
										</div>
									</div>
									<button
										className="btn btn-ghost btn-circle ml-auto"
										onClick={
											openIndex !== index
												? () => setOpenIndex(index)
												: () => setOpenIndex(-1)
										}
									>
										{openIndex === index ? (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
											</svg>
										) : (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										)}
									</button>
								</div>
								{openIndex === index && (
									<div className="mt-4">
										<p className="text-lg">
											<strong>Feedback:</strong>{" "}
											<span
												style={{ fontFamily: "Hedvig Letters Serif" }}
												className="text-xl"
											>
												{item.feedback}
											</span>
										</p>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FeedbackList;
