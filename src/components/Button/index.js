import { Button, Spinner } from 'react-bootstrap';
import '../../styles/components/button.css';

export const RoundButton = ({ title, submit, loading = false }) => {
    return (
        <Button variant="outline-secondary" className="round-button" disabled={loading} onClick={submit}>

            {
                loading && <Spinner animation="border" role="status" >

                </Spinner>
            }
            {!loading && title}

        </Button>
    )
}

export const GenerateButton = ({ title, loading, submit }) => {
    return (
        <Button variant="outline-secondary" className="generate-button" disabled={loading} onClick={submit}>
            {!loading && title}
            {
                loading && <Spinner animation="border" role="status" >

                </Spinner>
            }
        </Button>
    )
}