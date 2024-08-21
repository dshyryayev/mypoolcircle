import { Alert } from "react-bootstrap";

const GlobalAlert = () => {
    return (
        <Alert variant="success" dismissible="true">
            <Alert.Heading>Success</Alert.Heading>
            <p>
                You have successfully registered as a member.
            </p>
        </Alert>
    )
}

export default GlobalAlert;