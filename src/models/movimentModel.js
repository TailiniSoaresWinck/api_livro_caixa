const mysql = require("./mysqlConnect");

get = async () => {
    sql= `SELECT * FROM moviment`;
    return await mysql.query(sql);
}

cashBalance = async () => {
    sql = `SELECT sum(value) AS input FROM moviment WHERE type='input'`;
    input = await mysql.query(sql);
    sql = `SELECT sum(value) AS output FROM moviment WHERE type='output'`;
    output = await mysql.query(sql);
    saldo = input[0].input-output[0].output;
    var data = {
        saldo:saldo,
        entrada:input[0].input,
        saida:output[0].output
    } 
    return data;
}

io = async () => {
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output') AS output FROM moviment m ORDER BY DATE`;
    return await mysql.query(sql);
}

listYearMonth= async (year, month) => {
    sql = `SELECT * FROM moviment WHERE YEAR(date) = ${year} AND MONTH(date) = ${month}`;
    return await mysql.query(sql);
}

filter = async (yearI, monthI, yearII, monthII) =>{
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output' ) AS output FROM moviment m WHERE date BETWEEN '${yearI}-${monthI}-00' AND '${yearII}-${monthII}-00' ORDER BY date;`;
    return await mysql.query(sql);
};

yearMonth = async(year, month)=>{
    sql = `SELECT DISTINCT m.date, (select SUM(value) from moviment WHERE date = m.date AND type = 'input') AS input, (select sum(value) from moviment WHERE date = m.date AND type = 'output' ) AS output FROM moviment m WHERE YEAR(date) = ${year} AND MONTH(date) = ${month} ORDER BY DATE`;
    return await mysql.query(sql);
};

module.exports= {get, cashBalance, io, listYearMonth, filter, yearMonth}