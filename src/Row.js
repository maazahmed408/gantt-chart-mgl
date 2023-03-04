import React, { useEffect, useState } from "react";
import moment from "moment";
import { time } from "./constant";
import { MdDirectionsBus, MdSchedule } from "react-icons/md";
import { FaChargingStation } from "react-icons/fa";
import Progress from "./Progress";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { CgPlug } from "react-icons/cg";
import {
	TbRecharging,
	TbBatteryCharging,
	TbTemperature,
	TbBus,
} from "react-icons/tb";

const Row = ({ busInfo }) => {
	const [blockSize, setBlockSize] = useState(0);
	const [startGap, setStartGap] = useState(160);

	const calculateTime = () => {
		let timeDiff = moment
			.utc(
				moment(busInfo.endTime, "HH:mm:ss").diff(
					moment(busInfo.startTime, "HH:mm:ss")
				)
			)
			.format("HH:mm"); // Calculate Time Difference between start point and end point //06:20

		let splitDiffTime = timeDiff.split(":");
		let timeInMinutes =
			parseInt(splitDiffTime[0]) * 60 + parseInt(splitDiffTime[1]);
		let roundOff = Math.ceil(parseInt(timeInMinutes) / 10) * 10; // Round Off time diff to nearest 10
		setBlockSize(parseInt(roundOff * (160 / 60))); // calculate size of block in terms of pixel according to timeline grid i.e 60min = 160px
		let splitStartTime = busInfo.startTime.split(":"); // seperate hours and minutes from starting time
		let timeGap =
			parseInt(splitStartTime[0]) * 60 + parseInt(splitStartTime[1]); // calculate time gap from starting position 0 in minutes
		setStartGap(parseInt(timeGap * (160 / 60) + 160)); // calculate distance from starting point of grid in pixels
	};

	useEffect(() => {
		calculateTime();
	}, []);

	return (
		<div className="row-container">
			<div className="charging-point">
				{busInfo.charger}
				<FaChargingStation className="charging-point-icon" />
			</div>
			{time.map((item, index) => (
				<div key={index} className="table-outline"></div>
			))}
			<div
				id="toolTip"
				className="gantt-bar"
				style={{ width: `${blockSize}px`, left: `${startGap}px` }}
			>
				<MdDirectionsBus className="icon-size" />
				<p style={{ fontWeight: 700, marginRight: "1rem" }}>{busInfo.name}</p>
				<Progress done={busInfo.statusSoc} />
				<span className="target-soc">{busInfo.targetSoC}</span>
			</div>
			<Tooltip anchorSelect="#toolTip" place="top">
				<div className="tooltip-container">
					<p>Status</p>
					<p className="tooltip-item">
						<TbRecharging className="tooltip-icon" />
						{busInfo.status}
					</p>
					<p>Target SoC</p>
					<p className="tooltip-item">
						<TbBatteryCharging className="tooltip-icon" />
						{busInfo.targetSoC}
					</p>
					<p>Status SoC</p>
					<p className="tooltip-item">
						<TbBatteryCharging className="tooltip-icon" />
						{busInfo.statusSoc}
					</p>
					<p>Pre Conditioning</p>
					<p className="tooltip-item">
						<TbTemperature className="tooltip-icon" />
						{busInfo.preConditioning}
					</p>
					<p>Activity</p>
					<p className="tooltip-item">
						<MdSchedule className="tooltip-icon" />
						{busInfo.activity}
					</p>
					<p>Next Drive</p>
					<p className="tooltip-item">
						<TbBus className="tooltip-icon" />
						{busInfo.nextDrive}
					</p>
				</div>
			</Tooltip>
		</div>
	);
};

export default Row;
