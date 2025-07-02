/**
 * @file Funciones de utilidad generales.
 * @author Diego Rubi
 * @copyright 2025
 */

/**
 * Calcula la edad a partir de una fecha de nacimiento.
 * @param {Date} birthdate - La fecha de nacimiento como un objeto Date.
 * @returns {number} La edad calculada en años.
 */
function calculateAge(birthdate) {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}

export { calculateAge };
