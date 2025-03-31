class SQLQueryBuilder {
    query = {
        select: [],
        from: [],
        where: [],
        orderBy: [],
        limit: null
    };

    select = (column) => {
        this.query.select.push(column);
        return this;
    }

    from = (table) => {
        this.query.from.push(table);
        return this;
    }

    where = (column) => new SQLConditionBuilder(this, column);

    orderBy = (column, direction="ASC") => {
        this.query.orderBy.push({column, direction});
        return this;
    }

    limit = count => {
        this.query.limit = count;
        return this;
    }

    build = () => "SELECT " + (this.query.select.length ? this.query.select.join(", ") : "*")
        + " FROM " + this.query.from.join(", ")
        + (this.query.where.length ? " WHERE " + this.query.where.join(" AND ") : "")
        + (this.query.orderBy.length ? " ORDER BY " + this.query.orderBy.map(order => order.column + " " + order.direction).join(", ") : "")
        + (this.query.limit ? " LIMIT " + this.query.limit : "");
}

class SQLConditionBuilder {
    sqlQueryBuilder = null;
    condition = {
        column: null,
        operator: "=",
        value: null
    };

    constructor(sqlQueryBuilder, column) {
        this.sqlQueryBuilder = sqlQueryBuilder;
        this.condition.column = column;
    }

    equals = value => {
        this.condition.operator = '=';
        this.condition.value = value;
        this.sqlQueryBuilder.query.where.push(this.build());
        return this.sqlQueryBuilder;
    }

    greaterThan = value => {
        this.condition.operator = '>';
        this.condition.value = value;
        this.sqlQueryBuilder.query.where.push(this.build());
        return this.sqlQueryBuilder;
    }

    lowerThan = value => {
        this.condition.operator = '<';
        this.condition.value = value;
        this.sqlQueryBuilder.query.where.push(this.build());
        return this.sqlQueryBuilder;
    }

    greaterThanOrEqual = value => {
        this.condition.operator = '>=';
        this.condition.value = value;
        this.sqlQueryBuilder.query.where.push(this.build());
        return this.sqlQueryBuilder;
    }

    lowerThanOrEqual = value => {
        this.condition.operator = '<=';
        this.condition.value = value;
        this.sqlQueryBuilder.query.where.push(this.build());
        return this.sqlQueryBuilder;
    }

    in = value => {
        this.condition.operator = 'IN';
        this.condition.value = "('" + value.join("','") + "')";
        this.sqlQueryBuilder.query.where.push(this.build());
        return this.sqlQueryBuilder;
    }

    build = () => [this.condition.column, this.condition.operator, this.condition.value].join(" ");
}

const queries = [
    // "SELECT * FROM pizzas;",
    new SQLQueryBuilder().from("pizzas").build(),
    // "SELECT name, size, price FROM pizzas WHERE price > 20 AND price <= 30 ORDER BY price desc LIMIT 5;",
    new SQLQueryBuilder()
        .select("name")
        .select("size")
        .select("price")
        .from("pizzas")
        .where("price").greaterThan(20)
        .where("price").lowerThanOrEqual(30)
        .orderBy("price", "DESC")
        .limit(5)
        .build(),
    // "SELECT a.name, b.name as 'category' FROM pizzas a, categories b WHERE a.categoryId=b.id AND b.name IN ('Neapolitan', 'Sicilian');"
    new SQLQueryBuilder()
        .select("a.name")
        .select("b.name as 'category'")
        .from("pizzas a")
        .from("categories b")
        .where("a.categoryId").equals("b.id")
        .where("b.name").in(['Neapolitan', 'Sicilian'])
        .build()
];

display(queries);
