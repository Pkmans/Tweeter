import {useState} from 'react';

function useForm(callback, initialState = {}) {
    const [values, setValues] = useState(initialState);

    function onChange(event) {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    function onSubmit(event) {
        event.preventDefault();
        callback();
    }

    return {
        onSubmit,
        onChange,
        values
    }
}

export default useForm;
