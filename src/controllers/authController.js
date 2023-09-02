export const postLogin = (req, res) => {
  const {name, lastname, email, password, numberdpto} = req.body;


};

export const postSingin = (req, res) => res.send("ingresar");
export const postLogout = (req, res) => res.send("cerrar sesion");
export const getPerfil = (req, res) => res.send("perfil");
