function validateZip(req, res, next) {
    const { zip } = req.params;
     if (zip.length !== 5 || isNaN(Number(zip))) {
         next(`Zip (${zip}) is invalid!`)
     } else {
         next();
     }
 };
   
 
 module.exports = validateZip;