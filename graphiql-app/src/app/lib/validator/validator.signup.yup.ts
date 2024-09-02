import * as yup from 'yup';
import {SignupProps} from "@app/[locale]/signup/page";


const PASSW_HELP = "Length minimum 8 symbols, at least one letter, one digit, one special character";
const PASSWORD_SPECIAL_CHARACTERS = /!@#\$%\^&*;:"'<>,\?\._\(\)-\+\[\]\/=\\{}/;


function isPasswordStrength(test: string): boolean {
    if (test && test.length > 0) {
        const p1 = /[a-zA-Z0-9]/;
        const r1 = test.match(p1);

        if (r1 && r1.length > 0) {

            const p2 = `[${PASSWORD_SPECIAL_CHARACTERS}]`;
            const r2 = test.match(p2);

            if (r2 && r2.length > 0) {
                return true;
            }
        }
    }

    return false;
}


const signupSchema = yup.object<SignupProps>().shape({
    email: yup.string()
        .required()
        .email(),
    password: yup.string()
        .required("password is empty")
        .min(6)
        .max(100)
        .matches(/[a-zA-Z0-9]/, PASSW_HELP)
        .test("isPasswordStrength", PASSW_HELP, isPasswordStrength),
    passwordRepeat: yup.string()
        .required()
        .oneOf([yup.ref("password"), ""], "Passwords are not identical")
});

export default signupSchema;

