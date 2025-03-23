// TODO : these queries must be generated using the Builder Pattern
const queries = [
    "SELECT * FROM pizzas;",
    "SELECT name, size, price FROM pizzas WHERE price > 20 AND price <= 30 ORDER BY price desc LIMIT 5;",
    "SELECT a.name, b.name as 'category' FROM pizzas a, categories b WHERE a.categoryId=b.id AND b.name IN('Neapolitan', 'Sicilian');"
];

display(queries);
