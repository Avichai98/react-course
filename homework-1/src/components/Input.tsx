import { useState } from "react";

interface SubmissionResult {
    name: string;
    age: string;
    message: string;
}

export default function Input() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

    const validateAge = (age: string): boolean => {
        const ageNum = Number(age);
        if (age.trim() === "") return false;
        if (isNaN(ageNum) || ageNum <= 0)
            return false;
        else if (ageNum >= 18)
            return true;
        else
            return false;
    };

    const handleSubmit = (age: string) => {
        if (!name.trim() || !age.trim()) {
            setSubmissionResult({
                name: name,
                age: age,
                message: "Error: Both Name and Age fields must be filled out.",
            });
            return;
        }

        let validationMessage = "";
        if (validateAge(age)) {
            validationMessage = "You age is valid.";
        } else {
            validationMessage = "You age is not valid.";
        }
        setSubmissionResult({
            name: name,
            age: age,
            message: validationMessage
        });
    }

    return (
        <div>
            <label htmlFor="name">Enter your name: </label>
            <br />
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p></p>
            <label htmlFor="age">Enter your age: </label>
            <br />
            <input
                id="age"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <p></p>
            <button onClick={() => handleSubmit(age)}>
                Submit
            </button>
            <p></p>
            {submissionResult && (
                <div>
                    <h3>Submission Result:</h3>
                    <p>Name: {submissionResult.name}</p>
                    <p>Age: {submissionResult.age}</p>
                    <p>Message: {submissionResult.message}</p>
                </div>
            )}
            {age.trim() !== "" && (
                <p style={{
                    marginTop: '5px',
                    color: validateAge(age) ? 'green' : 'red'
                }}>
                    {validateAge(age) ? "Valid age" : "Invalid age"}
                </p>
            )}
        </div>
    );
}