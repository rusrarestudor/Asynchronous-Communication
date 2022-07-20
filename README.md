# Asynchronous-Communication

Sensor Monitoring System and Real-Time Notification

This project consists of an online platform to help customers of an energy company monitor their consumption. Each client has a sensor that measures the energy consumed (will simulate a sensor that reads data from files (sensor.csv), one value at every 10 minutes).

The system is implemented and designed based on a message broker middleware that gathers data from the sensors and pre-processes them before storing them in the database.

Technologies used: <br />
 - REST services for backend application (Java Spring) <br />
 - RabbitMQ to publish./consume data from sensors. <br />
 - WebSockets to notify the client. <br />
 - JavaScript-based framework for client application(ReactJS) <br />

Requirements: <br />
 - Functional: <br />
 Users log in, Administrator Role, Client Role <br />
 The message-oriented middleware allows the sensor system to send data tuples in a JSON format <br />
 The message consumer component of the system processes each message and notifies asynchronously using WebSockets the client application <br />

 - Non-Functional: Security(cookies, session, etc.)


This project was also deployed, but on GitLab(https://gitlab.com/rusrarestudor/ds2021_30442_rus_rares_2_backend/-/tree/docker_production)
