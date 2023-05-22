import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import * as yup from "yup";
import { useFormik } from "formik";
import React, { useContext, useState, useEffect } from "react";
import {
	Form,
	Button,
	InputGroup,
	Row,
	Col,
	Container,
	Alert,
	Card,
	ListGroup,
} from "react-bootstrap";
import { AGE, DIS_CODE, RACE, SEX, TEMP } from "./constants/AppConstants";
import LoadingOverlay from "react-loading-overlay";

const schema = yup.object().shape({
	age: yup.number().required(),
	race: yup.number().required(),
	sex: yup.number().required(),
	temp: yup.number().required(),
	pulse: yup.number().required(),
	weight: yup.number().required(),
	height: yup.number().required(),
	oxe: yup.number().required(),
	bmi: yup.number().required(),
	sys: yup.number().required(),
	dia: yup.number().required(),
	code: yup.number().required(),
});
const initialValues = {
	age: 95,
	race: 6,
	sex: 1,
	temp: 97.7,
	pulse: 68,
	weight: 99.6,
	height: 63,
	oxe: 96,
	bmi: 17.6,
	sys: 135,
	dia: 67,
	code: 4,
};

const App = () => {
	const [loader, setloader] = useState(false);
	const [thePrediction, setprediction] = useState("****");
	const [beforePrediction, setbeforeprediction] = useState(true);
	const {
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
		setFieldValue,
		setTouched,
	} = useFormik({
		initialValues,
		validationSchema: schema,
		onSubmit: (values, action) => {
			console.log(values);
			fetchData(values);
			setloader(true);
			setbeforeprediction(true);
		},
	});

	const fetchData = async (values) => {
		try {
			const response = await axios.post(
				"https://fr-function-2nd-gen-sagar-msfvwq54eq-uc.a.run.app",
				values,
				{
					timeout: 150000, // Set the timeout to 2.5 minutes (150000 milliseconds)
				}
			);
			if (response.status == 200) {
				console.log(response);
				console.log(response.data);
				let modelPrediction = response.data.prediction;
				let prediction = getValue(modelPrediction);
				setprediction(prediction);
				setloader(false);
				setbeforeprediction(false);
			}
		} catch (error) {
			// Handle errors
			console.log("Error:", error.message);
		}
	};

	const Agfunction = async (value) => {
		setFieldValue("age", value);
		console.log(value);
	};

	const getValue = (number) => {
		const mapping = {
			1: "0 to 10 days",
			2: "11 to 20 days",
			3: "21 to 30 days",
			4: "31 to 40 days",
			5: "41 to 50 days",
			6: "51 to 60 days",
			7: "61 to 70 days",
			8: "71 to 80 days",
			9: "81 to 90 days",
			10: "91 to 100 days",
			11: "101 to 110 days",
			12: "111 to 120 days",
			13: "More than 4 months",
		};
		if (number in mapping) {
			return mapping[number];
		}
		// Return a default value or handle the case when the number is not found in the mapping array
		return "Unknown";
	};
	return (
		<Container fluid className='App-header py-2'>
			<Alert variant='success' className='text-center'>
				<h5>
					Unlocking the Future: Discovering the Hidden Journey - HospiceMD's
					Revolutionary Predictive Model for Patient Length of Stay!
				</h5>
			</Alert>
			<Row>
				<Col lg='6' xl='6' md='6' sm='12'>
					<Form
						autoComplete='off'
						validateOnChange={false}
						validateOnBlur={false}
						onSubmit={handleSubmit}>
						<Row>
							<Form.Group
								as={Col}
								md='12'
								lg='12'
								controlId='validationFormikUsername'>
								<Form.Label>Disease Type </Form.Label>
								<InputGroup hasValidation>
									<Form.Select
										value={values.code}
										name='code'
										isInvalid={touched.code && !!errors.code}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ code: false });
										}}>
										{DIS_CODE.map((item) => {
											return <option value={item.value}>{item.label}</option>;
										})}
										<option value='' selected disabled hidden>
											Select....
										</option>
									</Form.Select>
								</InputGroup>
								{errors.code && touched.code ? (
									<span className='error-invlaid '>{errors.code}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Age of the patient:</Form.Label>
								<InputGroup hasValidation>
									<Form.Select
										value={values.age}
										name='age'
										isInvalid={touched.age && !!errors.age}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ age: false });
										}}>
										{AGE.map((item) => {
											return <option value={item}>{item}</option>;
										})}
										<option value='' selected disabled hidden>
											Select....
										</option>
									</Form.Select>
								</InputGroup>
								{errors.age && touched.age ? (
									<span className='error-invlaid '>{errors.age}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Ethnic Group</Form.Label>
								<InputGroup hasValidation>
									<Form.Select
										value={values.race}
										name='race'
										isInvalid={touched.race && !!errors.race}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ race: false });
										}}>
										{RACE.map((item) => {
											return <option value={item.value}>{item.label}</option>;
										})}
										<option value='' selected disabled hidden>
											Select....
										</option>
									</Form.Select>
								</InputGroup>
								{errors.race && touched.race ? (
									<span className='error-invlaid '>{errors.race}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Sex Group </Form.Label>
								<InputGroup hasValidation>
									<Form.Select
										value={values.sex}
										name='sex'
										isInvalid={touched.sex && !!errors.sex}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ sex: false });
										}}>
										{SEX.map((item) => {
											return <option value={item.value}>{item.label}</option>;
										})}
										<option value='' selected disabled hidden>
											Select....
										</option>
									</Form.Select>
								</InputGroup>
								{errors.sex && touched.sex ? (
									<span className='error-invlaid '>{errors.sex}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Body Temperature </Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										value={values.temp}
										name='temp'
										type='text'
										isInvalid={touched.temp && !!errors.temp}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ temp: false });
										}}></Form.Control>
								</InputGroup>
								{errors.temp && touched.temp ? (
									<span className='error-invlaid '>{errors.temp}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Pulse Rate </Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										value={values.pulse}
										name='pulse'
										type='text'
										isInvalid={touched.pulse && !!errors.pulse}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ pulse: false });
										}}></Form.Control>
								</InputGroup>
								{errors.pulse && touched.pulse ? (
									<span className='error-invlaid '>{errors.pulse}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Weight </Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										value={values.weight}
										name='weight'
										type='text'
										isInvalid={touched.weight && !!errors.weight}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ weight: false });
										}}></Form.Control>
								</InputGroup>
								{errors.weight && touched.weight ? (
									<span className='error-invlaid '>{errors.weight}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Height </Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										value={values.height}
										name='height'
										type='text'
										isInvalid={touched.height && !!errors.height}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ height: false });
										}}></Form.Control>
								</InputGroup>
								{errors.height && touched.height ? (
									<span className='error-invlaid '>{errors.height}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Oxygen Level </Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										value={values.oxe}
										name='oxe'
										type='text'
										isInvalid={touched.oxe && !!errors.oxe}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ oxe: false });
										}}></Form.Control>
								</InputGroup>
								{errors.oxe && touched.oxe ? (
									<span className='error-invlaid '>{errors.oxe}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>systolic Blood Pressure </Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										value={values.sys}
										name='sys'
										type='text'
										isInvalid={touched.sys && !!errors.sys}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ sys: false });
										}}></Form.Control>
								</InputGroup>
								{errors.sys && touched.sys ? (
									<span className='error-invlaid '>{errors.sys}</span>
								) : null}
							</Form.Group>
							<Form.Group
								as={Col}
								md='6'
								sm='12'
								controlId='validationFormikUsername'>
								<Form.Label>Diastolic Blood Pressure </Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										value={values.dia}
										name='dia'
										type='text'
										isInvalid={touched.dia && !!errors.dia}
										onChange={handleChange}
										onBlur={() => {
											setTouched({ dia: false });
										}}></Form.Control>
								</InputGroup>
								{errors.dia && touched.dia ? (
									<span className='error-invlaid '>{errors.dia}</span>
								) : null}
							</Form.Group>
						</Row>
						<div className='text-center  mt-3'>
							<Button
								variant='success'
								className=' mx-2 submt-Button w-50'
								type='submit'>
								Get Prediction
							</Button>
						</div>
					</Form>
				</Col>
				<Col lg='6' xl='6' md='6' sm='12'>
					<LoadingOverlay
						active={loader}
						spinner
						overlayClassName='custom-overlay'
						text='Processing your data. This will take couple of minutes'>
						<div style={{ height: "100vh" }}>
							<Row className='text-center d-flex justify-content-center'>
								<Card style={{ width: "20rem", height: "20rem" }}>
									<Card.Header>
										{" "}
										<b>Care-Home Stay Duration </b>
									</Card.Header>
									<Card.Body>
										<blockquote className='blockquote mb-0'>
											{beforePrediction ? (
												"Form-Fill & Discover: Unveil Length of Stay Prediction!"
											) : (
												<p>
													{" "}
													Based on the analysis, the model predicts that the
													patient is likely to stay in the care home for
													approximately <b>{thePrediction}.</b>
												</p>
											)}

											<footer className='blockquote-footer mt-3'>
												Powered by:{" "}
												<cite title='Source Title'>
													Advance Machine Learning Algo
												</cite>
											</footer>
										</blockquote>
									</Card.Body>
								</Card>
							</Row>

							<Row className='mt-2'>
								<Col lg='6' md='12'>
									<Alert variant='success' className='text-center m-0 py-1'>
										<h6>Advantages of the Model </h6>
									</Alert>
									<ListGroup style={{ fontSize: "13px" }}>
										<ListGroup.Item>Optimized bed availability</ListGroup.Item>
										<ListGroup.Item>
											Enhanced patient care and experience
										</ListGroup.Item>
										<ListGroup.Item>
											Streamlined operational efficiency
										</ListGroup.Item>
										<ListGroup.Item>Data-driven decision making</ListGroup.Item>
										<ListGroup.Item>
											Resource allocation optimization
										</ListGroup.Item>
									</ListGroup>
								</Col>
								<Col lg='6' md='12'>
									<Alert variant='danger' className='text-center m-0 py-1'>
										<h6>Limitations of the Model </h6>
									</Alert>
									<ListGroup style={{ fontSize: "13px" }}>
										<ListGroup.Item>Reliance on historical data</ListGroup.Item>
										<ListGroup.Item>Individual variability</ListGroup.Item>
										<ListGroup.Item>Uncertainty and error</ListGroup.Item>
										<ListGroup.Item>Ethical considerations</ListGroup.Item>
										<ListGroup.Item>
											External factors not considered in the decision.
										</ListGroup.Item>
									</ListGroup>
								</Col>
							</Row>
						</div>
					</LoadingOverlay>
				</Col>
			</Row>
		</Container>
	);
};

export default App;
