const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

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
const gradesDistribution = [
    ...Array(3).fill(6),
    ...Array(5).fill(5.5),
    ...Array(10).fill(5),
    ...Array(17).fill(4.5),
    ...Array(14).fill(4),
    ...Array(8).fill(3.5),
    ...Array(5).fill(3),
    ...Array(3).fill(2.5),
    ...Array(2).fill(2),
    ...Array(1).fill(1.5),
    ...Array(1).fill(1),
];

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
const randomIndex = array => randomNumber(0, array.length);
const randomGrade = availableGrades => availableGrades[randomIndex(availableGrades)];
const randomGrades = (names) => (availableGrades) => (module) => names.map(name => {
    const grade = randomGrade(availableGrades);
    const success = grade >= 4 ? 'Oui' : 'Non';
    return `${name};${module.num};${module.type};${success};${grade}`;
})

const generatedGradesByModule = students => gradesDistribution => modules => modules.map(module => randomGrades(students)(gradesDistribution)(module));
const oneGradePerLine = modules => modules.reduce((acc, val) => acc.concat(val), []);
const toString = grades => grades.join('\n');
const generatedGrades = (students, gradesDistribution) => pipe(
    generatedGradesByModule(students)(gradesDistribution),
    oneGradePerLine,
    toString
);

const csv = "Nom;Module;Type;Réussi;Note\n" + generatedGrades(students, gradesDistribution)(modules);
display(csv);
