import { useState } from "react"

const Form = ({ botStatus }) => {
    const [formData, setFormData] = useState({
        area: "178",
        phone: "4953136",
        sms: ""
    })
    
    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            phone: '+49' + formData.area + formData.phone,
            spider_id: 700,
            account: process.env.ACCOUNT,
        }
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:5001", true)
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(body));
    }

    return (
        <form id="form" onSubmit={handleSubmit}>
            {!botStatus || botStatus !== 2 ? (
                <div className="form-control">
                    <select onChange={handleChange} value={formData.area} name="area" id="area">
                        <option value=""></option>
                        <option value="173">173</option>
                        <option value="174">174</option>
                        <option value="175">175</option>
                        <option value="176">176</option>
                        <option value="177">177</option>
                        <option value="178">178</option>
                    </select>
                    <input onChange={handleChange} name="phone" id="phone" type="number" placeholder="phone" value={formData.phone} />
                </div>
            ) : (
                <div className="form-control">
                    <input onChange={handleChange} name="sms" id="sms" type="number" placeholder="phone" value={formData.sms} />
                </div>
            )}
            <div className="form-control">
                <input type="submit" value="Submit" />
            </div>
        </form>
    )
}

export default Form