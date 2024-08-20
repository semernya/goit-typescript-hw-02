import css from './SearchBar.module.css'
import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
    onInput: (newQuery: string) => void;
    toastState: (toast: number) => void;
}

export default function SearchBar({ onInput, toastState }: SearchBarProps) {

    const handleSubmit = (values, actions) => {
        onInput(values.query);
        if (values.query === '') {
            toastState(true);
            toast.error('Please enter your search query!');
            return;
        }
        actions.resetForm();
    }

    return (
        <header className={css.header}>
            <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
                <Form className={css.form}>
                    <Field className={css.input} type="text" name="query" autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos" />
                    <button className={css.btn} type="submit">Search</button>
                    {toastState && <Toaster position="top-right" />}
                </Form>
            </Formik>
        </header>
    )
}