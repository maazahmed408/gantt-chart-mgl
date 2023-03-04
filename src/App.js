import React from "react";
import { time, busList } from "./constant";
import Row from "./Row";

const App = () => {
	return (
		<div className="main-container">
			<p className="main-heading">Microgrid Labs Gantt Chart</p>
			<div className="container">
				<div className="head">
					<div className="head-title">Charging point</div>
					{time.map((item, index) => (
						<div key={index} className="head-column">
							{item}
						</div>
					))}
				</div>
				{busList.map((item, index) => (
					<Row busInfo={item} key={index} />
				))}
			</div>
		</div>
	);
};

export default App;
