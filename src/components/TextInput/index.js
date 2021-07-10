import '../../styles/components/input.css';


export const Input = ({ label="", type, name, value, onChange }) => {

    return (
        <div className="auth-input-container">
            <label htmlFor="text" className="auth-input-label-container">
                <span className="auth-input-label-name">
                    {label}
                </span>
            </label>
            <input autoComplete="off" name={name} type={type} value={value} onChange={(event) => onChange(event)} />

        </div>
    )
}

export const SmallInput = ({ label, type, name, value, onChange }) => {

    return (
        <div className="small-input-container">
            <input autoComplete="off" placeholder="" className="small-input" name={name} type={type} value={value} onChange={(event) => onChange(event)} />
            <label htmlFor="text" className="small-input-label-container">
                <span className="small-input-label-name">
                    {label}
                </span>
            </label>
        </div>
    )
}