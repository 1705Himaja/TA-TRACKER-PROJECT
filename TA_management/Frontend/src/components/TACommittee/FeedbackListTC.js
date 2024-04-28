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
		<div className="container mx-auto bg-white shadow-lg rounded-lg p-4">
			{loading ? (
				<div className="mt-8 text-center">
					<progress className="progress w-56"></progress>
				</div>
			) : feedbacks.length === 0 ? (
				<h2 className="p-8 mt-8 text-center text-2xl font-bold text-gray-600">
					No Feedbacks Yet!
				</h2>
			) : (
				<div className="container py-8 space-y-4">
					{feedbacks.map((item, index) => (
						<div key={index} className="card bg-white shadow-md rounded-lg">
							<div className="card-body p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<h3
											className="text-2xl"
											style={{ fontFamily: "Dhurjati" }}
										>
											{item.username}
										</h3>
										<div className="text-lg space-y-1">
											<p
												className="font-semibold"
												style={{ fontFamily: "Hedvig Letters Serif" }}
											>
												Name: <strong>{item.name}</strong>
											</p>
											<p className="font-semibold">
												Email:{" "}
												<span
													className="text-2xl"
													style={{ fontFamily: "Dhurjati" }}
												>
													{item.email}
												</span>
											</p>
										</div>
									</div>
									<div
										className="text-lg"
										style={{ fontFamily: "Hedvig Letters Serif" }}
									>
										<div
											className="badge badge-lg badge-neutral ml-4 text-lg font-bold px-4 py-2 rounded-full"
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
													d="M19 9l-7 7-7-7"
												/>
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
