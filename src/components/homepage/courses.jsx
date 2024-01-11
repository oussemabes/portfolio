import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Courses = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Courses"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="devopsbootcamp.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">DevOps Bootcamp by Nana</div>

							<div className="work-duration">Jan-Apr23</div>
						</div>
                        <div className="work-subtitle">
                            A 6-month program to start your career as a DevOps engineer.
						</div>
						<div className="work">
							<img
								src="ckacourse.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">Kubernetes Administrator Course</div>

							<div className="work-duration">May-Jun23</div>
						</div>
                        <div className="work-subtitle">
                            Everything you need to master the Certified Kubernetes Administrator (CKA) exam.
						</div>
						<div className="work">
							<img
								src="cbtnuggets.jpg"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">CKS Online Training by CBTNugget</div>
							<div className="work-duration">Ongoing</div>
						</div>
                        <div className="work-subtitle">
                            Certified Kubernetes Security Specialist (CKS) Online Training by CBTNugget
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Courses;
