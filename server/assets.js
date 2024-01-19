export const sendError = ({
	defaultMessage = "Неизвестная ошибка",
	status = 500,
	error,
	res,
}) => {
	const message = error.message ? error.message : defaultMessage;
	console.log(message, error);
	return res.status(status).send({
		message
	});
};