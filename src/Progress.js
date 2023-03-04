import React from "react";

const Progress = ({ done }) => {
	return (
		<div className="progress-container">
			<div className="progress" style={{ width: `${done}` }}>
				<p>{done}</p>
			</div>
		</div>
	);
};

export default Progress;
