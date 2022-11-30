const movimentModel = require("../models/movimentModel");

exports.get = async () => {
    return await movimentModel.get();
};
exports.movimentsList = async (year, month) => {
    return await movimentModel.listYearMonth(year, month);
};
exports.movimentsIo = async () => {
    return await movimentModel.io();
};
exports.cashBalance = async () => {
    return await movimentModel.cashBalance();
};
exports.filter = async(yearI, monthI, yearII, monthII)=>{
    return await movimentModel.filter(yearI, monthI, yearII, monthII);
}
exports.yearMonth= async(year, month)=>{
    return await movimentModel.yearMonth(year, month);
};
