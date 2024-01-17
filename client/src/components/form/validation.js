export default function validate(input) { // inputs = { email: "", pass: ""}
    const errors = {};
    const regexFecha = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{1,25}$/;
    const regexDescription = /^[a-zA-Z0-9\s.,!?]{1,200}$/;
    const urlRegex = /https?:\/\/[^.]*?(\.[^.]+?)*\/.*?\.(jpg|jpeg|gif|png)/;
    const fileImage = /(jpg|jpeg|gif|png)/;
    const regexTeams = /^\d+(,\d+)*$/;

    //const validateFecha = input.dob.length === 10 && regexFecha.test(input.dob)
    if(!regexName.test(input.forename)){
        errors['forename'] = "El nombre debe tener 25 caracteres o menos, sin caracteres especiales.";
    } else {
        errors['forename'] = "";
    }
    if(!regexName.test(input.surname)){
        errors['surname'] = "El nombre debe tener 25 caracteres o menos, sin caracteres especiales.";
    } else {
        errors['surname'] = "";
    }
    if(!regexDescription.test(input.description)){
        errors['description'] = "Tienes que poner una descripción valida, sin caracterés especiales.";
    } else {
        errors['description'] = "";
    }
    if(!urlRegex.test(input.image)){
        errors['image'] = "Por favor ingresa una imagen valida por URL.";
    } else {
        errors['image'] = "";
    }
    if(!regexName.test(input.nationality)){
        errors['nationality'] = "Por favor ingresa una nacionalidad, sin caracterés especiales.";
    } else {
        errors['nationality'] = "";
    }
    if(!regexFecha.test(input.dob)) {
        errors['dob'] = "Ingresa una fecha valida yyyy-mm-dd";
    } else {
        errors['dob'] = "";
    }
    if(!regexTeams.test(input.teams)) {
        errors['teams'] = "Seleccione por lo menos 1 teams";
    } else {
        errors['teams'] = "";
    }
    return errors;
}

