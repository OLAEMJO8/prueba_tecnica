//*Funcion Validaciones

 export const validateSchemas = (schemas) => async (req, res, next) => {
  try {
    await schemas.parse(req.body);
    next()
  } catch (error) {
    if(Array.isArray(error.errors)){
return res.status(400).json( error.errors.map((error)=>error.message) );
    }
  }
};
