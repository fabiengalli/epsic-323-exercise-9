const students = [
    'Rémi Fasol',
    'Justin Doigt',
    'Thomas Toketchup',
    'Laurent Houtan',
    'Jean Bonboeur',
    'Ali Mentation',
    'Alex Térieur',
    'Léo Tulalaissé',
    'Alain Térieur',
    'Harry Cover',
    'Geoffroy Denledo',
    'Vincent Times',
    'Abel Auboisdorman',
    'Adam Quelquesjours',
    'Eddy Donçavapaslatête'
];

const modules = [
    {num: 117, type: 'Ecole'},
    {num: 187, type: 'CIE'},
    {num: 431, type: 'Ecole'},
    {num: 106, type: 'CIE'},
    {num: 319, type: 'Ecole'},
    {num: 216, type: 'CIE'},
    {num: 162, type: 'Ecole'},
    {num: 231, type: 'Ecole'},
    {num: 164, type: 'Ecole'},
    {num: 122, type: 'Ecole'},
    {num: 293, type: 'Ecole'},
    {num: 114, type: 'Ecole'},
    {num: 294, type: 'CIE'},
    {num: 320, type: 'Ecole'},
    {num: 295, type: 'CIE'},
    {num: 346, type: 'Ecole'},
    {num: 210, type: 'CIE'},
    {num: 322, type: 'Ecole'},
    {num: 248, type: 'CIE'},
    {num: 165, type: 'Ecole'},
    {num: 190, type: 'CIE'},
    {num: 347, type: 'Ecole'},
    {num: 107, type: 'CIE'},
    {num: 426, type: 'Ecole'},
    {num: 109, type: 'CIE'},
    {num: 254, type: 'Ecole'},
    {num: 259, type: 'CIE'},
    {num: 323, type: 'Ecole'},
    {num: 223, type: 'CIE'},
    {num: 450, type: 'Ecole'},
    {num: 335, type: 'CIE'},
    {num: 183, type: 'Ecole'},
    {num: 110, type: 'CIE'},
    {num: 306, type: 'Ecole'},
    {num: 217, type: 'CIE'},
    {num: 185, type: 'CIE'},
    {num: 321, type: 'Ecole'},
    {num: 324, type: 'Ecole'},
    {num: 241, type: 'Ecole'},
    {num: 245, type: 'Ecole'}
];

// the more a grade is present, the more likely it is to be picked
const gradesDistribution = [];
for (let i = 0; i < 3; i++) {
    gradesDistribution.push(6);
}
for (let i = 0; i < 5; i++) {
    gradesDistribution.push(5.5);
}
for (let i = 0; i < 10; i++) {
    gradesDistribution.push(5);
}
for (let i = 0; i < 17; i++) {
    gradesDistribution.push(4.5);
}
for (let i = 0; i < 14; i++) {
    gradesDistribution.push(4);
}
for (let i = 0; i < 8; i++) {
    gradesDistribution.push(3.5);
}
for (let i = 0; i < 5; i++) {
    gradesDistribution.push(3);
}
for (let i = 0; i < 3; i++) {
    gradesDistribution.push(2.5);
}
for (let i = 0; i < 2; i++) {
    gradesDistribution.push(2);
}
for (let i = 0; i < 1; i++) {
    gradesDistribution.push(1.5);
}
for (let i = 0; i < 1; i++) {
    gradesDistribution.push(1);
}

let csv = "Nom;Module;Type;Réussi;Note\n";
for (let i=0; i<modules.length; i++) {
    for (let j=0; j<students.length; j++) {
        const grade = gradesDistribution[Math.floor(Math.random() * gradesDistribution.length)];
        const success = grade >= 4 ? 'Oui' : 'Non';
        csv += `${students[j]};${modules[i].num};${modules[i].type};${success};${grade}\n`;
    }
}

display(csv);
