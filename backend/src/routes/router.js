const express = require("express");
const router = express();

const signUser = require("../controllers/users/signUser");
const loginUser = require("../controllers/users/loginUser");
const detailUser = require("../controllers/users/detailUser");
const updateUser = require("../controllers/users/updateUser");

const signInClient = require("../controllers/customers/signClient");
const updateClient = require("../controllers/customers/updateClient");
const clients = require("../controllers/customers/allClients");
const detailClient = require("../controllers/customers/detailClient");
const detailStatusClient = require("../controllers/customers/detailStatusClient");

const signBiling = require("../controllers/billings/signBilling");
const billings = require("../controllers/billings/allBillings");
const detailBilling = require("../controllers/billings/detailBilling");
const detailBillingById = require("../controllers/billings/detailBiilingById");
const updateBilling = require("../controllers/billings/updateBilling");
const detailBillingStatus = require("../controllers/billings/detailBillingsStatus");
const deleteBilling = require("../controllers/billings/deleteBilling");

const schemaUpdateClient = require("../schemas/schemasUpdateClient");
const schemaUpdateUser = require("../schemas/schemasUpdateUser");
const schemaUser = require("../schemas/schemasUser");
const schemaClient = require("../schemas/schemasClient");
const checkInformations = require("../middlewares/checkInformations");
const verifylogin = require("../middlewares/verifyLogin");

router.post("/cadastro", checkInformations(schemaUser), signUser);
router.post("/login", loginUser);

router.use(verifylogin);

router.get("/usuario", detailUser);
router.put("/atualizarusuario", checkInformations(schemaUpdateUser), updateUser);
router.post("/CadastroCliente", checkInformations(schemaClient), signInClient);
router.get("/clientes", clients);
router.get("/cliente/:cliente_id", detailClient);
router.put("/atualizarcliente", checkInformations(schemaUpdateClient), updateClient);
router.post("/cadastroCobranca/:cliente_id", signBiling);
router.get("/cobrancas", billings);
router.get("/cobranca/:cliente_id", detailBilling);
router.get("/detalharcobranca/:id", detailBillingById);
router.put("/atualizarcobranca/:id", updateBilling);
router.get("/detalharcobrancas/:status", detailBillingStatus);
router.get("/detalharstatusclientes/:status", detailStatusClient);
router.delete("/deletar/:id_cobranca", deleteBilling);

module.exports = router;