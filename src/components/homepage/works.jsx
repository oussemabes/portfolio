import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="mercarue.png"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">Mercarue</div>

							<div className="work-duration">Summer22</div>
						</div>
						<div className="work-subtitle">
							Backend Engineer
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
