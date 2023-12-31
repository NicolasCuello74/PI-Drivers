export default function validate(input) { // inputs = { email: "", pass: ""}
    const errors = {};
    const regexFecha = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    //const regexFecha = /^\d{2}\s\d{2}\s\d{4}$/;
    const regexName = /^[a-zA-Z\s]{1,25}$/;
    const regexDescription = /^[a-zA-Z0-9\s.,!?]{1,200}$/;
    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;


    //const validateFecha = input.dob.length === 10 && regexFecha.test(input.dob)
    if(!regexFecha.test(input.dob)) {
        errors['dob'] = "Ingresa una fecha valida yyyy-mm-dd";
    } else {
        errors['dob'] = "";
    }
    if(!regexDescription.test(input.description)){
        errors['description'] = "Tienes que poner una descripción.";
    } else {
        errors['description'] = "";
    }
    if(!urlRegex.test(input.url)){
        errors['url'] = "Por favor ingresa una imagen valida por URL";
    } else {
        errors['url'] = "";
    }
    if(!regexName.test(input.forename)){
        errors['forename'] = "El nombre debe tener 25 caracteres o menos.";
    } else {
        errors['forename'] = "";
    }
    return errors;
}

